import React, { useMemo } from "react";
import Image from "next/image";
import ButtonPrimary from "@/components/button/ButtonPrimary";
import { motion } from "framer-motion";
import getScrollAnimation from "@/utils/getScrollAnimation";
import ScrollAnimationWrapper from "@/components/ScrollAnimationWrapper";
import Slider from "react-slick";
export default function Hero({ product }) {
  const scrollAnimation = useMemo(() => getScrollAnimation(), []);
  const productFeatured = product.filter((item) => item.is_featured == "true");
  const settings = {
    dots: false,
    autoplay: true,
    autoplaySpeed: 3000,
    infinite: true,
    fade: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
  };

  return (
    <div className="container mx-auto lg:px-24">
      {/* Slider Container */}
      <ScrollAnimationWrapper>
        <motion.div
          className="relative flex flex-col gap-8 py-1 px-0 lg:px-2 lg:py-5  lg:h-[80vh] xl:h-[80vh]"
          variants={scrollAnimation}
        >
          <div className="flex w-full">
            <motion.div className="w-full" variants={scrollAnimation}>
              <Slider
                {...settings}
                className="aspect-square w-full h-[300px] md:h-[300px] lg:h-[80vh] xl:h-[80vh]"
              >
                {productFeatured.map((item, index) => (
                  <div key={index} className="w-full aspect-square relative">
                    <Image
                      src={item.images[0]}
                      alt={item.title}
                      width={1000}
                      height={100}
                      className="object-cover rounded-md h-[300px] md:h-[300px] lg:h-[80vh] xl:h-[80vh] w-full"
                    />
                  </div>
                ))}
              </Slider>
            </motion.div>
          </div>
          <div className="lg:absolute bottom-0 left-0 w-full flex flex-col justify-center items-start z-10 lg:px-8 ">
            <div className="bg-[#a3a3a3c7] p-4 w-full rounded-lg">
              <h1 className="text-2xl sm:text-2xl md:text-2xl lg:text-4xl font-medium text-slate-50 leading-normal">
                Học tập dễ dang hơn với <strong>ThickTech</strong>.
              </h1>
              <p className="text-white my-4">
                Cung cấp những lớp học tập dễ với những giải pháp, khóa học và
                phòng học tập dễ chất lượng cao.
              </p>
              <ButtonPrimary class="sm:flex-center items-center">
                Get Started
              </ButtonPrimary>
            </div>
          </div>
        </motion.div>
      </ScrollAnimationWrapper>
      <div className="relative w-full flex">
        <div
          className="absolute bg-black-600 opacity-5 w-11/12 roudned-lg h-64 sm:h-48 top-0 mt-8 mx-auto left-0 right-0"
          style={{ filter: "blur(114px)" }}
        ></div>
      </div>
    </div>
  );
}
