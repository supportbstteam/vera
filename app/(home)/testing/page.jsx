"use client";
import EditProfile from "@/_components/dashboard/EditProfile";
import Profile from "@/_components/dashboard/Profile";
import Button from "@/_components/ui/button";
import QuotationList from "@/_components/ui/QuotationList";
import { Edit } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";

const page = () => {
  const [activeTab, setActiveTab] = useState("profile");

  return (
    <>
      <div className="max-w-7xl m-auto py-16 flex flex-col gap-6">
        <div className="flex items-center gap-4">
          <Button
            variant={activeTab === "profile" ? "primary" : "outline"}
            onClick={() => setActiveTab("profile")}
          >
            My Profile
          </Button>
          <Button
            variant={activeTab === "quotation" ? "primary" : "outline"}
            onClick={() => setActiveTab("quotation")}
          >
            My Quotation
          </Button>
        </div>
        
        
        {activeTab === "profile" ? <Profile /> : <QuotationList />}
      </div>
    </>
  );
};
export default page;
