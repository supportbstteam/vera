"use client"
import React, { useState, useEffect, useCallback } from 'react';
import Slider from "react-slick"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import { Quote, Star } from "lucide-react"

import Link from 'next/link'
import Image from "next/image"
import Api from '@/_library/Api';

const testimonials1 = [
  {
    name: "SSG Maria T.1",
    designation: "Buyer",
    star: 4,
    image: "/images/maria.jpg",
    description:
      "I love that I don't have to wonder if I'm overpaying. VERA brings the vendors to me, and I choose the price that works for my budget."
  },
  {
    name: "SSG Maria T.2",
    designation: "Buyer",
    star: 5,
    image: "/images/maria.jpg",
    description:
      "I love that I don't have to wonder if I'm overpaying. VERA brings the vendors to me, and I choose the price that works for my budget."
  },
  {
    name: "SSG Maria T.3",
    designation: "Buyer",
    star: 4,
    image: "/images/maria.jpg",
    description:
      "I love that I don't have to wonder if I'm overpaying. VERA brings the vendors to me, and I choose the price that works for my budget."
  },
  {
    name: "SSG Maria T.4",
    designation: "Buyer",
    star: 3,
    image: "/images/maria.jpg",
    description:
      "I love that I don't have to wonder if I'm overpaying. VERA brings the vendors to me, and I choose the price that works for my budget."
  },
  {
    name: "SSG Maria T.5",
    designation: "Buyer",
    star: 5,
    image: "/images/maria.jpg",
    description:
      "I love that I don't have to wonder if I'm overpaying. VERA brings the vendors to me, and I choose the price that works for my budget."
  }
]

const TestimonialCard = () => {

  const [testimonials, set_testimonials] = useState([])

  useEffect(() => {       
      fetchTestimonialData()  
  },[]);  
    
  const fetchTestimonialData = async () => {     
    const res = await Api.testimonials({       
    }); 
    const resData = res.data     
    set_testimonials(resData.data) 
  }

  const settings = {
    dots: false,
    infinite: true,
    fade: true,
    speed: 300,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    arrows: false,
    
  }
  return (
    <section className="">
      <div className="max-full mx-auto text-center">
        <Slider {...settings}>
          {testimonials1?.map((t, idx) => (
            <div key={idx} className="px-2">
              <div className="bg-white rounded-xl shadow-sm border border-primary p-6 text-left min-h-[240px] flex flex-col content-between">
                <div className="flex flex-col mt-auto">
                  <Quote fill="black" />
                  <p className="text-base text-gray-900 my-2 md:leading-8">
                    {t.description}
                  </p>
                  <div className="flex justify-end">
                    <Quote fill="black" />
                  </div>
                  {/* <Image src={t.profile_image} alt={t.name} width={300} height={60} className="w-12 h-12 rounded-full object-cover mr-3" /> */}                 
                </div>
                <div className=" flex justify-between border-t border- border-gray-400 pt-4 mt-4">
                  <div>
                    <p className="text-black font-semibold">{t?.name}</p>
                    <p className="text-sm text-black">{t?.designation}</p>
                  </div>
                  <div className="flex mb-6 gap-1 text-yellow-500 text-lg">
                    {Array(t?.star)
                      .fill(0)
                      .map((_, i) => (
                        <Star
                          key={i}
                          fill="yellow"
                          className="text-[color:var(--yellow)]"
                        />
                      ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
      <style jsx global>{`
        .slick-dots {
          margin-top: 2rem;
        }
        .slick-dots li button:before {
          font-size: 12px;
          color: #bbb;
        }
        .slick-dots li.slick-active button:before {
          color: #fff;
        }
      `}</style>
    </section>
  )
}

export default TestimonialCard
