import { Clock, MapPinned, Star } from "lucide-react"
import Image from "next/image"
import React from "react"
import Button from "@/_components/ui/button"  
import Input from "@/_components/ui/Input"  
import QuantityStepper from "@/_components/ui/QuantityStepper" 
import DashboardNavigation from "@/_components/layout/DashboardNavigation"

const Lead = () => {
  const product = [
    {
      productName: "Lenovo ThinkPad E15 Gen 5",
      category: "Electronic | Laptop",
      productNumber: "21ES004Y00",
      brand: "Lenovo",
      processor: "AMD Ryzen 9",
      image: "/assets/laptop.png"
    },
    {
      buyerName: "Lena Schneider",
      requestedUnit: 45
    },
    {
      location: "Stuttgart, Germany",
      posted: "4 hrs ago / Aug 05, 2025"
    },
    {
      quantity: 1,
      price: 2999.99
    }
  ]
  return (
    <div className="max-w-7xl m-auto py-16 flex flex-col gap-6">
        <DashboardNavigation />
    <div className="border border-[#dcdcdc] rounded-xl p-4 space-y-4  ">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex gap-3 items-center">
          <Image src={product[0].image} alt="Product" width={70} height={70} />
          <div>
            <h2 className="font-semibold text-sm">{product[0].productName}</h2>
            <p className="text-sm text-gray-900">
              Category: {product[0].category}
            </p>
          </div>
        </div>
        <div className="text-sm text-gray-900 flex gap-4 items-center">
          <div className="flex items-center gap-1">
            <Clock size={16} />
            <span>4 hrs ago/ Aug 05,2025</span>
          </div>
          <div className="flex items-center gap-1">
            <MapPinned size={16} />
            <span>Stuttgart, Germany</span>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-[3fr_2fr] gap-6">
        {/* Body */}
        <div className="grid grid-cols-2 justify-between items-start flex-wrap border border-gray-200 rounded-lg py-6 divide-x divide-stock">
          {/* Left Section */}
          <div className=" space-y-4 px-6">
            <h4 className="font-bold text-base">Product Detail</h4>
            <div className="text-sm flex flex-row justify-between">
              <p className="">Product Number:</p>
              <span className="text-gray-900 font-bold">21E6S04Y00</span>
            </div>
            <div className="text-sm flex flex-row justify-between">
              <p className="">Brand:</p>
              <span className="text-gray-900 font-bold">Lenovo</span>
            </div>
            <div className="text-sm flex flex-row justify-between">
              <p className="">Processor:</p>
              <span className="text-gray-900 font-bold">AMD Ryzen 9</span>
            </div>
          </div>

          {/* Right Section */}
          <div className="space-y-4 px-6">
            <h4 className="font-bold text-base">Buyer Detail</h4>
            <div className="text-sm flex flex-row justify-between">
              <p>Buyer Name:</p>
              <span className="text-gray-900 font-bold">Lena Schneider</span>
            </div>
            <div className="text-sm flex flex-row justify-between">
              <p>Requested Unit:</p>
              <span className="text-gray-900 font-bold">45</span>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="grid grid-cols-[1fr_3fr_1fr] gap-4 items-end">
            {/* Qty */}
            <div>
              <QuantityStepper />
            </div>
            {/* Input price */}
            <div>
              <Input label={"Quoted Price at"} placeholder={"Enter Price"} />
            </div>

            {/* Submit Button */}
            <Button variant="primary" size="md">
              Submit
            </Button>
          </div>

          {/* Other actions */}
          <div className="flex items-center justify-between gap-4 text-sm text-gray-600  w-full">
            <Button
              variant="ghost"
              size="sm"
              icon={<Star size={16} />}
              iconPosition="left"
            >
              Shortlist
            </Button>
            <Button
              variant="ghost"
              size="sm"
              icon={<Star size={16} />}
              iconPosition="left"
            >
              Not Relevant
            </Button>
            <Button
              variant="ghost"
              size="sm"
              icon={<Star size={16} />}
              iconPosition="left"
            >
              Reject Quotation
            </Button>
          </div>
        </div>
      </div>
    </div>
    </div>
  )
}

export default Lead
