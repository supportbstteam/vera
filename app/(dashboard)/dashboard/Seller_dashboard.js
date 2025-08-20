"use client";
import React, { useState, useEffect, useRef, useCallback, Suspense } from "react";
import Card from "@/_components/ui/Card"  
import Badge from "@/_components/ui/Badge" 
import { useSelector, useDispatch } from 'react-redux'
import { fetchUser } from '@/_library/redux/slice/userReducer'
import Api from '@/_library/Api';
import AllFunctionClient from "@/_library/AllFunctionClient" 
import Loader from "@/_components/ui/Loader" 

const Seller_dashboard = () => {

  const [categories, set_categories] = useState(null)
  const [datacount, set_datacount] = useState(null)
  
  useEffect(() => { 
   fetchCategoryData() 
  },[]); 

  useEffect(() => { 
    fetch_data_count() 
  },[]); 
  
  const fetchCategoryData = async () => {  
      let id = localStorage.getItem(process.env.APP_PREFIX + 'id') ?? ''  
      const res = await Api.seller_categories({   
        supplier_id:id    
      }); 
      const resData = res.data  
      set_categories(resData.data) 
  } 
    
  const fetch_data_count = async () => {  
      let id = localStorage.getItem(process.env.APP_PREFIX + 'id') ?? ''  
      const res = await Api.supplier_data_count({   
        supplier_id:id    
      }); 
      const resData = res.data  
      console.log(resData)
      set_datacount(resData.data) 
  } 
  
  return (
    <>
    <div className="grid grid-cols-3 gap-6">
    {
      datacount && datacount?.info ? 
      datacount.info.map((item, i) => (
        <Card key={i} className="mb-4" item={item} />
      ))
      :
      <Loader />
    }
    </div>

    <div className="mt-6">
      <p>Category</p>
      <div className="flex flex-wrap gap-2 mt-2">
        {
          categories ? 
          categories.map((item, i) => (
            <Badge key={i} title={item.name} type="primary" />
          ))
          :
          <Loader />
        }
      </div>
    </div>
    </>
  )
}

export default Seller_dashboard
