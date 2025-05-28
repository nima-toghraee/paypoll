import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminSidebar from "./AdminSidebar/AdminSidebar";
import AdminHeader from "./AdminHeader/AdminHeader";

export default function Admin() {
  const navigate = useNavigate();
  const [purchases, setPurchases] = useState(
    JSON.parse(localStorage.getItem("purchases") || "[]")
  );
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const isLoggedIn = localStorage.getItem("adminLoggedIn") === "true";

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/admin-login");
    }
  }, [isLoggedIn, navigate]);

  const handleToggleShipped = (purchaseId) => {
    const updatedPurchases = purchases.map((purchase) =>
      purchase.id === purchaseId
        ? { ...purchase, isShipped: !purchase.isShipped }
        : purchase
    );
    setPurchases(updatedPurchases);
    localStorage.setItem("purchases", JSON.stringify(updatedPurchases));
  };

  const filteredPurchases = purchases.filter(
    (purchase) =>
      purchase &&
      purchase.trackingCode &&
      purchase.trackingCode.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const users = [
    ...new Set(
      filteredPurchases
        .filter((purchase) => purchase && purchase.user && purchase.user.name)
        .map((purchase) => purchase?.user?.name)
        .filter(Boolean)
    ),
  ].map((name) => ({
    name,
    purchases: filteredPurchases.filter((p) => p.user?.name === name),
  }));

  return (
    <div className="max-w-5xl mx-auto p-6 text-right font-sans" dir="rtl">
      <AdminSidebar />
      <div className="flex justify-between items-center mb-8 ml-8">
        <AdminHeader />
      </div>

      {/* search code  */}
      <div className="mb-8 ">
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

      {/* list users */}
      <div>
        <h2 className="mb-5 font-semibold text-xl text-gray-800 ">کاربران</h2>
        {users.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {users.map((user) => (
              <div
                key={user.name}
                onClick={() => setSelectedUser(user)}
                className="bg-white border border-gray-200 p-4 rounded-lg shadow-sm hover:shadow-md cursor-pointer transition-shadow duration-200"
              >
                <p>{user.name}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-700 font-medium">هیچ خریدی ثبت نشده است</p>
        )}
      </div>

      {/* popup info of user */}

      {selectedUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg max-w-lg w-full text-right">
            <h3 className="text-lg font-bold mb-4">
              اطلاعات کاربر: {selectedUser.name}
            </h3>
            <p className="text-gray-700">نام: {selectedUser.name}</p>
            <p className="text-gray-700">
              تلفن: {selectedUser.purchases[0]?.user.phone || "نامشخص"}
            </p>
            <p className="text-gray-700">
              آدرس: {selectedUser.purchases[0]?.user.address || "نامشخص"}
            </p>
            <p className="text-gray-700">
              کد پستی: {selectedUser.purchases[0]?.user.postalCode || "نامشخص"}
            </p>
            <h4 className="text-md font-semibold mt-4 mb-2">خریدها</h4>
            {selectedUser.purchases.length > 0 ? (
              <table className="w-full text-right">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="p-2">کد پیگیری</th>
                    <th className="p-2">محصول</th>
                    <th className="p-2">قیمت</th>
                    <th className="p-2">تاریخ</th>
                    <th className="p-2">ارسال‌شده</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedUser.purchases.map((purchase) => (
                    <tr key={purchase.id} className="border-t">
                      <td className="p-2">{purchase.trackingCode}</td>
                      <td className="p-2">{purchase.product.name}</td>
                      <td className="p-2">
                        {purchase.product.price.toLocaleString("fa-IR")} تومان
                      </td>
                      <td className="p-2">{purchase.date}</td>
                      <td className="p-2">
                        <input
                          type="checkbox"
                          checked={purchase.isShipped || false}
                          onChange={() => handleToggleShipped(purchase.id)}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p className="text-gray-700">هیچ خریدی یافت نشد.</p>
            )}
            <div className="flex justify-end mt-4">
              <button
                onClick={() => setSelectedUser(null)}
                className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
              >
                بستن
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
