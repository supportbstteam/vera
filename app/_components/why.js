"use client";
import React from "react";
import Image from "next/image";
import { Clock, UserCheck, LayoutDashboard, Users, Tag, ShieldOff } from "lucide-react";
import { useDispatch } from "react-redux";
import { searchAction } from "@/_library/redux/actions/click";

import Button from "./ui/button"

const Why = () => {
  const dispatch = useDispatch();

  const features = [
    {
      icon: "/icons/mingcute_time-fill.png",
      title: "Save Time",
      desc: "No more back and forth emails",
    },
    {
      icon: "/icons/fa6-solid_child-reaching.png",
      title: "Wide Supplier Reach",
      desc: "Connect to 100s of pre-vetted vendors",
    },
    {
     icon: "/icons/material-symbols_person.png",
      title: "Fully Automated",
      desc: "From request to quote, we do it for you",
    },
    {
     icon: "/icons/icomoon-free_price-tags.png",
      title: "Competitive Pricing",
      desc: "Suppliers blind bid on your requests",
    },
    {
      icon: "/icons/ic_baseline-laptop.png",
      title: "All-in-One Dashboard",
      desc: "Search, compare and choose all in one place",
    },
    {
     icon: "/icons/bitcoin-icons_hidden-filled.png",
      title: "No Hidden Fees",
      desc: "No buyer charges, no surprises",
    },
  ];

  return (
    <section className="relative bg-black text-white">
      {/* Background Image + Overlay */}
      <div className="absolute inset-0">
        <Image
          src="/assets/ThreeStepSection-Bg.jpg"
          alt="background"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black opacity-80" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-16 md:py-15 flex flex-col lg:flex-row items-center md:items-start justify-between gap-12">
        {/* Left Section */}
        <div className="text-left flex flex-col w-full lg:w-1/2">
          <h2 className="text-3xl md:text-[48px] uppercase font-light  md:mt-0 mb-0 md:mb-6 leading-normal md:leading-[50px]  !flex items-center max-lg:justify-center lg:items-start max-md:gap-2 flex-row lg:!flex-col">
            <span className=" !m-0"> WHY CHOOSE</span> <span className="text-primary  !m-0">VERA?</span>
          </h2>
           <Button className="mt-6 w-[227px] !py-2 !hidden lg:!block" 
                  
                  onClick={()=>{
          
                    window.scrollTo({
                      top: 0,
                      behavior: 'auto'
                    }); 
          
                    dispatch(searchAction(true))            
                    
                  }}
                  >Request product specials</Button>
        </div>

        {/* Right Section - Features */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-8 w-full lg:w-1/2">
          {features.map((f, i) => (
            <div key={i} className="flex items-center space-x-4">
              <div className=" flex items-center justify-center">
                <img src={f.icon} />
              </div>
              <div>
                <p className="text-lg font-semibold mb-1">{f.title}</p>
                <p className="text-sm text-gray-300 leading-snug">{f.desc}</p>
              </div>
            </div>
          ))}
        </div>
         <Button className="mt-6 w-[227px] !py-2 block lg:hidden  mx-auto lg:mx-0" 
                  
                  onClick={()=>{
          
                    window.scrollTo({
                      top: 0,
                      behavior: 'auto'
                    }); 
          
                    dispatch(searchAction(true))            
                    
                  }}
                  >Request product specials</Button>
      </div>
    </section>
  );
};

export default Why;
