"use client"
import { ChevronDown, Search, Tally1 } from "lucide-react"
import React from "react"

const SearchBarMain = () => {
  const [categoryId, setCategoryId] = React.useState(0)
  const [category, setCategory] = React.useState("")
  const militaryStatusOptions = [
    { label: "Active Duty", value: "activeDuty" },
    { label: "Reserves", value: "reserves" },
    { label: "National Guard", value: "nationalGuard" },
    { label: "Veteran", value: "veteran" },
    { label: "Retirees", value: "retirees" },
    { label: "Military Spouse", value: "militarySpouse" },
    { label: "Surviving Spouse", value: "survivingSpouse" }
  ]
  return (
    <div>
      <div className=" hidden  md:flex items-center w-full max-w-xl border border-[#959595] rounded-full overflow-hidden bg-[#00000080] text-white shadow-sm">
        {/* Dropdown */}
        <button className="flex items-center gap-2 px-4 py-2 text-sm whitespace-nowrap">
          All Category <ChevronDown size={16} />
        </button>
        {/* <Dropdown
                    label=""
                    options={militaryStatusOptions}
                    value={categoryId.toString()}   
                    onChange={(value) => {
                        setCategoryId(Number(value));
                        setCategory(value);
                    }}
                    error={!category ? "Required" : ""}
                /> */}
        <Tally1 size={20} color="#95959580" />

        {/* Input */}
        <input
          type="text"
          placeholder="What are you looking for ?"
          className="w-84 flex-grow px-4  py-2 text-sm text-white placeholder-white focus:outline-none"
        />

        {/* Search Button */}
        <button className="bg-[#C61AFF] hover:bg-[#a915e1] text-white p-3 rounded-full m-1 px-6 py-2">
          <Search size={16} strokeWidth={2.5} />
        </button>
      </div>
    </div>
  )
}

export default SearchBarMain
