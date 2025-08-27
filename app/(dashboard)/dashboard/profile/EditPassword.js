"use client"
import React, { useState, useEffect, useRef } from 'react';
import Input from "@/_components/ui/Input"  
import Button from "@/_components/ui/button"  
import { ChevronDown, ChevronUp } from "lucide-react"

import Api from '@/_library/Api';
import validation from '@/_library/validation';
import SbButton from "@/_components/ui/SbButton";

import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const EditPassword = () => {


  const __data = {	 
    current_password: '',      
    new_password: '',   
    confirm_password: '',  
  }
  const __errors = {	
    current_password: '',      
    new_password: '',   
    confirm_password: '',  
  }

  const MySwal = withReactContent(Swal)  
  const formRef = useRef(null);

  const [id, setId]                           = useState("")
  const [data,set_data]   	  						    = useState(__data) 
  const [disablebutton, set_disablebutton] 		= useState(false); 
  const [success_message,set_success_message] = useState("")  
  const [common_error,set_common_error] 		  = useState("")  
  const [errors,set_errors]     						  = useState(__errors)  
  const [isOpen, setIsOpen]                   = useState(false)


  useEffect(()=>{
    fetch_data()
  },[])   
  
  const fetch_data = async () => {
      try {
          const res = await Api.me(); 
          const resData = res.data.data 
          setId(resData.id)          
      } catch (error) {
          console.log(error.message)            
      }
  }  

  const handleChange = (e)=>{	
      const field_name  = e.target.name;
      const field_value = e.target.value;
      set_data({...data, [field_name]: field_value})
  }	 
  
  const validate_current_password = (value)=>{	
    let err     = '';  
    let current_password  = value ?? data.current_password
    if(!current_password){        
      err  = 'Current password is required';         
    }	    
    set_errors({
      ...errors,
      current_password:err
    });	 
    return err;	
  } 
  const validate_new_password = (value)=>{	
    let err     = '';  
    let new_password  = value ?? data.new_password
    let response  = validation.validatePassword(new_password)
    if(!new_password){        
      err  = 'New password is required';         
    }	 
    else if(response.status===false){
      err  = response.error;         
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

      let errors          = {};  
      let isValid         = true;   
      
      let current_password = validate_current_password()
      if( current_password !==''){
        errors.current_password  = current_password;
        isValid = false;
      }
      
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
  
            const formData = new FormData(formRef.current);            
            const res = await Api.update_password({  
                id:id,      
                formData: formData, 
            }); 
            
            if( res && (res.status === 200) ){ 
             
              MySwal.fire({
                //icon: 'success',
                width: '350px',
                animation: true,
                title: '',  
                confirmButtonText: 'Close',          
                text: "Password updated successfully!",
              })	
              set_data(__data)
              setIsOpen(false)
              set_disablebutton(false)

            } 
            else {          
              const { status, message, error } = res.data;   
              set_errors(error);	        
              set_common_error(message)
              set_disablebutton(false)
            }  
            
          } 
          catch (error) {
            set_common_error(error)
            set_disablebutton(false)
          }
  
        }			
    }	 

  return (
    <div className="border border-stock p-6 flex flex-col gap-4 py-6 rounded-md">
      <div className="flex justify-between items-center pb-6">
        <div>
          <p className="text-xl font-bold">Change Password</p>
          <p>
          Change it Regularly, Stay Secure.
          </p>
        </div>
        <Button
          variant="icon"
          onClick={() => setIsOpen(!isOpen)}
          icon={isOpen ? <ChevronUp /> : <ChevronDown />}
        />
      </div>
      {isOpen && (
        <form method='post' encType="mmultipart/form-data" ref={formRef} onSubmit={handleSubmit}>   
        <div>

          <div className={`grid grid-cols-1 sm:grid-cols-2 gap-6`}>

            <div className={`grid grid-cols-1 mb-3`}>
            <Input
              label="Current Password"             
              type="password"
              view_password={true}
              placeholder=""
              mandatory={true}
              name="current_password" 
              id="current_password" 
              value={data.current_password} 
              onChange={(e)=>{
                handleChange(e)
                validate_current_password(e.target.value)
              }}
            />
            {errors.current_password &&
              <div className="error-msg">{errors.current_password}</div>    
            }  
            </div>

            <div className={`grid grid-cols-1 mb-3`}>
            <Input
              label="New Password"
              type="password"
              view_password={true}
              placeholder=""
              mandatory={true}
              name="new_password" 
              id="new_password" 
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
              view_password={true}
              mandatory={true}
              placeholder=""
              name="confirm_password" 
              id="confirm_password" 
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

          </div>         

          <div className={`flex justify-end mt-4`}>
          <SbButton data={{
              type:"submit",
              text:"Update",
              class:"inline-flex items-center justify-center rounded-md font-medium transition-colors px-4 py-2 text-base bg-primary text-white hover:text-gray-800 hover:bg-primary/80 hover:text-white",
              disabled:disablebutton,
          }} />  
          </div>          


        </div>
        </form>
      )}
    </div>
  )
}

export default EditPassword
