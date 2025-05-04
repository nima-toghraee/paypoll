import { useLocation, useNavigate } from "react-router-dom";

export default function User() {
  const { state } = useLocation();
  const product = state?.product;
  const navigate = useNavigate();

  const handlePurchase = () => {
    navigate("/userForm", { state: { product } });
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
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            خرید محصول
          </button>
          <button
            onClick={handleBack}
            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
          >
            بازگشت
          </button>
        </div>
      )}
    </div>
  );
}
