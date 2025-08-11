import React from "react";
import Image from "next/image";
import Link from "next/link";

import TestimonialCard from "@/_components/TestimonialCard";
import Reset_password from "@/_components/auth/Reset_password";

export const metadata = {
  title: "Reset password",
  description: ""
}

const page = async ({ searchParams }) => {

  const mySearch = await searchParams 

  const __filterData = {  
    token: (mySearch.token) ? mySearch.token : '',	            
    email: (mySearch.email) ? mySearch.email : '',    
	}

  return (
    <div className=" bg-gray-100 px-4  ">
      <div className="max-w-5xl mx-auto flex items-center justify-center py-12 flex-col ">
        <div className="w-fit bg-white shadow-md rounded-md grid grid-cols-1 sm:grid-cols-2">
          <div className="text-left bg-[#f8e9fb] p-8 py-12">
            <Image
              src="/logoMobile.png"
              alt="Logo"
              width={70}
              height={70}
              className="mb-20"
            />
            <p className="h2">Buy Better. Every Time.</p>
            <p className="text-gray-600 mb-24">
              Sign in to compare prices from multiple vendors and buy at the
              best deal, every time.
            </p>
            <TestimonialCard />
          </div>
          <div className=" p-8 py-12">
            <div>
              <h1 className="h2">Reset password</h1>
              <p className="mb-4">To create a new password, you should choose a strong, unique combination of uppercase and lowercase letters.</p>
              <div className="border-1 border-gray-400 my-4 mb-8 "></div>
              <Reset_password __filterData={__filterData} />
              
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default page;
