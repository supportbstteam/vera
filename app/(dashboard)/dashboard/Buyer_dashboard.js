"use client";
import React, { useState, useEffect, useRef, useCallback, Suspense } from "react";
import Card from "@/_components/ui/Card"  
import Button from "@/_components/ui/button" 
const Buyer_dashboard = () => {

  
  return (
    <div className="border border-stock rounded-md divide-y divide-stock p-6">
    <div className="col-span-2 flex flex-col gap-12 pb-6">             
                 <div className="flex justify-between w-full border border-stock p-6 rounded-lg divide-x divide-stock">
                   <div className="flex-1 flex flex-col pl-4 items-start  ">
                     <p className="font-bold text-lg">10</p>
                     <p className="text-sm text-gray-600">Quotation Post</p>
                   </div>
                   <div className="flex-1 flex flex-col pl-4 items-start  ">
                     <p className="font-bold text-lg">18</p>
                     <p className="text-sm text-gray-600">Offer Receive</p>
                   </div>
                   <div className="flex-1 flex flex-col pl-4 items-start  ">
                     <p className="font-bold text-lg">02</p>
                     <p className="text-sm text-gray-600">My Buy</p>
                   </div>
                 </div>             
                 <div className="text-center">
                   <p className="text-lg text-gray-700 mb-3">
                     You haven't posted any quotations yet.
                   </p>
                   <Button variant="outline">Post Quotation</Button>
                 </div>
               </div>
    </div>
  )
}

export default Buyer_dashboard
