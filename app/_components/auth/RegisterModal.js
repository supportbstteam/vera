import React from "react";
import Image from "next/image";
import Link from "next/link";

import TestimonialCard from "@/_components/TestimonialCard";
import RegisterForm from "@/_components/auth/RegisterForm";

const RegisterModal = ({handleModalType}) => {
  return (
    <div className=" bg-gray-100">
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
              Create your VERA account and unlock the power of real-time price comparison.
            </p>
            <TestimonialCard />
          </div>
          <div className="p-8 py-12">
            <div>
              <h1 className="h2">Create your VERA account</h1>
              <p className="mb-4">Start comparing quotes and getting the best deals today.</p>
              <div className="border-1 border-gray-400 my-4 mb-8 "></div>
              <RegisterForm handleModalType={handleModalType} />
              <p className="mt-4 text-center">
                Already have account? &nbsp;
                <button type="button" className="cursor-pointer" onClick={() => handleModalType("login")}>
                    <span className="text-primary">Login</span>
                </button> 
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default RegisterModal;
