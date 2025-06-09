import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

export function useUserProfile(currentUser, isLoggedIn) {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isEditing, setIsEditing] = useState(false);

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
  }, [currentUser, state]);

  const updateUserInfo = async (data) => {
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
      if (state?.fromPayment) {
        navigate("/payment");
      }
      return true;
    } catch (err) {
      setError("خطا در ذخیره اطلاعات");
      console.error("خطا:", err);
      return false;
    }
  };

  return {
    userInfo,
    loading,
    error,
    isEditing,
    setIsEditing,
    updateUserInfo,
  };
}
