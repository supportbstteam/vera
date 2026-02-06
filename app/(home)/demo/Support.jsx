import Button from "@/_components/ui/button";
import Image from "next/image";
import React from "react";

const Support = () => {
  return (
    <section className="relative overflow-hidden bg-white py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 md:px-6 flex flex-col-reverse md:flex-row items-center gap-12">
        
        {/* Text */}
        <div className="w-full md:w-1/2 text-center md:text-left">
          <h2 className="uppercase text-black font-light text-3xl sm:text-4xl md:text-6xl leading-tight">
            Still <span className="text-primary">Stuck?</span>
          </h2>

          <p className="text-black/80 mt-6 max-w-xl mx-auto md:mx-0">
            If you haven’t seen what you’re looking for, get in touch with us
            and our team will be happy to help.
          </p>

          <Button className="mt-8 text-base sm:text-lg font-semibold w-full sm:w-auto">
            Get further support
          </Button>
        </div>

        {/* Image */}
        <div className="w-full md:w-1/2 flex justify-center md:justify-end">
          <Image
            src="/assets/support.png"
            alt="Support"
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

export default Support;
