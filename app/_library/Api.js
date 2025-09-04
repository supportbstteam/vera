import axios from "axios";
const baseURL = process.env.API_URL;
const axiosInstance = axios.create({
  baseURL: baseURL,
  //timeout: 20000,  
});
axiosInstance.interceptors.request.use(function (config) {
  //config.headers["Content-Type"] = "application/json";   
  let access_token = localStorage.getItem(process.env.APP_PREFIX + 'token') ?? ''; 
  config.headers["Authorization"] = "Bearer " + access_token;
  return config;
});
axiosInstance.interceptors.response.use(
  (response) => {
      return response;
  },
  (error) => {
      try {
          const { response } = error;           

          if(typeof response !== "undefined" && response.status === 401){ 

            localStorage.removeItem(process.env.APP_PREFIX + 'token');	            
            localStorage.removeItem(process.env.APP_PREFIX + 'token_id');       
            localStorage.removeItem(process.env.APP_PREFIX + 'role');  
            localStorage.removeItem(process.env.APP_PREFIX + 'id'); 
            
            localStorage.removeItem(process.env.APP_PREFIX + 'selected_category');                   
            localStorage.removeItem(process.env.APP_PREFIX + 'search_text');                   

          }
          return response
      } catch (err) {
          console.error('Api err:',err);
      }
      if(error){
        console.error('Api error:',error);
        let code = error.code ?? '' // ERR_NETWORK
        let name = error.name ?? '' // AxiosError
        let message = error.message ?? '' // Network Error  
      }      
  }
);

let json_header = {
  "Content-Type":"application/json",
}  

let form_header = {
  "Content-Type":"multipart/form-data",
}  
//=====

