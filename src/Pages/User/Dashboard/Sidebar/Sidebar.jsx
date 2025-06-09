import { useContext, useState } from "react";
import Chat from "./Chat";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../../contexts/AuthContext";

export default function Sidebar({ isOpen, toggleSidebar }) {
  const [chatOpen, setChatOpen] = useState(false);
  const navigate = useNavigate();
  const { logout } = useContext(AuthContext);

  const handleLogout = () => {
    logout();
    navigate("/user-login");
  };

  const handleProfile = () => {
    navigate("/profile");
    toggleSidebar();
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 h-full bg-white shadow-lg p-4 transform transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } w-64 z-40`}
        dir="rtl"
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-gray-800">ناوبری</h2>
          <button
            onClick={toggleSidebar}
            className="text-gray-600 hover:text-red-600 p-2 rounded bg-gray-100 hover:bg-red-100 transition-colors"
          >
            ✕
          </button>
        </div>

        <ul className="space-y-4">
          <li>
            <button
              onClick={() => setChatOpen(true)}
              className="block text-gray-600 hover:text-blue-600 w-full text-right"
            >
              چت با ادمین
            </button>
          </li>

          <li>
            <button
              onClick={handleProfile}
              className="block text-gray-600 hover:text-blue-600 w-full text-right"
            >
              پروفایل
            </button>
          </li>

          <li>
            <button
              onClick={handleLogout}
              className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 w-full"
            >
              خروج
            </button>
          </li>
        </ul>
      </nav>

      <Chat isOpen={chatOpen} onClose={() => setChatOpen(false)} />
    </>
  );
}
