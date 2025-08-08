"use client";
import React, { useState, useEffect, useRef, useCallback, Suspense } from "react";
import { BaggageClaim, ChevronDown, LogOut, SettingsIcon, ShoppingBag, Tag, TreePalmIcon, UserIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import Button from "../ui/button"
import { useSelector, useDispatch } from 'react-redux'
import { fetchUser } from '@/_library/redux/slice/userReducer'
import Api from '@/_library/Api';
import {useRouter} from "next/navigation";
import { deleteTokenFromCookie } from '@/actions'

const ProfileButton = () => {

  const dropdownRef  = useRef(null);  
  const router       = useRouter();

  const dispatch     = useDispatch()
  const userState    = useSelector( (state)=> state.user )  
  const user         = (userState.data) ? userState.data : {};

  const [isOpen, setIsOpen] = useState(false);
  const [role, setRole]  = useState("") 
    
  useEffect(() => {    
    const roleId = localStorage.getItem(process.env.APP_PREFIX + 'role') ?? ''; 
    if (roleId) {
      setRole(roleId);
    }   
  }, []);

  useEffect(() => {
    dispatch(fetchUser())        
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

  const logout = async () => {
    try {
        const res = await Api.logout({
            token_id:localStorage.getItem(process.env.APP_PREFIX + 'token_id') ?? ''
        }); 

        await deleteTokenFromCookie('token')

        localStorage.removeItem(process.env.APP_PREFIX + 'token');
        localStorage.removeItem(process.env.APP_PREFIX + 'token_id');
        localStorage.removeItem(process.env.APP_PREFIX + 'role');        

        dispatch(fetchUser())     

        router.push('/login')
        router.refresh()

    } catch (error) {
        console.log(error.message)            
    }
    
  }   

  const buyer_items = [
    { image: "/icons/shoppingBag.png", label: "My Profile", href: "/dashboard/profile" },
    { image: "/icons/quotaion.png", label: "My Quotaion", href: "/dashboard/quotaion" },
    { image: "/icons/baggageClaim.png", label: "Recent Activity", href: "/dashboard/activity" },
    { image: "/icons/settings.png", label: "Settings", href: "/dashboard/settings" },
  ];

  const seller_items = [
    { image: "/icons/shoppingBag.png", label: "My Profile", href: "/dashboard/profile" },
    { image: "/icons/quotaion.png", label: "My Leads", href: "/dashboard/lead" },
    { image: "/icons/baggageClaim.png", label: "Recent Activity", href: "/dashboard/activity" },
    { image: "/icons/settings.png", label: "Settings", href: "/dashboard/settings" },
  ];

  return (   
    <>
    {
        user && user.email ?
        <button className="relative" onClick={() => setIsOpen(!isOpen)} ref={dropdownRef}>
            <div className="flex items-center gap-2 px-2 py-1.5 rounded-full bg-[#1e1e1e] text-white border border-gray-700 hover:bg-[#2a2a2a]">
                <Image
                src="/user.jpg" // Replace with your image path
                alt=""
                width={28}
                height={28}
                className="rounded-full"
                />
                <span className="text-sm font-medium min-w-25">{ user?.first_name } { user?.last_name}</span>
                {isOpen ? (
                <ChevronDown size={20} strokeWidth={2.5} className="transform rotate-180 transition-transform duration-200" />
                ) : (
                <ChevronDown size={20} strokeWidth={2.5} className="transition-transform duration-200" />
                )}
            </div>
            <div className={`absolute z-3 right-0 mt-2 w-full bg-white rounded-md shadow-lg ${isOpen ? "block" : "hidden"}`}>
                <ul className="py-1 divide-y divide-gray-200">

                {
                    role && role == 1 ?
                    <>
                    {buyer_items.map((item) => (
                      <li key={item.label} >
                      <Link
                      href={item.href}
                      className="flex items-center gap-2 px-4 py-2 text-black hover:bg-gray-100"
                      >
                      <Image src={item.image} alt={item.label} width={24} height={16} className="inline-block" />
                      <span className="text-base">{item.label}</span>
                      </Link>
                      </li>
                    ))}
                    </>
                    :
                    role && role == 2 ?
                    <>
                    {seller_items.map((item) => (
                      <li key={item.label} >
                      <Link
                      href={item.href}
                      className="flex items-center gap-2 px-4 py-2 text-black hover:bg-gray-100"
                      >
                      <Image src={item.image} alt={item.label} width={24} height={16} className="inline-block" />
                      <span className="text-base">{item.label}</span>
                      </Link>
                      </li>
                    ))}
                    </>
                    :
                    ''
                }      

                
                
                <li 
                className="flex items-center justify-center gap-2 px-4 py-2 text-base text-black hover:bg-gray-100 cursor-pointer"
                style={{cursor:"pointer"}}
                onClick={()=>{
                    logout()
                }}
                >
                Logout <LogOut size={16}/>
                </li>
                </ul>
            </div>
        </button>
        :
        <>        
        <Link href="/login" className="text-sm text-white cursor-pointer">
            <span className="hidden md:inline">Login</span>
        </Link>
        
        <Link href="/register" className="text-sm text-white cursor-pointer">
            <Button className="cursor-pointer">Create Account</Button>
        </Link>  
        </>
        
    }     
    </>
    
  );
};
export default ProfileButton;