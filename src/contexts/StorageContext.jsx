import { createContext, useState, useEffect } from "react";

export const StorageContext = createContext();

export const StorageProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [purchases, setPurchases] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3002/users")
      .then((res) => res.json())
      .then((data) => {
        // console.log("کاربران لود شدند:", data);
        setUsers(data);
      })
      .catch((err) => console.error("خطا در لود کاربران:", err));
  }, []);

  useEffect(() => {
    fetch("http://localhost:3002/purchases")
      .then((res) => res.json())
      .then((data) => {
        // console.log("خریدها لود شدند:", data);
        setPurchases(data);
      })
      .catch((err) => console.error("خطا در لود خریدها:", err));
  }, []);

  const checkUser = async (username, password) => {
    try {
      const res = await fetch(
        `http://localhost:3002/users?username=${username}&password=${password}`
      );
      const matchedUsers = await res.json();
      if (matchedUsers.length === 0) {
        throw new Error("نام کاربری یا رمز عبور اشتباه است");
      }
      return matchedUsers[0];
    } catch (err) {
      console.error("خطا در چک کاربر:", err);
      throw err;
    }
  };

  const checkAdmin = async (username, password) => {
    try {
      const res = await fetch(
        `http://localhost:3002/admin?username=${username}&password=${password}`
      );
      const matchedAdmin = await res.json();
      if (matchedAdmin.length === 0) {
        throw new Error("نام کاربری یا رمز عبور اشتباه است");
      }
      return matchedAdmin[0];
    } catch (err) {
      console.error("خطا در چک ادمین:", err);
      throw err;
    }
  };

  const addUser = async (newUser) => {
    try {
      const res = await fetch(
        `http://localhost:3002/users?username=${newUser.username}`
      );
      const existingUsers = await res.json();
      if (existingUsers.length > 0) {
        throw new Error("این نام کاربری قبلاً ثبت شده است");
      }
      const response = await fetch("http://localhost:3002/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newUser),
      });
      const addedUser = await response.json();
      console.log("کاربر اضافه شد:", addedUser);
      setUsers([...users, addedUser]);
    } catch (err) {
      console.error("خطا در افزودن کاربر:", err);
      throw err;
    }
  };

  const addToCart = async (userId, item) => {
    try {
      const res = await fetch(
        `http://localhost:3002/purchases?userId=${userId}`
      );
      const existingCart = await res.json();
      // console.log("سبد موجود برای", userId, ":", existingCart);

      if (existingCart.length > 0) {
        const cart = existingCart[0];
        const updatedItems = cart.items.some((i) => i.code === item.code)
          ? cart.items.map((i) =>
              i.code === item.code
                ? { ...i, quantity: i.quantity + item.quantity }
                : i
            )
          : [...cart.items, item];

        const updatedCart = {
          ...cart,
          userId,
          items: updatedItems,
          totalPrice: updatedItems.reduce(
            (sum, i) => sum + i.price * i.quantity,
            0
          ),
        };

        const response = await fetch(
          `http://localhost:3002/purchases/${cart.id}`,
          {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(updatedCart),
          }
        );
        const updatedPurchase = await response.json();
        setPurchases(
          purchases.map((p) => (p.id === cart.id ? updatedPurchase : p))
        );
      } else {
        const newCart = {
          userId,
          items: [item],
          totalPrice: item.price * item.quantity,
          date: new Date().toISOString().split("T")[0],
        };

        const response = await fetch("http://localhost:3002/purchases", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newCart),
        });
        const addedPurchase = await response.json();
        // console.log("خرید جدید اضافه شد:", addedPurchase);
        setPurchases([...purchases, addedPurchase]);
      }
    } catch (err) {
      console.error("خطا در افزودن محصول به سبد خرید:", err);
      throw err;
    }
  };

  const updateCartQuantity = async (userId, code, delta) => {
    try {
      const res = await fetch(
        `http://localhost:3002/purchases?userId=${userId}`
      );
      const existingCart = await res.json();
      if (existingCart.length === 0) return;

      const cart = existingCart[0];
      const updatedItems = cart.items
        .map((item) =>
          item.code === code
            ? { ...item, quantity: item.quantity + delta }
            : item
        )
        .filter((item) => item.quantity > 0);

      const updatedCart = {
        ...cart,
        userId,
        items: updatedItems,
        totalPrice: updatedItems.reduce(
          (sum, item) => sum + item.price * item.quantity,
          0
        ),
      };

      const response = await fetch(
        `http://localhost:3002/purchases/${cart.id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updatedCart),
        }
      );
      const updatedPurchase = await response.json();
      setPurchases(
        purchases.map((p) => (p.id === cart.id ? updatedPurchase : p))
      );
    } catch (err) {
      console.error("خطا در به‌روزرسانی تعداد:", err);
      throw err;
    }
  };

  const removeFromCart = async (userId, code) => {
    try {
      const res = await fetch(
        `http://localhost:3002/purchases?userId=${userId}`
      );
      const existingCart = await res.json();
      if (existingCart.length === 0) return;

      const cart = existingCart[0];
      const updatedItems = cart.items.filter((item) => item.code !== code);

      const updatedCart = {
        ...cart,
        userId,
        items: updatedItems,
        totalPrice: updatedItems.reduce(
          (sum, item) => sum + item.price * item.quantity,
          0
        ),
      };

      const response = await fetch(
        `http://localhost:3002/purchases/${cart.id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updatedCart),
        }
      );
      const updatedPurchase = await response.json();
      setPurchases(
        purchases.map((p) => (p.id === cart.id ? updatedPurchase : p))
      );
    } catch (err) {
      console.error("خطا در حذف کالا:", err);
      throw err;
    }
  };

  return (
    <StorageContext.Provider
      value={{
        users,
        purchases,
        addUser,
        checkUser,
        checkAdmin,
        addToCart,
        updateCartQuantity,
        removeFromCart,
      }}
    >
      {children}
    </StorageContext.Provider>
  );
};
