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
          }
          return response
      } catch (err) {
          console.error('err:',err);
      }
      if(error){

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
        'password':obj.password       
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
    return await axiosInstance.patch(
      "/private/profile-password/"+obj._id+"/",
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
          _id:obj._id,          
          slug:obj.slug,  
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
      `/private/seller-categories/`+obj.id,      
      {headers:json_header}        
    )
    .catch((err) => { console.log('err', err); });    
  },  
  
  //=== company-user === 

};


