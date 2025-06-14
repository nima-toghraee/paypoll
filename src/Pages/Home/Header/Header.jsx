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
        <div className="flex w-[100%]  justify-between ">
          <div className=" flex gap-4">
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
          </div>
          <div className="my-auto ">
            <CartIcon className=" " />
          </div>
        </div>
      ) : (
        <UserHeader />
      )}
    </>
  );
}
