import Image from "next/image"
import React from "react"
import Button from "./ui/button"
import { ArrowRight } from "lucide-react"

const CTA = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8 md:py-16">
      <div className="grid grid-cols-1 md:grid-cols-[3fr_3fr_6fr] gap-8 items-center ">
        <div className="flex flex-col items-start justify-center gap-4 ">
          <h2 className=" mb-0 h2  uppercase">Get ready to get started</h2>
          <p>We believe buying should be simple.</p>

          <Button
            variant="primary"
            size="md"
            icon={<ArrowRight size={16} />}
            iconPosition="right"
            href="/join"
          >
            Send your first quote
          </Button>
        </div>
        {/* <div className='bg-[#fef6ff] flex items-center justify-center rounded-xl overflow-hidden h-full'> */}
        <Image
          src="/assets/75e44a29dd5265014dbb4e47e543bc8cc97aaade.jpg"
          alt="Why Choose VERA"
          width={500}
          height={500}
          className="object-cover h-full w-full"
        />
        <Image
          src="/assets/75e44a29dd5265014dbb4e47e543bc8cc97aaade.jpg"
          alt="Why Choose VERA"
          width={500}
          height={500}
          className="object-cover h-full w-full"
        />
        {/* </div> */}
      </div>
    </div>
  )
}

export default CTA
