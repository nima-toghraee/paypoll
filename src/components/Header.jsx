import { Link } from "react-router-dom";
import CartIcon from "./CartIcon";
import UserHeader from "../Pages/User/Dashboard/UserHeader";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";

export default function Header() {
  const { isLoggedIn } = useContext(AuthContext);

  return (
    <header
      className="flex gap-4 min-w-full justify-between border-b-2    mb-8        items-center"
      dir="rtl"
    >
      {!isLoggedIn ? (
        <div className="flex gap-4 ">
          <div>
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
          <div>
            <CartIcon className="m-auto " />
          </div>
        </div>
      ) : (
        <UserHeader />
      )}
    </header>
  );
}
