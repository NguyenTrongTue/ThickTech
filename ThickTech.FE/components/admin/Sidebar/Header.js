import DropdownUser from "./DropdownUser";
import { Menu } from "lucide-react";

const Header = ({ sidebarOpen, setSidebarOpen, session }) => {
  return (
    <header className="sticky top-0 z-10 flex w-full bg-white">
      <div className="flex flex-grow items-center justify-between px-4 py-2 shadow-2 shadow-lg md:px-6 2xl:px-11">
        <div className="flex items-center gap-2 sm:gap-4 lg:hidden">
          {/* Hamburger Toggle BTN */}
          <button
            aria-controls="sidebar"
            onClick={(e) => {
              e.stopPropagation();
              setSidebarOpen(!sidebarOpen);
            }}
            className="z-50 block rounded-sm border bg-white p-1.5 shadow-sm lg:hidden"
          >
            <Menu />
          </button>
        </div>

        <div className="hidden sm:block"></div>

        <div className="flex items-center gap-3 2xsm:gap-7">
          {/* User Area */}
          <DropdownUser session={session} />
          {/* User Area */}
        </div>
      </div>
    </header>
  );
};

export default Header;
