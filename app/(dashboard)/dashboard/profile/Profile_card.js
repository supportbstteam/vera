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
    <div className="col-span-1 flex flex-col gap-6 items-center md:items-start p-10">
        <div className="flex items-center justify-center gap-4">                                                                
        <Image
            src="/user.jpg" // Replace with your image path
            alt="User Avatar"
            width={48}
            height={48}
            className="rounded-full "
        />
        <div>
            <h2 className="font-semibold text-lg">{ user?.first_name } { user?.last_name }</h2>
            <p className="text-sm text-gray-500">
            {/* Member since March 2020 */}
            Member since { AllFunctionClient.getDate( user?.created_at) }
            </p>
        </div>
        </div>

        <div className="text-sm w-full flex flex-col gap-4">
        <div>
            <p className="text-gray-500">Contact No</p>
            <p className="text-base font-medium">
            { user?.mobile }
            </p>
        </div>
        <div>
            <p className="text-gray-500">Email Id</p>
            <p className="text-base font-medium break-words">
            { user?.email }
            </p>
        </div>
        <div>
            <p className="text-gray-500">Address</p>
            <p className="font-medium">
            { user?.address }    
            </p>
        </div>

        <Button variant="outline" size="full" className="mt-4">
            Edit Profile
        </Button>
        </div>
    </div>
    );
};
export default Profile_card;