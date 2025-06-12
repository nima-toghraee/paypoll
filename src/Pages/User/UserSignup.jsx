import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { StorageContext } from "../../contexts/StorageContext";

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
    <div className="bg-blue-200 h-screen flex flex-col items-center justify-center gap-4">
      <div
        className="bg-white flex flex-col items-center   lg:w-[30%] w-[80%] h-2/5  p-4 text-right"
        dir="rtl"
      >
        {" "}
        <h1 className="text-xl font-bold ">ثبت نام کاربر</h1>
        <form onSubmit={handleSignup} className="space-y-4 w-full ">
          <div>
            <label className="block mb-2">نام کاربری</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="نام کاربری را وارد کنید"
              className="border border-gray-300 p-2 w-full rounded text-right hover:border-blue-500 hover:shadow-md hover:bg-blue-50 transition-all duration-200"
              required
            />
          </div>

          <div>
            <label className="block mb-2">رمز عبور</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder=" رمز عبور را وارد کنید"
              className="border border-gray-300 p-2 w-full rounded text-right hover:border-blue-500 hover:shadow-md hover:bg-blue-50 transition-all duration-200"
              required
            />
          </div>
          {error && <p className="text-red-500">{error}</p>}

          <div className="flex gap-4">
            <button
              type="submit"
              className="bg-blue-500 text-white w-full py-2 rounded-lg hover:bg-blue-600 transition-colors duration-200"
            >
              {loading ? "در حال ثبت..." : "ثبت‌نام"}
            </button>
          </div>
        </form>
      </div>
      <div className=" text-right">
        <p className=" text-gray-600">
          حساب کاربری دارید؟{" "}
          <Link to="/user-login" className="text-blue-600 hover:underline">
            وارد شوید{" "}
          </Link>
        </p>
      </div>
    </div>
  );
}
