import { ArrowRight } from "lucide-react"
import Image from "next/image"
import Button from "./ui/button"

export default function Why() {
  const steps = [
    {
      number: "01",
      title: "Save Time",
      desc:
        "No more back and forth emails"
    },
    {
      number: "02",
      title: "Fully Automated",
      desc:
        "From request to quote"
    },
    {
      number: "03",
      title: "Choose the Best Price",
      desc:"Suppliers blind bid on your requests"
    },
    {
      number: "04",
      title: "Wide Supplier Reach",
      desc:
        "Connect to 100s of pre-vetted vendors"
    },
    {
      number: "05",
      title: "All-in-OneDashboard",
      desc:
        "Search, compare and choose all in one place"
    },
    {
      number: "06",
      title: "No Hidden Fees",
      desc:
        "No buyer charges, no surprises"
    }
  ]
  return (
    <section className="relative bg-black text-white ">
      {/* Background Image with overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          // Replace with your actual image
          src="/assets/ThreeStepSection-Bg.jpg"
          alt="Steps background"
          fill
          className="object-cover opacity-70"
        />
      </div>
      <div className="absolute inset-0 bg-[#000000] opacity-70 z-0"></div>

      <div className="max-w-7xl relative z-10 px-4 py-8 md:py-16 mx-auto text-center flex flex-col items-center">
        {/* Headings */}
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold mb-12 uppercase">
          Why Choose <span className="text-primary">Vera?</span>
        </h2>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-8 mb-10">
          {steps.map((step, i) => (
            <div key={i} className="flex flex-col items-center text-center">
              {/* Circle number */}
              <div className="w-28 h-28 rounded-full  text-black bg-white font-semibold text-lg flex flex-col justify-center items-center mb-4">
                <div className="border-8 border-[#C61AFF] rounded-full w-26 h-26 flex flex-col justify-center items-center ">
                  <span className="text-2xl">{step.number}</span>
                  <span className="text-base font-normal">Step</span>
                </div>
              </div>
              {/* Title + Desc */}
              <h3 className="text-base font-semibold text-white mb-1">
                {step.title}
              </h3>
              <p className="text-xs text-gray-300">{step.desc}</p>
            </div>
          ))}
        </div>

        {/* CTA Button */}

        <Button icon={<ArrowRight />}>Send Your First Quote</Button>
      </div>
    </section>
  )
}