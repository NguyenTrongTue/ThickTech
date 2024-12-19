import { useEffect, useContext } from "react";
import { CartContext } from "@/components/client/CartContext";
import React, { Component } from "react";
import Link from "next/link";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ProductBox from "@/components/client/ProductBox";
export default function Featured({ product }) {
  // lấy 10 sản phẩm nổi bật từ product
  const productFeatured = product.slice(0, 5);
  const SideSettings = {
    dots: true,
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    arrows: false,
    speed: 500,
    autoplaySpeed: 2000,
    pauseOnHover: true,
    cssEase: "linear",
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
        },
      },
    ],
  };

  return (
    <div className="bg-gray-100">
      <div className="container mx-auto">
        <div className="sm:flex justify-between items-end">
          <h3 className="text-slate-600 text-2xl lg:text-3xl font-semibold">
            Popular products.
          </h3>
          <Link
            href={"/"}
            className="text-lg font-medium space-links hover:underline text-gray-500 hover:text-red-500 transition-all"
          >
            Explore all products ...
          </Link>
        </div>
        <Slider {...SideSettings}>
          {productFeatured.map((items, i) => {
            return ProductBox(items);
          })}
        </Slider>
      </div>
    </div>
  );
}
