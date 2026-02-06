import React from "react";
import Demo from "../../../public/assets/demo.png";
const RequestDemo = () => {
  return (
    <section className="relative py-24 overflow-hidden">
      {/* Background image */}
      <div
         className="absolute inset-0 bg-no-repeat bg-right bg-cover"
        style={{
          backgroundImage: "url('/assets/demo.png')",
        }}
      />

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-white via-white/60 to-transparent" />

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-7xl px-6">
        <h2 className="text-6xl uppercase font-light">
          Request A <span className="text-primary">Demo</span>
        </h2>
      </div>
    </section>
  );
};

export default RequestDemo;
