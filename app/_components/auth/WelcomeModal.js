import React from "react";
import Image from "next/image";
import Link from "next/link";
import Button from "@/_components/ui/button";
import TestimonialCard from "@/_components/TestimonialCard";

import { CircleCheckBig } from "lucide-react"

const WelcomeModal = () => {
  return (
    <div className="bg-gray-100">
      <div className="max-w-5xl mx-auto flex items-center justify-center flex-col">
        <div className="w-fit bg-white shadow-md rounded-md grid grid-cols-1 sm:grid-cols-2">
          <div className="text-left bg-[#f8e9fb] p-8 py-12">
            {/* <Image
              src="/logoMobile.png"
              alt="Logo"
              width={70}
              height={70}
              className="mb-20"
            /> */}
            <p className="h2">Start Saving More Today</p>
            <p className="text-gray-600 mb-14">
              Create your VERA account and unlock the power of real-time price
              comparison.
            </p>
            <TestimonialCard />
          </div>
          <div className="p-8 py-12 flex flex-col items-center">
            <h1 className="h2 text-primary">Congratulations</h1>
            <p className="mb-4 text-center">
            Thanks for joining VERA. <br />Let's find you the best deals right away
            </p>
            <Image
              src="/icons/success.gif"
              alt="Logo"
              width={500}
              height={70}
              className=""
            />
            {/* <CircleCheckBig color="#77B43F" size={140} /> */}
            <Button variant="primary" className="mt-4" sizeStyles="lg" href="/searchs">
              Find Best Deals
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default WelcomeModal;
