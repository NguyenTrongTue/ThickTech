import React, { useState } from "react";
import Sidebar from "@/components/admin/Sidebar/Nav";
import Header from "@/components/admin/Sidebar/Header";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { Toaster } from "react-hot-toast";
import Spinner from "../Spinner";
import { useRouter } from "next/router";

export default function DefaultLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { data: session, status } = useSession();
  const router = useRouter();
  // Kiểm tra quyền admin
  useEffect(() => {
    if (status === "authenticated") {
      // Giả sử thông tin quyền được lưu trong session.user.role
      if (!session.user || session.isAdmin === false) {
        router.replace("/403"); // Chuyển hướng tới trang lỗi nếu không phải admin
      }
    } else if (status === "unauthenticated") {
      router.replace("/auth/signin"); // Chuyển hướng tới trang login nếu không đăng nhập
    }
  }, [session, status, router]);

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
    <>
      <div className="flex w-full h-screen">
        <Toaster position="top-center" reverseOrder={false} />
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <div className="relative flex flex-1 flex-col lg:ml-[270px]">
          <Header
            sidebarOpen={sidebarOpen}
            setSidebarOpen={setSidebarOpen}
            session={session}
          />
          <main className="flex-1 bg-slate-200">
            <div className="mx-auto p-4 md:p-4 2xl:p-10">{children}</div>
          </main>
        </div>
      </div>
    </>
  );
}
