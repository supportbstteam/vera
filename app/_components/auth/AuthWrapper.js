"use client";
import React, { useState, useEffect } from "react";
import {useRouter} from "next/navigation";
import { useSelector, useDispatch } from 'react-redux'
import { fetchUser } from '@/_library/redux/slice/userReducer'
import pusherClient from "@/_library/pusher"
import { deleteTokenFromCookie } from '@/actions'

const AuthWrapper = () => {

  const router = useRouter();

  const dispatch     = useDispatch()
  const userState    = useSelector( (state)=> state.user )  
  const user         = (userState.data) ? userState.data : {};
  const [status, set_status] = useState(null);   

  useEffect(() => {  

    const channel = pusherClient.subscribe("my-channel");
    channel.bind("my-event", (data) => {

      console.log("Received notification: ", data);

      const userStatus = data?.message ?? ''
      if(userStatus==0){
        deleteToken()
        set_status(userStatus)
      }
      
    });

    return () => {
      pusherClient.unsubscribe("my-channel");
      pusherClient.disconnect();
    };

  }, []);

  const deleteToken = async ()=>{    

    const promise = new Promise( async (resolve, reject)=>{

      localStorage.removeItem(process.env.APP_PREFIX + 'token');
      localStorage.removeItem(process.env.APP_PREFIX + 'token_id');
      localStorage.removeItem(process.env.APP_PREFIX + 'role');   
      localStorage.removeItem(process.env.APP_PREFIX + 'id'); 
      localStorage.removeItem(process.env.APP_PREFIX + 'selected_category_time');        
      localStorage.removeItem(process.env.APP_PREFIX + 'selected_category');                   
      localStorage.removeItem(process.env.APP_PREFIX + 'search_text');  
      await deleteTokenFromCookie('token') 
      resolve(true) 

    }).then( async(response)=>{ 

      if(response){
        dispatch(fetchUser()) 
        router.push('/')    
      }       
       
    })  






    // localStorage.removeItem(process.env.APP_PREFIX + 'token');
    // localStorage.removeItem(process.env.APP_PREFIX + 'token_id');
    // localStorage.removeItem(process.env.APP_PREFIX + 'role');   
    // localStorage.removeItem(process.env.APP_PREFIX + 'id'); 
    // localStorage.removeItem(process.env.APP_PREFIX + 'selected_category_time');        
    // localStorage.removeItem(process.env.APP_PREFIX + 'selected_category');                   
    // localStorage.removeItem(process.env.APP_PREFIX + 'search_text');  
    // await deleteTokenFromCookie('token')  
    // dispatch(fetchUser())    
  }

  if(status==0){    
    // //router.push('/') 
    // //router.reload();    
    // window.location.href = 'https://vera-alpha-rosy.vercel.app'
  }

  return (
    <></>
  );
};
export default AuthWrapper;
