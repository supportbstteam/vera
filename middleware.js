import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function middleware(request){  

  const cookieStore = await cookies()
  let token = cookieStore.get('token') ?? '' 
      token = token['value'] ?? ''

  const path = request.nextUrl.pathname  

  let header_token = request.headers.get("authorization") ?? ''
      header_token = header_token.replace("Bearer", "");   
      header_token = header_token.trim()   


  //#########
  //  logic for user dashboard middleware
  //#########
  if(request.nextUrl.pathname.startsWith('/dashboard')){
      
      //== redirect to login === 
      if(!token){   
        //return NextResponse.redirect(new URL('/login', request.url));
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