"use client";
import React from "react";
import Image from "next/image";
import FacebookIon from "@/public/assets/Icons/facebook.svg";
import ZaloIcon from "@/public/assets/Icons/zalo.svg";
import InstagramIcon from "@/public/assets/Icons/instagram.png";
import Logo from "@/public/assets/logo.png";
import Content from "@/public/content/text";
const Footer = () => {
  console.log(Content);

  const title = " là một cộng đồng yêu thích kĩ thuật và công nghệ thông tin.";

  return (
    <div className="bg-white shadow-2xl shadow-slate-900  pt-10 pb-20">
      <div className="max-w-screen-xl w-full mx-auto px-6 sm:px-8 lg:px-16 grid grid-rows-6 sm:grid-rows-1 grid-flow-row sm:grid-flow-col grid-cols-3 sm:grid-cols-12 gap-4">
        <div className="row-span-2 sm:col-span-4 col-start-1 col-end-4 sm:col-end-5 flex flex-col items-center lg:items-start">
          <Image
            className="h-16 w-auto mb-2"
            src={Logo}
            alt="logo"
            width={300}
            height={100}
          />
          <p className="mb-4 mx-4 items-center text-center lg:text-left">
            <strong className="font-medium">ThickTech</strong>
            {title}
          </p>
          <div className="flex w-full mt-2 mb-8 lg:items-start items-center justify-center lg:justify-start">
            <div className="mx-2 bg-white border-blue-500 border-2 rounded-full items-center justify-center flex p-2 shadow-md">
              <a
                href="https://www.facebook.com/"
                target="_blank"
                rel="referrer"
              >
                <Image
                  className="h-6 w-6"
                  src={ZaloIcon}
                  alt="zalo"
                  width={100}
                  height={100}
                />
              </a>
            </div>
            <div className="mx-2 bg-white border-blue-500 border-2 rounded-full items-center justify-center flex p-2 shadow-md">
              <a
                href="https://www.facebook.com/"
                target="_blank"
                rel="referrer"
              >
                <Image
                  className="h-6 w-6"
                  src={FacebookIon}
                  alt="facebook"
                  width={100}
                  height={100}
                />
              </a>
            </div>
            <div className="mx-2 bg-white border-blue-500 border-2 rounded-full items-center justify-center flex p-2 shadow-md">
              <a
                href="https://www.instagram.com/"
                target="_blank"
                rel="referrer"
              >
                <Image
                  className="h-6 w-6"
                  src={InstagramIcon}
                  alt="instagram"
                  width={150}
                  height={100}
                />
              </a>
            </div>
          </div>
          <p className="text-gray-800">
            ©{new Date().getFullYear()} - ThickTech
          </p>
        </div>
        <div className=" row-span-2 sm:col-span-2 sm:col-start-7 sm:col-end-9 flex flex-col">
          <p className="text-black-600 mb-4 font-medium text-lg">Product</p>
          <ul className="text-black-500 ">
            <li className="my-2 hover:text-orange-500 cursor-pointer transition-all">
              Pricing{" "}
            </li>
            <li className="my-2 hover:text-orange-500 cursor-pointer transition-all">
              Locations{" "}
            </li>
            <li className="my-2 hover:text-orange-500 cursor-pointer transition-all">
              Server{" "}
            </li>
            <li className="my-2 hover:text-orange-500 cursor-pointer transition-all">
              Countries{" "}
            </li>
            <li className="my-2 hover:text-orange-500 cursor-pointer transition-all">
              Blog{" "}
            </li>
          </ul>
        </div>
        <div className="row-span-2 sm:col-span-2 sm:col-start-9 sm:col-end-11 flex flex-col">
          <p className="text-black-600 mb-4 font-medium text-lg">Engage</p>
          <ul className="text-black-500">
            <li className="my-2 hover:text-orange-500 cursor-pointer transition-all">
              Tutorials{" "}
            </li>
            <li className="my-2 hover:text-orange-500 cursor-pointer transition-all">
              About Us{" "}
            </li>
            <li className="my-2 hover:text-orange-500 cursor-pointer transition-all">
              Privacy Policy{" "}
            </li>
            <li className="my-2 hover:text-orange-500 cursor-pointer transition-all">
              Terms of Service{" "}
            </li>
          </ul>
        </div>
        <div className="row-span-2 sm:col-span-2 sm:col-start-11 sm:col-end-13 flex flex-col">
          <p className="text-black-600 mb-4 font-medium text-lg">Earn Money</p>
          <ul className="text-black-500">
            <li className="my-2 hover:text-orange-500 cursor-pointer transition-all">
              Affiliate{" "}
            </li>
            <li className="my-2 hover:text-orange-500 cursor-pointer transition-all">
              Become Partner{" "}
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Footer;
