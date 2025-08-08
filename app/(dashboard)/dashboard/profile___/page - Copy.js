import Button from "@/_components/ui/button";
import Image from "next/image";
import React from "react";

import Profile_card from "./Profile_card";

export const metadata = {
  title: "My Profile",
  description: ""
}

const page = () => {
  
  return (
    <div className="max-w-7xl m-auto py-16 flex flex-col gap-6">
      <div className="flex items-center gap-4">
        <Button>My Profile</Button>
        <Button variant="outline">My Quotation</Button>
      </div>

      <div className="border border-stock rounded-md grid grid-cols-1 md:grid-cols-3 divide-x divide-stock">
        {/* LEFT PROFILE CARD */}
        <Profile_card />

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
            <Button variant="outline" >
              Post Quotation
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default page;