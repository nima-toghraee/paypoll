import { useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

export default function UserInfo() {
  const { state } = useLocation();
  const product = state?.product;
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      phone: "",
      address: "",
      postalCode: "",
    },
  });

  const onSubmit = (data) => {
    console.log("اطلاعات خرید:", { product, user: data });
    // هدایت به سایت پرداخت فرضی
    window.location.href = "https://example.com/payment";
  };

  const onCancel = () => {
    if (window.confirm("آیا مطمئن هستید که می‌خواهید لغو کنید؟")) {
      navigate("/");
    }
  };

  return (
    <div className="max-w-md mx-auto p-4 text-right" dir="rtl">
      <h1 className="text-xl font-bold mb-4">تکمیل اطلاعات خرید </h1>
      {product ? (
        <>
          <div className="space-y-2 border border-gray-200 p-4 rounded">
            <p className="text-gray-700">نام: {product.name}</p>
            <p className="text-gray-700">
              قیمت: {product.price.toLocaleString("fa-IR")} تومان
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-4">
              <label className="block mb-2">نام و نام خانوادگی</label>
              <input
                {...register("name", { required: "نام اجباری است" })}
                className="border border-gray-300 p-2 w-full rounded text-right"
                placeholder="نام و نام خانوادگی"
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.name.message}
                </p>
              )}
            </div>

            <div className="mb-4">
              <label className="block mb-2">شماره تلفن </label>
              <input
                type="tel"
                {...register("phone", {
                  required: "شماره تلفن اجباری است",
                  pattern: {
                    value: /^09\d{9}$/,
                    message: "شماره تلفن باید ۱۱ رقم و با ۰۹ شروع شود",
                  },
                })}
                className="border border-gray-300 p-2 w-full rounded text-right"
                placeholder="09123456789"
              />
              {errors.phone && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.phone.message}
                </p>
              )}
            </div>

            <div className="mb-4">
              <label className="block mb-2">آدرس</label>
              <input
                {...register("address", { required: "آدرس اجباری است" })}
                className="border border-gray-300 p-2 w-full rounded text-right"
                placeholder="آدرس کامل"
              />
              {errors.address && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.address.message}
                </p>
              )}
            </div>

            <div className="mb-4">
              <label className="block mb-2">کد</label>
              <input
                {...register("postalCode", {
                  required: "کدپستی اجباری است",
                  pattern: {
                    value: /^\d{10}$/,
                    message: "کد پستی باید ۱۰ رقم باشد",
                  },
                })}
                className="border border-gray-300 p-2 w-full rounded text-right"
                placeholder="1234567890 "
              />
              {errors.postalCode && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.postalCode.message}
                </p>
              )}
            </div>

            <div className="flex justify-end gap-2">
              <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                پرداخت
              </button>
              <button
                type="button"
                onClick={onCancel}
                className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
              >
                کنسل
              </button>
            </div>
          </form>
        </>
      ) : (
        <p className="text-red-500">محصولی انتخاب نشده</p>
      )}
    </div>
  );
}
