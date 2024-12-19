import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import Logo from "@/components/Logo";
import BarsIcon from "../icons/Bars";

export default function Header({ session, setShowNav }) {
  return (
    <div className="flex items-center justify-between lg:justify-end md:justify-end shadow-lg p-4">
      {/* Nút mở Nav */}
      <button
        onClick={() => setShowNav(true)}
        className="text-gray-700 hover:text-gray-900 transition md:hidden lg:hidden xl:hidden"
      >
        <BarsIcon />
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
