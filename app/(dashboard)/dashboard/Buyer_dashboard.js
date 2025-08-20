"use client";
import React, { useState, useEffect, useRef, useCallback, Suspense } from "react";
import Card from "@/_components/ui/Card"  
import Button from "@/_components/ui/button" 

import Api from '@/_library/Api';
import AllFunctionClient from "@/_library/AllFunctionClient" 
import Loader from "@/_components/ui/Loader" 

import { useSelector, useDispatch } from 'react-redux'
import { searchAction } from '@/_library/redux/actions/click'

const Buyer_dashboard = () => {

  const dispatch    = useDispatch()  
  const searchState = useSelector( (state)=> state.search ) 

  const [datacount, set_datacount] = useState(null)
    
  useEffect(() => { 
    fetch_data_count() 
  },[]); 
  
  const fetch_data_count = async () => {  
      let id = localStorage.getItem(process.env.APP_PREFIX + 'id') ?? ''  
      const res = await Api.customer_data_count({   
        customer_id:id    
      }); 
      const resData = res.data  
      set_datacount(resData.data) 
  }
  
  return (
    <div className="border border-stock rounded-md divide-y divide-stock p-6">
      <div className="col-span-2 flex flex-col gap-12 pb-6">             
      <div className="flex justify-between w-full border border-stock p-6 rounded-lg divide-x divide-stock">
        
        <div className="flex-1 flex flex-col pl-4 items-center">
        <p className="font-bold text-lg">{ datacount?.quotation_post }</p>
        <p className="text-sm text-gray-600">Quotation Post</p>
        </div>

        <div className="flex-1 flex flex-col pl-4 items-center">
        <p className="font-bold text-lg">18</p>
        <p className="text-sm text-gray-600">Offer Receive</p>
        </div>

        <div className="flex-1 flex flex-col pl-4 items-center">
        <p className="font-bold text-lg">02</p>
        <p className="text-sm text-gray-600">My Buy</p>
        </div>

      </div>             
      <div className="text-center">
        <p className="text-lg text-gray-700 mb-3">
        You haven't posted any quotations yet.
        </p>
        <Button variant="outline" onClick={()=>{
          dispatch(searchAction(true))      	
        }}>Post Quotation</Button>
      </div>
      </div>
    </div>
  )
}

export default Buyer_dashboard
