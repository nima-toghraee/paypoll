import { Link } from "react-router-dom";
import CartIcon from "./CartIcon";
import UserHeader from "../Pages/User/Dashboard/UserHeader";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";

export default function Header() {
  const { isLoggedIn } = useContext(AuthContext);

  return (
    <header className="flex gap-4 w-full mb-8 items-center" dir="rtl">
      {!isLoggedIn ? (
        <div className="flex gap-4 ">
          <Link
            to="/user-login"
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            ورود
          </Link>
          <Link
            to="/user-signup"
            className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700"
          >
            ثبت‌نام
          </Link>
        </div>
      ) : (
        <UserHeader />
      )}

      <CartIcon className="mr-auto" />
    </header>
  );
}
