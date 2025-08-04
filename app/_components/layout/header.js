"use client"
import React, { useState, useEffect, useRef, useCallback } from 'react';
import SearchBar from "../ui/searchBar"
import { ChevronDown, Search, Tally1 } from "lucide-react"
import Link from 'next/link'
import Image from "next/image"
import Button from "../ui/button"

import Api from '@/_library/Api';

import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react'


const Header = () => {

  const [categories, set_categories] = useState([])
  const [openIndex, setOpenIndex] = useState(null)
  const [open, setOpen] = useState(false)

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
            <span 
            className="text-sm text-white cursor-pointer"
            onClick={() => setOpen(true)}
            >Login</span>
            <Button>Create Account</Button>
            <Dialog open={open} onClose={()=>setOpen(true)} className="relative z-10">
              <DialogBackdrop
                transition
                className="fixed inset-0 bg-gray-500/75 transition-opacity data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in"
              />

              <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                  <DialogPanel
                    transition
                    className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all data-closed:translate-y-4 data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in sm:my-8 sm:w-full sm:max-w-lg data-closed:sm:translate-y-0 data-closed:sm:scale-95"
                  >
                    <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                      <div className="sm:flex sm:items-start">
                        
                        <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                          <DialogTitle as="h3" className="text-base font-semibold text-gray-900">
                            Deactivate account
                          </DialogTitle>
                          <div className="mt-2">
                            <p className="text-sm text-gray-500">
                              Are you sure you want to deactivate your account? All of your data will be permanently removed.
                              This action cannot be undone.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                      <button
                        type="button"
                        onClick={() => setOpen(false)}
                        className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-red-500 sm:ml-3 sm:w-auto"
                      >
                        Deactivate
                      </button>
                      <button
                        type="button"
                        data-autofocus
                        onClick={() => setOpen(false)}
                        className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-xs ring-1 ring-gray-300 ring-inset hover:bg-gray-50 sm:mt-0 sm:w-auto"
                      >
                        Cancel
                      </button>
                    </div>
                  </DialogPanel>
                </div>
              </div>
            </Dialog>
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
