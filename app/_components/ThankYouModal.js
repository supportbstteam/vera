import Image from "next/image"
import React from "react"

const ThankYouModal = () => {
  return (
    <section className="min-w-2xl m-auto flex flex-col justify-center bg-[#FBFBFB]">
      <div className="flex flex-col justify-center items-center my-20 p-28 py-20  ">
        <Image src="/icons/FS-Aloe-Vera-Animation.gif" alt="check" width={500} height={500} />
        <p className="text-lg font-semibold mt-6">
          Thank you for your quotation request.{" "}
        </p>
        <p className="text-lg font-semibold">
          {" "}
          Our team representative will contact you soon.
        </p>
      </div>
    </section>
  )
}
export default ThankYouModal
