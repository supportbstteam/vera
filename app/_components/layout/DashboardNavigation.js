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
  
  const [role, setRole]  = useState("") 

  useEffect(() => {    
    const roleId = localStorage.getItem(process.env.APP_PREFIX + 'role') ?? ''; 
    if (roleId) {
      setRole(roleId);
    }   
  }, []);

  const dashboard_menu   = [''];  
  const quotation_menu   = ['quotation'];
  const lead_menu        = ['lead'];
  const profile_menu     = ['profile'];
  const settings_menu    = ['settings'];

  const active_class = 'inline-flex items-center justify-center rounded-md font-medium transition-colors cursor-pointer px-4 py-2 text-base border border-primary text-white bg-primary hover:bg-primary/80 hover:text-white'

  const inactive_class = 'inline-flex items-center justify-center rounded-md font-medium transition-colors cursor-pointer px-4 py-2 text-base border border-stock text-black hover:bg-primary'

  return (   
    <>    
    <div className="flex flex-col sm:flex-row  justify-start items-start gap-4 px-4">      

        <Link className={`${dashboard_menu.includes(current_path) ? active_class : inactive_class}`} 
        href="/dashboard"
        ><span className="flex items-center gap-2">Dashboard</span></Link>

        <Link className={`${profile_menu.includes(current_path) ? active_class : inactive_class}`} 
        href="/dashboard/profile"
        ><span className="flex items-center gap-2">My Profile</span></Link>

        {
          role && role == 1 ?
          <Link className={`${quotation_menu.includes(current_path) ? active_class : inactive_class}`} 
          href="/dashboard/quotation"
          ><span className="flex items-center gap-2">My Quotations</span></Link>
          :
          role && role == 2 ?
          <Link className={`${lead_menu.includes(current_path) ? active_class : inactive_class}`} 
          href="/dashboard/lead"
          ><span className="flex items-center gap-2">My Leads</span></Link>
          :
          ''
        }

        <Link className={`${settings_menu.includes(current_path) ? active_class : inactive_class}`} 
        href="/dashboard/settings"
        ><span className="flex items-center gap-2">Settings</span></Link>
        
    </div>
    </>    
  );
};
export default DashboardNavigation;