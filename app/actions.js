'use server'
import { cookies } from 'next/headers'

export async function saveTokenInCookie(token){
    const cookieStore = await cookies()
    cookieStore.set('token', token, { httpOnly: true })       
}
export async function deleteTokenFromCookie(cookie_name){    
   await cookies().delete(cookie_name);
}
export async function getToken(){    
    
  const cookieStore = await cookies()
  let tokenObj = cookieStore.get('token') ?? '' 
  let token = tokenObj['value'] ?? '' 
  
  if(token){
    return true
  }
  else{
    return false
  }
}