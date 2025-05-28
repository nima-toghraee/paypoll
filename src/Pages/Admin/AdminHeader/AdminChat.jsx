import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function AdminChat() {
  const { username } = useParams();
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [chatMessages, setChatMessages] = useState(
    JSON.parse(localStorage.getItem("chatMessages") || "[]")
  );

  useEffect(() => {
    localStorage.setItem("chatMessages", JSON.stringify(chatMessages));
  }, [chatMessages]);

  const filteredMessages = chatMessages.filter(
    (msg) =>
      (msg.sender === username && msg.receiver === "admin") ||
      (msg.sender === "admin" && msg.receiver === username)
  );

  const handleSendMessage = () => {
    if (!message.trim()) return;
    const newMessage = {
      id: Date.now(),
      text: message,
      sender: "admin",
      receiver: username,
      timestamp: new Date().toLocaleString("fa-IR"),
    };
    setChatMessages([...chatMessages, newMessage]);
    setMessage("");
  };

  const handleClose = () => navigate("/admin/users");

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center"
      dir="rtl"
    >
      <div className="bg-white p-6 rounded-lg w-full max-w-md shadow-xl">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-800">چت با {username}</h2>
          <button
            onClick={handleClose}
            className="text-gray-600 hover:text-gray-800"
          >
            ✕
          </button>
        </div>

        <div className="max-h-60 overflow-y-auto mb-4">
          {filteredMessages.length > 0 ? (
            filteredMessages.map((msg) => (
              <div
                key={msg.id}
                className={`p-2 mb-2 rounded-lg ${
                  msg.sender === "admin"
                    ? "bg-blue-100 text-right"
                    : "bg-gray-200 text-left"
                }`}
              >
                <p className="text-sm">{msg.text}</p>
                <p className="text-xs text-gray-500">{msg.timestamp}</p>
              </div>
            ))
          ) : (
            <p className="text-sm text-gray-600">پیامی وجود ندارد</p>
          )}
        </div>
        <div className="flex gap-2">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="پیام خود را بنویسید..."
            className="flex-1 p-2 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-600"
          />
          <button
            onClick={handleSendMessage}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            ارسال
          </button>
        </div>
      </div>
    </div>
  );
}
