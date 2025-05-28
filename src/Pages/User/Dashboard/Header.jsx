import { Link, useNavigate } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();
  const username = sessionStorage.getItem("currentUser") || "کاربر ناشناس";

  const handleLogout = () => {
    sessionStorage.clear();
    navigate("/user-login");
  };

  return (
    <header
      className="bg-white shadow-md p-4 flex justify-between items-center"
      dir="rtl"
    >
      {" "}
      <div className="flex items-center gap-4">
        <Link to="/" className="text-xl font-bold text-blue-600">
          فروشگاه
        </Link>
        <span className="text-gray-600">خوش آمدید، {username}</span>
      </div>
      <div className="flex items-center gap-4 pl-10">
        {" "}
        <Link to="/cart" className="text-gray-600 hover:text-blue-600">
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
            />
          </svg>
        </Link>
        <button
          onClick={handleLogout}
          className=" bg-red-600 text-white  px-4 py-2 rounded-lg hover:bg-red-700"
        >
          خروج
        </button>
      </div>
    </header>
  );
}
