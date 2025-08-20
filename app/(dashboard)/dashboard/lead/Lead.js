"use client"
import React, { useState, useEffect, useRef } from "react"
import { Clock, MapPinned, Star } from "lucide-react"
import Image from "next/image"
import Button from "@/_components/ui/button"  
import Input from "@/_components/ui/Input"  
import QuantityStepper from "@/_components/ui/QuantityStepper" 
import DashboardNavigation from "@/_components/layout/DashboardNavigation"

import Api from '@/_library/Api';
import AllFunctionClient from "@/_library/AllFunctionClient" 
import Loader from "@/_components/ui/Loader" 
import LeadQuoteForm from "./LeadQuoteForm" 

const Lead = () => {

  const item_per_page = AllFunctionClient.limit()
 
  const [total, set_total] = useState(0)   
  const [data, set_data] = useState(null); 

  useEffect(()=>{
      fetch_data()
  },[])     
  const fetch_data = async () => {  
    try {

        let id = localStorage.getItem(process.env.APP_PREFIX + 'id') ?? ''  
        const res = await Api.leads({
          supplier_id:id,
          page_number:1,          
        });          
        
        if( res && (res.status === 200) ){   
          const resData = res.data   
          console.log(resData)
          set_total(resData.total)        
          set_data(resData.data) 
        }      
        
    } catch (error) {
        console.log(error.message)            
    }
  }  

  return (
    <div className="max-w-7xl m-auto py-16 flex flex-col gap-6">
        <DashboardNavigation />
        {
          data ?
          <>
          {
            data.map((item, i) => {  
              return(
              <div key={i} className="border border-stock rounded-xl p-4 space-y-4">        
                <div className="flex items-center justify-between">
                  <div className="flex gap-3 items-center">
                    <Image src={`${process.env.FILE_UPLOAD_URL}/${item.category_image}`} alt="" width={70} height={70} />
                    <div>
                      <h2 className="font-semibold text-sm">{item.search_text}</h2>
                      <p className="text-sm text-gray-900">
                        Category: {item.category_name}
                      </p>
                    </div>
                  </div>
                  <div className="text-sm text-gray-900 flex gap-4 items-center">
                    <div className="flex items-center gap-1">
                      <Clock size={16} />
                      <span>{AllFunctionClient.getTimeAgo(item.created_at)}</span>
                    </div>
                    {/* <div className="flex items-center gap-1">
                      <MapPinned size={16} />
                      <span>Stuttgart, Germany</span>
                    </div> */}
                  </div>
                </div>
                <div className="grid grid-cols-[2fr_3fr] gap-6">
                
                  <div className="grid grid-cols-1 justify-between items-start flex-wrap border border-stock rounded-lg py-6 divide-x divide-stock">               
                    <div className="space-y-4 px-6">
                      <h4 className="font-bold text-base">Buyer Details</h4>
                      <div className="text-sm flex flex-row justify-start">
                        <p>Buyer Name:</p>
                        <span className="text-gray-900 font-bold">{item.first_name}</span>
                      </div>
                      <div className="text-sm flex flex-row justify-start">
                        <p>Requested Unit:</p>
                        <span className="text-gray-900 font-bold">{item.quote_quantity}</span>
                      </div>
                      <div className="text-sm flex flex-row justify-start">
                        <p>Special requirement:</p>
                        <span className="text-gray-900 font-bold">{item.special_requirement}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap items-center gap-3">
                    <LeadQuoteForm quote_suppliers_id={item.id} />                    
                    {/* <div className="flex items-center justify-between gap-4 text-sm text-gray-600  w-full">
                      <Button
                        variant="ghost"
                        size="sm"
                        icon={<Star size={16} />}
                        iconPosition="left"
                      >
                      Shortlist
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        icon={<Star size={16} />}
                        iconPosition="left"
                      >
                      Not Relevant
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        icon={<Star size={16} />}
                        iconPosition="left"
                      >
                      Reject Quotation
                      </Button>
                    </div> */}
                  </div>
                </div>
              </div>
              )

            })           
          }
          { data.length < 1 && <>No record found.</>  }
          </>
          :
          <Loader />
        }
        
    
    </div>
  )
}
export default Lead
