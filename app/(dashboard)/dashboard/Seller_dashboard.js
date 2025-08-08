"use client";
import React, { useState, useEffect, useRef, useCallback, Suspense } from "react";
import Card from "@/_components/ui/Card"  
import Badge from "@/_components/ui/Badge" 

import { useSelector, useDispatch } from 'react-redux'
import { fetchUser } from '@/_library/redux/slice/userReducer'

import Api from '@/_library/Api';

const Seller_dashboard = () => {

  // const [categories, set_categories] = useState([])
  // const dispatch     = useDispatch()
  // const userState    = useSelector( (state)=> state.user )  
  // const user         = (userState.data) ? userState.data : {};

  // useEffect(() => { 
  //   dispatch(fetchUser())  
  // },[]); 
  
  // useEffect(() => { 
  //  fetchCategoryData() 
  // },[]); 
  
  // const fetchCategoryData = async () => {  
  //     const res = await Api.seller_categories({   
  //     id:user?.id    
  //     }); 
  //     const resData = res.data.data   
  //     console.log(resData)
  //     set_categories(resData) 
  // }
 
  const info = [
    {
      title: "Quotations Received",
      value: "2040",
      trend: "up",
      image: "/icons/bagBG.png",
      time: "yesterday",
      percent: "5.8"
    },
    {
      title: "Accept Quotation",
      value: "2040",
      trend: "down",
      image: "/icons/checkHand.png",
      time: "yesterday",
      percent: "6.3"
    },
    {
      title: "Reject Quotation",
      value: "2040",
      trend: "up",
      image: "/icons/time.png",
      time: "yesterday",
      percent: "1.6"
    }
  ]

  const Category = [
    { name: "Laptop", icon: "/icons/laptop.png", type: "primary" },
    { name: "Mobile", icon: "/icons/mobile.png", type: "primary" },
    { name: "Tablet", icon: "/icons/tablet.png", type: "primary" },
    { name: "TV", icon: "/icons/TV.png", type: "primary" },
    { name: "Catering  & Hospital", icon: "/icons/Catering-Hospital.png",  type: "primary" }
  ]

  return (
    <>
    <div className="grid grid-cols-3 gap-6 ">
    {info.map((item, index) => (
    <Card key={index} className="mb-4" item={item} />
    ))}
    </div>

    <div className="mt-6">
      <p>Category</p>
      <div className="flex flex-wrap gap-2 mt-2">
        {Category.map((item, index) => (
          <Badge key={index} title={item.name} type={item.type} />
        ))}
      </div>
    </div>
    </>
  )
}

export default Seller_dashboard
