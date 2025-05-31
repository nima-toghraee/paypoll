import { Link, useNavigate } from "react-router-dom";
import CartIcon from "../../../components/CartIcon";
import { Sidebar } from "./Sidebar";
import { useContext } from "react";
import { AuthContext } from "../../../contexts/AuthContext";

export default function UserHeader() {
  const { currentUser } = useContext(AuthContext);

  return (
    <header
      className="bg-white w-max  shadow-md p-4 flex justify-between items-center"
      dir="rtl"
    >
      {" "}
      <div className="flex w-max items-center gap-4">
        <Link to="/" className="text-xl font-bold text-blue-600">
          فروشگاه
        </Link>
        <span className="text-gray-600">
          خوش آمدید، {currentUser || "کاربر ناشناس"}
        </span>
      </div>
      <div className="flex w-max items-center gap-4">
        <Sidebar />
      </div>
    </header>
  );
}
