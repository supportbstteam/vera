import React from "react";
import EnquiyForm from "./EnquiyForm";

const Form = () => {
  return (
    <section className="relative overflow-hidden bg-black py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 md:px-6 flex flex-col md:flex-row items-start gap-12">
        
        {/* Left content */}
        <div className="w-full md:w-1/2">
          <h2 className="uppercase text-white font-light text-3xl sm:text-4xl md:text-6xl leading-tight">
            Talk To Our Team
          </h2>

          <p className="text-white/80 mt-6 text-base sm:text-lg max-w-xl">
            Tell us a little about your organisation whether you’re a supplier,
            customer, or distributor and we’ll guide you through how VERA
            simplifies the way you handle product specials.
          </p>
        </div>

        {/* Right form */}
        <div className="w-full md:w-1/2">
          <EnquiyForm />
        </div>

      </div>
    </section>
  );
};

export default Form;
