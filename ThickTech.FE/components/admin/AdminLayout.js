import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import Nav from "@/components/admin/Nav";
import Header from "@/components/admin/Header";
import { useState, useEffect, useRef } from "react";
import { Toaster } from "react-hot-toast";
import { usePathname } from "next/navigation";
import Spinner from "../Spinner";

export default function AdminLayout({ children }) {
  const { data: session, status } = useSession(); // Lấy trạng thái và session từ NextAuth
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const sidebarRef = useRef(null);

  // Toggle Sidebar
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  // Mở Sidebar khi pathname thay đổi
  useEffect(() => {
    toggleSidebar();
  }, [pathname]);

  // Đóng Sidebar khi nhấp bên ngoài
  useEffect(() => {
    function handleClickOutsideEvent(event) {
      if (sidebarRef.current && !sidebarRef?.current?.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutsideEvent);
    return () => {
      document.removeEventListener("mousedown", handleClickOutsideEvent);
    };
  }, []);

  // Kiểm tra session và quyền admin
  useEffect(() => {
    if (status === "unauthenticated" || !session) {
      router.push("/admin"); // Chuyển đến trang login nếu chưa đăng nhập
      return;
    }

    if (status === "authenticated" && !session?.isAdmin) {
      router.push("/404"); // Chuyển đến trang 404 nếu không phải admin
    }
  }, [status, session, router]);

  // Loading state
  if (status === "loading") {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <div className="text-center">
          <Spinner />
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-slate-200 min-h-screen w-full flex">
      {/* Sidebar */}
      <div className="flex">
        {/* Sidebar cho màn hình lớn */}
        <div className="hidden md:block">
          <Nav />
        </div>

        {/* Sidebar cho màn hình nhỏ */}
        <div
          ref={sidebarRef}
          className={`fixed md:hidden ease-in-out transition-all duration-400 z-50 
          ${isOpen ? "translate-x-0" : "-translate-x-[260px]"}`}
        >
          <Nav />
        </div>
      </div>

      {/* Main content */}
      <section className="flex-1 flex flex-col min-h-screen overflow-hidden">
        <Toaster position="top-center" reverseOrder={false} />
        <Header toggleSidebar={toggleSidebar} />
        <section className="pt-16 mt-2 flex-1 px-4 mb-4">{children}</section>
      </section>
    </div>
  );
}
