import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import { StorageContext } from "../../contexts/StorageContext";

export default function AdminLogin() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useContext(AuthContext);
  const { checkAdmin } = useContext(StorageContext);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await checkAdmin(username.trim(), password.trim());
      login(username.trim());
      navigate("/admin");
    } catch (err) {
      setError(err.message || "خطایی رخ داده است");
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => navigate("/");

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
            required
            disabled={loading}
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
            required
            disabled={loading}
          />
        </div>
        {error && <p className="text-red-500">{error}</p>}

        <div>
          <button
            type="submit"
            disabled={loading}
            className={`bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {loading ? "در حال ورود ..." : "ورود"}
          </button>
          <button
            type="button"
            onClick={handleBack}
            disabled={loading}
            className={`bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700 ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            بازگشت
          </button>
        </div>
      </form>
    </div>
  );
}
