import React from "react";
import Image from "next/image";
import Link from "next/link";
import Privacy_policy from "./Privacy_policy";
import { getPage } from '@/actions'


export async function generateMetadata(){ 
  const resData = await getPage({slug:'privacy-policy'})      
  return {
     title: resData.meta_title,
     description: resData.meta_description,
  } 
}

const page = async ({ searchParams }) => {

  const pageData = await getPage({slug:'privacy-policy'})      
  return (
    <Privacy_policy pageData={pageData} />
  );
};
export default page;
