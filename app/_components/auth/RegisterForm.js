"use client";
import React, { useState, useEffect, useRef } from 'react';
import Button from "../ui/button";
import Input from "../ui/Input";

import Api from '@/_library/Api';
import validation from '@/_library/validation';
import SbButton from "@/_components/ui/SbButton";

import {useRouter} from "next/navigation";
import ReCAPTCHA from "react-google-recaptcha";

const RegisterForm = ({handleModalType}) => {

  const __data = {		
    role: '',
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    confirm_password: ''          
  }
  const __errors = {	
    role: '',
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    confirm_password: ''          
  }

  const router = useRouter();
  const recaptchaRef = useRef(null);

  const [data,set_data]   	  						    = useState(__data) 
  const [disablebutton, set_disablebutton] 		= useState(false); 
  const [success_message,set_success_message] = useState("")  
  const [common_error,set_common_error] 		  = useState("")  
  const [errors,set_errors]     						  = useState(__errors)   
  const [recaptchaToken, setRecaptchaToken]   = useState("");

  const handleChange = (e)=>{	
    const field_name  = e.target.name;
    const field_value = e.target.value;
    set_data({...data, [field_name]: field_value})
  }	 

  const handleCaptchaChange = (token) => {
      //console.log(token)
      setRecaptchaToken(token)
  };


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

  const validate_password = (value)=>{	
    let err     = '';  
    let password  = value ?? data.password
    if(!password){        
      err  = 'Password is required';         
    }	 
    set_errors({
      ...errors,
      password:err
    });	 
    return err;	
  } 

  const validate_confirm_password = (value)=>{	
    let err     = '';  
    let password  = data.password ?? ''
    let confirm_password  = value ?? data.confirm_password
    if(!confirm_password){        
      err  = 'Confirm password is required';         
    }	 
    else if(password != confirm_password){        
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

      let password = validate_password()
      if( password !==''){
        errors.password  = password;
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
          const res = await Api.register({
            role:(data.role=='') ? 1 : data.role, 
            first_name:data.first_name, 
            last_name:data.last_name, 
            email:data.email, 
            password:data.password,
            recaptchaToken:recaptchaToken,           
          });
          
          if( res && (res.status === 200) ){
            const resData = res.data; 
            //router.push("/welcome");  
            handleModalType('welcome')
            set_data(__data)           
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

      <div className={`grid grid-cols-1 sm:grid-cols-2 gap-2`}>
          <div className={`grid grid-cols-1 mb-3`}>
          <Input
          label="First Name"
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
          label="Last Name"
          placeholder="Last Name"
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
      </div>
        
      <div className={`grid grid-cols-1 mb-3`}>
      <Input
        label="Email"
        type="text"
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

      <div className={`grid grid-cols-1 sm:grid-cols-2 gap-2`}>
        <div className={`grid grid-cols-1 mb-3`}>
        <Input
          label="Password"
          type="password"
          placeholder=""
          id="password"
          name="password" 
          value={data.password} 
          onChange={(e)=>{
            handleChange(e)
            validate_password(e.target.value)
          }}
        />
        {errors.password &&
          <div className="error-msg">{errors.password}</div>    
        }  
        </div>
      
        <div className={`grid grid-cols-1 mb-3`}>
        <Input
          label="Confirm Password"
          type="password"
          placeholder=""
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
          text:"Sign Up",
          class:"inline-flex items-center justify-center rounded-md font-medium transition-colors px-4 py-2 text-base bg-primary text-white hover:text-gray-800 hover:bg-primary/80 hover:text-white",
          disabled:disablebutton,
       }} />  
       </div>

      <div className="flex flex-col items-center">
        <p>Or</p>
      </div>

      <div className={`grid grid-cols-1 mb-3`}>      
       <Button variant="gray" icon={<img src="/icons/google.png" alt="Google" width={20} height={20} />} iconPosition="left" >Register with Google</Button>
      </div>

      </form>

    </div>
  );
};

export default RegisterForm;
