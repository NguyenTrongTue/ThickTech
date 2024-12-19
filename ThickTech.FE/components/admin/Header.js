import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import Logo from "@/components/Logo";

export default function Header({ session, setShowNav }) {
  return (
    <div className="flex items-center justify-between lg:justify-end md:justify-end shadow-lg p-4">
      {/* Nút mở Nav */}
      <button
        onClick={() => setShowNav(true)}
        className="text-gray-700 hover:text-gray-900 transition md:hidden lg:hidden xl:hidden"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-6 h-6"
        >
          <path
            fillRule="evenodd"
            d="M3 6.75A.75.75 0 013.75 6h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 6.75zM3 12a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 12zm0 5.25a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75a.75.75 0 01-.75-.75z"
            clipRule="evenodd"
          />
        </svg>
      </button>

      <div className="flex items-center gap-2">
        {/* <Logo url={"/admin"} /> */}
        <img
          src={session.user.image}
          alt="User Avatar"
          className="w-8 h-8 rounded-full object-cover"
        />
        <span className="text-gray-800 font-medium text-sm hidden md:block lg:block xl:block">
          {session.user.name}
        </span>
      </div>
    </div>
  );
}
