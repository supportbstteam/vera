"use client";
import Dashboard from "@/_components/dashboard/Dashboard";
import EditProfile from "@/_components/dashboard/EditProfile";
import Profile from "@/_components/dashboard/Profile";
import Button from "@/_components/ui/button";
import QuotationList from "@/_components/dashboard/QuotationList";
import { Edit } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";
import Lead from "@/_components/dashboard/Lead";

const page = () => {
  const [activeTab, setActiveTab] = useState("dashboard");

  return (
    <>
      <div className="max-w-7xl m-auto py-16 flex flex-col gap-6">
        <div className="flex items-center gap-4">
          <Button
            variant={activeTab === "dashboard" ? "primary" : "outline"}
            onClick={() => setActiveTab("dashboard")}
            size="md"
          >
            Dashboard
          </Button>
          <Button
            variant={activeTab === "quotation" ? "primary" : "outline"}
            onClick={() => setActiveTab("quotation")}
          >
            My Quotation
          </Button>
          <Button
            variant={activeTab === "lead" ? "primary" : "outline"}
            onClick={() => setActiveTab("lead")}
          >
            My Leads
          </Button>
          <Button
            variant={activeTab === "profile" ? "primary" : "outline"}
            onClick={() => setActiveTab("profile")}
          >
            My Profile
          </Button>
        </div>
        {activeTab === "dashboard" && <Dashboard />}
        {activeTab === "profile" && <Profile />}
        {activeTab === "lead" && <Lead />}
        {activeTab === "quotation" && <QuotationList />}
      </div>
    </>
  );
};
export default page;
