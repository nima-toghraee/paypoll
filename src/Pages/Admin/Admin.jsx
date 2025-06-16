import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminSidebar from "./AdminSidebar/AdminSidebar";
import AdminHeader from "./AdminHeader/AdminHeader";
import UserDetailsPopup from "./UserDetailsPopup";
import { AuthContext } from "../../contexts/AuthContext";
import { useAdminOrders } from "../../contexts/hooks/useAdminOrders";

export default function Admin() {
  const navigate = useNavigate();
  const { isLoggedIn, currentUser } = useContext(AuthContext);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const { userList, loading, error } = useAdminOrders(searchTerm);

  useEffect(() => {
    if (!isLoggedIn || currentUser !== "admin") {
      navigate("/admin-login");
    }
  }, [isLoggedIn, navigate, currentUser]);

  if (loading) {
    return <p className="text-center text-gray-600">در حال بارگذاری...</p>;
  }

  if (error) {
    return <p className="text-red-500 text-center">{error}</p>;
  }

  return (
    <div className="w-5xl mx-auto p-6 text-right font-sans" dir="rtl">
      <AdminSidebar />
      <div className="flex justify-between items-center w- mb-8 ml-8">
        <AdminHeader />
      </div>

      {/* جستجو */}
      <div className="mb-8">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          جستجو کدپیگیری
        </label>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="کد پیگیری را وارد کنید"
          className="w-6/12 p-3 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 text-left"
        />
      </div>

      {/* لیست کاربران */}
      <div>
        <h2 className="mb-5 font-semibold text-xl text-gray-800">کاربران</h2>
        {userList.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {userList.map((user) => (
              <div
                key={user.id}
                onClick={() => setSelectedUser(user)}
                className="bg-white border border-gray-200 p-4 rounded-lg shadow-sm hover:shadow-md cursor-pointer transition-shadow duration-200"
              >
                <p>{user.name}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-700 font-medium">
            {searchTerm
              ? "هیچ سفارشی با این کد پیگیری یافت نشد"
              : "هیچ کاربری با خرید ثبت‌شده یافت نشد."}{" "}
          </p>
        )}
      </div>

      {/* پاپ‌آپ اطلاعات کاربر */}
      {selectedUser && (
        <UserDetailsPopup
          user={selectedUser}
          onClose={() => setSelectedUser(null)}
        />
      )}
    </div>
  );
}
