"use client";
import React, { useState, useEffect, useRef, useCallback, Suspense } from "react";
import Link from 'next/link'
import Button from "@/_components/ui/button"
import { usePathname } from 'next/navigation'

const DashboardNavigation = () => {

  const pathname = usePathname()
  let ccp2  = pathname.split('/')
  let current_path  = (ccp2[2]) ? ccp2[2] : ''	
  console.log(current_path)
  //======
  const profile_menu     = ['profile'];
  const quotation_menu   = ['quotaion'];

  const active_class = 'inline-flex items-center justify-center rounded-md font-medium transition-colors cursor-pointer px-4 py-2 text-base border border-primary text-white bg-primary hover:bg-primary/80 hover:text-white'

  const inactive_class = 'inline-flex items-center justify-center rounded-md font-medium transition-colors cursor-pointer px-4 py-2 text-base border border-stock text-black hover:bg-primary'

  return (   
    <>    
    <div className="flex items-center gap-4">       

        <Link className={`${profile_menu.includes(current_path) ? active_class : inactive_class}`} 
        href="/dashboard/profile"
        ><span className="flex items-center gap-2">My Profile</span></Link>

        <Link className={`${quotation_menu.includes(current_path) ? active_class : inactive_class}`} 
        href="/dashboard/quotaion"
        ><span className="flex items-center gap-2">My Quotation</span></Link>

    </div>
    </>    
  );
};
export default DashboardNavigation;