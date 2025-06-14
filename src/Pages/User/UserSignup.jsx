import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { StorageContext } from "../../contexts/StorageContext";
import { faLock, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function UserSignup() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { addUser } = useContext(StorageContext);

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await addUser({ username, password });
      alert("ثبت‌نام با موفقیت انجام شد");
      navigate("/user-login");
    } catch (err) {
      setError(err.message || "خطایی در ثبت‌ نام رخ داد");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-white flex items-center justify-center p-4">
      {" "}
      <div
        className="bg-white/80 backdrop-blur-lg shadow-xl rounded-2xl lg:w-[32rem] w-full max-w-md p-8 text-right"
        dir="rtl"
      >
        {" "}
        <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center ">
          ثبت نام کاربر
        </h1>
        <form onSubmit={handleSignup} className="space-y-6 ">
          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              نام کاربری
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="نام کاربری را وارد کنید"
              className="w-full px-4 py-3 pr-10 text-right bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-400 hover:border-blue-300 hover:shadow-md transition-all duration-300 outline-none"
              required
            />
            <FontAwesomeIcon
              icon={faUser}
              className="absolute top-12 right-4 text-gray-400 text-sm transition-colors duration-200"
            />
          </div>

          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              رمز عبور
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder=" رمز عبور را وارد کنید"
              className="w-full px-4 py-3 pr-10 text-right bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-400 hover:border-blue-300 hover:shadow-md transition-all duration-300 outline-none"
              required
            />
            <FontAwesomeIcon
              icon={faLock}
              className="absolute top-12 right-4 text-gray-400 text-sm transition-colors duration-200"
            />
          </div>
          {error && (
            <p className="text-red-500 text-sm text-center animate-fade-in">
              {error}
            </p>
          )}

          <div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-3 rounded-lg font-medium hover:bg-blue-600 hover:scale-[1.02] focus:ring-4 focus:ring-blue-300 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "در حال ثبت..." : "ثبت‌نام"}
            </button>
          </div>
        </form>
        <div className="mt-6 text-center">
          <p className="text-gray-600 text-sm">
            {" "}
            حساب کاربری دارید؟{" "}
            <Link
              to="/user-login"
              className="text-blue-500 hover:text-blue-700 hover:underline transition-colors duration-200"
            >
              وارد شوید{" "}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
