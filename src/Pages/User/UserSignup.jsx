import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { StorageContext } from "../../contexts/StorageContext";

export default function UserSignup() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { users, addUser } = useContext(StorageContext);

  const handleSignup = (e) => {
    e.preventDefault();

    if (users.some((user) => user.username === username)) {
      setError("این نام کاربری قبلا ثبت نام شده است");
      return;
    }

    addUser({ username, password });
    alert("ثبت نام با موفقیت انجام شد");
    navigate("/user-login");
  };

  const handleBack = () => navigate("/user-login");

  return (
    <div className="max-w-md mx-auto p-6 text-right font-sans" dir="rtl">
      <h1 className="text-2xl font-bold text-gray-800 mb-8">ثبت نام کاربر</h1>
      <form onSubmit={handleSignup} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            نام کاربری
          </label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="نام کاربری را وارد کنید"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-right"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            رمز عبور
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder=" رمز عبور را وارد کنید"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-right"
            required
          />
        </div>
        {error && <p className="text-red-600 text-sm">{error}</p>}

        <div className="flex gap-4">
          <button
            type="submit"
            className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200"
          >
            ثبت‌نام
          </button>
          <button
            type="button"
            onClick={handleBack}
            className="w-full bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors duration-200"
          >
            ورود
          </button>
        </div>
      </form>
    </div>
  );
}
