import { createContext, useContext, useState, useEffect } from "react";
import Cookies from "js-cookie"; // Import js-cookie để làm việc với cookies

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null); // Lưu thông tin user

  useEffect(() => {
    try {
      // Kiểm tra cookie xem có tồn tại thông tin người dùng không
      const savedUser = Cookies.get("user");
      if (savedUser) {
        setUser(JSON.parse(savedUser)); // Nếu có, set giá trị vào state
      }
    } catch (error) {
      console.error("Lỗi khi đọc thông tin từ cookie:", error);
      Cookies.remove("user"); // Xóa cookie nếu lỗi xảy ra
    }
  }, []);

  const login = (userData) => {
    try {
      Cookies.set("user", JSON.stringify(userData), { expires: 7 }); // Lưu thông tin vào cookie, hết hạn sau 7 ngày
      setUser(userData);
    } catch (error) {
      console.error("Lỗi khi lưu thông tin người dùng vào cookie:", error);
    }
  };

  const logout = () => {
    try {
      Cookies.remove("user"); // Xóa cookie khi đăng xuất
      setUser(null);
    } catch (error) {
      console.error("Lỗi khi xóa thông tin người dùng từ cookie:", error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
