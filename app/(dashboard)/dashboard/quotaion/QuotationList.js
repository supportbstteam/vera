"use client"
import React, { useState, useEffect, useRef } from "react"
import Image from "next/image"
import Button from "@/_components/ui/button"  
import DashboardNavigation from "@/_components/layout/DashboardNavigation"
import SupplierQuotationCard from "./SupplierQuotationCard" 
import ModalDialog from "@/_components/ui/ModalDialog" 
import Api from '@/_library/Api';
import AllFunctionClient from "@/_library/AllFunctionClient" 
import Loader from "@/_components/ui/Loader" 

const QuotationList = () =>{   

  const item_per_page = AllFunctionClient.limit()
 
  const [total, set_total] = useState(0)   
  const [data, set_data] = useState(null); 
  const [modalType, setModalType] = useState(null) 
  const [quote_id, set_quote_id] = useState("")   

  const handleModalType = (type) => {
    setModalType(type)
  }
  
  useEffect(()=>{
    fetch_data()
  },[])     
  const fetch_data = async () => {   

      try {

          let id = localStorage.getItem(process.env.APP_PREFIX + 'id') ?? ''  
          const res = await Api.quotations({
            customer_id:id,
            page_number:1,          
          });           
          
          if( res && (res.status === 200) ){   
            const resData = res.data   
            set_total(resData.total)        
            set_data(resData.data) 
          }      
          
      } catch (error) {
          console.log(error.message)            
      }
  }  

  return (
    <>
    <div className="max-w-7xl m-auto py-16 flex flex-col gap-6">
        <DashboardNavigation />
        <div className="divide-y divide-stock">
          {
            data ?
            <>
            {
              data.map((item, i) => {  

                  return(
                  <div key={i} className="flex items-center justify-between gap-4 py-4">  
                    <div className="w-6/12 flex items-center gap-4">
                      <Image
                        src={`${process.env.FILE_UPLOAD_URL}/${item.category_image}`}
                        alt=""
                        width={80}
                        height={50}
                        className="rounded-md"
                      />
                      <div>
                        <h3 className="font-medium text-base">{item.search_text}</h3>
                        <p className="text-sm text-gray-500">
                        Posted on : {AllFunctionClient.getDate(item.created_at)}
                        </p>
                      </div>
                    </div>
                  
                    <div className="w-6/12 flex items-center justify-between gap-4 ">
                      <span className="text-sm bg-purple-100 text-purple-600 px-3 py-2 rounded-full">
                        {
                          item.total_supplier_quote > 0 ?
                          <>
                          {item.total_supplier_quote} Vendor Show Interest
                          </>
                          :
                          <>
                          No Vendor Show Interest
                          </>
                        }                       
                      </span>
                      {
                        item.status == 1 ?
                          <span className="text-sm px-3 py-2 rounded-full flex items-center gap-1 bg-green-100 text-green-700">
                            <span className="h-2 w-2 bg-current rounded-full" />
                             Active
                          </span>                          
                          :
                          <span className="text-sm px-3 py-2 rounded-full flex items-center gap-1 bg-red-100 text-red-600">
                            <span className="h-2 w-2 bg-current rounded-full" />
                            Closed
                          </span>
                      }
                      <Button variant="outline" size="sm" color="primary" 
                      onClick={()=>{ 
                        set_quote_id(item.id)
                        setModalType('suppliers_quotation')
                      }}
                      >
                      View Detail
                      </Button>                      
                    </div>

                  </div>   
                  ) 
              })
            }
            </>  
            :
            <Loader />
          }
        </div>
    </div>

    {
      modalType === "suppliers_quotation" ?
      <ModalDialog
        isOpen={true}
        onClose={ () => setModalType(false) }
        >        
        <SupplierQuotationCard handleModalType={handleModalType} quote_id={quote_id} />
      </ModalDialog>
      :
      ''
    }

    </>
  )
}
export default QuotationList;