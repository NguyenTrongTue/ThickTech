import Link from "next/link";
import { useRouter } from "next/router";
import Logo from "@/components/Logo";
import { signOut } from "next-auth/react";
import { useRef, useEffect } from "react";

import {
  Layers2,
  LayoutDashboard,
  LibraryBig,
  LogOut,
  PackageOpen,
  ShieldCheck,
  ShoppingCart,
  Star,
  User,
} from "lucide-react";
import { usePathname } from "next/navigation";
import toast from "react-hot-toast";

export default function Sidebar() {
  const menuList = [
    {
      name: "Dashboard",
      link: "/admin",
      icon: <LayoutDashboard className="h-5 w-5" />,
    },
    {
      name: "Products",
      link: "/admin/products",
      icon: <PackageOpen className="h-5 w-5" />,
    },
    {
      name: "Categories",
      link: "/admin/categories",
      icon: <Layers2 className="h-5 w-5" />,
    },

    {
      name: "Orders",
      link: "/admin/orders",
      icon: <ShoppingCart className="h-5 w-5" />,
    },
    {
      name: "Customers",
      link: "/admin/customers",
      icon: <User className="h-5 w-5" />,
    },
    {
      name: "Ideas",
      link: "/admin/ideas",
      icon: <Star className="h-5 w-5" />,
    },
    {
      name: "blogs",
      link: "/admin/blogs",
      icon: <LibraryBig className="h-5 w-5" />,
    },
    {
      name: "Admins",
      link: "/admin/admins",
      icon: <ShieldCheck className="h-5 w-5" />,
    },
  ];
  async function logout() {
    try {
      await signOut();
      await toast.promise(new Promise((resolve) => setTimeout(resolve, 1000)), {
        error: (e) => e?.message,
        loading: "Logging out...",
        success: "Successfully Logged out",
      });
      router.push("/");
    } catch (error) {
      toast.error(error?.message);
    }
  }
  return (
    <section className="sticky top-0 flex flex-col gap-10 bg-white border-r px-5 py-3 h-screen overflow-hidden w-[260px] z-50">
      <Logo />
      <ul className="flex-1 h-full overflow-y-auto flex flex-col gap-4">
        {menuList?.map((item, key) => {
          return <Tab item={item} key={key} />;
        })}
      </ul>
      <div className="flex justify-center">
        <button
          onClick={logout}
          className="flex gap-2 items-center px-3 py-2 hover:bg-indigo-100 rounded-xl w-full justify-center ease-soft-spring duration-400 transition-all"
        >
          <LogOut className="h-5 w-5" /> Logout
        </button>
      </div>
    </section>
  );
}

function Tab({ item }) {
  const pathname = usePathname();
  const isSelected = pathname === item?.link;
  return (
    <Link href={item?.link}>
      <li
        className={`flex items-center gap-2 px-4 py-2 rounded-xl font-semibold ease-soft-spring transition-all duration-300
        ${isSelected ? "bg-[#879fff] text-white" : "bg-white text-black"} 
        `}
      >
        {item?.icon} {item?.name}
      </li>
    </Link>
  );
}
