"use client"
import React, { useState, useEffect, useRef } from "react"
import { ChevronDown, ChevronUp, Search } from "lucide-react"
import Api from '@/_library/Api';

const SearchBar = () => {

  const [categories, set_categories] = useState([])
  const [isOpen, setIsOpen] = useState(false)
  const [selected, setSelected] = useState(null)

  useEffect(() => {       
    fetchCategoryData()  
  },[]);  

  const fetchCategoryData = async () => {     
    const res = await Api.categories({       
    }); 
    const resData = res.data.data 
    set_categories(resData) 
  }  

  const handleSelect = option => {
    setSelected(option)
    setIsOpen(false)    
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
    <div className="relative w-full md:w-3/6 border-1 border-stock  text-sm rounded-full px-4 py-2 grid grid-cols-[2fr_10fr] items-center justify-start ">

      <div className="relative inline-block" ref={dropdownRef} >       
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-48 rounded-md  bg-transparent text-white px-4 text-left text-sm shadow-sm focus:outline-none focus:ring-0 flex items-center justify-between"
          >
          <p className="truncate">{selected ? selected.name : 'All Categories'}</p>
          <span className="float-right">
          {" "}
          { isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}{" "}
          </span>
        </button>  
       
        { isOpen && (
          <ul className="absolute mt-3 w-full grid rounded-md border border-gray-200 bg-white shadow-lg z-3 divide-y divide-gray">
            <li
              onClick={() => handleSelect("")}
              className="px-4 py-2 text-sm hover:bg-gray-100 cursor-pointer text-black"
            >
            Select an option
            </li>
            {categories.map((option, index) => (
              <li
                key={index}
                onClick={() => handleSelect(option)}
                className=" text-sm px-4 py-2 hover:bg-gray-100 cursor-pointer text-black"
              >
              {option.name}
              </li>
            ))}
          </ul>
        )}
      </div>


      <div className="flex justify-around gap-2">
        <input
          type="text"
          placeholder="What  are you looking for ?"
          className=" w-full text-white placeholder-gray-100 focus:outline-none focus:ring-0 transition"
        />
        <Search size={20} color="#fff" className="cursor-pointer" />
      </div>      
    </div>
  )
}
export default SearchBar
