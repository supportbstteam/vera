"use client"
import React, { useState, useEffect, useCallback } from 'react';
import Slider from "react-slick"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import { Quote, Star } from "lucide-react"

import Link from 'next/link'
import Image from "next/image"
import Api from '@/_library/Api';

const Testimonial = () => {

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
    dots: true,
    infinite: false,
    speed: 600,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    arrows: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: { slidesToShow: 2 }
      },
      {
        breakpoint: 640,
        settings: { slidesToShow: 1 }
      }
    ]
  }
  return (
    <section className="bg-[#444] py-8 pb-14 md:py-16">
      <div className="max-w-7xl mx-auto text-center">
        <div className="text-center md:mb-10 w-[95%]">
          <h2 className="h2 mb-4 text-white">
            Buyers Love VERA — <span className="text-primary">Here's Why</span>
          </h2>
        </div>
        <Slider {...settings}>
          {testimonials?.map((t, idx) => (
            <div key={idx} className="px-2">
              <div className="bg-black rounded-xl shadow-sm border border-gray-500 p-6 text-left min-h-[240px] flex flex-col content-between">
                <div className="flex flex-col mt-auto">
                  <Quote fill="white" />
                  <p className="text-base text-gray-100 my-2 md:leading-8">
                    {t.description}
                  </p>
                  <div className="flex justify-end">
                    <Quote fill="white" />
                  </div>
                  {/* <Image src={t.profile_image} alt={t.name} width={300} height={60} className="w-12 h-12 rounded-full object-cover mr-3" /> */}                 
                </div>
                <div className=" flex justify-between border-t border- border-white pt-4 mt-4">
                  <div>
                    <p className="text-white font-semibold">{t?.name}</p>
                    <p className="text-sm text-white">{t?.designation}</p>
                  </div>
                  <div className="flex mb-6 gap-1 text-yellow-500 text-lg">
                    {Array(t.rating)
                      .fill(0)
                      .map((_, i) => {

                        let fill = "yellow"
                        let color = "text-[color:var(--yellow)]"                       
                        
                        return(<Star
                          key={i}
                          fill={fill}
                          className={color}
                        />)
                        
                      }
                    )}
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

export default Testimonial
