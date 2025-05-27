import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Cart() {
  const navigate = useNavigate();
  const [cart, setCart] = useState(
    JSON.parse(localStorage.getItem("cart") || "[]")
  );
  const isLoggedIn = sessionStorage.getItem("userLoggedIn") === "true";

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const updateQuantity = (code, delta) => {
    setCart((prev) =>
      prev
        .map((item) =>
          item.code === code
            ? { ...item, quantity: item.quantity + delta }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const removeItem = (code) => {
    setCart((prev) => prev.filter((item) => item.code !== code));
  };

  const totalPrice = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handleCheckout = () => {
    if (!isLoggedIn) {
      navigate("/user-login");
      return;
    }
    navigate("/payment", { state: { cart } });
  };

  return (
    <div className="max-w-5xl mx-auto p-6 text-right font-sans" dir="rtl">
      <h1 className="text-2xl font-bold text-gray-800 mb-8">سبد خرید</h1>
      {cart.length > 0 ? (
        <div className="space-y-4">
          {cart.map((item) => (
            <div
              key={item.code}
              className="flex justify-between items-center bg-white p-4 rounded-lg shadow-sm"
            >
              <div>
                <p className="text-gray-700 font-medium">{item.name}</p>
                <p className="text-gray-600">
                  {item.price.toLocaleString("fa-IR")} تومان
                </p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => updateQuantity(item.code, -1)}
                  className="bg-gray-200 px-2 py-1 rounded"
                >
                  -
                </button>
                <span>{item.quantity}</span>
                <button
                  onClick={() => updateQuantity(item.code, 1)}
                  className="bg-gray-200 px-2 py-1 rounded"
                >
                  +
                </button>
                <button
                  onClick={() => removeItem(item.code)}
                  className="bg-red-600 text-white px-2 py-1 rounded hover:bg-red-700"
                >
                  حذف
                </button>
              </div>
            </div>
          ))}
          <div className="text-left">
            <p className="text-xl font-semibold text-gray-800">
              جمع کل: {totalPrice.toLocaleString("fa-IR")} تومان
            </p>
            <button
              onClick={handleCheckout}
              className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
            >
              پرداخت
            </button>
          </div>
        </div>
      ) : (
        <p className="text-gray-600">سبد خرید خالی است</p>
      )}
    </div>
  );
}
