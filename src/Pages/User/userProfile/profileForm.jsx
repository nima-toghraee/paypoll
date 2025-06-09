import { useForm } from "react-hook-form";

export default function ProfileForm({ userInfo, onSubmit, onCancel }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      name: userInfo?.name || "",
      phone: userInfo?.phone || "",
      address: userInfo?.address || "",
      postalCode: userInfo?.postalCode || "",
    },
  });

  const handleCancel = () => {
    onCancel(reset);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" dir="rtl">
      <div>
        <label className="block mb-1 text-sm font-medium text-gray-700">
          نام و نام خانوادگی
        </label>
        <input
          type="text"
          {...register("name", { required: "نام اجباری است" })}
          className="border border-gray-300 p-3 w-full rounded-lg text-right focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="نام و نام خانوادگی"
        />
        {errors.name && (
          <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
        )}
      </div>

      <div>
        <label className="block mb-1 text-sm font-medium text-gray-700">
          شماره تماس
        </label>
        <input
          type="tel"
          {...register("phone", {
            required: "شماره تلفن اجباری است",
            pattern: {
              value: /^09\d{9}$/,
              message: "شماره تلفن باید ۱۱ رقم و با ۰۹ شروع شود",
            },
          })}
          className="border border-gray-300 p-3 w-full rounded-lg text-right focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="09123456789"
        />
        {errors.phone && (
          <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>
        )}
      </div>

      <div>
        <label className="block mb-1 text-sm font-medium text-gray-700">
          آدرس
        </label>
        <input
          type="text"
          {...register("address", { required: "آدرس اجباری است" })}
          className="border border-gray-300 p-3 w-full rounded-lg text-right focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="آدرس کامل"
        />
        {errors.address && (
          <p className="text-red-500 text-sm mt-1">{errors.address.message}</p>
        )}
      </div>

      <div>
        <label className="block mb-1 text-sm font-medium text-gray-700">
          کد پستی
        </label>
        <input
          type="text"
          {...register("postalCode", {
            required: "کد پستی اجباری است",
            pattern: {
              value: /^\d{10}$/,
              message: "کد پستی باید ۱۰ رقم باشد",
            },
          })}
          className="border border-gray-300 p-3 w-full rounded-lg text-right focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="1234567890"
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
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          ذخیره
        </button>
        <button
          type="button"
          onClick={handleCancel}
          className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors"
        >
          لغو
        </button>
      </div>
    </form>
  );
}
