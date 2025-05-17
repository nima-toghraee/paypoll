import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AdminLogin() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    const validUsername = "admin";
    const validPassword = "123456";

    if (username === validUsername && password === validPassword) {
      localStorage.setItem("adminLoggedIn", "true");
      navigate("/admin");
    } else {
      setError("نام کاربری یا رمز ورود اشتباه است");
    }
  };

  return (
    <div className="max-w-md mx-auto p-4 text-right" dir="rtl">
      <h1 className="text-xl font-bold mb-4">ورود ادمین</h1>
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
        </div>
      </form>
    </div>
  );
}
