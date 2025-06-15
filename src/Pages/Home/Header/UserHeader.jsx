import { Link, useNavigate } from "react-router-dom";
import CartIcon from "../../../components/CartIcon";
import { Sidebar } from "../../User/Dashboard/Sidebar";
import { useContext, useState } from "react";
import { AuthContext } from "../../../contexts/AuthContext";
import { FaBars } from "react-icons/fa";
import { useCart } from "../../../contexts/CartContext";

export default function UserHeader() {
  const { currentUser } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const { cartCount } = useCart();

  const toggleSidebar = () => setIsOpen(!isOpen);

  const handleDashboard = () => {
    navigate("/profile");
  };

  // console.log(" currentUser:", { currentUser });

  return (
    <header
      className="sticky top-0 z-50 w-full px-4 py-2 sm:px-6 sm:py-3 bg-gradient-to-r from-cream-50 to-gray-100 shadow-sm border-b border-gray-200"
      dir="rtl"
    >
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        {" "}
        {/* لوگو یا نام فروشگاه */}
        <Link
          to="/"
          className="text-lg font-serif font-bold text-teal-600 hover:text-teal-700 transition-colors duration-300 mb-2 sm:mb-0"
        >
          فروشگاه
        </Link>
        <div className="flex flex-row-reverse  items-center gap-4 sm:gap-6 w-full sm:w-auto">
          {" "}
          {/* آیکون همبرگر */}
          <button
            onClick={toggleSidebar}
            className="text-gray-600 hover:text-teal-500 p-2 rounded-full hover:bg-gray-100 transition-all duration-300"
            title="باز کردن منو"
          >
            <FaBars className="w-6 h-6" />
          </button>
          {/* اسم کاربر */}
          <Link
            to="/dashboard"
            onClick={handleDashboard}
            className="text-gray-700 hover:text-teal-500 font-serif text-sm font-medium transition-colors duration-300"
          >
            {currentUser.username || "کاربر ناشناس"}
          </Link>
          {/* آیکون سبد خرید */}
          <div className="relative">
            <CartIcon className="text-gray-600 hover:text-teal-500 w-6 h-6 cursor-pointer" />{" "}
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 inline-flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-teal-500 rounded-full animate-pulse">
                {" "}
                {cartCount}
              </span>
            )}
          </div>
        </div>
        <Sidebar isOpen={isOpen} toggleSidebar={toggleSidebar} />
      </div>
    </header>
  );
}
