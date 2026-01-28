"use client";
import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  Suspense,
} from "react";
import Image from "next/image";
import Button from "./ui/button";
import { useSelector, useDispatch } from "react-redux";
import { searchAction } from "@/_library/redux/actions/click";
import { ArrowRight } from "lucide-react";

const CTA = () => {
  const dispatch = useDispatch();

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 md:py-16">
      <div className="flex flex-col md:flex-row gap-8 items-start justify-between ">
        <div className="max-w-full md:max-w-[400px] flex flex-col items-start justify-center gap-4 ">
          <h2 className=" mb-0 h2  uppercase">
            READY TO <span className="text-primary">GET STARTED?</span>
          </h2>
          <div className="flex flex-col gap-6 pr-0 md:pr-15 mb-6 md:mb-8">
            <p>
              VERA isn’t just a platform — it’s a smarter way to do business.
            </p>
            <p>
              By combining transparency, automation, and trust, we empower
              companies to focus on what matters most: growth.
            </p>

            <p>
              Whether you’re buying or supplying, VERA turns procurement into a
              partnership — fast, efficient, and fair.
            </p>
          </div>
          <Button
            variant="primary"
            size="md"
            onClick={() => {
              window.scrollTo({
                top: 0,
                behavior: "auto",
              });

              dispatch(searchAction(true));
            }}
          >
            Request your product specials
          </Button>
        </div>
        {/* <div className='bg-[#fef6ff] flex items-center justify-center rounded-xl overflow-hidden h-full'> */}
        {/* <Image
          src="/assets/cta2.png"
          alt="Why Choose VERA"
          width={500}
          height={500}
          className="object-cover h-full w-full rounded-md"
        /> */}
        <Image
          src="/assets/cta1.png"
          alt="Why Choose VERA"
          width={500}
          height={500}
          className="object-cover h-full w-full md:w-[52%] rounded-md"
        />
        {/* </div> */}
      </div>
    </div>
  );
};

export default CTA;
