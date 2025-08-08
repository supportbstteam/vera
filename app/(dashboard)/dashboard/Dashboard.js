"use client";
import React, { useState, useEffect, useRef, useCallback, Suspense } from "react";
import Card from "@/_components/ui/Card"  
import DashboardNavigation from "@/_components/layout/DashboardNavigation"
import Buyer_dashboard from "./Buyer_dashboard"
import Seller_dashboard from "./Seller_dashboard"

const Dashboard = () => {

  const [role, setRole]  = useState("") 
  
  useEffect(() => {    
    const roleId = localStorage.getItem(process.env.APP_PREFIX + 'role') ?? ''; 
    if (roleId) {
      setRole(roleId);
    }   
  }, []);
 
  return (
    <div className="max-w-7xl m-auto py-16 flex flex-col gap-6">
      <DashboardNavigation />
      {
          role && role == 1 ?
          <Buyer_dashboard />
          :
          role && role == 2 ?
          <Seller_dashboard />
          :
          ''
      }      
    </div>
  )
}

export default Dashboard
