import { useEffect, useState } from "react";

export default function Chat({ isOpen, onClose }) {
  const [message, setMessage] = useState("");
  const [chatMessages, setChatMessages] = useState(
    JSON.parse(localStorage.getItem("chatMessages") || "[]")
  );

  useEffect(() => {
    localStorage.setItem("chatMessages", JSON.stringify(chatMessages));
  }, [chatMessages]);

  const handleSendMessage = () => {
    if (!message.trim()) return;
    const currentUser = localStorage.getItem("currentUser") || "user";
    const newMessage = {
      id: Date.now(),
      text: message,
      sender: currentUser,
      receiver: "admin",
      timestamp: new Date().toLocaleString("fa-IR"),
    };
    setChatMessages([...chatMessages, newMessage]);
    setMessage("");
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center"
      dir="rtl"
    >
      <div className="bg-white p-6 rounded-lg w-full max-w-md shadow-xl">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-800">چت با ادمین</h2>
          <button
            onClick={onClose}
            className="text-gray-600 hover:text-gray-800"
          >
            ✕
          </button>
        </div>

        <div className="max-h-60 overflow-y-auto mb-4">
          {chatMessages.length > 0 ? (
            chatMessages.map((msg) => (
              <div
                key={msg.id}
                className={`p-2 mb-2 rounded-lg ${
                  msg.sender === localStorage.getItem("currentUser")
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
