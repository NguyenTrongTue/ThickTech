import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const SidebarDropdown = ({ item }) => {
  const pathname = usePathname();

  return (
    <ul className="my-4 flex flex-col gap-2 pl-6">
      {item.map((item, index) => (
        <li key={index}>
          <Link
            href={item.route}
            className={`relative flex items-center gap-2 rounded-md px-4 py-2 font-medium transition-colors duration-300 ease-in-out 
              ${
                pathname === item.route
                  ? "text-white"
                  : "text-gray-400 hover:text-white hover:bg-gray-700"
              }`}
          >
            {item.label}
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default SidebarDropdown;
