import React from "react";
import Button from "../ui/button";
import Image from "next/image";
import { Images } from "@/utils/Images";
import Link from "next/link";

const RequestDemoBanner = () => {
  return (
    <section className="bg-black py-10 py-12">
      <div className="flex items-center mx-auto max-w-7xl  ">
        <div className="flex-1/2">
          <h1 className="h1 font-alternate text-white md:!text-[96px]">
            Request a Demo
          </h1>

          <h1 className="h1 font-alternate text-white md:!text-[96px]">
            of the <span className="text-primary ">VERA</span>
          </h1>

          <h1 className="h1 font-alternate text-primary md:!text-[96px] ">
            Platform <span className="text-white ">Today</span>
          </h1>

          <Link
            href="/demo"
            className="bg-primary px-5 py-3 rounded-sm my-10 w-1/2 inline-flex items-center justify-center hover:bg-primary/90 transition"
          >
            <span className="font-semibold text-md text-white">
              Request a Demo
            </span>
          </Link>
        </div>

        {/* image */}
        <div className="flex-1/2">
          <Image
            src={Images.Vera}
            alt="Request a Demo"
            width={600}
            height={600}
          />
        </div>
      </div>
    </section>
  );
};

export default RequestDemoBanner;

