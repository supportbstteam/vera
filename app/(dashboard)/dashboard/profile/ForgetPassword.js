"use client"
import React from "react"
import Input from "@/_components/ui/Input"  
import Button from "@/_components/ui/button"  
import { ChevronDown, ChevronUp } from "lucide-react"

const ForgetPassword = () => {
  const [currentPassword, setCurrentPassword] = React.useState("")
  const [newPassword, setNewPassword] = React.useState("")
  const [confirmPassword, setConfirmPassword] = React.useState("")

  const [isOpen, setIsOpen] = React.useState(false)

  return (
    <div className="border border-stock p-6 flex flex-col gap-4 py-6 ">
      <div className="flex justify-between items-center pb-6">
        <div>
          <p className="text-xl font-bold">Password Reset</p>
          <p>
            Update contact information, and keep your preferences up to date.
          </p>
        </div>
        <Button
          variant="icon"
          onClick={() => setIsOpen(!isOpen)}
          icon={isOpen ? <ChevronUp /> : <ChevronDown />}
        />
      </div>
      {isOpen && (
        <div>
          <div className={`grid grid-cols-1 sm:grid-cols-2 gap-6`}>
            <Input
              label="Current Password"
              placeholder="Current Password"
              value={currentPassword}
              onChange={e => setCurrentPassword(e.target.value)}
            />
            <Input
              label="New Password"
              placeholder="New Password"
              value={newPassword}
              onChange={e => setNewPassword(e.target.value)}
            />
            <Input
              label="Confirm Password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={e => setConfirmPassword(e.target.value)}
            />
          </div>
          <div className="flex justify-end mt-4">
            <Button variant="primary">Update</Button>
          </div>
        </div>
      )}
    </div>
  )
}

export default ForgetPassword
