"use client"

import React from "react"
import Slider from "react-slick"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import { ChevronLeft, ChevronRight } from "lucide-react"
import Image from "next/image"

const trendingItems = [
  { title: "Home & Decor", img: "/assets/images/chair.png" },
  { title: "iphone", img: "/assets/iphone.jpg" },
  { title: "Laptop & Computer", img: "/assets/laptop.png" },
  { title: "Headphones", img: "/assets/headphones.png" },
  { title: "HandBags", img: "/assets/bag.png" },
  { title: "Smartphone", img: "/assets/phone.png" },
  { title: "Home & Decor", img: "/assets/chair.png" },
  { title: "Autopart", img: "/public/images/tyres.png" }
]

const TrendingSlider = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 8,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2500,
    arrows: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: { slidesToShow: 3 }
      },
      {
        breakpoint: 768,
        settings: { slidesToShow: 2 }
      },
      {
        breakpoint: 500,
        settings: { slidesToShow: 1 }
      }
    ]
  }

  return (
    <section className="py-10 md:py-16 bg-[#f9f9f9]">
      <div className="max-w-7xl mx-auto px-8">
        <h2 className="text-center text-2xl md:text-3xl font-semibold bg-gradient-to-r from-[#b43141] to-[#274768] bg-clip-text text-transparent mb-6">
          Explore Trending Items
        </h2>
        <p className="text-center mb-12 text-gray-600">
          See what everyone’s quoting today — top products with the best vendor
          offers.
        </p>

        <Slider {...settings}>
          {trendingItems.map((item, i) => (
            <div key={i} className="px-4">
              <div className="bg-white rounded-full w-[130px] h-[130px] mx-auto flex items-center justify-center shadow-md">
                <Image
                  src={item.img}
                  alt={item.title}
                  width={70}
                  height={70}
                  className="object-contain"
                />
              </div>
              <p className="text-center mt-2 text-sm font-medium">
                {item.title}
              </p>
            </div>
          ))}
        </Slider>
      </div>

      <style jsx global>{`
        .slick-dots {
          margin-top: 1.5rem;
        }
        .slick-dots li button:before {
          color: #6b7280;
        }
        .slick-dots li.slick-active button:before {
          color: #b43141;
        }
        .slick-arrow {
          z-index: 10;
        }
      `}</style>
    </section>
  )
}

// Corrected arrow directions
const PrevArrow = ({ onClick }) => (
  <div
    onClick={onClick}
    className="absolute left-[-20px] top-1/2 transform -translate-y-1/2 z-10 cursor-pointer text-gray-600 hover:text-black"
  >
    <ChevronLeft size={28} />
  </div>
)

const NextArrow = ({ onClick }) => (
  <div
    onClick={onClick}
    className="absolute right-[-20px] top-1/2 transform -translate-y-1/2 z-10 cursor-pointer text-gray-600 hover:text-black"
  >
    <ChevronRight size={28} />
  </div>
)

export default TrendingSlider
