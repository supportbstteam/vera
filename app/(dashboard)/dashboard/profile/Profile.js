"use client"
import React, { useState } from "react"
import Button from "@/_components/ui/button" 
import Image from "next/image"
import EditProfile from "./EditProfile"
import ForgetPassword from "./ForgetPassword"
import Profile_card from "./Profile_card"
import DashboardNavigation from "@/_components/layout/DashboardNavigation"

const Profile = () => {
  const [activeTab, setActiveTab] = useState("")

  const call_activeTab = (option)=>{
    setActiveTab(option)
  }

  return (
    <>
    <div className="max-w-7xl m-auto py-16 flex flex-col gap-6">
      <DashboardNavigation />
      <div className="border border-stock rounded-md divide-y divide-stock p-6">
        <div className="flex justify-between items-center pb-6">
          <div>
            <p className="text-xl font-bold">My Profile</p>
            <p>
              Update contact information, and keep your preferences up to date.
            </p>
          </div>
          {
            activeTab == '' ?
            <Button
              variant="icon"
              onClick={() => setActiveTab("editProfile")}
              icon={
              <Image src="/icons/edit.png" alt="Edit" width={16} height={16} />
            }
            />
            :
            activeTab == 'editProfile' ?
            <Button
              variant="icon"
              onClick={() => setActiveTab('')}
              icon={
              <Image src="/icons/edit.png" alt="Edit" width={16} height={16} />
            }
            />
            :
            ''
          }
          
        </div>

        {activeTab === "editProfile" ? (
          <EditProfile call_activeTab={call_activeTab} />
        ) : (
          <>           
            <Profile_card />  
            {/* <div className="col-span-2 flex flex-col gap-12 pb-6">             
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
            </div> */}
            {/* <div className="mt-6">
              <p>Category</p>
              <div className="flex flex-wrap gap-2 mt-2">
                {Category.map((item, index) => (
                  <Badge key={index} title={item.name} type={item.type} />
                ))}
              </div>
            </div> */}
          </>
        )}
      </div>
      <ForgetPassword />
      </div>
    </>
  )
}
export default Profile
