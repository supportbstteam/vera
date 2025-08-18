"use client"
import React, { useState, useEffect, useRef } from "react"
import Button from "@/_components/ui/button" 
import Toggle from "@/_components/ui/Toggle" 
import Api from '@/_library/Api';
import AllFunctionClient from "@/_library/AllFunctionClient" 
import Loader from "@/_components/ui/Loader" 

import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const vendors = [
  {
    name: "ABC Electronics Pvt Ltd",
    price: "€679",
    rating: "3.8/5",
    reviews: 256,
    warranty: "1 Year Warranty",
    description:
      "We offer 100% genuine products with manufacturer warranty and free delivery for your peace of mind."
  },
  {
    name: "Urban Gadget Hub",
    price: "€699",
    rating: "4.8/5",
    reviews: 256,
    warranty: "1 Year Warranty",
    description: "N/A"
  },
  {
    name: "Global Electronics Traders",
    price: "€689",
    rating: "2.8/5",
    reviews: 256,
    warranty: "6 Year Warranty",
    description: "Your satisfaction is our priority."
  }
]

const SupplierQuotationCard = ({handleModalType, quote_id}) =>{  

  const MySwal = withReactContent(Swal)  
  
  const [quote, set_quote] = useState(null);  
  const [data, set_data] = useState(null);  
  const [total, set_total] = useState(0)   
  
  useEffect(()=>{
      fetch_quote_row()
      fetch_data()      
  },[])   
  const fetch_quote_row = async () => { 
      try {        
          const res = await Api.quote({
            quote_id:quote_id,            
          });   
          if( res && (res.status === 200) ){   
            const resData = res.data  
            set_quote(resData.data) 
          }      
          
      } catch (error) {
          console.log(error.message)            
      }
  }    
  const fetch_data = async () => {  
      try {          
          const res = await Api.supplier_quotations({
            quote_id:quote_id,
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
  
  const select_vendor = async (id) => {  
      try {          
          const res = await Api.select_vendor({
            id:id,
            status:1,          
          });           
          
          if( res && (res.status === 200) ){   
            fetch_data()      	
            MySwal.fire({
              //icon: 'success',
              width: '350px',
              animation: true,
              title: '',  
              confirmButtonText: 'Close',          
              text: "Vender selected successfully!",
            })	
            
          }      
          
      } catch (error) {
          console.log(error.message)            
      }
  }  
  

  return (
    <div className="max-w-5xl p-4 rounded-lg shadow-sm">
     
      <div className="flex justify-between items-start p-4  rounded-lg mb-4">
        <div className="flex gap-3">
          {
            quote ?
            <img
              src={`${process.env.FILE_UPLOAD_URL}/${quote.category_image}`}
              alt=""
              className="w-12 h-12 rounded object-cover"
            />
            :
            <Loader />
          }          
          <div>
            <p className="font-medium">
            {quote?.search_text}
            </p>
            <p className="text-sm text-gray-500">Posted on : {AllFunctionClient.getDate(quote?.created_at)}</p>
          </div>
        </div>       
      </div>      

      <div className="divide-y divide-stock  px-6">
        {
          data ?
          <>
          {
            data.map((item, i) => {
              return(
                <div key={i} className="grid grid-cols-[1fr_1fr_2fr_1fr] items-center justify-between py-4">
                  <div>
                    <p className="font-medium text-sm">{item.supplier_first_name} {item.supplier_last_name}</p>
                    <div className="flex items-center text-sm text-gray-900">
                      <span>⭐ {item.avg_rating}/5</span>
                      <span className="ml-1">({item.total_reviews} reviews)</span>
                    </div>
                  </div>

                  <div className="">
                    <p className="text-sm text-gray-900">{ item.price > 0 ? AllFunctionClient.currency(item.price) : '' }</p>
                    <p className="text-sm text-gray-900">{ item.warranty > 0 ? item.warranty + ' Year Warranty' : ''}</p>
                  </div>

                  <p className="text-sm text-gray-900 flex-1 ml-4">
                  {item.comments}
                  </p>
                  <div className="flex items-center justify-end gap-2">
                    {
                      item.status == 1 ?
                      <Button
                        variant="primary"
                        size="sm"
                        className="w-fit"
                        color="primary"
                      >
                      Selected
                      </Button>
                      :
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-fit"
                        color="primary"
                        onClick={()=>{
                          select_vendor(item.id)
                        }}
                      >
                      Select Vendor
                      </Button>

                    }                    
                  </div>
                </div>
                )
              })
            }
            </>
            :
            ''
        }

        {/* <div className="flex items-center justify-end gap-6  mt-4 py-4">
          <div className="flex items-center gap-2">
            <span className="text-sm ">Active Quotation</span>
            <Toggle />           
          </div>
          <Button variant="outline" size="sm" className="w-fit">
          Delete Quotation
          </Button>
        </div> */}


      </div>
    </div>
  )
}
export default SupplierQuotationCard;
