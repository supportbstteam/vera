import React from "react";
import Image from "next/image";
import Link from "next/link";
import About_us from "./About_us";
import { getPage } from '@/actions'

// export const metadata = {
//   title: "About us",
//   description: ""
// }

export async function generateMetadata(){ 
  const resData = await getPage({slug:'about-us'})      
  return {
     title: resData.meta_title,
     description: resData.meta_description,
  } 
}

const page = async ({ searchParams }) => {
  const pageData = await getPage({slug:'about-us'})  
  return (
    <About_us pageData={pageData}  />
  );
};
export default page;
