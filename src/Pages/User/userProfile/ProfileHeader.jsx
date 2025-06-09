export default function ProfileHeader({ fromPayment }) {
  return (
    <div className="text-right" dir="rtl">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">پروفایل کاربر</h1>
      {fromPayment && (
        <p className="text-red-500 bg-red-100 p-3 rounded-lg mb-4">
          برای ادامه پرداخت، لطفاً اطلاعات پروفایل خود را تکمیل کنید.
        </p>
      )}
    </div>
  );
}
