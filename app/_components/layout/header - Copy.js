"use client"
import React, { useState, useEffect, useRef } from "react"
import SearchBar from '@/_components/ui/searchBar'
import Link from "next/link"
import Image from "next/image"
import Button from '@/_components/ui/button'
import Api from "@/_library/Api"
import ProfileButton from "./ProfileButton";
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

  
  return (
    <header className="hidden md:block bg-black ">
      <div className="max-w-7xl mx-auto px-4 py-6 flex items-center justify-between gap-4 border-b border-stock">
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
            <ProfileButton /> 

            {/* <Link href="/testing" className="text-sm text-white cursor-pointer">
              <span className="text-sm text-white cursor-pointer">testing</span>
            </Link>
            <Link
              href="/register"
              className="text-sm text-white cursor-pointer"
            >
              <Button>Create Account</Button>
            </Link> */}

          </div>
        </div>
      </div>
    </header>
  )
}
export default Header
