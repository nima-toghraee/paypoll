import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import { StorageContext } from "../../contexts/StorageContext";

export default function UserLogin() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useContext(AuthContext);
  const { users } = useContext(StorageContext);

  const handleLogin = (e) => {
    e.preventDefault();

    const isValid = users.some(
      (user) => user.username === username && user.password === password
    );

    if (isValid) {
      login(username);
      navigate("/");
    } else {
      setError("نام کاربری یا رمز ورود اشتباه است");
    }
  };

  const handleBack = () => navigate("/user-signup");

  return (
    <div className="max-w-md mx-auto p-4 text-right" dir="rtl">
      <h1 className="text-xl font-bold mb-4">ورود کاربر</h1>
      <form onSubmit={handleLogin} className="space-y-4">
        <div>
          <label className="block mb-2">اسم کاربری</label>
          <input
            type="text"
            value={username}
            placeholder="نام کاربری خود را وارد کنید"
            onChange={(e) => setUsername(e.target.value)}
            className="border border-gray-300 p-2 w-full rounded text-right"
          />
        </div>
        <div>
          <label className="block mb-2">رمز کاربری</label>
          <input
            type="password"
            value={password}
            placeholder="رمز ورود خود را وارد کنید"
            onChange={(e) => setPassword(e.target.value)}
            className="border border-gray-300 p-2 w-full rounded text-right"
          />
        </div>
        {error && <p className="text-red-500">{error}</p>}
        <div>
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            ورود
          </button>
          <button
            type="button"
            onClick={handleBack}
            className="w-full bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors duration-200"
          >
            ثبت‌ نام
          </button>
        </div>
      </form>
    </div>
  );
}
