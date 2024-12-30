import React, { createContext, useContext, useState, useEffect } from "react";
import Cookies from "js-cookie";

// Tạo context để cung cấp thông tin xác thực
const AuthContext = createContext();

// Provider để bao quanh ứng dụng và cung cấp trạng thái người dùng
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = Cookies.get("auth_token");
    if (token) {
      // Giả sử bạn có một API để lấy thông tin người dùng từ token
      fetchUserInfo(token);
    } else {
      setLoading(false);
    }
  }, []);

  const fetchUserInfo = async (token) => {
    // Gọi API để lấy thông tin người dùng từ token (ví dụ: JWT)
    try {
      const response = await fetch("/api/auth/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      if (data.user) {
        setUser(data.user);
      }
    } catch (error) {
      console.error("Failed to fetch user info:", error);
    } finally {
      setLoading(false);
    }
  };

  const login = (token) => {
    Cookies.set("auth_token", token, { expires: 7, secure: true });
    fetchUserInfo(token); // Sau khi login, lấy thông tin người dùng
  };

  const logout = () => {
    Cookies.remove("auth_token");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook để sử dụng context
export const useAuth = () => useContext(AuthContext);
