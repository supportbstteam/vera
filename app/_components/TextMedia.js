"use client";
import { CircleCheckBig } from "lucide-react"
import { ArrowRight } from "lucide-react"
import Image from "next/image"
import Button from "./ui/button"
import React from "react"
import { searchAction } from '@/_library/redux/actions/click'
import { useSelector, useDispatch } from 'react-redux'

const TextMedia = () => {
  const dispatch  = useDispatch() 
  const features = [
    {
      icon: <CircleCheckBig size={20} />,
      subhead:'BEST PRICE GUARANTEE:',
      title: "Vendors compete to offer you the lowest prices every time."
    },
    {
      icon: <CircleCheckBig size={20} />,
        subhead:'VERIFIED SELLERS ONLY:',
      title: "Every vendor is thoroughly verified to ensure product authenticity, service & quality. "
    },
    {
      icon: <CircleCheckBig size={20} />,
        subhead:'COMPLETE TRANSPARENCY:',
      title: " There are no hidden fees or unexpected costs"
    }
  ]
  return (
    <div className="max-w-7xl mx-auto px-4 py-8 md:py-16">
      <div className=" grid grid-cols-1 md:grid-cols-[6fr_4fr] gap-8 items-center ">
        <div className="flex flex-col items-start justify-center gap-4 ">
          <h2 className=" mb-0 h2  uppercase font-light">
            SMARTER PRODUCT SOURCING <br />{" "}
            <span className="text-primary">STARTS WITH VERA</span>
          </h2>
          <p className="w-full md:w-[70%] block">
            Vera is your central platform for fast, automated product quotes.<br/>
            Forget emailing suppliers one by one. Just tell Vera what you need
            and it instantly notifies verified suppliers, gathers and compares
            their offers alongside Flashy Cactus pricing.
          </p>
          <p className="mt-2 mb-2">One platform. Zero hassle.</p>
          {/* <p className="font-bold text-xl">
            Get the best deal in just 4 simple steps.
          </p> */}
          <ul className="space-y-3">
            {features.map((item, index) => (
              <li
                key={index}
                className="grid grid-cols-[auto_1fr] gap-2 items-start text-gray-700 "
              >
                <span className="text-primary">{item.icon} </span>
              <span className="">
             <b>{item.subhead}</b> {item.title}</span>
              </li>
            ))}
          </ul>
           <Button className="mt-6" 
                  
                  onClick={()=>{
          
                    window.scrollTo({
                      top: 0,
                      behavior: 'auto'
                    }); 
          
                    dispatch(searchAction(true))            
                    
                  }}
                  >Request product specials</Button>
        </div>
        <div className="bg-[#fef6ff] flex items-center justify-center rounded-md overflow-hidden h-full">
          <Image
            src="/assets/75e44a29dd5265014dbb4e47e543bc8cc97aaade.jpg"
            alt="Why Choose VERA"
            width={500}
            height={500}
            className="object-cover h-full w-full"
          />
        </div>
        {/* <div className="bg-[#fef6ff] flex items-center justify-center rounded-xl overflow-hidden h-full">
                    <Image
                        src="/assets/d36b5d7ca5dffd177cbb394bbe70dc52f8831520.jpg"
                        alt="Why Choose VERA"
                        width={500}
                        height={500}
                        className='object-cover h-full w-full '
                    />
                </div> */}
        {/* <Gallery images={["/assets/75e44a29dd5265014dbb4e47e543bc8cc97aaade.jpg", "/assets/d36b5d7ca5dffd177cbb394bbe70dc52f8831520.jpg"]} /> */}
      </div>
    </div>
  )
}

export default TextMedia
