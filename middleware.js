import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import { deleteTokenFromCookie } from '@/actions'
import axios from "axios";

export async function middleware(request){  

  const cookieStore = await cookies()
  let tokenObj = cookieStore.get('token') ?? '' 
  let token = tokenObj['value'] ?? ''   

  const baseURL = process.env.API_URL;
  const axiosInstance = axios.create({
    baseURL: baseURL, 
  });
  axiosInstance.interceptors.request.use(function (config){     
    config.headers["Authorization"] = "Bearer " + token;
    return config;
  });

  let json_header = {
    "Content-Type":"application/json",
  }  


  //#########
  //  logic for user dashboard middleware
  //#########
  if(request.nextUrl.pathname.startsWith('/dashboard')){     
    
      if(!token){
        return NextResponse.redirect(new URL('/', request.url));
      }

      try {
          const response = await axiosInstance.get(
            "/private/me/",
            {headers:json_header}        
          )  
          if(response.status === 200){  
              return NextResponse.next();
          }
          else{
              await deleteTokenFromCookie('token')         
              return NextResponse.redirect(new URL('/', request.url));
          }
      } catch (error) {  
          await deleteTokenFromCookie('token')               
          return NextResponse.redirect(new URL('/', request.url));
      }
     
  }    

}

// It specifies the paths for which this middleware should be executed. 
export const config = {
  matcher: [
    '/:path*',  
    '/dashboard/:path*', 
  ]
}