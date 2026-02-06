import React from "react";
import Image from "next/image";
import Link from "next/link";

import TestimonialCard from "@/_components/TestimonialCard";
import LoginForm from "@/_components/auth/LoginForm";

const LoginModal = ({handleModalType}) => {
  return (
    <div className="bg-gray-100 rounded-md overflow-hidden">
      <div className="max-w-5xl mx-auto flex items-center justify-center flex-col ">
        <div className="w-fit bg-white shadow-md rounded-md grid grid-cols-1 sm:grid-cols-2">
          <div className="hidden sm:flex flex-col justify-between text-left bg-[#f8e9fb] p-8 pt-12 md:pt-40 pb-12">
            {/* <Image
              src="/logoMobile.png"
              alt="Logo"
              width={70}
              height={70}
              className=""
            /> */}
            <div>
              <h2 className="h2 !capitalize !font-[300]">Buy Better. Every Time.</h2>
              <p className="text-black text-[16px] font-bold md:w-[80%]">
               Start Comparing quotes and get the best deals today
              </p>
            </div>
            {/* <TestimonialCard /> */}
          </div>
          <div className=" p-8 md:pt-20 py-8 flex flex-col items-center justify-center">
            <div className="w-full">
              <h1 className="h2">Welcome Back to VERA</h1>
              <p className="mb-4">Sign in to compare prices and buy smarter.</p>
              {/* <div className="border-1 border-stock my-4 mb-8"></div>               */}
              <LoginForm handleModalType={handleModalType} />
              <p className="mt-4 text-center">
                Don't have an account? {" "}
                <button type="button" className="cursor-pointer" onClick={() => handleModalType("register")}>
                    <span className="text-primary">Create Account</span>
                </button> 
              </p> 
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default LoginModal;