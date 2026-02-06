import Button from "@/_components/ui/button";
import React from "react";
const Grow = () => {
  return (
    <section className="relative overflow-hidden bg-black py-24 ">
      <div className="bg-black flex items-center justify-between w-full mx-auto max-w-7xl px-6 ">
        <div className="flex-1/2">
          <h2 className="text-6xl uppercase text-white font-light">
            We Help Grow
          </h2>

          <h2 className="text-6xl uppercase text-primary font-light">
            Brands & Vendors
          </h2>

          <div className="text-white mr-10 mt-5 ">
           VERA helps you connect with serious buyers, increase visibility, and win more business.
          </div>
        </div>

        <div className="flex-1/2 border-gray-500 border-1 p-5 rounded-lg ml-10">
          {/* <h2 className="text-6xl uppercase text-black font-light">
            Still <span className="text-primary">Stuck?</span>
          </h2> */}

          <div className="text-white mr-10 ">
            Vera helps you connect with serious buyers, increase visibility, and
            win more business. Trusted by leading brands across Europe, we
            ensure products reach high-intent buyers with transparency, speed,
            and guaranteed value. Join thousands of verified vendors receiving
            daily quote requests from ready-to-buy customers.
          </div>

          <Button className="mt-10 font-semibold text-lg">
            Get further support
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Grow;

