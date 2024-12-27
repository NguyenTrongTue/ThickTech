import Image from "next/image";
import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import React, { useState, useEffect, useRef } from "react";

export default function ProductImages({ images }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [nav1, setNav1] = useState(null);
  const [nav2, setNav2] = useState(null);
  let sliderRef1 = useRef(null);
  let sliderRef2 = useRef(null);

  useEffect(() => {
    setNav1(sliderRef1.current);
    setNav2(sliderRef2.current);
  }, []);

  // Nếu chỉ có 1 ảnh, sao chép thành 4 ảnh
  const displayImages = (() => {
    if (images.length >= 4) return images; // Nếu đã có 4 ảnh hoặc hơn
    const repeatedImages = [];
    while (repeatedImages.length < 4) {
      repeatedImages.push(...images);
    }
    return repeatedImages.slice(0, 4); // Cắt đến 4 ảnh
  })();

  const settings = {
    dots: false,
    autoplay: true,
    autoplaySpeed: 3000,
    infinite: true,
    fade: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    beforeChange: (_, next) => setCurrentIndex(next), // Cập nhật chỉ số ảnh hiện tại
  };

  return (
    <div className="w-full pt-3 px-3 pb-1">
      {/* Slider chính */}
      <div className="relative">
        <Slider
          {...settings}
          asNavFor={nav2}
          ref={sliderRef1}
          className="aspect-square lg:min-w-full"
        >
          {displayImages.map((image, index) => (
            <div key={index} className="w-full aspect-square relative">
              <Image
                src={image}
                alt={`Image ${index}`}
                width={800}
                height={100}
                className="object-cover rounded-md"
              />
            </div>
          ))}
        </Slider>

        <div className="absolute bottom-8 right-5 bg-black bg-opacity-50 text-white text-sm px-2 py-1 rounded-sm">
          {currentIndex + 1} / {displayImages.length}
        </div>
      </div>

      {/* Slider thumbnail */}
      <Slider
        asNavFor={nav1}
        ref={sliderRef2}
        slidesToShow={4} // Luôn hiển thị 4 ảnh
        swipeToSlide={true}
        focusOnSelect={true}
        arrows={false}
      >
        {displayImages.map((image, index) => (
          <div
            key={index}
            className={`h-24 aspect-square relative transition-all duration-300 ${
              index === currentIndex
                ? "border-2 border-blue-500 opacity-100 rounded-lg"
                : "border-2 border-transparent opacity-50"
            }`}
          >
            <Image
              src={image}
              alt={`Thumbnail ${index}`}
              width={300}
              height={200}
              className="object-cover rounded-md cursor-pointer p-1"
            />
          </div>
        ))}
      </Slider>
    </div>
  );
}
