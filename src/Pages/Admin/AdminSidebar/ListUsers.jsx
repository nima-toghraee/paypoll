import { useState, useEffect } from "react";

export default function ListUsers() {
  const [users, setUsers] = useState(
    JSON.parse(localStorage.getItem("users") || "[]")
  );
  const [purchases, setPurchases] = useState(
    JSON.parse(localStorage.getItem("purchases") || "[]")
  );
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    console.log("Users:", users);
    console.log("Purchases:", purchases);
  }, [users, purchases]);

  const handleToggleShipped = (purchaseId) => {
    const updatedPurchases = purchases.map((purchase) =>
      purchase.id === purchaseId
        ? { ...purchase, isShipped: !purchase.isShipped }
        : purchase
    );
    setPurchases(updatedPurchases);
    localStorage.setItem("purchases", JSON.stringify(updatedPurchases));
  };

  return (
    <div className="max-w-5xl mx-auto p-6 text-right font-sans" dir="rtl">
      <h2 className="mb-5 font-semibold text-xl text-gray-800">
        کاربران ثبت‌نامی
      </h2>
      {users.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {users.map((user) => (
            <div
              key={user.username}
              onClick={() => setSelectedUser(user)}
              className="bg-white border border-gray-200 p-4 rounded-lg shadow-sm hover:shadow-md cursor-pointer transition-shadow duration-200"
            >
              <p className="font-medium">{user.username}</p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-700 font-medium">هیچ کاربری ثبت نشده است</p>
      )}

      {selectedUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg max-w-lg w-full text-right transform transition-transform duration-300">
            <h3 className="text-lg font-bold mb-4">
              اطلاعات کاربر: {selectedUser.username}
            </h3>
            <p className="text-gray-700">نام کاربری: {selectedUser.username}</p>
            <p className="text-gray-700">
              تلفن: {selectedUser.phone || "نامشخص"}
            </p>
            <p className="text-gray-700">
              آدرس: {selectedUser.address || "نامشخص"}
            </p>
            <p className="text-gray-700">
              کد پستی: {selectedUser.postalCode || "نامشخص"}
            </p>
            <h4 className="text-md font-semibold mt-4 mb-2">خریدها</h4>
            {purchases.filter((p) => p.user?.name === selectedUser.username)
              .length > 0 ? (
              <div className="overflow-x-auto">
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
                    {purchases
                      .filter((p) => p.user?.name === selectedUser.username)
                      .map((purchase) => (
                        <tr key={purchase.id} className="border-t">
                          <td className="p-2">{purchase.trackingCode}</td>
                          <td className="p-2">{purchase.product.name}</td>
                          <td className="p-2">
                            {purchase.product.price.toLocaleString("fa-IR")}{" "}
                            تومان
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
              </div>
            ) : (
              <p className="text-gray-700">هیچ خریدی یافت نشد.</p>
            )}
            <div className="flex justify-end mt-4">
              <button
                onClick={() => setSelectedUser(null)}
                className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600"
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
