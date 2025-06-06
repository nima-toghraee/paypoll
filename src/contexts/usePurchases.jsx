import { useState, useEffect } from "react";

export const usePurchases = () => {
  const [purchases, setPurchases] = useState([]);
  const [isPurchasesLoaded, setIsPurchasesLoaded] = useState(false);

  useEffect(() => {
    fetch("http://localhost:3002/purchases")
      .then((res) => res.json())
      .then((data) => {
        if (process.env.NODE_ENV === "development") {
          console.log("خریدها لود شدند:", data.length, "آیتم");
        }
        setPurchases(data);
      })
      .catch((err) => console.error("خطا در لود خریدها:", err))
      .finally(() => setIsPurchasesLoaded(true));
  }, []);

  const addToCart = async (userId, item) => {
    try {
      const res = await fetch(
        `http://localhost:3002/purchases?userId=${userId}`
      );
      const existingCart = await res.json();
      if (process.env.NODE_ENV === "development") {
        console.log("سبد موجود برای", userId, ":", existingCart.length);
      }

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
        if (process.env.NODE_ENV === "development") {
          console.log("خرید جدید اضافه شد:", addedPurchase.id);
        }
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

  const complatePurchase = async (userId, trackingCode) => {
    try {
      const res = await fetch(
        `http://localhost:3002/purchases?userId=${userId}`
      );
      const existingCart = await res.json();

      if (existingCart.length === 0) {
        throw new Error("سبد خرید یافت نشد");
      }
      const cart = existingCart[0];

      const newOrder = {
        userId,
        items: cart.items,
        totalPrice: cart.totalPrice,
        status: "complated",
        trackingCode,
        date: new Date().toISOString().split("T")[0], // آپدیت تاریخ
      };

      const orderResponse = await fetch("http://localhost:3002/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newOrder),
      });

      const addedOrder = await orderResponse.json();
      if (process.env.NODE_ENV === "development") {
        console.log("سفارش جدید اضافه شد:", addedOrder);
      }

      const updatedCart = {
        ...cart,
        items: [],
        totalPrice: 0,
        trackingCode: null,
        status: " pending",
      };

      const cartResponse = await fetch(
        `http://localhost:3002/purchases/${cart.id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updatedCart),
        }
      );
      const updatedPurchase = await cartResponse.json();
      setPurchases(
        purchases.map((p) => (p.id === cart.id ? updatedPurchase : p))
      );

      if (process.env.NODE_ENV === "development") {
        console.log("سبد خرید خالی شد:", updatedPurchase);
      }

      return addedOrder; // برای استفاده در Payment.jsx
    } catch (err) {
      console.error("خطا در تکمیل خرید:", err);
      throw err;
    }
  };

  return {
    purchases,
    isPurchasesLoaded,
    addToCart,
    updateCartQuantity,
    removeFromCart,
    complatePurchase,
  };
};
