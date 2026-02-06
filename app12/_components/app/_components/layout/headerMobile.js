"use client"
import React, { useState, useEffect, useCallback } from 'react';
import SearchBar from "../ui/searchBar"
import { ChevronDown, Menu, Search, X } from "lucide-react"
import Button from "../ui/button"
import Link from 'next/link'
import Image from "next/image"

import Api from '@/_library/Api';
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react'

const HeaderMobile = () => {

  const [isToggle, setIsToggle] = React.useState(false)
  const [isSearch, setIsSearch] = React.useState(false)
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
  
  const options =[]
  // const options = [
  //   { name: "option1", link: "#" },
  //   { name: "option2", link: "#" },
  //   { name: "option3", link: "#" },
  //   { name: "option4", link: "#" },
  //   { name: "option5", link: "#" }
  // ]

  return (
    <>
    <header className="md:hidden  border-b bg-white">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between gap-4">
        {/* Left Section: Logo */}
        <div className="w-full flex items-center gap-4 justify-between">
          <Link href="/">
          <Image
            src="/logoMobile.png"
            alt="Logo"
            width={138}
            height={72}
            className="w-auto h-9"
          />
          </Link>
          <div className="flex items-center gap-2">
            <Search size={20} onClick={() => setIsSearch(!isSearch)} />

            {isToggle ? (
              <X onClick={() => setIsToggle(!isToggle)} />
            ) : (
              <Menu onClick={() => setIsToggle(!isToggle)} />
            )}
          </div>
        </div>
      </div>
      {isSearch ? (
        <div className="container mx-auto px-4 py-2">
          <SearchBar />
        </div>
      ) : null}

      <div>
        {isToggle ? (
          <nav className="border-t border-[#9595954b] py-8">
            <div className="container mx-auto px-4 py-4  flex flex-col items-center gap-4 text-sm font-medium text-black">
              {/* <AlignJustify size={16} />  */}
              <p className="text-base">Shop By Category</p>
              {/* <Tally1 size={20} color='#95959580' /> */}             
              {
                categories.map((item, index) => { 
                  return(
                    <div key={index} className="relative w-full flex flex-col items-start">
                    <span                    
                    className="cursor-pointer text-base flex items-center gap-1"
                    >
                    <Link href={item.slug}>{item.name}</Link>
                    <ChevronDown 
                    size={16} 
                    onClick={() =>
                      setOpenIndex(openIndex === index ? null : index)
                    }
                    />
                    </span>
                    {
                      openIndex === index && (
                        <div className="w-full px-4 py-2 bg-gray-100">
                          {
                            options.map((opt, idx) => (
                            <a
                              key={idx}
                              href={opt.link}
                              className="block px-4 py-2 hover:bg-gray-300 rounded"
                            >
                            {opt.name}
                            </a>
                            ))
                          }
                        </div>
                      )
                    }
                    </div>
                  )      
      
                })
              }

            </div>
            <div className="flex items-center flex-col gap-6">
              <span className="text-base text-black"
              onClick={() => setOpen(true)}
              >Login</span>              
              <Button variant="primary">Create Account</Button>

              
            </div>
          </nav>
        ) : (
          ""
        )}
      </div>
      
    </header>
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
    </>
  )
}

export default HeaderMobile
