import { useContext } from "react";
import { StorageContext } from "../../contexts/StorageContext";
import CartItem from "./CartItem";
import Header from "../Home/Header/Header";

export default function Cart() {
  const { cartItems, removeCartItem, updateCartItem, isLoading, error } =
    useContext(StorageContext);

  if (isLoading) {
    return (
      <div className="p-4 text-center" dir="rtl">
        <p className="text-lg text-gray-600">در حال بارگذاری سبد...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 text-center" dir="rtl">
        <p className="text-lg text-red-600">خطا: {error}</p>
      </div>
    );
  }

  if (!cartItems || cartItems.length === 0) {
    return (
      <div className="p-4 text-center" dir="rtl">
        <p className="text-lg text-gray-600">سبد خرید شما خالی است</p>
      </div>
    );
  }

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const handleIncrease = (item) => {
    updateCartItem(item.id, item.quantity + 1);
  };

  const handleDecrease = (item) => {
    if (item.quantity > 1) {
      updateCartItem(item.id, item.quantity - 1);
    } else {
      removeCartItem(item.id);
    }
  };

  const handleRemove = (itemId) => {
    removeCartItem(itemId);
  };

  return (
    <div className="min-h-screen bg-gray-100" dir="rtl">
      {" "}
      <header className="sticky top-0 z-10 w-[80%] mx-auto p-6 text-right max-w-screen-2xl sm:w-[90%] sm:p-4 bg-white shadow-md font-sans">
        {" "}
        <Header />
      </header>{" "}
      <div className="w-[80%] mx-auto flex flex-col sm:flex-row gap-6 my-6 max-w-screen-2xl sm:w-[90%]">
        <div className="w-full sm:w-[70%] flex flex-col gap-4">
          {cartItems.map((item) => (
            <CartItem
              key={item.id}
              item={item}
              onIncrease={handleIncrease}
              onDecrease={handleDecrease}
              onRemove={handleRemove}
            />
          ))}
        </div>

        <div className="w-full sm:w-[30%]">
          <div className="p-6 bg-white rounded-xl shadow-md sticky top-24">
            {" "}
            <p className="text-lg font-bold">مجموع: ${totalPrice.toFixed(2)}</p>
            <button className="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200">
              ادامه خرید
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
