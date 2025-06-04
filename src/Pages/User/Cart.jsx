import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import { StorageContext } from "../../contexts/StorageContext";

export default function Cart() {
  const navigate = useNavigate();
  const { isLoggedIn, currentUser, isAuthLoaded } = useContext(AuthContext); // username → currentUser
  const { purchases, updateCartQuantity, removeFromCart } =
    useContext(StorageContext);
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!isAuthLoaded) {
      // console.log("AuthContext هنوز لود نشده");
      return;
    }

    if (!isLoggedIn || !currentUser) {
      console.log("کاربر لاگین نکرده یا currentUser خالیه:", {
        isLoggedIn,
        currentUser,
      });
      setCart([]);
      setLoading(false);
      return;
    }

    // console.log("purchases:", purchases);
    const userCart = purchases.find((p) => p.userId === currentUser);
    // console.log("userCart برای", currentUser, ":", userCart);
    setCart(userCart?.items || []);
    setLoading(false);
  }, [purchases, isLoggedIn, currentUser]);

  const handleUpdateQuantity = async (code, delta) => {
    if (!isLoggedIn || !currentUser) return;
    setLoading(true);
    setError("");
    try {
      await updateCartQuantity(currentUser, code, delta);
    } catch (err) {
      setError("خطا در به‌روزرسانی تعداد کالا");
      console.error("خطا در به‌روزرسانی تعداد:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveItem = async (code) => {
    if (!isLoggedIn || !currentUser) return;
    setLoading(true);
    setError("");
    try {
      await removeFromCart(currentUser, code);
    } catch (err) {
      setError("خطا در حذف کالا");
      console.error("خطا در حذف کالا:", err);
    } finally {
      setLoading(false);
    }
  };

  // console.log("cart:", cart);
  const totalPrice = Array.isArray(cart)
    ? cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
    : 0;

  const handleCheckout = () => {
    if (!isLoggedIn) {
      navigate("/user-login");
      return;
    }
    navigate("/payment", { state: { cart } });
  };

  if (loading) {
    return <p className="text-center">در حال بارگذاری...</p>;
  }

  return (
    <div className="max-w-5xl mx-auto p-6 text-right font-sans" dir="rtl">
      <h1 className="text-2xl font-bold text-gray-800 mb-8">سبد خرید</h1>
      {error && <p className="text-red-500 mb-4">{error}</p>}
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
                  onClick={() => handleUpdateQuantity(item.code, -1)}
                  className="bg-gray-200 px-2 py-1 rounded"
                  disabled={loading}
                >
                  -
                </button>
                <span>{item.quantity}</span>
                <button
                  onClick={() => handleUpdateQuantity(item.code, 1)}
                  className="bg-gray-200 px-2 py-1 rounded"
                  disabled={loading}
                >
                  +
                </button>
                <button
                  onClick={() => handleRemoveItem(item.code)}
                  className="bg-red-600 text-white px-2 py-1 rounded hover:bg-red-700"
                  disabled={loading}
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
              disabled={loading}
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
