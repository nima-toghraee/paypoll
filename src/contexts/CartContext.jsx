import { createContext, useContext, useState, useEffect } from "react";
import { useUsers } from "./useUsers";
import { AuthContext } from "./AuthContext";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { isLoggedIn, currentUser } = useContext(AuthContext);

  // لود سبد از سرور
  useEffect(() => {
    const fetchCart = async () => {
      if (!isLoggedIn || !currentUser?.id) {
        setIsLoading(false);
        return;
      }
      try {
        setIsLoading(true);
        const response = await fetch(
          `http://localhost:3002/purchases?userId=${currentUser.id}`
        );
        if (!response.ok) throw new Error("خطا در دریافت سبد");
        const data = await response.json();
        setCartItems(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchCart();
  }, [isLoggedIn, currentUser?.id]);

  const addToCart = async (product) => {
    try {
      if (!isLoggedIn) throw new Error("لطفاً ابتدا وارد حساب کاربری شوید");

      const existingItem = cartItems.find(
        (item) => item.productId === product.id
      );
      let updatedItems;
      let purchaseId = existingItem?.id; // برای آپدیت

      if (existingItem) {
        updatedItems = cartItems.map((item) =>
          item.productId === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        updatedItems = [
          ...cartItems,
          { ...product, productId: product.id, quantity: 1 },
        ];
      }

      setCartItems(updatedItems);

      // ارسال یا آپدیت در سرور
      const method = existingItem ? "PATCH" : "POST";
      const url = existingItem
        ? `http://localhost:3002/purchases/${purchaseId}`
        : "http://localhost:3002/purchases";

      await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: currentUser.id,
          productId: product.id,
          quantity: existingItem ? existingItem.quantity + 1 : 1,
          title: product.title,
          price: product.price,
          image: product.image,
          category: product.category,
        }),
      });
    } catch (error) {
      console.error("خطا در افزودن به سبد:", error.message);
      alert(error.message);
    }
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, isLoading, error }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
