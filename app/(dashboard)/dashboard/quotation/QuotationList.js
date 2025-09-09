"use client"
import React, { useState, useEffect, useRef } from "react"
import { useRouter, usePathname } from 'next/navigation'
import Image from "next/image"
import Button from "@/_components/ui/button"  
import DashboardNavigation from "@/_components/layout/DashboardNavigation"
import SupplierQuotationCard from "./SupplierQuotationCard" 
import ModalDialog from "@/_components/ui/ModalDialog" 
import Api from '@/_library/Api';
import AllFunctionClient from "@/_library/AllFunctionClient" 
import Loader from "@/_components/ui/Loader" 
import Pagination from '@/_components/ui/pagination/Pagination';
import { Download } from "lucide-react"

const QuotationList = ({__filterData}) =>{   

  const router = useRouter()
  const pathname = usePathname() 
  const item_per_page = AllFunctionClient.limit()
 
  const [total, set_total] = useState(0)   
  const [data, set_data] = useState(null); 
  const [modalType, setModalType] = useState(null) 
  const [quote_id, set_quote_id] = useState("")   
  const [filterData, set_filterData] = useState(__filterData)    

  const handleModalType = (type) => {
    setModalType(type)
  }

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
  
  useEffect(()=>{
    fetch_data(__filterData.page)
  },[])     
  const fetch_data = async (pageNo) => {   

      try {

          let id = localStorage.getItem(process.env.APP_PREFIX + 'id') ?? ''  
          const res = await Api.quotations({
            customer_id:id,
            page_number:pageNo,          
          });           
          
          if( res && (res.status === 200) ){   
            const resData = res.data   
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

  let page_number  = __filterData.page 
  let total_page   = Math.ceil(total/item_per_page);   
  let sl_no        = (total) ? ((page_number - 1) * item_per_page) + 0 : 0;

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
                        Posted on : {AllFunctionClient.getDateTime(item.created_at)}
                        </p>
                      </div>
                      <div>
                        {
                          item.attached_file &&
                          <>
                          <p className="text-sm text-gray-900 flex">
                            Attached file	:&nbsp;
                            <a href={process.env.FILE_UPLOAD_URL+'/'+item.attached_file} target="_blank"><Download /></a>
                          </p>             
                          </>
                        }
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