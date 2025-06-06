import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import { StorageContext } from "../../contexts/StorageContext";

const generateTrackingCode = () => {
  const timestamp = Date.now().toString(36);
  const random = Math.random().toString(36).substr(2, 5);
  return `TRK-${timestamp}-${random}`.toUpperCase();
};

export default function Payment() {
  const navigate = useNavigate();
  const { isLoggedIn, currentUser } = useContext(AuthContext); // از AuthContext
  const { purchases, complatePurchase, isStorageLoaded } =
    useContext(StorageContext);
  const [paymentStatus, setPaymentStatus] = useState(null);
  const [error, setError] = useState("");
  const [order, setOrder] = useState(null);
  const [userInfo, setUserInfo] = useState(null);

  // پیدا کردن سبد خرید کاربر
  const userCart = purchases.find((p) => p.userId === currentUser) || {};
  const cart = userCart.items || [];
  const totalPrice = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const res = await fetch(
          `http://localhost:3002/users?username=${currentUser}`
        );
        const data = await res.json();
        if (data.length > 0) {
          setUserInfo(data[0]);
        } else {
          setError("کاربر یافت نشد");
        }
      } catch (err) {
        setError("خطا در بارگذاری اطلاعات کاربر");
        console.error("خطا:", err);
      }
    };
    if (currentUser) {
      fetchUserInfo();
    }
  }, [currentUser]);

  const handlePayment = async () => {
    if (!isLoggedIn || !currentUser) {
      navigate("/user-login");
      return;
    }
    if (!isStorageLoaded) {
      setError("لطفاً صبر کنید، سیستم در حال بارگذاری است...");
      return;
    }
    if (!cart || cart.length === 0) {
      setPaymentStatus("failed");
      setError("سبد خرید خالی است");
      return;
    }

    if (!userInfo) {
      setError("لطفاً صبر کنید، اطلاعات کاربر در حال بارگذاری است...");
      return;
    }

    if (
      !userInfo.name ||
      !userInfo.phone ||
      !userInfo.address ||
      !userInfo.postalCode
    ) {
      setError("لطفاً اطلاعات پروفایل خود را تکمیل کنید");
      navigate("/profile", { state: { fromPayment: true } });
      return;
    }

    const isSuccess = Math.random() < 0.8; // شبیه‌سازی پرداخت

    if (isSuccess) {
      try {
        const trackingCode = generateTrackingCode();
        const newOrder = await complatePurchase(currentUser, trackingCode);
        setOrder(newOrder);
        setPaymentStatus("success");
      } catch (err) {
        setPaymentStatus("failed");
        setError("خطا در پردازش پرداخت");
        console.error("خطا در پرداخت:", err);
      }
    } else {
      setPaymentStatus("failed");
      setError("پرداخت ناموفق بود");
    }
  };

  const handleBackToHome = () => {
    navigate("/");
  };

  const handleRetry = () => {
    setPaymentStatus(null);
    setError("");
    setOrder(null);
  };

  if (!isStorageLoaded) {
    return <p className="text-center">در حال بارگذاری...</p>;
  }

  return (
    <div className="max-w-md mx-auto p-4 text-right" dir="rtl">
      <h1 className="text-xl font-bold mb-4">پردازش پرداخت</h1>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      {cart.length > 0 && !paymentStatus ? (
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
          <p className="text-gray-700">نام خریدار: {currentUser}</p>
          <button
            onClick={handlePayment}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 mt-4"
          >
            تأیید پرداخت
          </button>
        </div>
      ) : paymentStatus === "success" ? (
        <div className="space-y-2 border border-gray-200 p-4 rounded">
          <p className="text-green-600 font-bold">پرداخت موفق!</p>
          <p className="text-green-600 font-bold">
            کد پیگیری: {order.trackingCode}
          </p>
          {order.items.map((item) => (
            <div key={item.code} className="space-y-1">
              <p className="text-gray-700">نام محصول: {item.name}</p>
              <p className="text-gray-700">
                قیمت: {(item.price * item.quantity).toLocaleString("fa-IR")}{" "}
                تومان
              </p>
            </div>
          ))}
          <p className="text-gray-700">نام خریدار: {currentUser}</p>
          <p className="text-gray-700">
            تاریخ خرید: {new Date(order.Date).toLocaleString("fa-IR")}
          </p>
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
          <p className="text-gray-700">{error}</p>
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
