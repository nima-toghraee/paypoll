import { useContext, useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../contexts/AuthContext";

export default function UserProfile() {
  const navigate = useNavigate();
  const { state } = useLocation(); // گرفتن state از navigate
  const { isLoggedIn, currentUser } = useContext(AuthContext);
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      name: "",
      phone: "",
      address: "",
      postalCode: "",
    },
  });

  // چک لاگین
  useEffect(() => {
    if (!isLoggedIn || !currentUser) {
      navigate("/user-login");
    }
  }, [isLoggedIn, currentUser, navigate]);

  // لود اطلاعات کاربر
  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const res = await fetch(
          `http://localhost:3002/users?username=${currentUser}`
        );
        const data = await res.json();
        if (data.length > 0) {
          setUserInfo(data[0]);
          reset({
            name: data[0].name || "",
            phone: data[0].phone || "",
            address: data[0].address || "",
            postalCode: data[0].postalCode || "",
          });
          // اگه اطلاعات کامل نیست یا از پرداخت اومده، به حالت ویرایش برو
          if (
            !data[0].name ||
            !data[0].phone ||
            !data[0].address ||
            !data[0].postalCode ||
            state?.fromPayment
          ) {
            setIsEditing(true);
          }
        } else {
          setError("کاربر یافت نشد");
        }
      } catch (err) {
        setError("خطا در بارگذاری اطلاعات");
        console.error("خطا:", err);
      } finally {
        setLoading(false);
      }
    };
    if (currentUser) {
      fetchUserInfo();
    }
  }, [currentUser, reset, state]);

  const onSubmit = async (data) => {
    try {
      const updatedUser = {
        ...userInfo,
        name: data.name,
        phone: data.phone,
        address: data.address,
        postalCode: data.postalCode,
      };
      const response = await fetch(
        `http://localhost:3002/users/${userInfo.id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updatedUser),
        }
      );
      const updatedData = await response.json();
      setUserInfo(updatedData);
      setIsEditing(false);
      alert("اطلاعات با موفقیت ذخیره شد");
      // اگه از پرداخت اومده، به پرداخت برگرد
      if (state?.fromPayment) {
        navigate("/payment");
      }
    } catch (err) {
      setError("خطا در ذخیره اطلاعات");
      console.error("خطا:", err);
    }
  };

  const onCancel = () => {
    if (window.confirm("آیا مطمئن هستید که می‌خواهید لغو کنید؟")) {
      reset({
        name: userInfo.name || "",
        phone: userInfo.phone || "",
        address: userInfo.address || "",
        postalCode: userInfo.postalCode || "",
      });
      setIsEditing(false);
      // اگه از پرداخت اومده، به پرداخت برگرد
      if (state?.fromPayment) {
        navigate("/payment");
      }
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  if (loading) {
    return <p className="text-center text-gray-600">در حال بارگذاری...</p>;
  }
  if (error) {
    return <p className="text-red-500 text-center">{error}</p>;
  }

  return (
    <div className="max-w-md mx-auto p-6 text-right" dir="rtl">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">پروفایل کاربر</h1>
      {state?.fromPayment && (
        <p className="text-red-500 bg-red-100 p-3 rounded-lg mb-4">
          برای ادامه پرداخت، لطفاً اطلاعات پروفایل خود را تکمیل کنید.
        </p>
      )}
      {isEditing ? (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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
              <p className="text-red-500 text-sm mt-1">
                {errors.phone.message}
              </p>
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
              <p className="text-red-500 text-sm mt-1">
                {errors.address.message}
              </p>
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
              onClick={onCancel}
              className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors"
            >
              لغو
            </button>
          </div>
        </form>
      ) : (
        <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
          <div className="space-y-4">
            <div>
              <span className="text-gray-600 font-medium">
                نام و نام خانوادگی:
              </span>
              <p className="text-gray-800">{userInfo.name || "وارد نشده"}</p>
            </div>
            <div>
              <span className="text-gray-600 font-medium">شماره تماس:</span>
              <p className="text-gray-800">{userInfo.phone || "وارد نشده"}</p>
            </div>
            <div>
              <span className="text-gray-600 font-medium">آدرس:</span>
              <p className="text-gray-800">{userInfo.address || "وارد نشده"}</p>
            </div>
            <div>
              <span className="text-gray-600 font-medium">کد پستی:</span>
              <p className="text-gray-800">
                {userInfo.postalCode || "وارد نشده"}
              </p>
            </div>
          </div>
          <div className="flex justify-end mt-6">
            <button
              onClick={handleEdit}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              ویرایش
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
