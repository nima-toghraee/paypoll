import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const generateTrackingCode = () => {
  const timestamp = Date.now().toString(36);
  const random = Math.random().toString(36).substr(2, 5);
  return `TRK-${timestamp}-${random}`.toUpperCase();
};

export default function Payment() {
  const { state } = useLocation();
  const { cart } = state || {};
  const navigate = useNavigate();
  const [paymentStatus, setPaymentStatus] = useState(null);
  const [purchase, setPurchase] = useState(null);
  const username = sessionStorage.getItem("currentUser") || "کاربر ناشناس";
  const isLoggedIn = sessionStorage.getItem("userLoggedIn") === "true";

  const totalPrice =
    cart?.reduce((sum, item) => sum + item.price * item.quantity, 0) || 0;

  const handlePayment = () => {
    if (!isLoggedIn) {
      navigate("/user-login");
      return;
    }
    if (!cart || cart.length === 0) {
      setPaymentStatus("failed");
      return;
    }

    const isSuccess = Math.random() < 0.8;

    if (isSuccess) {
      const newPurchases = cart.map((item) => ({
        id: Date.now() + Math.random(),
        trackingCode: generateTrackingCode(),
        product: { name: item.name, price: item.price, code: item.code },
        user: { name: username },
        date: new Date().toLocaleString("fa-IR"),
      }));

      const existingPurchases = JSON.parse(
        localStorage.getItem("purchases") || "[]"
      );
      localStorage.setItem(
        "purchases",
        JSON.stringify([...existingPurchases, ...newPurchases])
      );
      localStorage.setItem("cart", "[]"); // خالی کردن سبد
      setPurchase(newPurchases);
      setPaymentStatus("success");
    } else {
      setPaymentStatus("failed");
    }
  };

  const handleBackToHome = () => {
    navigate("/");
  };

  const handleRetry = () => {
    setPaymentStatus(null); // ریست وضعیت برای امتحان دوباره
  };

  return (
    <div className="max-w-md mx-auto p-4 text-right" dir="rtl">
      <h1 className="text-xl font-bold mb-4">پردازش پرداخت</h1>
      {cart && cart.length > 0 && !paymentStatus ? (
        <div className="space-y-2 border border-gray-200 p-4 rounded">
          {cart.map((item) => (
            <div key={item.code} className="space-y-1">
              <p className="text-gray-700">نام محصول: {item.name}</p>
              <p className="text-gray-700">
                قیمت: {(item.price * item.quantity).toLocaleString("fa-IR")}{" "}
                تومان (تعداد: {item.quantity})
              </p>
            </div>
          ))}
          <p className="text-gray-700 font-bold">
            جمع کل: {totalPrice.toLocaleString("fa-IR")} تومان
          </p>
          <p className="text-gray-700">نام خریدار: {username}</p>
          <button
            onClick={handlePayment}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 mt-4"
          >
            تأیید پرداخت
          </button>
        </div>
      ) : paymentStatus === "success" && purchase.length > 0 ? (
        <div className="space-y-2 border border-gray-200 p-4 rounded">
          <p className="text-green-600 font-bold">پرداخت موفق!</p>
          {purchase.map((purchase) => (
            <div key={purchase.id} className="space-y-1">
              <p className="text-green-600 font-bold">
                کد پیگیری: {purchase.trackingCode}
              </p>
              <p className="text-gray-700">
                نام محصول: {purchase.product.name}
              </p>
              <p className="text-gray-700">
                قیمت: {purchase.product.price.toLocaleString("fa-IR")} تومان
              </p>
            </div>
          ))}
          <p className="text-gray-700">نام خریدار: {username}</p>
          <p className="text-gray-700">تاریخ خرید: {purchase[0].date}</p>
          <div className="flex justify-end mt-4">
            <button
              onClick={handleBackToHome}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              بازگشت به صفحه اصلی
            </button>
          </div>
        </div>
      ) : paymentStatus === "failed" ? (
        <div className="space-y-2 border border-gray-200 p-4 rounded">
          <p className="text-red-500 font-bold">پرداخت ناموفق بود!</p>
          <p className="text-gray-700">لطفاً دوباره تلاش کنید.</p>
          <div className="flex justify-end gap-2 mt-4">
            <button
              onClick={handleRetry}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              امتحان دوباره
            </button>
          </div>
        </div>
      ) : (
        <p className="text-red-500">اطلاعات خرید یافت نشد</p>
      )}
    </div>
  );
}
