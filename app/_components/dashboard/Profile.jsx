"use client";
import React, { useState } from "react";
import Button from "../ui/button";
import Image from "next/image";
import EditProfile from "./EditProfile";
import ForgetPassword from "./ForgetPassword";
import Badge from "../ui/Badge";

const Profile = () => {
  const [activeTab, setActiveTab] = useState("profile");
  const Category = [
    { name: "Laptop", icon: "/icons/laptop.png", type: "primary" },
    { name: "Mobile", icon: "/icons/mobile.png", type: "primary" },
    { name: "Tablet", icon: "/icons/tablet.png", type: "primary" },
    { name: "TV", icon: "/icons/TV.png", type: "primary" },
    { name: "Catering  & Hospital", icon: "/icons/Catering-Hospital.png", type: "primary" },
  ];

  return (
    <>
    <div className="border border-stock rounded-md divide-y divide-stock p-6">
      <div className="flex justify-between items-center pb-6">
        <div>
          <p className="text-xl font-bold">My Profile</p>
          <p>
            Update contact information, and keep your preferences up to date.
          </p>
        </div>
        <Button
          variant="icon"
          onClick={() => setActiveTab("editProfile")}
          icon={
            <Image src="/icons/edit.png" alt="Edit" width={16} height={16} />
          }
        />
      </div>

      {activeTab === "editProfile" ? (
        <EditProfile />
      ) : (
        <>
          {/* LEFT PROFILE CARD */}
          <div className="my-6 grid  grid-cols-3 gap-6 pb-6">
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

                <p className="">Cameron Williamson</p>
                <p className="text-sm text-gray-500">Member since March 2020</p>
              </div>
            </div>
            <div className="flex items-center  gap-4 ">
              <Image
                src="/icons/phone.png"
                alt="Profile"
                width={50}
                height={50}
                className="rounded-full"
              />
              <div>
                <p className="text-gray-500">Contact No</p>
                <p className="text-base font-medium">9876-54-3210</p>
              </div>
            </div>
            <div className="flex items-center  gap-4 ">
              <Image
                src="/icons/email.png"
                alt="Profile"
                width={50}
                height={50}
                className="rounded-full"
              />
              <div>
                <p className="text-gray-500">Email Id</p>
                <p className="text-base font-medium break-words">
                  CameronWilliamson@gmail.com
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
                <p className="font-medium">
                  Neumarkt 4, 01067 Dresden, Germany
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
                <p className="font-medium">
                  N/A
                </p>
              </div>
            </div>
          </div>
          {/* RIGHT STATS AND QUOTE POST */}
          <div className="col-span-2 flex flex-col gap-12 pb-6">
            {/* Stats Box */}
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
            {/* Empty State */}
            <div className="text-center">
              <p className="text-lg text-gray-700 mb-3">
                You haven't posted any quotations yet.
              </p>
              <Button variant="outline">Post Quotation</Button>
            </div>
          </div>
          <div className="mt-6">
            <p>Category</p>
            <div className="flex flex-wrap gap-2 mt-2"> 
              {Category.map((item, index) => (
                <Badge key={index} title={item.name} type={item.type}  />
              ))}
            </div>
          </div>
        </>
      )}
    </div>
      <ForgetPassword/>
      </>
  );
};

export default Profile;
