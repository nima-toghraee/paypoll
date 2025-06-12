import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import { StorageContext } from "../../contexts/StorageContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock, faUnlock, faUser } from "@fortawesome/free-solid-svg-icons";

export default function UserLogin() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useContext(AuthContext);
  const { checkUser } = useContext(StorageContext);

  const handleLogin = async (e) => {
    e.preventDefault();
    console.log("username:", username);
    console.log("password:", password);
    console.log("checkUser:", checkUser);
    try {
      console.log("Calling checkUser...");
      const user = await checkUser(username, password);
      console.log("user returned:", user);
      console.log("Calling login...");
      login(user);
      console.log("Navigating...");
      navigate("/");
    } catch (err) {
      console.error("Error in handleLogin:", err);
      setError(err.message || "خطایی رخ داده است");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-blue-200 h-screen flex flex-col items-center justify-center gap-4">
      <div
        className="bg-white flex flex-col items-center   lg:w-[30%] w-[80%] h-2/5  p-4 text-right"
        dir="rtl"
      >
        <h1 className="text-xl font-bold  ">خوش آمدید </h1>
        <form onSubmit={handleLogin} className="space-y-4 w-full  ">
          <div className="relative">
            <label className="block mb-2">نام کاربری</label>
            <input
              type="text"
              value={username}
              placeholder="نام کاربری خود را وارد کنید"
              onChange={(e) => setUsername(e.target.value.toLowerCase())}
              className="border border-gray-300 p-2 pr-10 w-full rounded text-right hover:border-blue-500 hover:shadow-md hover:bg-blue-50 transition-all duration-200"
              required
              disabled={loading}
            />
            <FontAwesomeIcon
              icon={faUser}
              className="absolute top-11 right-3 text-gray-500"
            />
          </div>
          <div className="relative">
            <label className="block mb-2">رمز کاربری</label>
            <input
              type="password"
              value={password}
              placeholder="رمز ورود خود را وارد کنید"
              onChange={(e) => setPassword(e.target.value)}
              className="border border-gray-300 p-2 pr-10 w-full rounded text-right hover:border-blue-500 hover:shadow-md hover:bg-blue-50 transition-all duration-200"
              required
              disabled={loading}
            />
            <FontAwesomeIcon
              icon={faLock}
              className="absolute top-11 right-3 text-gray-500"
            />
          </div>
          {error && <p className="text-red-500">{error}</p>}
          <div className="flex gap-4">
            {" "}
            <button
              type="submit"
              disabled={loading}
              className="bg-blue-500 text-white w-full py-2 rounded-lg hover:bg-blue-600 transition-colors duration-200"
            >
              {loading ? "در حال ورود ..." : "ورود"}{" "}
            </button>
          </div>
        </form>
      </div>
      <div className=" text-right">
        <p className=" text-gray-600">
          هنوز ثبت‌نام نکرده‌اید؟{" "}
          <Link to="/user-signup" className="text-blue-600 hover:underline">
            اینجا ثبت‌نام کنید
          </Link>
        </p>
      </div>
    </div>
  );
}
