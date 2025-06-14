import { createContext, useContext, useState, useEffect } from "react";
import { useUsers } from "./useUsers";
import { AuthContext } from "./AuthContext";
import {
  getCartItems,
  createCartItem,
  updateCartItem,
  deleteCartItem,
} from "../Api/Api";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { isLoggedIn, currentUser } = useContext(AuthContext);

  // ...........................................
  // Load cart items from server on mount or user change
  // ......................................
  useEffect(() => {
    const fetchCart = async () => {
      if (!isLoggedIn || !currentUser?.id) {
        setIsLoading(false);
        return;
      }
      try {
        setIsLoading(true);
        const response = await getCartItems(currentUser.id);
        if (process.env.NODE_ENV === "development") {
          console.log("سبد خرید لود شد:", response.data.length, "آیتم");
        }
        setCartItems(response.data);
      } catch (err) {
        setError(err.message || "خطا در دریافت سبد");
        console.error("خطا در لود سبد:", err.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchCart();
  }, [isLoggedIn, currentUser?.id]);

  // .....................................................
  // Add a product to the cart or increment quantity if it exists
  // ..................................................
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
        await updateCartItem(purchaseId, {
          userId: currentUser.id,
          productId: product.id,
          quantity: existingItem.quantity + 1,
          title: product.title,
          price: product.price,
          image: product.image,
          category: product.category,
        });
      } else {
        updatedItems = [
          ...cartItems,
          { ...product, productId: product.id, quantity: 1 },
        ];
        await createCartItem({
          userId: currentUser.id,
          productId: product.id,
          quantity: 1,
          title: product.title,
          price: product.price,
          image: product.image,
          category: product.category,
        });
      }

      setCartItems(updatedItems);
      if (process.env.NODE_ENV === "development") {
        console.log("محصول به سبد اضافه شد:", product.title);
      }
    } catch (error) {
      console.error("خطا در افزودن به سبد:", error.message);
      alert(error.message);
    }
  };

  // .....................................
  // Update the quantity of a cart item
  // ...................................
  const updateCartItem = async (itemId, newQuantity) => {
    try {
      const item = cartItems.find((item) => item.id === itemId);
      if (!item) throw new Error("آیتم یافت نشد");
      const response = await updateCartItem(itemId, { quantity: newQuantity });
      if (process.env.NODE_ENV === "development") {
        console.log("آیتم آپدیت شد:", itemId, "مقدار:", newQuantity);
      }
      setCartItems(
        cartItems.map((item) => (item.id === itemId ? response.data : item))
      );
    } catch (err) {
      setError("خطا در به‌روزرسانی آیتم");
    }
  };

  // ......................................
  // Remove an item from the cart
  // .....................................
  const removeCartItem = async (itemId) => {
    try {
      await deleteCartItem(itemId);
      if (process.env.NODE_ENV === "development") {
        console.log("آیتم حذف شد:", itemId);
      }
      setCartItems(cartItems.filter((item) => item.id !== itemId));
    } catch (err) {
      setError("خطا در حذف آیتم");
    }
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        updateCartItem,
        removeCartItem,
        addToCart,
        isLoading,
        error,
      }}
    >
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
