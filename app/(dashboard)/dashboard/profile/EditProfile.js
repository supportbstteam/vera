"use client"
import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link'
import Image from "next/image"
import Input from "@/_components/ui/Input"  
import Textarea from "@/_components/ui/Textarea" 
import Button from "@/_components/ui/button"  

import validation from '@/_library/validation';
import SbButton from "@/_components/ui/SbButton";
import {useRouter} from "next/navigation";

import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

import { useSelector, useDispatch } from 'react-redux'
import { fetchUser } from '@/_library/redux/slice/userReducer'
import Api from '@/_library/Api';
import { off } from 'process';

const EditProfile = ({call_activeTab}) => {

  const router = useRouter();
  const MySwal = withReactContent(Swal)  
  const formRef = useRef(null);

  const dispatch  = useDispatch()
  
  const __data = {	 
    id: '',      
    first_name: '',   
    last_name: '',   
    email: '',   
    mobile: '',   
    address: '',  
    contact_person:''  
  }
  const __errors = {	
    first_name:"",   
    last_name: "",  
    email:"",   
    mobile:"",  
    address:"",   
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
         
          set_data({
            ...data, 
            id: resData.id,   
            first_name: (resData.first_name === null) ? '' : resData.first_name,  
            last_name: (resData.last_name === null) ? '' : resData.last_name,  
            email: (resData.email === null) ? '' : resData.email,  
            mobile: (resData.mobile === null) ? '' : resData.mobile,  
            address: (resData.address === null) ? '' : resData.address,   
            contact_person: (resData.contact_person === null) ? '' : resData.contact_person,   
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

  const validate_last_name = (value)=>{	
    let err     = '';  
    let last_name  = value ?? data.last_name
    if(!last_name){        
      err  = 'Last Name is required';         
    }	 
    set_errors({
      ...errors,
      last_name:err
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
      err  = 'Phone number is required';         
    }	 
    set_errors({
      ...errors,
      mobile:err
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

      let last_name = validate_last_name()
      if( last_name !==''){
        errors.last_name  = last_name;
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

      set_errors(errors);	
      return isValid;	
    }


    const handleSubmit = async(e)=>{
      e.preventDefault();   

      if(validateForm()){	
        set_disablebutton(true)

        try {

          const formData = new FormData(formRef.current); 
          formData.append("profile_image","");  
          //formData.append("id",data.id);  
          console.log('data:',data)    

          const res = await Api.update_profile({  
              id: data.id,      
              formData: formData, 
          }); 

          console.log('res:',res) 
          
          if( res && (res.status === 200) ){ 
            const resData = res.data; 
            dispatch(fetchUser())        
            MySwal.fire({
              //icon: 'success',
              width: '350px',
              animation: true,
              title: '',  
              confirmButtonText: 'Close',          
              text: "Profile updated successfully!",
            })		
            //router.push("/dashboard/profile");  
            call_activeTab('')
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
    <form method='post' encType="mmultipart/form-data" ref={formRef} onSubmit={handleSubmit}>   
    <div className="max-w-7xl m-auto flex flex-col gap-4 py-6 ">

      <div>
        <p className="text-xl font-bold">Update Profile</p>
        <p>Update contact information, and keep your preferences up to date.</p>
      </div>

      <div className={`grid grid-cols-1 sm:grid-cols-2 gap-6`}>

          <div className={`grid grid-cols-1 mb-3`}>
            <Input
            label="First Name"
            placeholder=""
            mandatory={true}
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
            label="Last Name"
            placeholder=""
            mandatory={true}
            name="last_name" 
            value={data.last_name} 
            onChange={(e)=>{
              handleChange(e)
              validate_last_name(e.target.value)
            }}
            />
            {errors.last_name && 
              <div className="error-msg">{errors.last_name}</div>    
            }
          </div>

          <div className={`grid grid-cols-1 mb-3`}>
          <Input
            label="Phone"
            type="text"
            mandatory={true}
            placeholder="9876-54-3210"
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

          <div className={`grid grid-cols-1 mb-3`}>
          <Input
            label="Email"
            type="text"
            mandatory={true}
            placeholder=""
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
        </div>
     
        <div className={`grid grid-cols-1 mb-3`}>
        <Textarea
          label="Address"
          type="address"         
          rows="2"
          placeholder="123 Main St, City, Country"
          name="address" 
          value={data.address} 
          onChange={(e)=>{
              handleChange(e)              
            }}
          />
          {errors.address && 
            <div className="error-msg">{errors.address}</div>    
          }  	
        </div>    

        <div className={`grid grid-cols-1 sm:grid-cols-2 mb-3`}>
        <Input
            label="Contact person phone"
            autoComplete="off"
            type="text"
            placeholder="9876-54-3210"
            name="contact_person" 
            value={data.contact_person} 
            onChange={(e)=>{
              handleChange(e)              
            }}
          />
          {errors.contact_person && 
            <div className="error-msg">{errors.contact_person}</div>    
          }
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
  )
}

export default EditProfile
