import { useState, useEffect, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { api } from "../../Api/Api";
import { AuthContext } from "../AuthContext";

export function useUserProfile(currentUser, isLoggedIn) {
  const navigate = useNavigate();
  const { isAuthLoaded } = useContext(AuthContext);
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  // چک لاگین
  useEffect(() => {
    if (isAuthLoaded && (!isLoggedIn || !currentUser?.username)) {
      navigate("/user-login");
    }
  }, [isLoggedIn, currentUser, navigate]);

  // لود اطلاعات کاربر
  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const res = await api.get(`/users?username=${currentUser.username}`);
        if (res.data.length > 0) {
          setUserInfo(res.data[0]);
          // اگه اطلاعات کامل نیست یا از پرداخت اومده، به حالت ویرایش برو
          if (
            !res.data[0].name ||
            !res.data[0].phone ||
            !res.data[0].address ||
            !res.data[0].postalCode
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
    if (currentUser?.username) {
      fetchUserInfo();
    }
  }, [currentUser]);

  const updateUserInfo = async (data) => {
    try {
      const updatedUser = {
        ...userInfo,
        name: data.name,
        phone: data.phone,
        address: data.address,
        postalCode: data.postalCode,
      };
      const response = await api.put(`/users/${userInfo.id}`, updatedUser);
      setUserInfo(response.data);
      setIsEditing(false);
      alert("اطلاعات با موفقیت ذخیره شد");

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
