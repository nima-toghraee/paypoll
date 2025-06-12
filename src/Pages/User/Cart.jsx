import { useContext } from "react";
import { StorageContext } from "../../contexts/StorageContext";

export default function Cart() {
  const { cartItems, isLoading, error } = useContext(StorageContext);

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

  return (
    <div className="p-4 max-w-4xl mx-auto" dir="rtl">
      <h1 className="text-2xl font-bold mb-6">سبد خرید</h1>
      <div className="space-y-4">
        {cartItems.map((item) => (
          <div
            key={item.id}
            className="flex items-center bg-white rounded-xl shadow-md p-4"
          >
            <img
              src={item.image}
              alt={item.title}
              className="w-20 h-20 object-contain"
            />
            <div className="flex-1 mr-4">
              <h3 className="text-lg font-semibold truncate">{item.title}</h3>
              <p className="text-sm text-gray-500">{item.category}</p>
              <p className="text-base font-bold text-blue-600">
                ${item.price.toFixed(2)} × {item.quantity}
              </p>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-6 p-4 bg-white rounded-xl shadow-md">
        <p className="text-lg font-bold">مجموع: ${totalPrice.toFixed(2)}</p>
        <button className="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200">
          ادامه خرید
        </button>
      </div>
    </div>
  );
}
