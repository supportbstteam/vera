'use server'
import { cookies } from 'next/headers'

export async function saveTokenInCookie(token){
    const cookieStore = await cookies()
    cookieStore.set('token', token, { httpOnly: true })       
}
export async function deleteTokenFromCookie(cookie_name){    
   await cookies().delete(cookie_name);
}