import React from "react";
import { useAuth } from "@/path/to/AuthProvider";

export default function AuthButton() {
  const { user, login, logout } = useAuth(); // Lấy thông tin từ context

  return (
    <div>
      {user ? (
        <button
          onClick={logout}
          className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
        >
          Đăng xuất
        </button>
      ) : (
        <button
          onClick={() =>
            login({ name: "Người dùng demo", email: "demo@example.com" })
          }
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          Đăng nhập
        </button>
      )}
    </div>
  );
}
