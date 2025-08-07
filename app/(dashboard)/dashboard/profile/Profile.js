"use client"
import React, { useState } from "react"
import Link from 'next/link'
import Button from "@/_components/ui/button"  
import Image from "next/image"
import Profile_card from "./Profile_card"

const Profile = () => {

  return (
    <div className="border border-stock rounded-md divide-y divide-stock p-6">

      <div className="flex justify-between items-center pb-6">
        <div>
          <p className="text-xl font-bold">My Profile</p>
          <p>Update contact information, and keep your preferences up to date.</p>
        </div>
        <Link href="/dashboard/profile/edit">
        <Image src="/icons/edit.png" alt="Edit" width={20} height={20} />
        </Link>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 ">  
          <Profile_card />         
          <div className="col-span-2 flex flex-col gap-12 p-8">
           
            <div className="flex justify-between w-full border border-stock p-6 rounded-lg divide-x divide-stock">
              <div className="flex-1 flex flex-col pl-4 items-start  ">
                <p className="font-bold text-lg">10</p>
                <p className="text-sm text-gray-600">Quotation Post</p>
              </div>
              <div className="flex-1 flex flex-col pl-4 items-start  ">
                <p className="font-bold text-lg">18</p>
                <p className="text-sm text-gray-600">Offer Receive</p>
              </div>
              <div className="flex-1 flex flex-col pl-4 items-start  ">
                <p className="font-bold text-lg">02</p>
                <p className="text-sm text-gray-600">My Buy</p>
              </div>
            </div>
           
            <div className="text-center">
              <p className="text-lg text-gray-700 mb-3">
                You haven't posted any quotations yet.
              </p>
              <Button variant="outline">Post Quotation</Button>
            </div>

          </div>
      </div>
    </div>
  )
}
export default Profile
