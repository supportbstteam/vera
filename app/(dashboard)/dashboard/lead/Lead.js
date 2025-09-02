"use client"
import React, { useState, useEffect, useRef } from "react"
import { useRouter, usePathname } from 'next/navigation'
import { Clock, MapPinned, Star, Trash2 } from "lucide-react"
import Image from "next/image"
import Button from "@/_components/ui/button"  
import Input from "@/_components/ui/Input"  
import QuantityStepper from "@/_components/ui/QuantityStepper" 
import DashboardNavigation from "@/_components/layout/DashboardNavigation"

import Api from '@/_library/Api';
import AllFunctionClient from "@/_library/AllFunctionClient" 
import Loader from "@/_components/ui/Loader" 
import LeadQuoteForm from "./LeadQuoteForm" 
import Pagination from '@/_components/ui/pagination/Pagination';

import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const Lead = ({__filterData}) => {

  const router = useRouter()
  const pathname = usePathname() 
  const item_per_page = AllFunctionClient.limit()

  const MySwal = withReactContent(Swal)  
 
  const [total, set_total] = useState(0)   
  const [data, set_data] = useState(null); 
  const [filterData, set_filterData] = useState(__filterData)    

  const handlePaginate = (pageNo)=>{
    set_filterData({
      ...filterData, 
      'page':pageNo
    })
    fetch_data(pageNo); 
    updateBrowserUrl(pageNo)		
  }

  useEffect(() => {       
    updateBrowserUrl(__filterData.page)  
  },[]);  
  
  const handleFetchLeads = ()=>{   
    fetch_data(1); 
  }

  useEffect(()=>{
      fetch_data(__filterData.page)
  },[])     
  const fetch_data = async (pageNo) => {  
    try {

        let id = localStorage.getItem(process.env.APP_PREFIX + 'id') ?? ''  
        const res = await Api.leads({
          supplier_id:id,
          page_number:pageNo,          
        });          
        
        if( res && (res.status === 200) ){   
          const resData = res.data   
          console.log(resData)
          set_total(resData.total)        
          set_data(resData.data) 
          updateBrowserUrl(pageNo)  
        }      
        
    } catch (error) {
        console.log(error.message)            
    }
  }  

  const updateBrowserUrl = (pageNo)=>{	
    let string = ''    
    var count = 0   
    filterData['page'] = pageNo
    Object.entries(filterData).forEach(([key, value]) => {      
      if(value!=''){
          count++
          if(count == 1){
              string += key + '=' +  value    
          }
          else{
              string += '&' + key + '=' +  value
          }      
      } 
    });
		router.push(pathname + (string) ? '?' + string : '')  		
	}

  const shortlist_lead = async (id) => {  
      try {          
          const res = await Api.shortlist_lead({
            id:id,
            shortlist:1,          
          });           
          
          if( res && (res.status === 200) ){   
            fetch_data(1)      	
            MySwal.fire({
              //icon: 'success',
              width: '350px',
              animation: true,
              title: '',  
              confirmButtonText: 'Close',          
              text: "Quotation request is shortlisted successfully!",
            })	
            
          }      
          
      } catch (error) {
          console.log(error.message)            
      }
  }  
  const remove_shortlist_lead = async (id) => {  
      try {          
          const res = await Api.remove_shortlist_lead({
            id:id,
            shortlist:0,          
          });           
          
          if( res && (res.status === 200) ){   
            fetch_data(1)      	
            MySwal.fire({
              //icon: 'success',
              width: '350px',
              animation: true,
              title: '',  
              confirmButtonText: 'Close',          
              text: "Quotation request is removed from Shortlist successfully!",
            })	
            
          }      
          
      } catch (error) {
          console.log(error.message)            
      }
  }  
  const delete_lead = async (id) => {  
      try {          
          const res = await Api.delete_lead({
            id:id,
            deleted:1,          
          });           
          
          if( res && (res.status === 200) ){   
            fetch_data(1)      	
            MySwal.fire({
              //icon: 'success',
              width: '350px',
              animation: true,
              title: '',  
              confirmButtonText: 'Close',          
              text: "Quotation request is deleted successfully!",
            })	
            
          }      
          
      } catch (error) {
          console.log(error.message)            
      }
  } 
  
  const reject_lead = async (id) => {  
      try {          
          const res = await Api.reject_lead({
            id:id,
            status:2,          
          });           
          
          if( res && (res.status === 200) ){   
            fetch_data(1)      	
            MySwal.fire({
              //icon: 'success',
              width: '350px',
              animation: true,
              title: '',  
              confirmButtonText: 'Close',          
              text: "Quotation request is rejected successfully!",
            })	
            
          }      
          
      } catch (error) {
          console.log(error.message)            
      }
  }  

  let page_number  = __filterData.page 
  let total_page   = Math.ceil(total/item_per_page);   
  let sl_no        = (total) ? ((page_number - 1) * item_per_page) + 0 : 0;

  return (
    <div className="max-w-7xl m-auto py-16 flex flex-col gap-6">
        <DashboardNavigation />
        {
          data ?
          <>
          {
            data.map((item, i) => { 
              
              let status = ''
              let background = ''
              if(item.status === 0){
                status = 'Open'
                background = '#eeeecbff'
              }
              else if(item.status === 1){
                status = 'Accepted'
                background = '#a9f8e0ff'
              }
              else if(item.status === 2){
                status = 'Rejected'
                background = '#fcc7a9ff'
              }
              else{
                status = 'Closed'
                background = '#fcc7a9ff'
              }
              
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
                    <LeadQuoteForm quote_suppliers_id={item.id} handleFetchLeads={handleFetchLeads} />                    
                    <div className="flex items-center justify-between gap-4 text-sm text-gray-600  w-full">
                      {
                        item.shortlist == 1 ?
                        <Button
                          variant="ghost"
                          size="sm"
                          icon={<Star size={18} color="#D148FF" />}
                          iconPosition="left"
                          onClick={()=>{
                            remove_shortlist_lead(item.id)
                          }}
                        >
                        Shortlisted
                        </Button>
                        :
                        <Button
                          variant="ghost"
                          size="sm"
                          icon={<Star size={16} />}
                          iconPosition="left"
                          onClick={()=>{
                            shortlist_lead(item.id)
                          }}
                        >
                        Shortlist
                        </Button>
                      }                     

                      <Button
                        variant="ghost"
                        size="sm"
                        icon={<Trash2 size={16} />}
                        iconPosition="left"
                        onClick={()=>{
                          delete_lead(item.id)
                        }}
                      >
                      Not Relevant
                      </Button>   

                      <span className="flex items-start gap-2 cursor-pointer"
                        onClick={()=>{
                          reject_lead(item.id)
                        }}
                      >
                      <Image src="/icons/reject.png" alt="" width={18} height={18} /> Reject Quotation
                      </span>

                    </div> 
                  </div>
                </div>                
                {
                  item.price > 0 ?
                  <>
                  <div className="grid grid-1 p-3 inline-block" style={{background:background, width:"100%"}}> 
                  <b>My Quotation : </b>
                  Quotation Number : <b>{ item.quote_number }</b> &nbsp;&nbsp;&nbsp;
                  No of Item : <b>{ item.quantity }</b> &nbsp;&nbsp;&nbsp;
                  Warranty in Year: <b>{ (item.warranty > 0) ? item.warranty + ' Year' : 'None' }</b> &nbsp;&nbsp;&nbsp;
                  Quoted Price: <b>{ AllFunctionClient.currency(item.price)}</b> &nbsp;&nbsp;&nbsp;
                  Status: <b>{ status }</b> &nbsp;&nbsp;&nbsp;
                  Comments : <b>{ item.comments }</b>
                  </div>
                  </>
                  :
                  ''
                }
                
              </div>
              )

            })           
          }
          { data.length < 1 && <>No record found.</>  }
          </>
          :
          <Loader />
        }


        { total_page > 1 && 
          <div className="overflow-x-auto">
            <Pagination data={{
            'total'			    :total,
            'item_per_page'	:item_per_page,
            'page_number'	  :page_number,
            'handlePaginate':handlePaginate						
            }} />
          </div>
        }	           
        
    
    </div>
  )
}
export default Lead
