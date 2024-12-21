import React, { useState, useEffect, useContext } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { CartContext } from "@/components/client/CartContext";
import ButtonOutline from "@/components/button/ButtonOutline";
import Logo from "@/components/Logo";
import { signOut } from "next-auth/react";
import DropAcc from "@/components/client/DropAcc";
import ButtonLink from "../button/ButtonLink";
import { Earth, EarthIcon, HomeIcon } from "lucide-react";
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
      link: "/blog",
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
          <Link
            href="/cart"
            className={
              "xl:hidden xxl:hidden lg:hidden px-3 sm:px-4 py-2 flex items-center text-xs transition-all" +
              (pathname === "/cart" ? activeLink : inactiveLink)
            }
          >
            <svg
              className="w-8 h-8"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
              />
            </svg>
          </Link>
          <div className="font-medium flex justify-center items-center gap-4">
            {session?.user ? (
              <div>
                <DropAcc />
              </div>
            ) : (
              <>
                <Link
                  href="/auth/register"
                  className="text-black-600 sm:hidden hidden lg:block md:block capitalize tracking-wide hover:text-red-500 transition-all"
                >
                  Đăng ký
                </Link>
                <Link href="/auth/login">
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
              <EarthIcon size={24} />
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
