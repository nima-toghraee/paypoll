import { Link } from "react-router-dom";
import CartIcon from "../../../components/CartIcon";
import UserHeader from "./UserHeader";
import { useContext } from "react";
import { AuthContext } from "../../../contexts/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import SearchItems from "../Content/SearchItems";
import { SearchProvider } from "../../../contexts/SearchContext";
import { StorageContext } from "../../../contexts/StorageContext";

export default function Header() {
  const { isLoggedIn } = useContext(AuthContext);
  const { products } = useContext(StorageContext);

  return (
    <>
      {!isLoggedIn ? (
        <header className=" flex justify-between items-center px-4 py-3 sm:px-6 bg-white/80 backdrop-blur-md border-b border-gray-200 shadow-sm ">
          <Link
            to="/"
            className="text-lg font-bold text-teal-600 hover:text-teal-700 transition-colors"
          >
            فروشگاه
          </Link>
          <SearchItems />
          <div className="flex items-center gap-4 ">
            <Link
              to="/user-login"
              className="flex items-center gap-2 text-gray-600 hover:text-teal-600 transition-colors"
            >
              <FontAwesomeIcon icon={faUser} className="text-base" />
              <span className="text-sm">ورود / ثبت‌نام</span>
            </Link>
            <CartIcon className="w-5 h-5 text-gray-600 hover:text-teal-600 transition-colors" />
          </div>
        </header>
      ) : (
        <UserHeader />
      )}
    </>
  );
}
