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

const EditSettings = () => {


  const __data = {	 
    email_notifications: '', 
  }
  const __errors = {	
    email_notifications: '',  
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
          set_data({
            ...data, 
            email_notifications: resData.email_notifications
          })
          
      } catch (error) {
          console.log(error.message)            
      }
  }  

  const handleChange = (e)=>{	
      const field_name  = e.target.name;
      const field_value = e.target.value;
      set_data({...data, [field_name]: field_value})
  }	 

  const handleCheckbox = (e, field_name) => {
    const isChecked = e.target.checked;   
    if(isChecked){      
      set_data({
          ...data, 
          [field_name]: 1
      })
    }
    else{
      set_data({
          ...data, 
          [field_name]: 0
      })
    }	
  }  

   const validateForm = ()=>{	
      let errors          = {};  
      let isValid         = true;  
      set_errors(errors);	
      return isValid;	
    }

     const handleSubmit = async(e)=>{
        e.preventDefault();  
  
        if(validateForm()){	

          set_disablebutton(true)
  
          try {
  
            const formData = new FormData(formRef.current);        
            formData.append("email_notifications", data.email_notifications);    
            const res = await Api.customer_settings({  
                id:id,      
                formData:formData, 
            }); 
            
            if( res && (res.status === 200) ){ 
             
              MySwal.fire({
                //icon: 'success',
                width: '350px',
                animation: true,
                title: '',  
                confirmButtonText: 'Close',          
                text: "Settings updated successfully!",
              })	             
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
          <p className="text-xl font-bold">My Settings</p>
          <p> Manage your notifications and other stuff</p>
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

              <div className="flex items-center space-x-4">
                <div>Email Notification : </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" 
                  className="sr-only peer" 
                  name="email_notifications"                  
                  onChange={(e)=>{
                    handleCheckbox(e,'email_notifications')                            
                  }}
                  checked={ data.email_notifications == 1 ? true : false } 
                  />
                  <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-blue-600 after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border after:border-gray-300 after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-full peer-checked:after:border-white"></div>
                  {
                    data.email_notifications == 1 ? 
                    <span className="ml-3 text-sm font-bold text-green-500">ON</span>
                    : 
                    <span className="ml-3 text-sm font-bold text-gray-500">OFF</span>
                  }
                  
                </label>  
              </div>            
            {errors.confirm_password &&
              <div className="error-msg">ddfddf{errors.confirm_password}</div>    
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

export default EditSettings
