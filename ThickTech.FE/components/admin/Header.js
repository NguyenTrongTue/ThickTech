import { useRouter } from "next/router";
import { useState } from "react";
import { Menu } from "lucide-react";
import { useSession, signIn } from "next-auth/react";

export default function Header({ toggleSidebar }) {
  const { data: session, status } = useSession();

  return (
    <section className="fixed w-full top-0 flex items-center gap-3 bg-white border-b px-4 py-3 z-10">
      <div className="flex justify-center items-center md:hidden">
        <button onClick={toggleSidebar}>
          <Menu />
        </button>
      </div>
      <div className="w-full flex justify-between items-center pr-0 md:pr-[260px]">
        <h1 className="text-xl font-semibold"></h1>
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
    </section>
  );
}
