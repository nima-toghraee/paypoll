import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function AdminHeader() {
  const navigate = useNavigate();
  const username = localStorage.getItem("admin.username");
  const [showMessages, setShowMessages] = useState(false);

  let messages = [];
  try {
    messages = JSON.parse(localStorage.getItem("chatMessages") || "[]");
  } catch (error) {
    console.error("Error parsing chatMessages:", error);
  }
  console.log("Messages:", messages);

  const uniqueSenders = [...new Set(messages.map((msg) => msg.sender))]
    .filter((sender) => sender && sender !== "admin")
    .map((sender) => ({
      username: sender,
      lastMessage: messages
        .filter((msg) => msg.sender === sender || msg.receiver === sender)
        .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))[0]?.text,
    }));

  console.log("Unique Senders:", uniqueSenders);

  const handleLogout = () => {
    localStorage.removeItem("adminLoggedIn");
    localStorage.removeItem("adminUsername");
    navigate("/");
  };

  return (
    <header
      className="sticky w-full top-0 bg-white shadow-md p-4 flex justify-between items-center z-10"
      dir="rtl"
    >
      {" "}
      <div className="flex items-center gap-4">
        <Link to="/" className="text-xl font-bold text-blue-600">
          فروشگاه
        </Link>
        <span className="text-gray-600">خوش آمدید، {username}</span>
      </div>
      <div className="flex items-center gap-4 ">
        <button
          onClick={() => setShowMessages(true)}
          className="text-gray-600 hover:text-blue-600"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
            />
          </svg>
        </button>

        <button
          onClick={handleLogout}
          className=" bg-red-600 text-white  px-4 py-2 rounded-lg hover:bg-red-700"
        >
          خروج
        </button>
      </div>
      {showMessages && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg max-w-md w-full text-right transform transition-transform duration-300">
            <h3 className="text-lg font-bold mb-4">پیام‌ها</h3>
            {uniqueSenders.length > 0 ? (
              <div className="space-y-2">
                {uniqueSenders.map((sender) => (
                  <Link
                    key={sender.username}
                    to={`/admin/chat/${sender.username}`}
                    onClick={() => setShowMessages(false)}
                    className="block bg-gray-100 p-3 rounded-lg hover:bg-gray-200 transition-colors"
                  >
                    <p className="font-medium">{sender.username}</p>
                    <p className="text-sm text-gray-600 truncate">
                      {sender.lastMessage}
                    </p>
                  </Link>
                ))}
              </div>
            ) : (
              <p className="text-gray-700">هیچ پیامی یافت نشد.</p>
            )}
            <div className="flex justify-end mt-4">
              <button
                onClick={() => setShowMessages(false)}
                className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600"
              >
                بستن
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
