import React from "react"

const Banner = ({ bgImage }) => {
  const usps = [
    { title: "25,000+ Product Available" },
    { title: "35K+ Verified Vendor" },
    { title: "Leading B2B Marketplace" }
  ]
  return (
    <section
      // style={{
      //     backgroundImage: ` ${bgImage}, linear-gradient(135deg, #b43141, #274768)`,
      // }}
      className="relative bg-contain bg-top bg-no-repeat md:bg-cover bg-[#282828] "
    >
      {/* <img
                src="/assets/bg.png"
                alt="Background"
                className="absolute inset-0 w-full h-full object-cover z-[-1]"
            />
            <div className="absolute inset-0 bg-[#000000] opacity-70 z-0"></div> */}
      <div className="relative z-10 max-w-[1420px] mx-auto flex items-center">
        <div className="max-w-7xl min-h-[60vh] mx-auto py-4 flex flex-col items-center justify-center text-center">
          {/* <h1 className='text-4xl text-white font-bold mb-8'>One product. Multiple prices.</h1> */}
          <h1 className="text-6xl text-white font-bold mb-8">
            'HELLO' GIF TO GO HERE
          </h1>
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
  )
}

export default Banner
