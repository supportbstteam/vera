"use client"
import React, { useState, useEffect, useRef } from "react"
import { useRouter, usePathname } from 'next/navigation'
import Api from '@/_library/Api';
import { useSelector, useDispatch } from 'react-redux'
import { fetchUser } from '@/_library/redux/slice/userReducer'
import { saveTokenInCookie } from '@/actions'

const Google_callback = ({searchData}) =>{   

  const router = useRouter()
  const pathname = usePathname()  

  const dispatch = useDispatch()
  
  useEffect(()=>{
    google_callback(searchData)
  },[])   

  const google_callback = async (searchData) => {  

      try {   

          let obj = {
            code:searchData.code,
            scope:searchData.scope,
            authuser:searchData.authuser,
            prompt:searchData.prompt,
          }          
        
          const res = await Api.google_callback(obj);           
          
          if( res && (res.status === 200) ){   
                const resData = res.data  
                console.log(resData) 

                const token = resData.token;  
                const token_id = resData.token_id; 
                const role = resData.data.role;   
                const id = resData.data.id;   

                await saveTokenInCookie(token)
                localStorage.setItem(process.env.APP_PREFIX + 'token', token);
                localStorage.setItem(process.env.APP_PREFIX + 'token_id', token_id);
                localStorage.setItem(process.env.APP_PREFIX + 'role', role);
                localStorage.setItem(process.env.APP_PREFIX + 'id', id);
                dispatch(fetchUser()) 

                router.push("/dashboard");
          }      
          
      } catch (error) {
          console.log(error.message)            
      }
  }  

  return (
    <>
    </>
  )
}
export default Google_callback;