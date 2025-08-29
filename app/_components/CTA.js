"use client";
import React, { useState, useEffect, useRef, useCallback, Suspense } from "react";
import Image from "next/image"
import Button from "./ui/button"
import { useSelector, useDispatch } from 'react-redux'
import { searchAction } from '@/_library/redux/actions/click'
import { ArrowRight } from "lucide-react"

const CTA = () => {

  const dispatch  = useDispatch() 

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 md:py-16">
      <div className="grid grid-cols-1 md:grid-cols-[3fr_3fr_6fr] gap-8 items-center ">
        <div className="flex flex-col items-start justify-center gap-4 ">
          <h2 className=" mb-0 h2  uppercase">READY TO GET STARTED?</h2>
          <p>Let Vera do the hard work for you.</p>

          <Button
            variant="primary"
            size="md"
            icon={<ArrowRight size={16} />}
            iconPosition="right"   
            onClick={()=>{
            
                window.scrollTo({
                  top: 0,
                  behavior: 'auto'
                }); 
      
                dispatch(searchAction(true))            
                
              }}        
          >
            Send your first quote
          </Button>
        </div>
        {/* <div className='bg-[#fef6ff] flex items-center justify-center rounded-xl overflow-hidden h-full'> */}
        <Image
          src="/assets/cta2.png"
          alt="Why Choose VERA"
          width={500}
          height={500}
          className="object-cover h-full w-full rounded-md"
        />
        <Image
          src="/assets/cta1.png"
          alt="Why Choose VERA"
          width={500}
          height={500}
          className="object-cover h-full w-full rounded-md"
        />
        {/* </div> */}
      </div>
    </div>
  )
}

export default CTA
