import { createContext, useContext, useState, useEffect } from "react";
import Cookies from "js-cookie"; // Import js-cookie để làm việc với cookies

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null); // Lưu thông tin user

  useEffect(() => {
    // Kiểm tra cookie xem có tồn tại thông tin người dùng không
    const savedUser = Cookies.get("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser)); // Nếu có, set giá trị vào state
    }
  }, []);

  const login = (userData) => {
    Cookies.set("user", JSON.stringify(userData), { expires: 7 }); // Lưu thông tin vào cookie, hết hạn sau 7 ngày
    setUser(userData);
  };

  const logout = () => {
    Cookies.remove("user"); // Xóa cookie khi đăng xuất
    setUser(null);
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
