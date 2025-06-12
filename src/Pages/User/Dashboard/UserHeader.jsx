import { Link, useNavigate } from "react-router-dom";
import CartIcon from "../../../components/CartIcon";
import { Sidebar } from "./Sidebar";
import { useContext, useState } from "react";
import { AuthContext } from "../../../contexts/AuthContext";
import { FaBars } from "react-icons/fa";

export default function UserHeader() {
  const { currentUser } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const toggleSidebar = () => setIsOpen(!isOpen);

  const handleDashboard = () => {
    navigate("/profile");
  };

  console.log(" currentUser:", { currentUser });

  return (
    <header
      className="  border-b-2 flex w-full  justify-between bg-white items-center py-6  h-10"
      dir="rtl"
    >
      {" "}
      <div className="flex w-full mx-2 justify-between   ">
        <Link to="/" className="text-xl text-blue-600  ">
          فروشگاه
        </Link>
        <CartIcon className="m-auto " />
      </div>
      <div className="flex w-max items-center gap-4 ">
        <div className="flex w-max  gap-2">
          <Link
            to="/dashboard"
            className="text-gray-600 hover:text-blue-600 cursor-pointer"
            onClick={handleDashboard}
          >
            {currentUser.username || "کاربر ناشناس"}
          </Link>
          <button
            onClick={toggleSidebar}
            className="text-gray-600 hover:text-blue-600 p-1 rounded"
            title="باز کردن منو"
          >
            <FaBars className="w-5 h-5" />
          </button>
        </div>

        <Sidebar isOpen={isOpen} toggleSidebar={toggleSidebar} />
      </div>
    </header>
  );
}