export default {

  //=== authentication apis ===
  register: async (obj) => { 
      return await axiosInstance.post(
        "/register",
        {
          'role':obj.role,
          'first_name':obj.first_name,
          'last_name':obj.last_name,
          'email':obj.email,
          'password':obj.password,
          'recaptchaToken':obj.recaptchaToken,
        },
        {headers:json_header}                
      )
      .catch((err) => { console.log('err', err); });    
  }, 
  login: async (obj) => {     
      return await axiosInstance.post(
        "/login",
        {
          'email':obj.email,
          'password':obj.password,
          'recaptchaToken':obj.recaptchaToken,
        },
        {headers:json_header}                
      )
      .catch((err) => { console.log('err', err); });    
  },  
  google_auth_url: async () => {     
      return await axiosInstance.get(
        "/google-auth-url",        
        {headers:json_header}                
      )
      .catch((err) => { console.log('err', err); });    
  },  
  google_callback: async (obj) => {        
      return await axiosInstance.get(
        `/google-callback`,    
        {
          params: {
            code:obj.code,
            scope:obj.scope,
            authuser:obj.authuser,
            prompt:obj.prompt,
          }
        },    
        {headers:json_header}                
      )
      .catch((err) => { console.log('err', err); });    
  },          
  verifyemail: async (obj) => { 
      return await axiosInstance.post(
        "/verifyemail",
        {
          'token':obj.token,          
        },
        {headers:json_header}                
      )
      .catch((err) => { console.log('err', err); });    
  }, 
  forgot_password: async (obj) => { 
    return await axiosInstance.post(
      "/forgot-password",
      {
        'email':obj.email,        
      },  
      {headers:json_header}              
    )
    .catch((err) => { console.log('err', err); });    
  }, 
  reset_password: async (obj) => { 
    return await axiosInstance.post(
      "/reset-password",
      {        
        'token':obj.token,        
        'new_password':obj.new_password       
      },
      {headers:json_header}                
    )
    .catch((err) => { console.log('err', err); });    
  },    
  //=== my profile ===
  me: async () => {     
    return await axiosInstance.get(
      "/private/me/",
      {headers:json_header}        
    )
    .catch((err) => { console.log('err', err); });   
  },   
  logout: async (obj) => { 
      return await axiosInstance.post(
        "/private/logout", 
        {        
        'token_id':obj.token_id,  
        },
        {headers:json_header}               
      )
      .catch((err) => { console.log('err', err); });    
  },
  update_profile: async (obj) => {    
    return await axiosInstance.post(
      "/private/update-profile/"+obj.id,
      obj.formData,       
      {headers:form_header}   
    )
    .catch((err) => { console.log('err', err); });    
  },  
  update_password: async (obj) => {     
    return await axiosInstance.post(
      "/private/update-password/"+obj.id,
      obj.formData,       
      {headers:form_header}           
    )
    .catch((err) => { console.log('err', err); });    
  },
  //=== pages ===
  pages: async (obj) => { 
    return await axiosInstance.get(
      `/pages/`,
      {
        params: {
          page_id:obj.page_id ?? '',          
          slug:obj.slug ?? '',  
        }
      },
      {headers:json_header}                
    )
    .catch((err) => { console.log('err', err); });    
  },  
  //=== categories ===
  categories: async (obj) => { 
    return await axiosInstance.get(
      `/categories`,
      {
        params: {         
          slug:obj.slug,          
        }
      },
      {headers:json_header}        
    )
    .catch((err) => { console.log('err', err); });    
  },  
  testimonials: async (obj) => { 
    return await axiosInstance.get(
      `/testimonials`,      
      {headers:json_header}        
    )
    .catch((err) => { console.log('err', err); });    
  },  
  newsletter: async (obj) => { 
    return await axiosInstance.post(
      `/newsletter`,      
      {
        'email':obj.email,        
      },  
      {headers:json_header}    
    )
    .catch((err) => { console.log('err', err); });    
  },    
  seller_categories: async (obj) => { 
    return await axiosInstance.get(
      `/private/seller-categories`,      
      {
        params: {
          supplier_id:obj.supplier_id,  
        }
      },
      {headers:json_header}    
    )
    .catch((err) => { console.log('err', err); });    
  },    
  //=== quotation === 
  submit_quotation: async (obj) => { 
      return await axiosInstance.post(
        "/private/submit-quotation",
        {
          category_id:obj.category_id,
          search_text:obj.search_text,
          customer_id:obj.customer_id,
          first_name:obj.first_name,
          email:obj.email,
          mobile:obj.mobile,
          special_requirement:obj.special_requirement,
          quantity:obj.quantity,
        },
        {headers:json_header}                
      )
      .catch((err) => { console.log('err', err); });    
  }, 
  quotations: async (obj) => { 
    return await axiosInstance.get(
      `/private/quotations`,
      {
        params: {
          customer_id:obj.customer_id,          
          page_number: obj.page_number ?? 1,          
        }
      },
      {headers:json_header}        
    )
    .catch((err) => { console.log('err', err); });    
  },  
  supplier_quotations: async (obj) => { 
    return await axiosInstance.get(
      `/private/supplier-quotations`,
      {
        params: {
          quote_id:obj.quote_id,          
          page_number: obj.page_number ?? 1,          
        }
      },
      {headers:json_header}        
    )
    .catch((err) => { console.log('err', err); });    
  },  
  quote: async (obj) => { 
    return await axiosInstance.get(
      `/private/quote`,
      {
        params: {
          quote_id:obj.quote_id,
        }
      },
      {headers:json_header}        
    )
    .catch((err) => { console.log('err', err); });    
  },  
  select_vendor: async (obj) => { 
    return await axiosInstance.post(
      `/private/select_vendor`,
      {
          id:obj.id,
          status:obj.status,          
      },
      {headers:json_header}                
    )
    .catch((err) => { console.log('err', err); });    
  },   
  shortlist_lead: async (obj) => { 
    return await axiosInstance.post(
      `/private/shortlist_lead`,
      {
          id:obj.id,
          shortlist:obj.shortlist,          
      },
      {headers:json_header}                
    )
    .catch((err) => { console.log('err', err); });    
  },  
  remove_shortlist_lead: async (obj) => { 
    return await axiosInstance.post(
      `/private/remove_shortlist_lead`,
      {
          id:obj.id,
          shortlist:obj.shortlist,          
      },
      {headers:json_header}                
    )
    .catch((err) => { console.log('err', err); });    
  },    
  delete_lead: async (obj) => { 
    return await axiosInstance.post(
      `/private/delete_lead`,
      {
          id:obj.id,
          deleted:obj.deleted,          
      },
      {headers:json_header}                
    )
    .catch((err) => { console.log('err', err); });    
  },   
  reject_lead: async (obj) => { 
    return await axiosInstance.post(
      `/private/reject_lead`,
      {
          id:obj.id,
          status:obj.status,          
      },
      {headers:json_header}                
    )
    .catch((err) => { console.log('err', err); });    
  },   
  //=== leads === 
  leads: async (obj) => { 
    return await axiosInstance.get(
      `/private/leads`,
      {
        params: {
          supplier_id:obj.supplier_id,          
          page_number: obj.page_number ?? 1,          
        }
      },
      {headers:json_header}        
    )
    .catch((err) => { console.log('err', err); });    
  },  
  submit_lead_quotation: async (obj) => { 
      return await axiosInstance.post(
        "/private/submit-lead-quotation",
        {
          quote_suppliers_id:obj.quote_suppliers_id,
          price:obj.price,
          quantity:obj.quantity,
          comments:obj.comments,
          warranty:obj.warranty,            
        },
        {headers:json_header}                
      )
      .catch((err) => { console.log('err', err); });    
  }, 

  //=== customer dashboard === 
  customer_data_count: async (obj) => { 
    return await axiosInstance.get(
      `/private/customer-data-count`,
      {
        params: {
          customer_id:obj.customer_id,   
        }
      },
      {headers:json_header}        
    )
    .catch((err) => { console.log('err', err); });    
  }, 

  //=== supplier dashboard === 
  supplier_data_count: async (obj) => { 
    return await axiosInstance.get(
      `/private/supplier-data-count`,
      {
        params: {
          supplier_id:obj.supplier_id,   
        }
      },
      {headers:json_header}        
    )
    .catch((err) => { console.log('err', err); });    
  }, 
  
  contact: async (obj) => { 
    return await axiosInstance.post(
      `/contact`,
      {
          name:obj.name,            
          email:obj.email, 
          phone:obj.phone,
          subject:obj.subject,
          message:obj.message,
          recaptchaToken:obj.recaptchaToken,                 
      },
      {headers:json_header}                
    )
    .catch((err) => { console.log('err', err); });    
  },   

  feedback: async (obj) => { 
    return await axiosInstance.post(
      `/feedback`,
      {
          name:obj.name,            
          designation:obj.designation, 
          rating:obj.rating,
          description:obj.description,        
          recaptchaToken:obj.recaptchaToken,                 
      },
      {headers:json_header}                
    )
    .catch((err) => { console.log('err', err); });    
  },   
  
  settings: async (obj) => { 
    return await axiosInstance.get(
      `/settings`,      
      {headers:json_header}        
    )
    .catch((err) => { console.log('err', err); });    
  }, 
  
  

};


