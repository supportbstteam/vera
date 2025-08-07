"use client";
import React, { useState } from "react";
import Button from "../ui/button";
import Image from "next/image";
import EditProfile from "./EditProfile";

const Profile = () => {
  const [activeTab, setActiveTab] = useState("profile");

  return (
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
          icon={<Image src="/icons/edit.png" alt="Edit" width={16} height={16} />}
        />
      </div>

      {activeTab === "editProfile" ? (
        <EditProfile />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 ">
          {/* LEFT PROFILE CARD */}
          <div className="col-span-1 flex flex-col gap-6 items-center md:items-start py-6 border border-stock p-4 rounded-lg my-8 ">
            <div className="flex items-center justify-center gap-4 ">
              <div>
                <h2 className="font-semibold text-lg">Cameron Williamson</h2>
                <p className="text-sm text-gray-500">Member since March 2020</p>
              </div>
            </div>
            <div className="text-sm w-full flex flex-col gap-4">
              <div>
                <p className="text-gray-500">Contact No</p>
                <p className="text-base font-medium">9876-54-3210</p>
              </div>
              <div>
                <p className="text-gray-500">Email Id</p>
                <p className="text-base font-medium break-words">
                  CameronWilliamson@gmail.com
                </p>
              </div>
              <div>
                <p className="text-gray-500">Address</p>
                <p className="font-medium">Neumarkt 4, 01067 Dresden, Germany</p>
              </div>
            </div>
          </div>
          {/* RIGHT STATS AND QUOTE POST */}
          <div className="col-span-2 flex flex-col gap-12 p-8">
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
        </div>
      )}
    </div>
  );
};

export default Profile;