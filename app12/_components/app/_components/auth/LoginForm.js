"use client";
import React, { useState, useEffect, useCallback, useRef  } from 'react';
import Button from "../ui/button";
import Input from "../ui/Input";
import {useRouter} from "next/navigation";
import Api from '@/_library/Api';
import validation from '@/_library/validation';
import SbButton from "@/_components/ui/SbButton";
import Link from "next/link"
import { useSelector, useDispatch } from 'react-redux'
import { fetchUser } from '@/_library/redux/slice/userReducer'
import { saveTokenInCookie } from '@/actions'

import ReCAPTCHA from "react-google-recaptcha";

const LoginForm = ({handleModalType}) => {

  const __data = {	
    email: '',
    password: '',
  }
  const __errors = {	
    email: '',
    password: '',
  }

  const router = useRouter();
  const dispatch = useDispatch()
  const recaptchaRef = useRef(null);
  
  const [data,set_data]   	  						    = useState(__data) 
  const [disablebutton, set_disablebutton] 		= useState(false); 
  const [success_message,set_success_message] = useState("")  
  const [common_error,set_common_error] 		  = useState("")  
  const [errors,set_errors]     						  = useState(__errors)   
  const [recaptchaToken, setRecaptchaToken]   = useState("");
  const [google_auth_url, set_google_auth_url] = useState(null);

  useEffect(()=>{
      get_google_auth_url()
  },[])     

  const get_google_auth_url = async ()=>{	

    try {
      const res = await Api.google_auth_url(); 
      if( res && (res.status === 200) ){
        const resData = res.data;            
        set_google_auth_url(resData.url) 
      } 
      
    } 
    catch (err) {
      set_common_error(err)         
    }

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

    const validateForm = ()=>{		
      let errors          = {};  
      let isValid         = true;      
      
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

      set_errors(errors);	
      return isValid;	
    }

    const handleSubmit = async(e)=>{
      e.preventDefault();   
    
      if(validateForm()){	
        set_disablebutton(true)

        try {
          const res = await Api.login({               
            email:data?.email, 
            password:data?.password,
            recaptchaToken:recaptchaToken,           
          });
          
          if( res && (res.status === 200) ){

            const resData = res.data;           
            const token = resData.token;  
            const token_id = resData.token_id; 
            const role = resData.data.role;   
            const id = resData.data.id;   

            await saveTokenInCookie(token)
            localStorage.setItem(process.env.APP_PREFIX + 'token', token);
            localStorage.setItem(process.env.APP_PREFIX + 'token_id', token_id);
            localStorage.setItem(process.env.APP_PREFIX + 'role', role);
            localStorage.setItem(process.env.APP_PREFIX + 'id', id);
            dispatch(fetchUser()) 

            const selected_category = localStorage.getItem(process.env.APP_PREFIX + 'selected_category') ?? ''
            const selected_category_time = localStorage.getItem(process.env.APP_PREFIX + 'selected_category_time') ?? 0           
            const currentTime = Date.now();
            const sub = currentTime - selected_category_time
            const minutes = Math.round(sub / 1000 / 60);           

            if( selected_category && minutes < 5 ){
              handleModalType('quotation_request')
            }
            else{
              
              localStorage.removeItem(process.env.APP_PREFIX + 'selected_category_time');              
              localStorage.removeItem(process.env.APP_PREFIX + 'selected_category');                   
              localStorage.removeItem(process.env.APP_PREFIX + 'search_text'); 

              router.push("/dashboard");
            }   

          } 
          else {          
            const { status, message, error } = res.data;  
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
        label="Password"
        type="password"
        view_password={true}
        mandatory={true}
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

      <div className={`grid grid-cols-1 text-end mb-3`}> 
      <button type="button" className="cursor-pointer text-end" onClick={() => handleModalType("forgot_password")}>
          <span className="text-primary">Forgot password ?</span>
      </button> 
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
          text:"Login",
          class:"inline-flex items-center justify-center rounded-md font-medium transition-colors px-4 py-2 text-base bg-primary text-white hover:text-gray-800 hover:bg-primary/80 hover:text-white",
          disabled:disablebutton,
       }} />  
       </div>

      <div className="flex flex-col items-center">
        <p>Or</p>
      </div>

      <div className={`grid grid-cols-1 mb-3`}>   
      {
        google_auth_url &&
        <Button type="button" href={google_auth_url} variant="gray" className="cursor-pointer" icon={<img src="/icons/google.png" alt="Google" width={20} height={20} />} iconPosition="left" link_attributes={{ target: "_blank", rel: "noopener" }}>Login with Google</Button>
      } 
      </div>
    </form>
    </div>
  );
};

export default LoginForm;
