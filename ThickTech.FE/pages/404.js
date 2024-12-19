import React from "react";
import Link from "next/link";
import Image from "next/image";
import notFoundPage from "@/public/assets/error-404.png";

export const metadata = { title: "Not found | My Website" };

export default function NotFound() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="flex flex-col items-center max-w-md space-y-6">
        <div>
          <Image src={notFoundPage} width={200} height={200} alt="404" />
        </div>
        <h1 className="text-3xl font-semibold text-center">
          404: Không tìm thấy trang này 🤷‍♂️
        </h1>
        <p className="text-gray-600 text-center">
          Trang bạn đang tìm không tồn tại hoặc đã bị xóa.
        </p>
        <Link href="/">
          <div className="inline-flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded hover:bg-blue-700">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Go back to home
          </div>
        </Link>
      </div>
    </div>
  );
}
