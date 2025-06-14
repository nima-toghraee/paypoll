import { useLocation, useNavigate } from "react-router-dom";
import { useUserProfile } from "../../../contexts/useUserProfile";
import { useContext, useEffect } from "react";
import { AuthContext } from "../../../contexts/AuthContext";
import LoadingError from "../../../components/LoadingError";
import ProfileHeader from "./ProfileHeader";
import ProfileForm from "./profileForm";
import ProfileView from "./ProfileView";
import Header from "../../Home/Header/Header";

export default function UserProfile() {
  const { state } = useLocation(); // گرفتن state از navigate
  const navigate = useNavigate();
  const { isLoggedIn, currentUser, isAuthLoaded } = useContext(AuthContext);
  const { userInfo, loading, error, isEditing, setIsEditing, updateUserInfo } =
    useUserProfile(currentUser, isLoggedIn);

  const onSubmit = async (data) => {
    await updateUserInfo(data);
  };

  const onCancel = (reset) => {
    if (window.confirm("آیا مطمئن هستید که می‌خواهید لغو کنید؟")) {
      reset({
        name: userInfo?.name || "",
        phone: userInfo?.phone || "",
        address: userInfo?.address || "",
        postalCode: userInfo?.postalCode || "",
      });
      setIsEditing(false);
      if (state?.fromPayment) {
        navigate("/payment");
      }
    }
  };

  const onEdit = () => {
    setIsEditing(true);
  };
  return (
    <div className="min-h-screen bg-gray-100" dir="rtl">
      <header className="sticky top-0 z-10 w-[80%] mx-auto p-6 text-right max-w-screen-2xl sm:w-[90%] sm:p-4 bg-white shadow-md font-sans">
        <Header />
      </header>
      <div className="w-[90%] mx-auto p-4 sm:max-w-2xl sm:p-6">
        {" "}
        <div className="bg-white rounded-lg shadow-md p-6 sm:p-4 transition-all duration-300 hover:shadow-lg">
          <LoadingError loading={loading} error={error} />
          {!loading && !error && userInfo && (
            <>
              <ProfileHeader
                fromPayment={state?.fromPayment}
                className="mb-6 p-4 bg-gray-50 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300"
              />
              {isEditing ? (
                <ProfileForm
                  userInfo={userInfo}
                  onSubmit={onSubmit}
                  onCancel={onCancel}
                  className="p-4 bg-gray-50 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300"
                />
              ) : (
                <ProfileView
                  userInfo={userInfo}
                  onEdit={onEdit}
                  className="p-4 bg-gray-50 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300"
                />
              )}
            </>
          )}
          {!loading && !error && !userInfo && (
            <p className="text-red-600 text-center p-4 bg-red-50 rounded-lg shadow-sm animate-pulse">
              کاربر یافت نشد. لطفاً لاگین کنید.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
