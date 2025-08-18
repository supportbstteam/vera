"use client"
import { useState } from "react"
import Button from "@/_components/ui/button" 

export default function QuantityStepper({handleQuantity}) {
  
  const [quantity, setQuantity] = useState(1)

  const increment = () => {
    let qty = Math.min(quantity + 1, 99)
    setQuantity(qty)
    handleQuantity(qty)
  }
  const decrement = () => {
    let qty = Math.max(quantity - 1, 1)
    setQuantity(qty)
    handleQuantity(qty)
  }  

  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm text-[#181818] font-medium">No of Item</label>
      <div className="flex items-center border border-gray-300 rounded-[8px] px-2 py-[6px] w-fit">
        <Button
          type="button"
          variant="ghost"
          size="icon"
          onClick={decrement}
          className="text-lg text-gray-500"
        >
        −
        </Button>
        <input
          type="text"
          className="w-12 text-center text-sm font-medium bg-transparent outline-none"
          min="1"
          value={quantity}
          readOnly
        />
        <Button
          type="button"
          variant="ghost"
          size="icon"
          onClick={increment}
          className="text-lg text-gray-500"
        >
        +
        </Button>
      </div>
    </div>
  )
}
