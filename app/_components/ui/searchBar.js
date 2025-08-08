"use client"
import React, { useState, useEffect, useRef } from "react"
import Cat_dropdown from "./Cat_dropdown"
import Api from '@/_library/Api';

// const Categories = [
//   { label: "ABC Electronics Pvt Ltd", value: "abc" },
//   { label: "Urban Gadget Hub", value: "urban" },
//   { label: "Global Electronics Traders", value: "global" }
// ]

const SearchBar = () => {

  const [categories, set_categories] = useState([])

  useEffect(() => {       
    fetchCategoryData()  
  },[]);  

  const fetchCategoryData = async () => {     
    const res = await Api.categories({       
    }); 
    const resData = res.data.data   
    
    let catArr = []
    resData.map((item, index) => { 
      let obj = { 
        label: item.name, 
        value: item.slug, 
      }
      catArr.push(obj)
    })
    set_categories(catArr) 
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
      <Cat_dropdown options={categories} placeholder="All Categories" ref={dropdownRef} />
      <input
        type="text"
        placeholder="What  are you looking for ?"
        className=" w-full text-white placeholder-gray-100 focus:outline-none focus:ring-0 transition"
      />
    </div>
  )
}
export default SearchBar
