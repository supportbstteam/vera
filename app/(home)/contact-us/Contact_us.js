"use client"
import React, { useState, useEffect, useRef } from "react"
import { LifeBuoy, Mail, MapPin, MoveRight, Phone, Smile } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import Loader from "@/_components/ui/Loader" 

import Button from "@/_components/ui/button";
import Input from "@/_components/ui/Input";
import Textarea from "@/_components/ui/Textarea"
import Api from '@/_library/Api';
import validation from '@/_library/validation';
import SbButton from "@/_components/ui/SbButton";
import ReCAPTCHA from "react-google-recaptcha";

import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const Contact_us = () =>{   

  const __data = {		
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',    
  }
  const __errors = {	
    name: '',
    email: '',    
    subject: '',
    message: '',    
  }

  const recaptchaRef = useRef(null);
  const MySwal = withReactContent(Swal)  

  const [data,set_data]   	  						    = useState(__data) 
  const [disablebutton, set_disablebutton] 		= useState(false); 
  const [success_message,set_success_message] = useState("")  
  const [common_error,set_common_error] 		  = useState("")  
  const [errors,set_errors]     						  = useState(__errors)   
  const [recaptchaToken, setRecaptchaToken]   = useState("");   
  const [setting, setSetting] = useState(null);
  
  useEffect(() => {
    get_settings()       
  },[]); 

  const get_settings = async () => {       
      const res = await Api.settings(); 
      const resData = res.data        
      setSetting(resData.data) 
  }

  const handleChange = (e)=>{	
    const field_name  = e.target.name;
    const field_value = e.target.value;
    set_data({...data, [field_name]: field_value})
  }	 

  const handleCaptchaChange = (token) => {
      setRecaptchaToken(token)
  };
  const resetCaptcha = () => {
    recaptchaRef.current?.reset();
    setRecaptchaToken(null); 
  };

  const validate_name = (value)=>{	
    let err     = '';  
    let name  = value ?? data.name
    if(!name){        
      err  = 'Name is required';         
    }	 
    set_errors({
      ...errors,
      name:err
    });	 
    return err;	
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

  const validate_subject = (value)=>{	
    let err     = '';  
    let subject  = value ?? data.subject
    if(!subject){        
      err  = 'Subject is required';         
    }	 
    set_errors({
      ...errors,
      subject:err
    });	 
    return err;	
  } 

  const validate_message = (value)=>{	
    let err     = '';  
    let message  = value ?? data.message
    if(!message){        
      err  = 'Message is required';         
    }	 
    set_errors({
      ...errors,
      message:err
    });	 
    return err;	
  } 

  const validateForm = ()=>{		
      let errors          = {};  
      let isValid         = true;   
      
      let name = validate_name()
      if( name !==''){
        errors.name  = name;
        isValid = false;
      }
      
      let email = validate_email()
      if( email !==''){
        errors.email  = email;
        isValid = false;
      }      

      let subject = validate_subject()
      if( subject !==''){
        errors.subject  = subject;
        isValid = false;
      }    
      
      let message = validate_message()
      if( message !==''){
        errors.message  = message;
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
          const res = await Api.contact({           
            name:data.name,            
            email:data.email, 
            phone:data.phone,
            subject:data.subject,
            message:data.message,
            recaptchaToken:recaptchaToken,           
          });
          
          if( res && (res.status === 200) ){
            const resData = res.data; 
            set_data(__data)           
            set_disablebutton(false)

            MySwal.fire({
              //icon: 'success',
              width: '350px',
              animation: true,
              title: '',  
              confirmButtonText: 'Close',          
              text: "We received your information. We will get back to you soon.",
            })	

          } 
          else {          
            const { status, message, error } = res.data;   
            set_errors(error);	        
            set_common_error(message)
            set_disablebutton(false)
            resetCaptcha()
          }
        } 
        catch (error) {
          set_common_error('Register failed:', error)
          set_disablebutton(false)
        }

      }			
  }	

  return (
    <>
    
      <div className="max-w-7xl mx-auto px-4 py-8 md:py-16">
        <div className="bg-white shadow-md rounded-md grid grid-cols-1 sm:grid-cols-2">
          <div className="justify-between text-left bg-[#f8e9fb] p-8 py-12">             
             
           {
                setting ?
                <>

                <div className="flex gap-2 items-start mb-5">
                <MapPin strokeWidth={1} size="24" />                
                <p dangerouslySetInnerHTML={{ __html: setting.contact_address }}></p> 
                </div>

                <div className="flex gap-2 items-start mb-5">
                <Mail strokeWidth={1} size="24" />
                <p>
                <a href={`mailto:${setting.contact_email}`}>{setting.contact_email}</a>
                </p>
                </div>

                <div className="flex gap-2 items-start mb-5">
                <Phone strokeWidth={1} size="24" />
                  <p>
                    <a href={`tel:${setting.contact_phone}`}>{setting.contact_phone}</a>
                  </p>
                </div>   
                </>
                :
                <Loader />
            }                             

           
          </div>
          <div className="p-8 py-8 flex flex-col items-center justify-center">
            <div className="w-full">
              <h1 className="h2">Contact Us</h1>
              <p className="mb-4">
               Any Query In Mind? Let's Talk It Out!
              </p>
              <div className="border-1 border-stock my-4 mb-8"></div>
              <div className="grid gap-4">   

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

                  <div className={`grid grid-cols-1 sm:grid-cols-2 gap-2`}>
                      <div className={`grid grid-cols-1 mb-3`}>
                      <Input
                      label="Name"
                      placeholder=""
                      mandatory={true}
                      name="name" 
                      value={data.name} 
                      onChange={(e)=>{
                        handleChange(e)
                        validate_name(e.target.value)
                      }}
                      />
                      {errors.name && 
                        <div className="error-msg">{errors.name}</div>    
                      }  	
                      </div>  

                      <div className={`grid grid-cols-1 mb-3`}>
                      <Input
                      label="Phone"
                      placeholder=""
                      name="phone" 
                      value={data.phone} 
                      onChange={(e)=>{
                        handleChange(e)                        
                      }}
                      />
                      {errors.phone && 
                        <div className="error-msg">{errors.phone}</div>    
                      }
                      </div>  	
                  </div>
          
                  <div className={`grid grid-cols-1 mb-3`}>
                  <Input
                    label="Email"
                    type="text"
                    mandatory={true}
                    placeholder="you@example.com"
                    name="email" 
                    value={data.email} 
                    onChange={(e)=>{
                      handleChange(e)
                      validate_email(e.target.value)
                    }}
                  />
                  {errors.email && 
                    <div className="error-msg">{errors.email}</div>    
                  }  	
                  </div>

                  <div className={`grid grid-cols-1 mb-3`}>
                  <Input
                    label="Subject"
                    type="text"
                    mandatory={true}
                    placeholder=""
                    name="subject" 
                    value={data.subject} 
                    onChange={(e)=>{
                      handleChange(e)
                      validate_subject(e.target.value)
                    }}
                  />
                  {errors.subject && 
                    <div className="error-msg">{errors.subject}</div>    
                  }  	
                  </div>


                  <div className={`grid grid-cols-1 mb-3`}>
                  <Textarea
                    label="Message"
                    placeholder=""
                    mandatory={true}
                    type="address"
                    rows="4"
                    name="message" 
                    value={data.message} 
                    onChange={(e)=>{
                      handleChange(e)   
                      validate_message(e.target.value)       
                    }}
                    />
                    {errors.message && 
                      <div className="error-msg">{errors.message}</div>    
                    }  	
                  </div>            

                  <div className={`grid grid-cols-1 text-end mb-3`}>
                  <ReCAPTCHA
                    sitekey={process.env.RECAPTCHAV2_SITEKEY}
                    ref={recaptchaRef}
                    onChange={handleCaptchaChange}
                    size="normal"        
                  />
                  </div>
      
                  <div className={`grid grid-cols-1 mb-3`}>
                  <SbButton data={{
                      type:"submit",
                      text:"Submit",
                      class:"inline-flex items-center justify-center rounded-md font-medium transition-colors px-4 py-2 text-base bg-primary text-white hover:text-gray-800 hover:bg-primary/80 hover:text-white",
                      disabled:disablebutton,
                  }} />  
                  </div>  
                </form>

              </div>
              
            </div>
          </div>
        </div>
      </div>
   
    </>
  )
}
export default Contact_us;