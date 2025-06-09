import { useLocation } from "react-router-dom";
import { useUserProfile } from "../../../contexts/useUserProfile";
import { useContext } from "react";
import { AuthContext } from "../../../contexts/AuthContext";
import Header from "../../../components/Header";
import LoadingError from "../../../components/LoadingError";
import ProfileHeader from "./ProfileHeader";
import ProfileForm from "./profileForm";
import ProfileView from "./ProfileView";

export default function UserProfile() {
  const { state } = useLocation(); // گرفتن state از navigate
  const { isLoggedIn, currentUser } = useContext(AuthContext);
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
    <div className="font-sans">
      <div className="w-[80%] sm:w-[90%] mx-auto p-6 max-w-7xl sm:p-4">
        <Header />
      </div>
      <div className="max-w-md mx-auto p-6" dir="rtl">
        <LoadingError loading={loading} error={error} />
        {!loading && !error && (
          <>
            <ProfileHeader fromPayment={state?.fromPayment} />
            {isEditing ? (
              <ProfileForm
                userInfo={userInfo}
                onSubmit={onSubmit}
                onCancel={onCancel}
              />
            ) : (
              <ProfileView userInfo={userInfo} onEdit={onEdit} />
            )}
          </>
        )}
      </div>
    </div>
  );
}
