"use client"
import React, { useState, useEffect, useRef } from 'react';
import Image from "next/image"
import Input from '@/_components/ui/Input'
import Textarea from "@/_components/ui/Textarea"
import Loader from "@/_components/ui/Loader"
import Button from "@/_components/ui/button"
import QuantityStepper from "@/_components/ui/QuantityStepper"

import validation from '@/_library/validation';
import SbButton from "@/_components/ui/SbButton";

import Api from '@/_library/Api'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const QuotationRequestModal = ({handleModalType}) => {

  const __data = {		
    category_id: '',
    category_name: '',
    category_image:'',
    search_text: '',
    customer_id: '',
    first_name: '',
    email: '',
    mobile: '',
    special_requirement: '',
    quantity: 1         

  }
  const __errors = {	
    first_name: '',
    email: '',
    mobile: '',
    quantity: ''          
  }

  const [data,set_data]   	  						    = useState(__data) 
  const [disablebutton, set_disablebutton] 		= useState(false); 
  const [success_message,set_success_message] = useState("")  
  const [common_error,set_common_error] 		  = useState("")  
  const [errors,set_errors]     						  = useState(__errors)   

  useEffect(()=>{
    fetch_data()
  },[])     
  const fetch_data = async () => {
      try {
          const res = await Api.me(); 
          const resData = res.data.data   
          
          let selected_category = localStorage.getItem(process.env.APP_PREFIX + 'selected_category') ?? ''
          selected_category = JSON.parse(selected_category);
          const search_text = localStorage.getItem(process.env.APP_PREFIX + 'search_text') ?? ''            

          set_data({
            ...data, 
            customer_id: resData.id,   
            first_name: (resData.first_name === null) ? '' : resData.first_name,  
            email: (resData.email === null) ? '' : resData.email,  
            mobile: (resData.mobile === null) ? '' : resData.mobile,  
            search_text:search_text,   
            category_id: selected_category.id,      
            category_name: selected_category.name,     
            category_image: selected_category.image,     
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

  const handleQuantity = (value) => {
    set_data({
      ...data, 
      quantity:value
    })
  }

  const validate_first_name = (value)=>{	
    let err     = '';  
    let first_name  = value ?? data.first_name
    if(!first_name){        
      err  = 'First Name is required';         
    }	 
    set_errors({
      ...errors,
      first_name:err
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

  const validate_mobile = (value)=>{	
    let err     = '';  
    let mobile  = value ?? data.mobile
    if(!mobile){        
      err  = 'Phone is required';         
    }	 
    set_errors({
      ...errors,
      mobile:err
    });	 
    return err;	
  } 

  const validate_quantity = (value)=>{	
    let err     = '';  
    let quantity  = value ?? data.quantity
    if(!quantity){        
      err  = 'Quantity is required';         
    }	 
    set_errors({
      ...errors,
      quantity:err
    });	 
    return err;	
  } 

  const validateForm = ()=>{		
      let errors          = {};  
      let isValid         = true;   
      
      let first_name = validate_first_name()
      if( first_name !==''){
        errors.first_name  = first_name;
        isValid = false;
      }     
      
      let email = validate_email()
      if( email !==''){
        errors.email  = email;
        isValid = false;
      }

      let mobile = validate_mobile()
      if( mobile !==''){
        errors.mobile  = mobile;
        isValid = false;
      }

      let quantity = validate_quantity()
      if( quantity !==''){
        errors.quantity  = quantity;
        isValid = false;
      }      

      set_errors(errors);	
      return isValid;	
  }

  const handleSubmit = async(e)=>{
        e.preventDefault();     
        if(validateForm()){	
          set_disablebutton(true)

          let obj = {
              category_id:data.category_id,
              search_text:data.search_text,
              customer_id:data.customer_id,
              first_name:data.first_name,
              email:data.email,
              mobile:data.mobile,
              special_requirement:data.special_requirement,
              quantity:data.quantity,
          }         
  
          try {
            const res = await Api.submit_quotation(obj);
            
            if( res && (res.status === 200) ){
              const resData = res.data;              
              handleModalType('thank_you')

              localStorage.removeItem(process.env.APP_PREFIX + 'selected_category');                   
              localStorage.removeItem(process.env.APP_PREFIX + 'search_text');   

              //set_data(__data)           
              //set_disablebutton(false)  
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
    <section className="max-w-2xl m-auto p-6">

      <div>
        <h3 className="h3">Request a Quotation</h3>
        <p>Fill in the details below so our vendors can send you the best price.</p>
      </div>


      {common_error &&            
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 mt-3 rounded relative" role="alert">              
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
     
      <div className="grid grid-cols-[2fr_3fr] justify-start  items-center gap-6 mt-8">

        <div className={`grid grid-cols-1 mb-3`}>
        <span className="inline-flex justify-center items-center gap-2 text-primary bg-primaryLight px-6 py-3 rounded-[8px]">

          {
            data?.category_image ?
              <Image
                src={`${process.env.FILE_UPLOAD_URL}/${data.category_image}`}
                alt=""
                width={30}
                height={30}
                unoptimized
              />
              :
              <Loader />
          }
          
          {/* <Image
            src="/icons/laptop.png"
            alt=""
            width={30}
            height={30}
            unoptimized
          /> */}
        {" "}
        { data?.category_name}
        </span>
        {/* <span className="inline-flex justify-center items-center gap-2 text-black px-6 py-3 rounded-[8px] border border-gray focus:outline-none focus:ring-2 focus:ring-primary">
          Laptop Asus Vivobook I5 1355U, 8GB RAM, 512GB SSD
        </span> */}     
        </div>   
        
        <div className={`grid grid-cols-1 mb-3`}>
        <Input
          className="h-14"
          label=""
          autoComplete="off"
          placeholder="Laptop Asus Vivobook I5 1355U, 8GB RAM, 512GB SSD"
          name="search_text" 
          value={data.search_text} 
          onChange={(e)=>{
            handleChange(e)            
          }}
          />
          {errors.search_text && 
            <div className="error-msg">{errors.search_text}</div>    
          }  	
        </div>
      </div>
      <div className="grid grid-cols-3 gap-6 my-6">

        <div className={`grid grid-cols-1 mb-3`}>
        <Input
          label="First Name"
          autoComplete="off"
          placeholder="First Name"
          name="first_name" 
          value={data.first_name} 
          onChange={(e)=>{
            handleChange(e)
            validate_first_name(e.target.value)
          }}
          />
          {errors.first_name && 
            <div className="error-msg">{errors.first_name}</div>    
          }  	
        </div>
        
        <div className={`grid grid-cols-1 mb-3`}>
        <Input
          label="Email"         
          placeholder=""
          autoComplete="off"
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
          label="Phone"
          type="text"
          placeholder=""
          name="mobile" 
          value={data.mobile} 
          onChange={(e)=>{
            handleChange(e)
            validate_mobile(e.target.value)
          }}
          />
          {errors.mobile && 
            <div className="error-msg">{errors.mobile}</div>    
          }  	
        </div>

      </div>

      <div className={`grid grid-cols-1 mb-3`}>
      <Textarea
        label="Special Requirements"
        placeholder="Add any details or specifications for your request"
        type="address"
        rows="4"
        name="special_requirement" 
        value={data.special_requirement} 
        onChange={(e)=>{
          handleChange(e)          
        }}
        />
        {errors.special_requirement && 
          <div className="error-msg">{errors.special_requirement}</div>    
        }  	
      </div>

      <div className="flex justify-between items-end mt-4 ">
        <QuantityStepper handleQuantity={handleQuantity} />        
        <SbButton data={{
          type:"submit",
          text:"Request Quotes from Vendors",
          class:"inline-flex items-center justify-center rounded-md font-medium transition-colors px-4 py-2 text-base bg-primary text-white hover:text-gray-800 hover:bg-primary/80 hover:text-white",
          disabled:disablebutton,
       }} />  
      </div>
     
      </form>
      
    </section>
  )
}
export default QuotationRequestModal
