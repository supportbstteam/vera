"use client"
import React, { useState } from "react"
import Button from "@/_components/ui/button" 
import Image from "next/image"
import EditProfile from "./EditProfile"
import EditPassword from "./EditPassword"
import Profile_card from "./Profile_card"
import DashboardNavigation from "@/_components/layout/DashboardNavigation"
import { X } from "lucide-react"

const Profile = () => {
  const [activeTab, setActiveTab] = useState("")

  const call_activeTab = (option)=>{
    setActiveTab(option)
  }

  return (
    <>
    <div className="max-w-7xl m-auto py-16 flex flex-col gap-6 px-4">
      <DashboardNavigation />
      <div className="border border-stock rounded-md divide-y divide-stock p-4 md:p-6">
        <div className=" relative flex justify-between items-center pb-6">
          <div>
            <p className="text-xl font-bold">My Profile</p>
            <p className="text-base mt-2">
              Update contact information, and keep your preferences up to date.
            </p>
          </div>
          <div className="absolute top-2 right-1 md:right-1 md:top-1">
          {
            activeTab == '' ?
            <Button
              variant="icon"
              size="none"
              onClick={() => setActiveTab("editProfile")}
              icon={
              <Image src="/icons/edit.png" alt="Edit" width={16} height={16} />
            }
            />
            :
            activeTab == 'editProfile' ?
            <Button
              variant="icon"
              size="none"
              onClick={() => setActiveTab('')}
              icon={<X size={20}/>}
  
            />
            :
            ''
          }
          </div>

          
        </div>

        {activeTab === "editProfile" ? (
          <EditProfile call_activeTab={call_activeTab} />
        ) : (
          <>           
            <Profile_card />              
          </>
        )}
      </div>
      <EditPassword />
      </div>
    </>
  )
}
export default Profile
