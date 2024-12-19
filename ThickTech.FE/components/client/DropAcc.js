import { useState } from "react";
import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import ButtonOutline from "./button/ButtonOutline";
export default function DropAcc() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { data: session } = useSession();
  async function handleLogout() {
    await signOut();
  }
  return (
    <div className="relative">
      <button
        onClick={() => setDropdownOpen(!dropdownOpen)}
        className="bg-white rounded-full shadow-md border-4 border-red-200 text-red-500 hover:bg-red-500 hover:text-white transition-100"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="w-10 h-10"
        >
          <path
            strokeLinecap="round"
            stroke-linejoin="round"
            d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
          />
        </svg>
      </button>
      {dropdownOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-md border border-gray-200">
          <div className="px-4 py-2 border-b border-gray-200">
            <span>{session?.user?.name || "User"}</span>
          </div>

          <Link
            href="/account"
            className="block px-4 py-2 text-gray-700 hover:bg-gray-300"
          >
            Account
          </Link>
          <button
            onClick={handleLogout}
            className="w-full text-left block px-4 py-2 text-gray-700 hover:bg-gray-300"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
}
