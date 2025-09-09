"use client"
import React, { useState } from "react"
import Button from "@/_components/ui/button" 
import Image from "next/image"
import EditSettings from "./EditSettings"
import DashboardNavigation from "@/_components/layout/DashboardNavigation"

const Settings = () => { 

  return (
    <>
    <div className="max-w-7xl m-auto py-16 flex flex-col gap-6">
      <DashboardNavigation />      
      <EditSettings />
      </div>
    </>
  )
}
export default Settings
