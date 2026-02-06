import React from "react";

const steps = [
  { id: "01", text: "Search for your product." },
  { id: "02", text: "Submit a request." },
  { id: "03", text: "Start receiving quotes from verified suppliers." },
  { id: "04", text: "Pick the best deal." },
];

export default function HowItWorks() {
  return (
    <section className="bg-black text-white py-12">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-1 md:grid-cols-[260px_1fr] gap-8 items-center">
          {/* Left side title */}
          <h2 className="!flex  flex-row md:flex-col gap-2 md:gap-0 justify-center items-center md:items-start   text-3xl md:text-[48px] uppercase font-light  md:mt-0 mb-6 leading-normal  md:leading-[45px]">
            <span className=" tracking-tight">HOW IT</span>
            <span className="text-primary ">WORKS</span>
          </h2>

          {/* Steps */}
          <div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-4">
              {steps.map((step) => (
                <div
                  key={step.id}
                  className="relative rounded-md border-1 border-[#fff] p-5 min-h-[90px] flex flex-col justify-start bg-[rgba(255,255,255,0.02)] hover:shadow-[0_6px_18px_rgba(0,0,0,0.6)] transition"
                >
                  {/* Number badge */}
                  <div className="absolute -top-[27px] left-3 bg-black px-1">
                    <h4 className="w-14 h-12 md:w-14 md:h-14 flex items-center justify-center rounded-md md:text-[64px] font-[400] text-lg md:text-xl  bg-black/60">
                      {step.id}
                    </h4>
                  </div>

                  {/* Text */}
                  <div className="pt-6 md:pt-8">
                    <p className="text-base md:text-lg font-medium">{step.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
