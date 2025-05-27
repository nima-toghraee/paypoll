import { useState } from "react";
import products from "../../Products/Products";
import { useNavigate, Link } from "react-router-dom";

export default function ProductCode() {
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const isLoggedIn = sessionStorage.getItem("userLoggedIn") === "true";

  const handleSubmit = () => {
    setError("");
    const found = products.find((p) => p.code === code.trim().toLowerCase());
    if (found) {
      navigate("/user", { state: { product: found } });
    } else {
      setError("کد محصول نامعتبر است");
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-6 text-right font-sans" dir="rtl">
      <div className="flex gap-4 mb-8">
        <Link
          to="/user-login"
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          ورود
        </Link>
        <Link
          to="/user-signup"
          className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700"
        >
          ثبت‌نام
        </Link>
        <Link
          to="/cart"
          className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
        >
          سبد خرید
        </Link>

        {isLoggedIn && (
          <Link
            to="/dashboard"
            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
          >
            داشبورد
          </Link>
        )}
      </div>
      <h1 className="text-xl font-bold mb-4 text-right">
        کد محصول را وارد نمایید
      </h1>
      <input
        type="text"
        value={code}
        onChange={(e) => setCode(e.target.value)}
        className="border border-gray-300 p-3 w-full mb-2 rounded"
        placeholder="کد محصول را وارد کنید"
      />
      {error && <p className="text-red-500 mb-2 text-right">{error}</p>}

      <button
        onClick={handleSubmit}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 ml-auto"
      >
        ادامه
      </button>
    </div>
  );
}
