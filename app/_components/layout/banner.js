import Image from "next/image";
import React from "react";

const Banner = ({ bgImage }) => {
  const usps = [
    { title: "25,000+ Product Available" },
    { title: "35K+ Verified Vendor" },
    { title: "Leading B2B Marketplace" },
  ];
  return (
    <section
      style={
        {
          // backgroundImage: ` url('/icons/hello.gif'), linear-gradient(135deg, #000, #000)`,
        }
      }
      className="relative bg-top bg-no-repeat bg-cover md:bg-cover bg-[#000] ">
      {/* <Image
        src="/icons/hello.gif"
        alt="Background"
        className="absolute inset-0 w-full h-full object-cover z-[-1]"
        width={100}
        height={100}
        priority
      /> */}
      {/* <div className="absolute inset-0 bg-[#000000] opacity-50 z-0"></div> */}
      <div className="relative z-10 max-w-[1420px] h-[55vh  ] mx-auto flex items-center">
        <div className="max-w-7xl min-h-[55vh] mx-auto py-4 px-4 flex flex-col items-center justify-center text-center">
          <Image
            src="/icons/hello.gif"
            alt="Background"
            width={600}
            height={100}
            priority
          />
          {/* <h1 className='text-4xl text-white font-bold mb-8'>One product. Multiple prices.</h1> */}
          {/* <h1 className="h1 mt-52 sm:mt-0 sm:mb-8 text-white">
          One product. Multiple prices.
          </h1> */}
          {/* <SearchBarMain />
                    <ul className='mt-8 w-full flex items-center flex-col md:flex-row justify-center gap-2'>
                        {usps.map((usp, index) => (
                            <li key={index} className='text-sm text-white my-2 px-2 py-1 rounded-xl bg-[#95959528]'>
                                {usp.title}
                            </li>
                        ))}
                    </ul>
                    <p className='text-sm text-white mt-4'>Get real-time quotes from trusted vendors and pick your perfect price.</p> */}
        </div>
      </div>
    </section>
  );
};

export default Banner;