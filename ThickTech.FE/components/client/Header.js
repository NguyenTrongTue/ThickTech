import React, { useState, useEffect, useContext } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { CartContext } from "@/components/client/CartContext";
import ButtonOutline from "@/components/button/ButtonOutline";
import Logo from "@/components/Logo";
import { signOut } from "next-auth/react";
import DropAcc from "@/components/client/DropAcc";
import ButtonLink from "../button/ButtonLink";

import {
  Car,
  Earth,
  EarthIcon,
  HomeIcon,
  ListChecks,
  LucideEarth,
} from "lucide-react";
import { ListAltOutlined, ListAltRounded } from "@mui/icons-material";

const Header = ({ session }) => {
  const { cartProducts } = useContext(CartContext);
  const inactiveLink = " text-gray-900 hover:text-red-500 ";
  const activeLink = " text-red-500 font-semibold animation-active ";
  const router = useRouter();

  const { pathname } = router;
  async function logout() {
    await signOut();
  }
  const HeaderItem = [
    {
      title: "Home",
      link: "/",
    },
    {
      title: "Products",
      link: "/products",
    },
    {
      title: "Blog",
      link: "/blogs",
    },
    {
      title: "Contact",
      link: "/contact",
    },
    { title: "About", link: "/about" },
    {
      title: `Cart (${cartProducts.length || 0})`,
      link: "/cart",
    },
  ];

  return (
    <div>
      <header
        className={
          "sticky lg:fixed top-0 w-full z-30 bg-white transition-all rounded duration-300 ease-in-out shadow-lg"
        }
      >
        <nav className="container px-0 sm:px-4 mx-auto flex justify-between py-2 lg:py-2 lg:px-4 xl:px-8">
          <div className="flex items-center">
            <Logo />
          </div>
          <ul className="hidden lg:flex col-start-4 col-end-8  items-center">
            {HeaderItem.map((item, index) => (
              <li key={index}>
                <Link
                  href={`${item.link}`}
                  className={
                    "px-4 py-2 mx-2 cursor-pointer animation-hover inline-block relative" +
                    (pathname === item.link ? activeLink : inactiveLink)
                  }
                >
                  {item.title}
                </Link>
              </li>
            ))}
          </ul>

          <div className="font-medium flex justify-center items-center gap-4">
            <Link
              title="Đơn hàng"
              href="/cart/order-search"
              className={
                "p-2 flex items-center text-xs transition-all bg-white rounded-full shadow-md border-4 border-red-200 text-red-500 hover:bg-red-500 hover:text-white transition-100"
              }
            >
              <ListChecks size={24} />
            </Link>
            <Link
              href="/cart"
              className={
                "xl:hidden xxl:hidden lg:hidden p-2 flex items-center text-xs transition-all bg-white rounded-full shadow-md border-4 border-red-200 text-red-500 hover:bg-red-500 hover:text-white transition-100"
              }
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-6 h-6"
              >
                <path
                  fillRule="evenodd"
                  d="M7.5 6v.75H5.513c-.96 0-1.764.724-1.865 1.679l-1.263 12A1.875 1.875 0 0 0 4.25 22.5h15.5a1.875 1.875 0 0 0 1.865-2.071l-1.263-12a1.875 1.875 0 0 0-1.865-1.679H16.5V6a4.5 4.5 0 1 0-9 0ZM12 3a3 3 0 0 0-3 3v.75h6V6a3 3 0 0 0-3-3Zm-3 8.25a3 3 0 1 0 6 0v-.75a.75.75 0 0 1 1.5 0v.75a4.5 4.5 0 1 1-9 0v-.75a.75.75 0 0 1 1.5 0v.75Z"
                  clipRule="evenodd"
                />
              </svg>
            </Link>
            {session?.user ? (
              <div>
                <DropAcc />
              </div>
            ) : (
              <>
                <Link
                  href="/auth/register"
                  className="text-black-600 hidden xl:inline-block capitalize tracking-wide hover:text-red-500 transition-all"
                >
                  Đăng ký
                </Link>
                <Link href="/auth/signin">
                  <ButtonOutline>Đăng nhập</ButtonOutline>
                </Link>
              </>
            )}

            {session?.isAdmin ? (
              <ButtonLink
                href="/admin"
                color="red"
                className={
                  "font-medium tracking-wide py-2 px-6 sm:px-6 border border-red-500 text-red-500 bg-white-500 outline-none rounded-3xl capitalize hover:bg-red-500 hover:text-white transition-all"
                }
              >
                Admin
              </ButtonLink>
            ) : null}
          </div>
        </nav>
      </header>

      {/* Mobile Navigation */}

      <nav className="fixed lg:hidden bottom-0 left-0 right-0 z-20 px-4 sm:px-8 shadow-t width-full bg-white">
        <div className="sm:px-3">
          <ul className="flex w-full justify-between items-center ">
            <Link
              href="/"
              className={
                "mx-1 sm:mx-2 px-3 sm:px-4 py-2 flex flex-col items-center text-xs border-t-2 transition-all " +
                (pathname === "/" ? activeLink : inactiveLink)
              }
            >
              <HomeIcon size={24} />
              Home
            </Link>
            <Link
              href="/products"
              className={
                "mx-1 sm:mx-2 px-3 sm:px-4 py-2 flex flex-col items-center text-xs border-t-2 transition-all " +
                (pathname === "/products"
                  ? activeLink + "border-red-500"
                  : inactiveLink)
              }
            >
              <LucideEarth size={24} />
              Club
            </Link>
            <Link
              href="/pricing"
              className={
                "mx-1 sm:mx-2 px-3 sm:px-4 py-2 flex flex-col items-center text-xs border-t-2 transition-all " +
                (pathname === "/pricing"
                  ? activeLink + "border-red-500"
                  : inactiveLink)
              }
            >
              <svg
                className="w-6 h-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z"
                />
              </svg>
              Products
            </Link>
            <Link
              href="/about"
              className={
                "mx-1 sm:mx-2 px-3 sm:px-4 py-2 flex flex-col items-center text-xs border-t-2 transition-all " +
                (pathname === "/about"
                  ? activeLink + "border-red-500"
                  : inactiveLink)
              }
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                />
              </svg>
              About
            </Link>
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default Header;
