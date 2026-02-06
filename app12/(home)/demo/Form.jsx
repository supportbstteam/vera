import React from "react";
import EnquiyForm from "./EnquiyForm";

const Form = () => {
  return (
    <section className="relative overflow-hidden bg-black py-24 ">
      <div className="bg-black flex items-center w-full mx-auto max-w-7xl px-6 ">
        <div className="flex-1/2">
          <h2 className="text-6xl uppercase text-white font-light">
            Talk To Our Team
          </h2>
          <span className="text-white mt-5">
            Tell us a little about your organisation whether you’re a supplier,
            customer, or distributor and we’ll guide you through how VERA
            simplifies the way you handle product specials.
          </span>
        </div>
        <div className="flex-1/2">
          <EnquiyForm />
        </div>
      </div>
    </section>
  );
};

export default Form;

