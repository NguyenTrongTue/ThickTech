import { useSession, signIn } from "next-auth/react";
import { useRouter } from "next/router";
import Nav from "@/components/admin/Nav";
import Header from "@/components/admin/Header";
import { useState, useEffect } from "react";
import { AuthProvider } from "@/components/auth/AuthContext";

export default function Layout({ children }) {
  const [showNav, setShowNav] = useState(false);
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "loading") return; // Đợi trạng thái tải xong

    if (!session) {
      // Nếu chưa đăng nhập, chuyển đến trang not found
      router.push("/404");
      return;
    }

    if (!session.isAdmin) {
      router.push("/404"); // Nếu không phải admin, điều hướng đến trang 404
    }
  }, [status, session, router]);

  if (status === "loading" || !session) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <div className="text-center">
          <p className="text-gray-500">Loading...</p>
        </div>
      </div>
    );
  }

  if (session.isAdmin) {
    return (
      <AuthProvider>
        <div className="bg-slate-200 min-h-screen w-full flex">
          <div className="flex">
            <Nav show={showNav} setShowNav={setShowNav} />
          </div>
          <div className="flex flex-col flex-1">
            <Header session={session} setShowNav={setShowNav} />
            <div className="m-4 mt-5 flex-1">{children}</div>
          </div>
        </div>
      </AuthProvider>
    );
  }
}
