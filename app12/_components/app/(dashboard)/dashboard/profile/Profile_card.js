"use client"
import React, { useState, useEffect } from 'react';
import Button from "@/_components/ui/button";
import Image from "next/image";

import { useSelector, useDispatch } from 'react-redux'
import { fetchUser } from '@/_library/redux/slice/userReducer'
import AllFunctionClient from '@/_library/AllFunctionClient'

const Profile_card = () => {

    const dispatch     = useDispatch()
    const userState    = useSelector( (state)=> state.user )  
    const user         = (userState.data) ? userState.data : {};

    useEffect(() => {
        dispatch(fetchUser())        
	  },[]); 
  
    return (
    <>
    <div className="my-6 grid  grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pb-6">
        <div className="flex items-center  gap-4 ">
          <Image
            src="/icons/user.png"
            alt="Profile"
            width={50}
            height={50}
            className="rounded-full"
          />
          <div>
            <p className="text-gray-500">Full Name</p>

            <p className="text-sm md:text-base">{ user?.first_name } { user?.last_name }</p>
            <p className="text-sm text-gray-500">
              Member since { AllFunctionClient.getDate( user?.created_at) }
            </p>
          </div>
        </div>
        <div className="flex items-center  gap-2 md:gap-4 ">
          <Image
            src="/icons/phone.png"
            alt="Profile"
            width={50}
            height={50}
            className="rounded-full"
          />
          <div>
            <p className="text-gray-500">Contact No.</p>
            <p className="text-sm md:text-base font-medium">{ user?.mobile }</p>
          </div>
        </div>
        <div className="flex items-center gap-2 md:gap-4 ">
          <Image
            src="/icons/email.png"
            alt="Profile"
            width={50}
            height={50}
            className="rounded-full"
          />
          <div>
            <p className="text-gray-500">Email ID</p>
            <p className="text-sm md:text-base font-medium break-words">
             { user?.email }
            </p>
          </div>
        </div>
        <div className="flex items-center  gap-4 ">
          <Image
            src="/icons/person.png"
            alt="Profile"
            width={50}
            height={50}
            className="rounded-full"
          />
          <div>
            <p className="text-gray-500">Address</p>
            <p className="text-sm md:text-base font-medium">
            { user?.address }   
            </p>
          </div>
        </div>
        <div className="flex items-center  gap-4 ">
          <Image
            src="/icons/person.png"
            alt="Profile"
            width={50}
            height={50}
            className="rounded-full"
          />
          <div>
            <p className="text-gray-500">Contact Person</p>
            <p className="text-sm md:text-base font-medium">{ user?.contact_person }</p>
          </div>
        </div>
      </div>
    </>
    );
};
export default Profile_card;