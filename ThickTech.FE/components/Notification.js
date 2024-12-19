import { useState, useEffect } from "react";

export default function Notification({ type = "success", message = "" }) {
  const [visible, setVisible] = useState(true);
  const [timeLeft, setTimeLeft] = useState(4); // Thời gian đếm ngược bắt đầu từ 4 giây

  useEffect(() => {
    // Sử dụng setInterval để giảm thời gian mỗi giây
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(timer); // Dừng đồng hồ khi thời gian còn lại là 0
          setVisible(false); // Ẩn thông báo sau khi hết thời gian
        }
        return prevTime - 1;
      });
    }, 1000); // Chạy mỗi giây

    return () => clearInterval(timer); // Dọn dẹp khi component bị hủy
  }, []);

  if (!visible) return null;

  const typeStyles = {
    success: "bg-green-100 border-green-500 text-green-700",
    error: "bg-red-100 border-red-500 text-red-700",
    warning: "bg-yellow-100 border-yellow-500 text-yellow-700",
    info: "bg-blue-100 border-blue-500 text-blue-700",
  };

  return (
    <div className={`absolute top-4 right-4 z-[999] max-w-xs `}>
      <div
        className={`px-4 py-4 border rounded-lg shadow-lg transition-all duration-500 ease-in-out transform ${typeStyles[type]} border-l-4`}
      >
        <div className="flex items-start space-x-4 text-center">
          <div className="flex-1 text-sm font-medium flex flex-row gap-2">
            {message}
            <span className="text-red-500 text-[12px]">({timeLeft}s)</span>
          </div>
          <button
            className="text-lg font-bold text-gray-500 hover:text-gray-800 focus:outline-none m-0"
            onClick={() => setVisible(false)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-6 h-6"
            >
              <path d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
