import { useContext, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import { StorageContext } from "../../contexts/StorageContext";

export default function User() {
  const { state } = useLocation();
  const product = state?.product;
  const navigate = useNavigate();
  const { isLoggedIn, currentUser } = useContext(AuthContext);
  const { addToCart } = useContext(StorageContext);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handlePurchase = async () => {
    if (!isLoggedIn) {
      navigate("/user-login", { state: { from: "/user", product } });
      return;
    }
    setLoading(true);
    setError("");
    console.log("اضافه کردن محصول به سبد خرید برای:", currentUser); // دیباگ

    try {
      await addToCart(currentUser, { ...product, quantity: 1 });
      alert("محصول به سبد خرید اضافه شد");
      navigate("/cart");
    } catch (err) {
      setError("خطا در افزودن محصول به سبد خرید");
      console.error("خطا در افزودن محصول:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    navigate("/");
  };

  return (
    <div className="max-w-md mx-auto p-4 text-right" dir="rtl">
      <h1 className="text-xl font-bold mb-4">اطلاعات محصول</h1>
      {product ? (
        <div className="space-y-2 border border-gray-200 p-4 rounded">
          <p className="text-gray-700">کد: {product.code}</p>
          <p className="text-gray-700">نام: {product.name}</p>
          <p className="text-gray-700">
            قیمت: {product.price.toLocaleString("fa-IR")} تومان
          </p>
        </div>
      ) : (
        <p className="text-red-500">محصولی انتخاب نشده</p>
      )}
      {product && (
        <div className="flex justify-end gap-2 mt-4">
          <button
            onClick={handlePurchase}
            disabled={loading}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            {loading ? "در حال افزودن..." : "خرید محصول"}{" "}
          </button>
          <button
            onClick={handleBack}
            disabled={loading}
            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
          >
            بازگشت
          </button>
          <button
            onClick={() => navigate("/cart")}
            disabled={loading}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            سبد خرید
          </button>
        </div>
      )}
    </div>
  );
}
