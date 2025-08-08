"use client"
import React from "react"
import Input from "@/_components/ui/Input"  
import Textarea from "@/_components/ui/Textarea" 
import Button from "@/_components/ui/button"  

const EditProfile = () => {
  const [firstName, setFirstName] = React.useState("")
  const [lastName, setLastName] = React.useState("")
  const [email, setEmail] = React.useState("")
  const [phone, setPhone] = React.useState("")
  const [address, setAddress] = React.useState("")
  return (
    <div className="max-w-7xl m-auto flex flex-col gap-4 py-6 ">
      <div>
        <p className="text-xl font-bold">Update Profile</p>
        <p>Update contact information, and keep your preferences up to date.</p>
      </div>
      <div>
        <div className={`grid grid-cols-1 sm:grid-cols-2 gap-6`}>
          <Input
            label="First Name"
            placeholder="First Name"
            value={firstName}
            onChange={e => setFirstName(e.target.value)}
          />
          <Input
            label="Last Name"
            placeholder="Last Name"
            value={lastName}
            onChange={e => setLastName(e.target.value)}
          />
          <Input
            label="phone"
            type="phone"
            placeholder="9876-54-3210"
            value={phone}
            onChange={e => setPhone(e.target.value)}
          />
          <Input
            label="Email"
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
        </div>
      </div>
      <Textarea
        label="Address"
        type="address"
        rows="4"
        placeholder="123 Main St, City, Country"
        value={address}
        onChange={e => setAddress(e.target.value)}
      />
      <div className="flex justify-end mt-4">
        <Button variant="primary">Update</Button>
      </div>
    </div>
  )
}

export default EditProfile
