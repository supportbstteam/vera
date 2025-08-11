import React from "react";
import Dropdown from "./Dropdown";
import { Search } from "lucide-react";

const Categories = [
  { label: "ABC Electronics Pvt Ltd", value: "abc" },
  { label: "Urban Gadget Hub", value: "urban" },
  { label: "Global Electronics Traders", value: "global" },
];

const SearchBar = () => {
  return (
    <div className="relative w-full md:w-3/6 border-1 border-stock  text-sm rounded-full px-4 py-2 grid grid-cols-[2fr_10fr] items-center justify-start ">
      <Dropdown options={Categories} placeholder="All Categories" />
      <div className="flex justify-around gap-2">
        <input
          type="text"
          placeholder="What  are you looking for ?"
          className=" w-full text-white placeholder-gray-100 focus:outline-none focus:ring-0 transition"
        />
        <Search size={20} color="#fff"  className="cursor-pointer"/>
      </div>
    </div>
  );
};

export default SearchBar;
