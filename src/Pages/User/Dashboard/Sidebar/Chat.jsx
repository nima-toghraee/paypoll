import { useEffect, useState } from "react";

export default function Chat() {
  const [chatOpen, setChatOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [chatMessages, setChatMessages] = useState(
    JSON.parse(localStorage.getItem("chatMessage") || "[]")
  );

  useEffect(() => {
    localStorage.setItem("chatMessages", JSON.stringify(chatMessages));
  }, [chatMessages]);

  const handleSendMessage = () => {
    if (!message.trim()) return;
    const newMessage = {
      id: Date.now(),
      text: message,
      sender: "user",
      timestamp: new Date().toLocaleString("fa-IR"),
    };
    setChatMessages([...chatMessages, newMessage]);
    setMessage("");
  };

  return (
    <div className="mt-4" dir="rtl">
      <button
        onClick={() => setChatOpen(!chatOpen)}
        className="w-full text-right text-gray-700 hover:text-blue-600"
      >
        چت با ادمین
      </button>
      {chatOpen && (
        <div className="mt-2 p-2 bg-gray-100 rounded-lg">
          <div className="max-h-40 overflow-y-auto mb-2">
            {chatMessages.length > 0 ? (
              chatMessages.map((msg) => (
                <div
                  key={msg.id}
                  className={`p-2 mb-1 rounded-lg ${
                    msg.sender === "user"
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
              className="flex-1 p-2 rounded-lg border border-gray-300"
            />
            <button
              onClick={handleSendMessage}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
            >
              ارسال
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
