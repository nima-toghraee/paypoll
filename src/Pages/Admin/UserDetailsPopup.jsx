export default function UserDetailsPopup({ user, onClose }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg max-w-lg w-full text-right">
        <h3 className="text-lg font-bold mb-4">اطلاعات کاربر: {user.name}</h3>
        <p className="text-gray-700">نام: {user.name}</p>
        <p className="text-gray-700">تلفن: {user.phone || "نامشخص"}</p>
        <p className="text-gray-700">آدرس: {user.address || "نامشخص"}</p>
        <p className="text-gray-700">کد پستی: {user.postalCode || "نامشخص"}</p>
        <h4 className="text-md font-semibold mt-4 mb-2">سفارش‌ها</h4>
        {user.orders.length > 0 ? (
          <table className="w-full text-right">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-2">کد پیگیری</th>
                <th className="p-2">محصول</th>
                <th className="p-2">قیمت</th>
                <th className="p-2">تاریخ</th>
              </tr>
            </thead>
            <tbody>
              {user.orders.map((order) => (
                <tr key={order.id} className="border-t">
                  <td className="p-2">{order.trackingCode}</td>
                  <td className="p-2">
                    {order.items.map((item) => item.name).join(", ")}
                  </td>
                  <td className="p-2">
                    {order.totalPrice.toLocaleString("fa-IR")} تومان
                  </td>
                  <td className="p-2">
                    {new Date(order.date).toLocaleDateString("fa-IR")}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-gray-700">هیچ سفارشی یافت نشد.</p>
        )}
        <div className="flex justify-end mt-4">
          <button
            onClick={onClose}
            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
          >
            بستن
          </button>
        </div>
      </div>
    </div>
  );
}
