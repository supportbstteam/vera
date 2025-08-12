"use client";
import React, { useState, useEffect, useCallback  } from 'react';
import Button from "../ui/button";
import Input from "../ui/Input";
import {useRouter} from "next/navigation";
import Api from '@/_library/Api';
import validation from '@/_library/validation';
import SbButton from "@/_components/ui/SbButton";
import Link from "next/link"
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const Reset_password = ({__filterData}) => {

  const __data = {
    new_password: '',
    confirm_password: '' 
  }
  const __errors = {	   
    new_password: '',
    confirm_password: '' 
  }

  const router = useRouter();
  const MySwal = withReactContent(Swal)  

  const token = __filterData.token
  const email = __filterData.email

  
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

  
  const validate_new_password = (value)=>{	
    let err     = '';  
    let new_password  = value ?? data.new_password
    if(!new_password){        
      err  = 'New Password is required';         
    }	 
    set_errors({
      ...errors,
      new_password:err
    });	 
    return err;	
  } 

  const validate_confirm_password = (value)=>{	
    let err     = '';  
    let new_password  = data.new_password ?? ''
    let confirm_password  = value ?? data.confirm_password
    if(!confirm_password){        
      err  = 'Confirm password is required';         
    }	 
    else if(new_password != confirm_password){        
      err  = 'Password mismatch';         
    }	 
    set_errors({
      ...errors,
      confirm_password:err
    });	 
    return err;	
  } 

    const validateForm = ()=>{		
      let errors   = {};  
      let isValid  = true;         

      let new_password = validate_new_password()
      if( new_password !==''){
        errors.new_password  = new_password;
        isValid = false;
      }  
      
      let confirm_password = validate_confirm_password()
      if( confirm_password !==''){
        errors.confirm_password  = confirm_password;
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
          const res = await Api.reset_password({               
            token:token, 
            new_password:data?.new_password,            
          });
          
          if( res && (res.status === 200) ){

            MySwal.fire({
              //icon: 'success',
              width: '350px',
              animation: true,
              title: '',  
              confirmButtonText: 'Close',          
              text: res.data.message,
            })	
            set_data(__data)         
            set_disablebutton(false)                     
            router.push("/");  
          } 
          else {          
            const { status, message, error } = res.data;   
            set_errors(error);	
            set_common_error(message)
            set_disablebutton(false)
          }
        } 
        catch (error) {
          set_common_error('Register failed:', error)
          set_disablebutton(false)
        }

      }			
  }	

  return (
    <div className="grid gap-6">      

      {common_error &&            
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">              
            <span className="block sm:inline">{common_error}</span>
            <span className="absolute top-0 bottom-0 right-0 px-4 py-3 cursor-pointer" onClick={()=>{
              set_common_error('')
            }}>
              <svg className="fill-current h-6 w-6 text-white-500" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
              <title>Close</title>
              <path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15L6.252 6.849a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z"/>
              </svg>
            </span>               
          </div> 
      }  

      <form method="post" onSubmit={handleSubmit}>      
      

      <div className={`grid grid-cols-1 mb-3`}>
      <Input
        label="New Password"
        type="password"
        placeholder=""
        id="new_password"
        name="new_password" 
        value={data.new_password} 
        onChange={(e)=>{
          handleChange(e)
          validate_new_password(e.target.value)
        }}
      />
      {errors.new_password &&
        <div className="error-msg">{errors.new_password}</div>    
      }  
      </div>     

      <div className={`grid grid-cols-1 mb-3`}>
      <Input
        label="Confirm Password"
        type="password"
        placeholder=""
        id="confirm_password"
        name="confirm_password" 
        value={data.confirm_password} 
        onChange={(e)=>{
          handleChange(e)
          validate_confirm_password(e.target.value)
        }}
      />
      {errors.confirm_password &&
        <div className="error-msg">{errors.confirm_password}</div>    
      }  
      </div>  

      <div className={`grid grid-cols-1 mb-3`}>
      <SbButton data={{
          type:"submit",
          text:"Reset Password",
          class:"inline-flex items-center justify-center rounded-md font-medium transition-colors px-4 py-2 text-base bg-primary text-white hover:text-gray-800 hover:bg-primary/80 hover:text-white",
          disabled:disablebutton,
       }} />  
       </div>      
      
    </form>
    </div>
  );
};

export default Reset_password;
