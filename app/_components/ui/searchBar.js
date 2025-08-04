import React from "react"

const SearchBar = () => {
  return (
    <input
      type="text"
      placeholder="Search"
      className=" w-full md:w-3/6 border-1 border-gray-600 text-white text-sm rounded-full px-4 py-2 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary transition"
    />
  )
}

export default SearchBar
