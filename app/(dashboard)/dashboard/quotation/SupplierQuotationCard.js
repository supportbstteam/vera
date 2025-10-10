"use client"
import React, { useState, useEffect, useRef } from "react"
import Button from "@/_components/ui/button" 
import Toggle from "@/_components/ui/Toggle" 
import Api from '@/_library/Api';
import AllFunctionClient from "@/_library/AllFunctionClient" 
import Loader from "@/_components/ui/Loader" 
import { Download } from "lucide-react"
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
  
  const handleDownload = (url, fileName) => {
    fetch(url)
      .then((response) => response.blob())
      .then((blob) => {
        const url = window.URL.createObjectURL(new Blob([blob]));
        const link = document.createElement("a");
        link.href = url;
        link.download = fileName || "downloaded-file";
        document.body.appendChild(link);

        link.click();

        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
      })
      .catch((error) => {
        console.error("Error fetching the file:", error);
      });
  };

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
              style={{height:"90px", width:"auto"}}
            />           
          }          
          <div>
            <p className="font-medium">{quote?.search_text}</p>
            <p className="text-sm text-gray-500"><b>Request No. :</b> {quote.id}</p>
            <p className="text-sm text-gray-500">Posted on : {AllFunctionClient.getDateTime(quote?.created_at)}</p>
            {
                quote.attached_file &&
                <>
                <p className="text-sm text-gray-900 flex">
                  <b>Attached file	:</b> &nbsp;
                  <a href={process.env.FILE_UPLOAD_URL+'/'+quote.attached_file} target="_blank"><Download /></a>
                </p>             
                </>
              }
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
                  <div style={{minWidth:"260px"}}>
                    <p className="font-medium text-sm">
                    { item.quote_number &&
                      <>
                      <b>Quotation Number :</b> {item.quote_number} <br />
                      </>
                    }
                    { item.product_code &&
                      <p className="text-sm text-gray-900"><b>Product Code:</b>{ item.product_code }</p>
                    }
                    
                    {/* <b>Vendor :</b> {item.supplier_first_name} {item.supplier_last_name} */}
                    </p>
                    {/* <div className="flex items-center text-sm text-gray-900">
                      <span>⭐ {item.avg_rating}/5</span>
                      <span className="ml-1">({item.total_reviews} reviews)</span>
                    </div> */}
                    { item.quantity > 0 &&
                      <p className="text-sm text-gray-900"><b>Quantity :</b>{ item.quantity }</p>
                    }
                  </div>

                  <div>
                    
                    { item.price_with_margin > 0 &&
                      <p className="text-sm text-gray-900"><b>Price :</b>{ AllFunctionClient.currency(item.price_with_margin) }</p>
                    }

                    { item.discount > 0 &&
                      <p className="text-sm text-gray-900"><b>Discount :</b>- { AllFunctionClient.currency(item.discount) }</p>
                    }

                    { item.carriage > 0 &&
                      <p className="text-sm text-gray-900"><b>Carriage :</b>{ AllFunctionClient.currency(item.carriage) }</p>
                    }

                    { item.total > 0 &&
                      <p className="text-sm text-gray-900"><b>Total :</b>{ AllFunctionClient.currency(item.total) }</p>
                    }
                    
                  </div>

                  <div className="flex-1 ml-4">                             

                  { item.lead_time &&
                    <p className="text-sm text-gray-900"><b>Lead Time	:</b>{ item.lead_time }</p> 
                  }

                  { item.comments &&
                    <p className="text-sm text-gray-900"><b>Comments	:</b>{ 	item.comments }</p>     
                  }
                  
                  {
                    item.attached_file &&
                    <>
                    <p className="text-sm text-gray-900 flex">
                      <b>Download Attached file	:</b>&nbsp;
                      <a href={process.env.FILE_UPLOAD_URL+'/'+item.attached_file} target="_blank"><Download /></a>
                    </p>             
                    </>
                  }
                  
                  </div>

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
