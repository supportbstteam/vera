import Button from "@/_components/ui/button";
import Image from "next/image";
import React from "react";

const Support = () => {
  return (
    <section className="relative overflow-hidden bg-white py-24 ">
      <div className="bg-white flex items-center justify-between w-full mx-auto max-w-7xl px-6 ">
        <div className="flex-1/2">
          <h2 className="text-6xl uppercase text-black font-light">
            Still <span className="text-primary">Stuck?</span>
          </h2>

          <div className="text-black mr-10 ">
            If you haven’t seen what you’re looking for, get in touch with us
            and our team will be happy to help.
          </div>

          <Button className="mt-10 font-semibold text-lg" >Get further support</Button>
        </div>

        <div className="flex-1/2 flex justify-end">
          <Image
            src="/assets/support.png"
            alt="Support"
            width={500}
            height={500}
          />
        </div>
      </div>
    </section>
  );
};

export default Support;

