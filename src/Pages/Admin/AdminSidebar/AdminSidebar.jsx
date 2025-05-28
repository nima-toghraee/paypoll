import { useState } from "react";
import { Link } from "react-router-dom";

export default function AdminSidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);

  const toggleSidebar = () => setIsOpen(!isOpen);

  return (
    <>
      <button
        onClick={toggleSidebar}
        className="fixed top-10 left-4 z-50 bg-blue-600 text-white p-2 rounded-lg md:block"
      >
        ☰
      </button>
      <nav
        className={`fixed top-0 left-0 h-full bg-white shadow-lg p-4 transform transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } w-64 z-40`}
        dir="rtl"
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-gray-800">ناوبری</h2>
          <button onClick={toggleSidebar} className="md:hidden text-gray-600">
            ✕
          </button>
        </div>

        <ul className="space-y-4">
          <li>
            <Link to="/admin/users">کاربران</Link>
          </li>
        </ul>
      </nav>

      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
          onClick={toggleSidebar}
        />
      )}
    </>
  );
}
