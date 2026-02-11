"use client"
import React, { useState, useEffect, useRef } from "react"
import { LifeBuoy, Mail, MapPin, MoveRight, Phone, Smile, Asterisk } from "lucide-react";
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

import TestimonialCard from "@/_components/TestimonialCard";

import { Rating } from '@smastrom/react-rating'
import '@smastrom/react-rating/style.css'

const Feedback = () =>{   

  const __data = {		
    name: '',
    designation: '',
    rating: '',
    description: '',   
  }
  const __errors = {	
    name: '',
    designation: '',
    rating: '',
    description: '',   
  }

  const recaptchaRef = useRef(null);
  const MySwal = withReactContent(Swal)  

  const [data,set_data]   	  						    = useState(__data) 
  const [disablebutton, set_disablebutton] 		= useState(false); 
  const [success_message,set_success_message] = useState("")  
  const [common_error,set_common_error] 		  = useState("")  
  const [errors,set_errors]     						  = useState(__errors)   
  const [recaptchaToken, setRecaptchaToken]   = useState("");
  const [rating, setRating] = useState(0) // Initial value
   
  useEffect(()=>{
   
  },[])   

  const handleChange = (e)=>{	
    const field_name  = e.target.name;
    const field_value = e.target.value;
    set_data({...data, [field_name]: field_value})
  }	 


  const handleRating = (selectedValue)=>{	
      console.log(selectedValue)
      set_data({
        ...data,
        rating: selectedValue
      })
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

  const validate_designation = (value)=>{	
    let err      = '';  
    let designation = value ?? data.designation
    if(!designation){        
      err  = 'Designation is required';         
    }	    
    set_errors({
      ...errors,
      designation:err
    });	 
    return err;	
  }

  const validate_rating = (value)=>{	
    let err     = '';  
    let rating  = value ?? data.rating
    if(!rating){        
      err  = 'Rating is required';         
    }	 
    set_errors({
      ...errors,
      rating:err
    });	 
    return err;	
  } 

  const validate_description = (value)=>{	
    let err     = '';  
    let description  = value ?? data.description
    if(!description){        
      err  = 'Comments is required';         
    }	 
    set_errors({
      ...errors,
      description:err
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
      
      let designation = validate_designation()
      if( designation !==''){
        errors.designation  = designation;
        isValid = false;
      }

      let rating = validate_rating()
      if( rating !==''){
        errors.rating  = rating;
        isValid = false;
      }
      
      let description = validate_description()
      if( description !==''){
        errors.description  = description;
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
          const res = await Api.feedback({           
            name:data.name,            
            designation:data.designation, 
            rating:data.rating,
            description:data.description,
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
              text: "Your feedback is submited successfully.",
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
          <div className="text-left bg-[#f8e9fb] p-8 py-12">            
            <div>
              <p className="h2">Buy Better. Every Time.</p>
              <p className="text-gray-600 pb-5">
                Sign in to compare prices from multiple vendors and buy at the
                best deal, every time.
              </p>
            </div>
            <TestimonialCard />
          </div>
          <div className="p-8 py-8 flex flex-col items-center justify-center">
            <div className="w-full">
              <h1 className="h2">Give Feedback</h1>
              <p className="mb-4">
              How likely are you to recommend our service to a friend or colleague?
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
                      mandatory={true}
                      placeholder=""
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
                        <div className="flex">
                        <label className="block text-sm font-medium text-[#181818]">Designation</label>
                        <Asterisk size={12} color="#E33629" />
                        </div>
                      <select   
                      className="w-full px-4 py-2 border rounded-[8px] focus:outline-none focus:ring-2 focus:ring-primary placeholder:text-sm"                   
                      name="designation" 
                      value={data.designation} 
                      onChange={(e)=>{
                        handleChange(e)
                        validate_designation(e.target.value)
                      }}
                      >
                      <option value=""></option>
                      <option value="Buyer">Buyer</option>
                      <option value="Supplier">Supplier</option>                      
                      </select>
                      {errors.designation && 
                        <div className="error-msg">{errors.designation}</div>    
                      }
                      </div>  	
                  </div>
          
                  <div className={`grid grid-cols-1 mb-3`}>  
                    <div className="flex">
                      <label className="block text-sm font-medium text-[#181818]">
                      Rating
                      </label>
                      <Asterisk size={12} color="#E33629" />
                    </div>               
                  <Rating 
                  style={{ maxWidth: 150 }} 
                  items={5}
                  value={data.rating} 
                  onChange={(value)=>{
                      handleRating(value)
                      validate_rating(value)
                    }}
                  />
                  {errors.rating && 
                    <div className="error-msg">{errors.rating}</div>    
                  }  	
                  </div>

                  <div className={`grid grid-cols-1 mb-3`}>
                  <Textarea
                    label="Comments"
                    mandatory={true}
                    placeholder=""
                    type="address"
                    rows="4"
                    name="description" 
                    value={data.description} 
                    onChange={(e)=>{
                      handleChange(e)   
                      validate_description(e.target.value)       
                    }}
                    />
                    {errors.description && 
                      <div className="error-msg">{errors.description}</div>    
                    }  	
                  </div>            

                  <div className={`grid grid-cols-1 text-end mb-3`}>
                  <ReCAPTCHA
                    sitekey={process.env.NEXT_PUBLIC_RECAPTCHAV2_SITEKEY}
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
export default Feedback;