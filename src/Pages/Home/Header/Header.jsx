import { Link } from "react-router-dom";
import CartIcon from "../../../components/CartIcon";
import UserHeader from "./UserHeader";
import { useContext } from "react";
import { AuthContext } from "../../../contexts/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

export default function Header() {
  const { isLoggedIn } = useContext(AuthContext);

  return (
    <>
      {!isLoggedIn ? (
        <div className="flex items-center justify-between w-full px-6 py-4 bg-gray-50 shadow-sm">
          {" "}
          <Link
            to="/user-login"
            className="  px-5 py-1 flex gap-2 hover:scale-110 transition-transform duration-200"
          >
            <FontAwesomeIcon
              icon={faUser}
              className="text-lg m-auto hover:scale-110 transition-transform duration-200"
            />
            <span>ورود/ثبت‌نام</span>
          </Link>
          <div className="relative ">
            <CartIcon className="text-gray-700 hover:text-teal-500 w-6 h-6" />{" "}
          </div>
        </div>
      ) : (
        <UserHeader />
      )}
    </>
  );
}
