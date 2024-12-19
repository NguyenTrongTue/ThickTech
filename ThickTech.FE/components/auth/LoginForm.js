import { useRouter } from "next/router";
import { useSession, signIn } from "next-auth/react";
import { useEffect } from "react";
export default function LoginForm() {
  const { data: session, status } = useSession();
  const router = useRouter();

  // Chuyển hướng đến trang chủ khi đăng nhập thành công
  useEffect(() => {
    if (status === "authenticated") {
      router.push("/"); // Đường dẫn tới trang chủ
    }
  }, [status, router]);

  if (status === "loading") {
    // Hiển thị trạng thái đang tải
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <p className="text-gray-500">Loading...</p>
      </div>
    );
  }

  return (
    <div className="bg-gray-100 w-screen h-screen flex items-center justify-center">
      <button
        onClick={() => signIn("google")}
        className="bg-white text-gray-700 font-medium py-2 px-4 rounded-lg shadow-md hover:bg-gray-200 transition-transform transform hover:scale-105"
      >
        Login with Google
      </button>
    </div>
  );
}
