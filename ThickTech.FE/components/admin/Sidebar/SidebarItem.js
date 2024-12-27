import React from "react";
import Link from "next/link";
import SidebarDropdown from "@/components/admin/Sidebar/SidebarDropdown";
import { usePathname } from "next/navigation";

const SidebarItem = ({ item, pageName, setPageName }) => {
  const pathname = usePathname();

  const handleClick = () => {
    setPageName((prev) =>
      prev !== item.label.toLowerCase() ? item.label.toLowerCase() : ""
    );
  };

  // Kiểm tra xem một mục hoặc con của mục có đang hoạt động không
  const isActive = (currentItem) => {
    if (currentItem.route === pathname) return true;
    if (currentItem.children) {
      return currentItem.children.some((child) => isActive(child));
    }
    return false;
  };

  const isItemActive = isActive(item);

  return (
    <li>
      <Link
        href={item.route}
        onClick={handleClick}
        className={`relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium text-gray-100 transition-colors duration-300 ease-in-out hover:bg-gray-500 hover:text-white ${
          isItemActive ? "bg-gray-500" : ""
        }`}
      >
        {item.icon}
        {item.label}
        {item.children && (
          <svg
            className={`absolute right-2 top-1/2 -translate-y-1/2 fill-current transition-transform duration-300 ${
              pageName === item.label.toLowerCase() ? "rotate-180" : "rotate-0"
            }`}
            width="20"
            height="20"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M4.411 6.911c.326-.326.854-.326 1.179 0l4.411 4.411 4.411-4.411c.326-.326.854-.326 1.179 0s.326.854 0 1.179l-5 5c-.326.326-.854.326-1.179 0l-5-5c-.326-.326-.326-.854 0-1.179z"
            />
          </svg>
        )}
      </Link>

      {item.children && (
        <div
          className={`transform overflow-hidden transition-all duration-300 ${
            pageName === item.label.toLowerCase() ? "max-h-screen" : "max-h-0"
          }`}
        >
          <SidebarDropdown item={item.children} />
        </div>
      )}
    </li>
  );
};

export default SidebarItem;
