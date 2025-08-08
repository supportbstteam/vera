"use client"
import { useState } from "react"
import Button from "@/_components/ui/button"  

export default function QuantityStepper() {
  const [quantity, setQuantity] = useState(1)

  const increment = () => setQuantity(prev => Math.min(prev + 1, 99))
  const decrement = () => setQuantity(prev => Math.max(prev - 1, 1))

  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm text-gray font-medium">No of Item</label>
      <div className="flex items-center border border-gray-300 rounded-md px-2 py-[6px] w-fit">
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
          value={String(quantity).padStart(2, "0")}
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
