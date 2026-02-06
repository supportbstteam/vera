import React from "react";
import Image from "next/image";
import Link from "next/link";
import Google_callback from "./Google_callback";

export const metadata = {
  title: "Google callback",
  description: ""
}

const page = async ({ searchParams }) => {

  const searchData = await searchParams 

  // const __filterData = {  
  //   token: (searchData.token) ? searchData.token : '',	            
  //   email: (searchData.email) ? searchData.email : '',    
	// }

  return (
    <Google_callback searchData={searchData} />
  );
};
export default page;
