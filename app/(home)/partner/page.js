import React from "react";
import Image from "next/image";
import Link from "next/link";
import Partner from "./Partner";
import { getPage } from '@/actions'


export async function generateMetadata(){ 
  const resData = await getPage({slug:'partner'})      
  return {
     title: resData.meta_title,
     description: resData.meta_description,
  } 
}

const page = async ({ searchParams }) => {

  const pageData = await getPage({slug:'partner'})      
  return (
    <Partner pageData={pageData} />
  );
};
export default page;
