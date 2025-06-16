// UserHeader.jsx
import { Link, useLocation, useNavigate } from "react-router-dom";
import CartIcon from "../../../components/CartIcon";
import { Sidebar } from "../../User/Dashboard/Sidebar";
import { useContext, useState } from "react";
import { AuthContext } from "../../../contexts/AuthContext";
import { FaBars } from "react-icons/fa";
import { useCart } from "../../../contexts/CartContext";
import SearchItems from "../Content/SearchItems";

export default function UserHeader() {
  const { currentUser } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const { cartCount } = useCart();
  const location = useLocation();

  const toggleSidebar = () => setIsOpen(!isOpen);
  const handleDashboard = () => navigate("/profile");

  const isCartPage = location.pathname === "/cart";

  return (
    <header
      className="w-full px-4 py-3 sm:px-6 bg-white/80 backdrop-blur-md border-b border-gray-200 shadow-sm "
      dir="rtl"
    >
      <div className="flex justify-between items-center max-w-7xl mx-auto">
        <Link
          to="/"
          className="text-lg font-bold text-teal-600 hover:text-teal-700 transition-colors"
        >
          فروشگاه
        </Link>

        <div className="w-[60%]">
          <SearchItems />
        </div>

        <div className="flex items-center gap-5">
          <Link
            to="/dashboard"
            onClick={handleDashboard}
            className="text-sm text-gray-700 hover:text-teal-600 transition-colors hidden sm:block"
          >
            {currentUser.username || "کاربر"}
          </Link>

          {!isCartPage && (
            <div className="relative hidden sm:block">
              <CartIcon className="w-5 h-5 text-gray-600 hover:text-teal-600 transition-colors " />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-teal-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center animate-pulse">
                  {cartCount}
                </span>
              )}
            </div>
          )}

          <button
            onClick={toggleSidebar}
            className="p-2 rounded-full text-gray-600 hover:text-teal-600 hover:bg-gray-100 transition-all"
            title="منو"
          >
            <FaBars className="w-5 h-5" />
          </button>
        </div>
        <Sidebar isOpen={isOpen} toggleSidebar={toggleSidebar} />
      </div>
    </header>
  );
}
