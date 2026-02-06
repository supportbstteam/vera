import React from "react";
import Image from "next/image";
import { Images } from "@/utils/Images";
import Link from "next/link";

const RequestDemoBanner = () => {
  return (
    <section className="bg-black py-12">
      <div className="mx-auto max-w-7xl px-4 flex flex-col-reverse md:flex-row items-center gap-10">
        
        {/* Text Content */}
        <div className="w-full md:w-1/2 text-center md:text-left">
          <h1 className="font-alternate text-white text-4xl sm:text-5xl md:text-[96px] leading-tight">
            Request a Demo
          </h1>

          <h1 className="font-alternate text-white text-4xl sm:text-5xl md:text-[96px] leading-tight">
            of the <span className="text-primary">VERA</span>
          </h1>

          <h1 className="font-alternate text-primary text-4xl sm:text-5xl md:text-[96px] leading-tight">
            Platform <span className="text-white">Today</span>
          </h1>

          <Link
            href="/demo"
            className="mt-8 inline-flex items-center justify-center bg-primary px-6 py-3 rounded-sm w-full sm:w-auto hover:bg-primary/90 transition"
          >
            <span className="font-semibold text-white">
              Request a Demo
            </span>
          </Link>
        </div>

        {/* Image */}
        <div className="w-full md:w-1/2 flex justify-center">
          <Image
            src={Images.Vera}
            alt="Request a Demo"
            width={500}
            height={500}
            className="w-full max-w-sm md:max-w-full h-auto"
            priority
          />
        </div>

      </div>
    </section>
  );
};

export default RequestDemoBanner;
