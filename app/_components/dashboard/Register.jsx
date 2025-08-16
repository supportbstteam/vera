import AuthForm from "@/_components/shared/AuthForm";
import React from "react";
import TestimonialCard from "@/_components/TestimonialCard";
import Image from "next/image";
import Link from "next/link";

const Register = () => {
  return (
    <div className=" bg-gray-100 rounded-md overflow-hidden ">
      <div className="max-w-5xl mx-auto flex items-center justify-center  flex-col ">
        <div className="w-fit bg-white shadow-md rounded-md grid grid-cols-1 sm:grid-cols-2">
          <div className="flex flex-col justify-between text-left bg-[#f8e9fb] p-8 py-12">
            <Image
              src="/logoMobile.png"
              alt="Logo"
              width={70}
              height={70}
              className=""
            />
            <div>
              <p className="h2">Start Saving More Today</p>
              <p className="text-gray-600 ">
                Create your VERA account and unlock the power of real-time price
                comparison.
              </p>
            </div>
            <TestimonialCard />
          </div>
          <div className=" p-8 py-8 flex flex-col items-center justify-center">
            <div className="w-full">
              <h1 className="h2">Create your account</h1>
              <p className="mb-4">
                Start comparing quotes and getting the best deals today.
              </p>
              <div className="border-1 border-stock my-4 mb-8 "></div>
              <AuthForm type="register" />
              <p className="mt-4 text-center">
                Already have account?{" "}
                <Link href="/login">
                  <span className="text-primary">Login</span>
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Register;
