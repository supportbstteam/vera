import Button from "@/_components/ui/button";
import React from "react";

const Grow = () => {
  return (
    <section className="relative overflow-hidden bg-black py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 md:px-6 flex flex-col md:flex-row gap-12">
        
        {/* Left content */}
        <div className="w-full md:w-1/2 text-center md:text-left">
          <h2 className="uppercase text-white font-light text-3xl sm:text-4xl md:text-6xl leading-tight">
            We Help Grow
          </h2>

          <h2 className="uppercase text-primary font-light text-3xl sm:text-4xl md:text-6xl leading-tight">
            Brands & Vendors
          </h2>

          <p className="text-white/80 mt-6 max-w-xl mx-auto md:mx-0">
            VERA helps you connect with serious buyers, increase visibility, and
            win more business.
          </p>
        </div>

        {/* Right card */}
        <div className="w-full md:w-1/2 border border-gray-500/60 p-6 sm:p-8 rounded-lg">
          <p className="text-white/80 leading-relaxed">
            Vera helps you connect with serious buyers, increase visibility, and
            win more business. Trusted by leading brands across Europe, we
            ensure products reach high-intent buyers with transparency, speed,
            and guaranteed value. Join thousands of verified vendors receiving
            daily quote requests from ready-to-buy customers.
          </p>

          <Button className="mt-8 w-full sm:w-auto font-semibold text-base sm:text-lg">
            Get further support
          </Button>
        </div>

      </div>
    </section>
  );
};

export default Grow;
