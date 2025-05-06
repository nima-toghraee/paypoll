import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const generateTrackingCode = () => {
  const timestamp = Date.now().toString(36);
  const random = Math.random().toString(36).substr(2, 5);
  return `TRK-${timestamp}-${random}`.toUpperCase();
};

export default function Payment() {
  const { state } = useLocation();
  const { product, user } = state || {};
  const navigate = useNavigate();
  const [paymentStatus, setPaymentStatus] = useState(null);
  const [purchase, setPurchase] = useState(null);

  const handlePayment = () => {
    if (!product || !user) {
      setPaymentStatus("failed");
      return;
    }

    const isSuccess = Math.random() < 0.8;

    if (isSuccess) {
      const code = generateTrackingCode();

      const newPurchase = {
        id: Date.now(),
        trackingCode: code,
        product,
        user,
        date: new Date().toLocaleString("fa-IR"),
      };

      const purchases = JSON.parse(localStorage.getItem("purchases") || "[]");
      purchases.push(newPurchase);
      localStorage.setItem("purchases", JSON.stringify(purchases));

      setPurchase(newPurchase);
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

  const handleBackToForm = () => {
    navigate("/userForm", { state: { product } });
  };

  return (
    <div className="max-w-md mx-auto p-4 text-right" dir="rtl">
      <h1 className="text-xl font-bold mb-4">پردازش پرداخت</h1>
      {product && user && !paymentStatus ? (
        <div className="space-y-2 border border-gray-200 p-4 rounded">
          <p className="text-gray-700">نام محصول: {product.name}</p>
          <p className="text-gray-700">
            قیمت: {product.price.toLocaleString("fa-IR")} تومان
          </p>
          <p className="text-gray-700">نام خریدار: {user.name}</p>
          <button
            onClick={handlePayment}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 mt-4"
          >
            تأیید پرداخت
          </button>
        </div>
      ) : paymentStatus === "success" && purchase ? (
        <div className="space-y-2 border border-gray-200 p-4 rounded">
          <p className="text-green-600 font-bold">پرداخت موفق!</p>
          <p className="text-green-600 font-bold">
            کد پیگیری: {purchase.trackingCode}
          </p>
          <p className="text-gray-700">نام محصول: {purchase.product.name}</p>
          <p className="text-gray-700">
            قیمت: {purchase.product.price.toLocaleString("fa-IR")} تومان
          </p>
          <p className="text-gray-700">نام خریدار: {purchase.user.name}</p>
          <p className="text-gray-700">شماره تلفن: {purchase.user.phone}</p>
          <p className="text-gray-700">آدرس: {purchase.user.address}</p>
          <p className="text-gray-700">کد پستی: {purchase.user.postalCode}</p>
          <p className="text-gray-700">تاریخ خرید: {purchase.date}</p>
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
          <p className="text-gray-700">
            لطفاً دوباره تلاش کنید یا به فرم برگردید.
          </p>
          <div className="flex justify-end gap-2 mt-4">
            <button
              onClick={handleRetry}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              امتحان دوباره
            </button>
            <button
              onClick={handleBackToForm}
              className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
            >
              بازگشت به فرم
            </button>
          </div>
        </div>
      ) : (
        <p className="text-red-500">اطلاعات خرید یافت نشد</p>
      )}
    </div>
  );
}
