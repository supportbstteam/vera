"use client"
import React, { useState, useEffect, useRef, useCallback } from 'react';
import SearchBar from "../ui/searchBar"
import { ChevronDown, Search, Tally1 } from "lucide-react"
import Link from 'next/link'
import Image from "next/image"
import Button from "../ui/button"

import Api from '@/_library/Api';

import { useSelector, useDispatch } from 'react-redux'
import { fetchUser } from '@/_library/redux/slice/userReducer'

const Header = () => {

  const dispatch     = useDispatch()
  const userState    = useSelector( (state)=> state.user )  
  const user         = (userState.data) ? userState.data : {};

  const [categories, set_categories] = useState([])
  const [openIndex, setOpenIndex] = useState(null)

  useEffect(() => {
        dispatch(fetchUser())        
	},[]);    

  useEffect(() => {       
      fetchCategoryData()  
  },[]);  

  const fetchCategoryData = async () => {     
    const res = await Api.categories({       
    }); 
    const resData = res.data     
    set_categories(resData.data) 
  }

  const options = []

  // const options = [
  //   { name: 'option1', link: '#' },
  //   { name: 'option2', link: '#' },
  //   { name: 'option3', link: '#' },
  //   { name: 'option4', link: '#' },
  //   { name: 'option5', link: '#' },
  // ]
  
  const dropdownRef = useRef(null)

  useEffect(() => {
    const handleClickOutside = event => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpenIndex(null)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  return (
    <header className="hidden md:block  border-b bg-black">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
        <div className="flex items-center gap-4 justify-between w-full">
          <Link href="/">
          <Image
            src="/logo.png"
            alt="Logo"
            width={162}
            height={86}
            className="w-auto h-12"
          />
          </Link>
          <SearchBar />
          <div className="flex items-center gap-6">
            <Link href="/login" className="text-sm text-white cursor-pointer">
              <span className="hidden md:inline">Login</span>
            </Link>
            <Link href="/register" className="text-sm text-white cursor-pointer">
              <Button className="cursor-pointer">Create Account</Button>
            </Link>
          </div>
        </div>
      </div>
      <nav className="max-w-7xl mx-auto px-4 py-4  flex items-center gap-4 text-sm font-medium text-white">
        <Search size={20} color="#C61AFF" />
        <p className="text-sm">Shop By Category</p>
        <Tally1 strokeWidth={0.75} size={44} color="#fff" className="ml-4" />
        {
          categories.map((item, index) => { 
            return(
              
              <div key={index} className="relative" ref={dropdownRef}>
              <Link 
              href={item.slug}
              onMouseOver={() => setOpenIndex(openIndex === index ? null : index)}
              className="cursor-pointer text-sm flex items-center gap-1"
              >
              {item.name} <ChevronDown size={16} />
              </Link>

              {
                openIndex === index && (
                  <div className="absolute top-full left-0 mt-2 w-48 bg-white text-black rounded shadow-lg z-20">
                    {options.map((opt, idx) => (
                      <a
                        key={idx}
                        href={opt.link}
                        className="block px-4 py-2 hover:bg-gray-100 rounded"
                      >
                      {opt.name}
                      </a>
                    ))}
                  </div>
                )
              }
              </div>

            )      

          })
        }
      </nav>
    </header>
  )
}
export default Header
