"use client"
import React, { useState, useEffect, useRef } from "react"
import Button from "@/_components/ui/button" 
import Toggle from "@/_components/ui/Toggle" 
import Api from '@/_library/Api';
import AllFunctionClient from "@/_library/AllFunctionClient" 
import Loader from "@/_components/ui/Loader" 

import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const SupplierQuotationCard = ({handleModalType, quote_id}) =>{  

  const MySwal = withReactContent(Swal)  
  
  const [quote, set_quote] = useState(null);  
  const [data, set_data] = useState(null);  
  const [total, set_total] = useState(0)   
  const [selected, set_selected] = useState(0)     
  
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
      set_data(null)      	
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
    <div className="max-w-5xl min-w-3xl p-4 rounded-lg shadow-sm"> 

    { data && quote ?

      <>
      <div className="flex justify-between items-start p-4  rounded-lg mb-4">
        <div className="flex gap-3">
          {
            quote &&
            <img
              src={`${process.env.FILE_UPLOAD_URL}/${quote.category_image}`}
              alt=""
              className="w-12 h-12 rounded object-cover"
            />           
          }          
          <div>
            <p className="font-medium">
            {quote?.search_text}
            </p>
            <p className="text-sm text-gray-500">Posted on : {AllFunctionClient.getDate(quote?.created_at)}</p>
          </div>
        </div>       
      </div>      

      <div className="divide-y divide-stock px-6 max-h-[70vh] overflow-y-auto">        
        {
          data ?
          <>
          {
            data.map((item, i) => {
              return(
                <div key={i} className="grid grid-cols-[1fr_1fr_2fr_1fr] items-center justify-between py-4">
                  <div>
                    <p className="font-medium text-sm">
                    Quotation Number: {item.quote_number} <br />
                    {item.supplier_first_name} {item.supplier_last_name}
                    </p>
                    <div className="flex items-center text-sm text-gray-900">
                      <span>⭐ {item.avg_rating}/5</span>
                      <span className="ml-1">({item.total_reviews} reviews)</span>
                    </div>
                  </div>

                  <div className="">
                    <p className="text-sm text-gray-900">{ item.price_with_margin > 0 ? AllFunctionClient.currency(item.price_with_margin) : '' }</p>
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
                      item.status == 2 ?
                      <Button
                        variant="red"
                        size="sm"
                        className="w-fit"
                        color="primary"
                      >
                      Rejected by supplier
                      </Button>
                      :
                      item.status == 0 && item.supplier_selected > 0 ?
                      '--'
                      :
                      item.status == 0 && item.supplier_selected <= 0 && item.price_with_margin > 0 ?
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
                      :
                      ''

                    }                    
                  </div>
                </div>
                )
              })    

            }
            { data.length < 1 && 'No vendor posted any price quotation yet.' }
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
        </div>*/}
      </div>
      </>
      :
      <div className="text-center">        
        <Loader data={{ 
          width:100, 
          height:100
        }} />
      </div>
   }      
    </div>
  )
}
export default SupplierQuotationCard;
