import React, { useState, useEffect, useRef } from "react"
import { ChevronDown, ChevronUp } from "lucide-react"


const Cat_dropdown = function Cat_dropdown({
  options = [],
  placeholder = "Select...",
  onChange
}) {
  const [isOpen, setIsOpen] = useState(false)
  const [selected, setSelected] = useState(null)

  const handleSelect = option => {
    setSelected(option)
    setIsOpen(false)
    if (onChange) onChange(option)
  }


  const dropdownRef = useRef(null)
    useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false)
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);


  return (
    <div className="relative inline-block" ref={dropdownRef} >
      {/* Dropdown Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-48 rounded-md  bg-transparent text-white px-4 text-left text-sm shadow-sm focus:outline-none focus:ring-0 flex items-center justify-between"
      >
        <p className="truncate">{selected ? selected.label : placeholder}</p>
        <span className="float-right">
          {" "}
          {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}{" "}
        </span>
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <ul className="absolute mt-3 w-full grid rounded-md border border-gray-200 bg-white shadow-lg z-3 divide-y divide-gray">
          <li
            onClick={() => handleSelect("")}
            className="px-4 py-2 text-sm hover:bg-gray-100 cursor-pointer text-black"
          >
            Select an option
          </li>
          {options.map((option, index) => (
            <li
              key={index}
              onClick={() => handleSelect(option)}
              className=" text-sm px-4 py-2 hover:bg-gray-100 cursor-pointer text-black"
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
export default Cat_dropdown