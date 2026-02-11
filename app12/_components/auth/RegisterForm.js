"use client";
import React, { useState, useEffect, useRef } from 'react';
import Button from "../ui/button";
import Input from "../ui/Input";
import Api from '@/_library/Api';
import validation from '@/_library/validation';
import SbButton from "@/_components/ui/SbButton";
import {useRouter} from "next/navigation";
import ReCAPTCHA from "react-google-recaptcha";
import { ChevronDown, ChevronUp, Search, Tally1 } from "lucide-react"

const RegisterForm = ({handleModalType}) => {

  const __data = {		
    role: 1,
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    confirm_password: '',
    categories:[]          
  }
  const __errors = {	
    role: '',
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    confirm_password: '',
    categories:''         
  }

  const router = useRouter();
  const recaptchaRef = useRef(null);
  const dropdownRef = useRef(null)

  const [data,set_data]   	  						    = useState(__data) 
  const [categories, set_categories]          = useState([])  
  const [disablebutton, set_disablebutton] 		= useState(false); 
  const [success_message,set_success_message] = useState("")  
  const [common_error,set_common_error] 		  = useState("")  
  const [errors,set_errors]     						  = useState(__errors)   
  const [recaptchaToken, setRecaptchaToken]   = useState("");
  const [google_auth_url, set_google_auth_url] = useState(null);
  const [isOpen, setIsOpen]                   = useState(false)

  useEffect(()=>{
    get_google_auth_url()
  },[])     

  useEffect(() => {       
    fetchCategoryData()  
  },[]);  

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false)
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);  


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

  const fetchCategoryData = async () => {     
    const res = await Api.categories({       
    }); 
    const resData = res.data.data 
    set_categories(resData) 
  }  

  const handleChange = (e)=>{	
    const field_name  = e.target.name;
    const field_value = e.target.value;
    set_data({...data, [field_name]: field_value})
  }	 

  const handleCaptchaChange = (token) => {
      setRecaptchaToken(token)
  };

  const handleRadio = (value) => {
     set_data({
      ...data, 
      role: value
     })
  }  
  
  const handleSelect = (e, id) => {

    const isChecked = e.target.checked;

    if(isChecked){
      
      if(!data.categories.includes(id)){
        set_data({
          ...data, 
          categories: [...data.categories, id]
        })
      }     

    }
    else{
      set_data({
        ...data, 
        categories: data.categories.filter((index) => index !== id)
      })
      
    }		
    
  }  
  

  const resetCaptcha = () => {
    recaptchaRef.current?.reset();
    setRecaptchaToken(null); 
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
    let response  = validation.validatePassword(password)
    if(!password){        
      err  = 'Password is required';         
    }	
    else if(response.status===false){
      err  = response.error;         
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

  const validate_categories = (id)=>{	
    let err     = ''; 
    let categories  = id ? [...data.categories, id] : data.categories
    if(categories.length < 1){        
      err  = 'Categories is required';         
    }	 
    set_errors({
      ...errors,
      categories:err
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

      let categories = validate_categories()
      if( data.role === 2 && categories !==''){
        errors.categories  = categories;
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
          
          const obj = {
            role:data.role, 
            first_name:data.first_name, 
            last_name:data.last_name, 
            email:data.email, 
            password:data.password,
            recaptchaToken:recaptchaToken,   
            categories:data.categories        
          }         

          const res = await Api.register(obj);
          
          if( res && (res.status === 200) ){
            const resData = res.data; 
            
            if(resData.role == 2){
              handleModalType('welcome_supplier')
            }
            else{
              handleModalType('welcome')
            }
            
            set_data(__data)           
            set_disablebutton(false)

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
        <div className="flex gap-5">
          <div className="flex items-center me-4">
              <input type="radio" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:bg-gray-700 dark:border-gray-600" 
              name="role"
              value={data.role} 
              onChange={(e)=>{
                handleRadio(1)            
              }}          
              checked={ data.role == 1 ? true : false } 
              />
              <label className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Customer</label>
          </div>
          <div className="flex items-center me-4">
              <input type="radio" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:bg-gray-700 dark:border-gray-600" 
              name="role"
              value={data.role} 
              onChange={(e)=>{
                handleRadio(2)            
              }}          
              checked={ data.role == 2 ? true : false } 
              />
              <label className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Supplier</label>
          </div>        
      </div>     
      {errors.role && 
        <div className="error-msg">{errors.role}</div>    
      }  	
      </div>

      <div className={`grid grid-cols-1 sm:grid-cols-2 gap-2`}>
          <div className={`grid grid-cols-1 mb-3`}>
          <Input
          label="First Name"
          mandatory={true}
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
          mandatory={true}
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

      <div className={`grid grid-cols-1 sm:grid-cols-2 gap-2`}>
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

      {
        data.role === 2 &&
        <>
        <div className={`grid grid-cols-1 mb-3`}>
      <div className="relative inline-block" ref={dropdownRef} >       
        <button
          type='button'
          onClick={() => setIsOpen(!isOpen)}
          className="w-100 rounded-md bg-transparent pr-2 md:px-4 text-left text-sm shadow-sm focus:outline-none focus:ring-0 flex items-center justify-between"
          style={{border:"1px solid #ccc", padding:"10px 10px"}}
          >
          <p className="truncate">All Categories</p>
          <span className="float-right">
          {" "}
          { isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}{" "}
          </span>
        </button>  
       
        { isOpen && (
          <ul className="absolute mt-3 w-100 grid rounded-md border border-gray-200 bg-white shadow-lg z-3 divide-y divide-gray" style={{maxHeight:"200px",overflowY:"scroll"}}>           
            {categories.map((option, i) => (
              <li
                key={i}                
                className=" text-sm px-4 py-2 hover:bg-gray-100 cursor-pointer text-black"
              >
              <div className="form-check">
                <input className="form-check-input" type="checkbox" 
                name="categories"                 
                value={option.id} 
                onChange={(e)=>{
                  handleSelect(e,option.id)
                  validate_categories( e.target.checked ? option.id : '')                  
                }}
                checked={ data.categories.includes(option.id) ? true : false } 
                />
                <label className="form-check-label">
                {" "}{option.name}
                </label>
              </div>  
              
              </li>
            ))}
          </ul>
        )}
        {errors.categories && 
            <div className="error-msg">{errors.categories}</div>    
          }  	        
      </div>
      </div>
        </>
      }

      

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
          text:"Sign Up",
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
          <Button type="button" href={google_auth_url} variant="gray" className="cursor-pointer" icon={<img src="/icons/google.png" alt="Google" width={20} height={20} />} iconPosition="left" link_attributes={{ target: "_blank", rel: "noopener" }}>Register with Google</Button>
        } 
      </div>

      </form>

    </div>
  );
};

export default RegisterForm;
