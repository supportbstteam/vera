import { CircleCheckBig } from "lucide-react"
import Image from "next/image"
import React from "react"

const TextMedia = () => {
  const features = [
    {
      icon: <CircleCheckBig size={20} />,
      title: "Choose a product category."
    },
    {
      icon: <CircleCheckBig size={20} />,
      title: "Verified suppliers are then notified instantly."
    },
    {
      icon: <CircleCheckBig size={20} />,
      title: "Receive multiple quotes - including from Flashy Cactus"
    },
    {
      icon: <CircleCheckBig size={20} />,
      title: "Compare & choose - all in under 24 hours"
    }
  ]
  return (
    <div className="max-w-7xl mx-auto px-4 py-8 md:py-16">
      <div className=" grid grid-cols-1 md:grid-cols-[6fr_4fr] gap-8 items-center ">
        <div className="flex flex-col items-start justify-center gap-4 ">
          <h2 className=" mb-0 h2  uppercase">
            SMARTER PRODUCT SOURCING <br />{" "}
            <span className="text-primary">STARTS WITH VERA</span>
          </h2>
          <p>
            Vera is your central platform for fast, automated product quotes.
            Forget emailing suppliers one by one. Just tell Vera what you need
            and it instantly notifies verified suppliers, gathers and compares
            their offers alongside Flashy Cactus pricing.
          </p>
          <p>One platform. Zero hassle.</p>
          <p className="font-bold text-xl">
            Get the best deal in just 4 simple steps.
          </p>
          <ul className="space-y-3">
            {features.map((item, index) => (
              <li
                key={index}
                className="grid grid-cols-[auto_1fr] gap-2 items-center text-gray-700 "
              >
                <span className="text-primary">{item.icon} </span>
                {item.title}
              </li>
            ))}
          </ul>
        </div>
        <div className="bg-[#fef6ff] flex items-center justify-center rounded-md overflow-hidden h-full">
          <Image
            src="/assets/75e44a29dd5265014dbb4e47e543bc8cc97aaade.jpg"
            alt="Why Choose VERA"
            width={500}
            height={500}
            className="object-cover h-full w-full"
          />
        </div>
        {/* <div className="bg-[#fef6ff] flex items-center justify-center rounded-xl overflow-hidden h-full">
                    <Image
                        src="/assets/d36b5d7ca5dffd177cbb394bbe70dc52f8831520.jpg"
                        alt="Why Choose VERA"
                        width={500}
                        height={500}
                        className='object-cover h-full w-full '
                    />
                </div> */}
        {/* <Gallery images={["/assets/75e44a29dd5265014dbb4e47e543bc8cc97aaade.jpg", "/assets/d36b5d7ca5dffd177cbb394bbe70dc52f8831520.jpg"]} /> */}
      </div>
    </div>
  )
}

export default TextMedia
