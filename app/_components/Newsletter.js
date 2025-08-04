"use client"
import React, { useState, useEffect } from 'react';
import { ArrowRight } from "lucide-react"
import Image from "next/image"
import { MoveRight } from "lucide-react"

import Api from '@/_library/Api';
import validation from '@/_library/validation';
import SbButton from "@/_components/ui/SbButton";

import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

export default function Newsletter(){

  const __data = {	
    email: '',      
  }
  const __errors = {	      
    email: '',      
  }

  const MySwal = withReactContent(Swal)               

  const [data,set_data]   	  						    = useState(__data)  
  const [disablebutton, set_disablebutton] 		= useState(false);  
  const [success_message,set_success_message] = useState("")  
  const [common_error,set_common_error] 		  = useState("")  
  const [errors,set_errors]     						  = useState(__errors)  

  const handleChange = (e)=>{	
    const field_name  = e.target.name;
    const field_value = e.target.value;
    set_data({...data, [field_name]: field_value})
  }	 

  const validate_email = (value)=>{	
    let err      = '';  
    let email = value ?? data.email
    if(!email){        
      err  = 'Email is required';         
    }	 
    else if(!validation.validateEmail(email)){       
        err  = 'Email is not valid!';
    }		
    set_errors({
      ...errors,
      email:err
    });	 
    return err;	
  }

  const validateForm = ()=>{		
      let errors          = {};  
      let isValid         = true;  
      
      let email = validate_email()
      if( email !==''){
        errors.email  = email;
        isValid = false;
      }      
      set_errors(errors);	
      return isValid;	
  }

  const handleSubmit = async(e)=>{
      e.preventDefault();   

      if(validateForm()){	

        set_disablebutton(true)

        try {          
            const res = await Api.newsletter({  
              email:data.email,               
            }); 
            console.log(res.status)
            if( res && (res.status === 200) ){    

              MySwal.fire({
                  icon: 'success', 
                  text:'You have successfully subscribed to our newsletter!', 
                  confirmButtonColor: '#3085d6'
              }) 
              
              set_data(__data)   
              set_success_message(resData.message)    
              
              
            } 
            else {              
              const resData = res.data;               
              const error = resData.error ?? ''              
              set_errors(error)              
            } 
            set_disablebutton(false)    

        } 
        catch (err) {
          set_common_error(err)
          set_disablebutton(false)
        }        

      }			
  }	

  return (
    <>
    <p className="text-2xl font-semibold">Let's keep in touch</p>
    <form className="row g-3" method="post" onSubmit={handleSubmit}>                    
    <div className="flex items-center border-1 border-gray-600 text-white text-sm  rounded-md overflow-hidden px-2">
      <input
        type="text"
        placeholder="enter your email address"
        className="px-3 py-2  w-full text-sm placeholder-gray-400"
        name="email" 
        value={data?.email} 
        autoComplete="off"
        onChange={(e)=>{
          handleChange(e)
          validate_email(e.target.value)
        }}
      />
      <SbButton data={{
        type:"submit",
        text:"",
        class:"px-4 py-2 text-white",
        disabled:disablebutton,
        icon:MoveRight
      }} />  
    </div>
    {errors.email && 
      <div className="error-msg">{errors.email}</div>    
    }  				
    </form>
    </>
  )
}
