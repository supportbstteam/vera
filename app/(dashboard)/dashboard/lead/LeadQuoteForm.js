"use client"
import React, { useState, useEffect, useRef } from "react"
import { Clock, MapPinned, Star } from "lucide-react"
import Image from "next/image"
import Button from "@/_components/ui/button"  
import Input from "@/_components/ui/Input"  
import Textarea from "@/_components/ui/Textarea"
import QuantityStepper from "@/_components/ui/QuantityStepper" 
import WarrantyStepper from "@/_components/ui/WarrantyStepper" 
import DashboardNavigation from "@/_components/layout/DashboardNavigation"

import Api from '@/_library/Api';
import AllFunctionClient from "@/_library/AllFunctionClient" 
import Loader from "@/_components/ui/Loader" 
import SbButton from "@/_components/ui/SbButton";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'


const LeadQuoteForm = ({quote_suppliers_id}) => {

  const __data = {		
    price: '',
    quantity: 1,
    warranty:0,
    comments: '',
  }
  const __errors = {	
    price: '',
    quantity: '',       
  }
  const MySwal = withReactContent(Swal)  

  const [data,set_data]   	  						    = useState(__data) 
  const [disablebutton, set_disablebutton] 		= useState(false); 
  const [success_message,set_success_message] = useState("")  
  const [common_error,set_common_error] 		  = useState("")  
  const [errors, set_errors]     						  = useState(__errors)   

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

  const handleWarranty = (value) => {
    set_data({
      ...data, 
      warranty:value
    })
  }

  const validate_price = (value)=>{	
    let err     = '';  
    let price  = value ?? data.price
    if(!price){        
      err  = 'Price is required';         
    }	 
    set_errors({
      ...errors,
      price:err
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
      
      let price = validate_price()
      if( price !==''){
        errors.price  = price;
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
            quote_suppliers_id:quote_suppliers_id,
            price:data.price,
            quantity:data.quantity,
            comments:data.comments,
            warranty:data.warranty,                
          }    
              
          try {
            const res = await Api.submit_lead_quotation(obj);

            console.log(res)
            
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
                text: "Quotation is submitted successfully!",
              })		
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
    <form method="post" onSubmit={handleSubmit}>  
    <div className="grid grid-cols-3 gap-4 items-end">                     
      <div className="grid grid-cols-1 mb-3">
        <QuantityStepper handleQuantity={handleQuantity} /> 
        {errors.quantity && 
          <div className="error-msg">{errors.quantity}</div>    
        }  	       
      </div>  
      <div className="grid grid-cols-1 mb-3">
        <WarrantyStepper handleWarranty={handleWarranty} />
        {errors.warranty && 
          <div className="error-msg">{errors.warranty}</div>    
        }  	       
      </div>                             
      <div className="grid grid-cols-1 mb-3">
      <Input label="Quoted Price at" placeholder="Enter Price"
        name="price" 
        value={data.price} 
        onChange={(e)=>{
          handleChange(e)   
          validate_price(e.target.value)         
        }}
      />
      {errors.price && 
        <div className="error-msg">{errors.price}</div>    
      } 
      </div> 
    </div>
    <div className="grid grid-cols-2 gap-4 items-end">                     
      <div className={`grid grid-cols-1 mb-3`}>
      <Textarea
        label="Comments"
        placeholder="Add any details or specifications for your Quote"
        type="address"
        rows="4"
        name="comments" 
        value={data.comments} 
        onChange={(e)=>{
          handleChange(e)          
        }}
        />
        {errors.comments && 
          <div className="error-msg">{errors.comments}</div>    
        }  	
      </div>
      <div className="grid-cols-1 mb-3">
      <SbButton data={{
          type:"submit",
          text:"Submit",
          class:"inline-flex items-center justify-center rounded-md font-medium transition-colors px-4 py-2 text-base bg-primary text-white hover:text-gray-800 hover:bg-primary/80 hover:text-white",
          disabled:disablebutton,
       }} />  
      </div>                    
    </div>
    </form>
  )
}
export default LeadQuoteForm
