"use client"
import React, { useState, useEffect, useRef } from "react"
import { ChevronDown, ChevronUp, Search } from "lucide-react"
import Button from '@/_components/ui/button'
import Api from '@/_library/Api'

import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

import { useSelector, useDispatch } from 'react-redux'
import { searchAction } from '@/_library/redux/actions/click'
import { event } from "jquery"

const SearchBar = ({handleModalType, loggedIn}) => {

  const MySwal = withReactContent(Swal)  

  const dispatch    = useDispatch()  
  const searchState = useSelector( (state)=> state.search ) 
  
  const dropdownRef = useRef(null)
  const [categories, set_categories] = useState([])
  const [isOpen, setIsOpen] = useState(false)
  const [selected_category, set_selected_category] = useState("")
  const [search_text, set_search_text] = useState("")

  useEffect(() => {       
    fetchCategoryData()  
  },[]);  

  const openQuoteModel = async () => { 

    if(!selected_category){
        // MySwal.fire({
        //   //icon: 'success',
        //   width: '350px',
        //   animation: false,
        //   title: '',  
        //   confirmButtonText: 'Close',          
        //   text: 'Please select category',
        // })	   
        handleModalType('select_category')
        
    }
    else{  
      localStorage.setItem(process.env.APP_PREFIX + 'selected_category', JSON.stringify(selected_category));
      localStorage.setItem(process.env.APP_PREFIX + 'search_text', search_text);  
      if(loggedIn){
        handleModalType('quotation_request')
      }
      else{
        handleModalType('login')
      }

    }
    
    dispatch(searchAction(false))      	
  }  

  useEffect((e) => {     
    if(searchState.open===true){     
      openQuoteModel()      
    }    
  },[searchState]);  

  const fetchCategoryData = async () => {     
    const res = await Api.categories({       
    }); 
    const resData = res.data.data 
    set_categories(resData) 
  }  

  const handleSelect = option => {
    set_selected_category(option)
    setIsOpen(false)    
  }

  
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false)
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);  

  const handleSubmit = async (e)=>{
    e.preventDefault(); 
    openQuoteModel()
  }  

  return (
    <div className="relative w-full md:w-3/6 border-1 border-stock  text-sm rounded-full px-4 py-2 grid grid-cols-[2fr_10fr] items-center justify-start">

      <div className="relative inline-block" ref={dropdownRef} >       
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-48 rounded-md  bg-transparent text-white px-4 text-left text-sm shadow-sm focus:outline-none focus:ring-0 flex items-center justify-between"
          >
          <p className="truncate">{selected_category ? selected_category.name : 'All Categories'}</p>
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
            {categories.map((option, i) => (
              <li
                key={i}
                onClick={() => handleSelect(option)}
                className=" text-sm px-4 py-2 hover:bg-gray-100 cursor-pointer text-black"
              >
              {option.name}
              </li>
            ))}
          </ul>
        )}
      </div>
      
      <form method="post" onSubmit={handleSubmit}>   
      <div className="flex justify-around gap-2">
        
        <input
          type="text"
          placeholder="What are you looking for ?"
          className="w-full text-white placeholder-gray-100 focus:outline-none focus:ring-0 transition"
          name="search_text" 
          value={search_text} 
          autoComplete="off"
          onChange={(e)=>{           
            set_search_text(e.target.value)
          }}
        />

        {/* <Search size={20} color="#fff"  className="cursor-pointer" 
        onClick={()=>{
          handleSearch()
        }}
        />  */}
        <Button type="submit" size="none" variant="none" icon={<Search size={20} color="#fff"  className="cursor-pointer" />} />        
      </div>     
      </form>
    </div>
  )
}
export default SearchBar
