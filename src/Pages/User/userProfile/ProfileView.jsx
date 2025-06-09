export default function ProfileView({ userInfo, onEdit }) {
  return (
    <div
      className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm"
      dir="rtl"
    >
      <div className="space-y-4">
        <div>
          <span className="text-gray-600 font-medium">نام و نام خانوادگی:</span>
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
          <p className="text-gray-800">{userInfo.postalCode || "وارد نشده"}</p>
        </div>
      </div>
      <div className="flex justify-end mt-6">
        <button
          onClick={onEdit}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          ویرایش
        </button>
      </div>
    </div>
  );
}
