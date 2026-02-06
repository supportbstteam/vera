import React from "react";
import Image from "next/image";
import Link from "next/link";
import Seller from "./Seller";
import { getPage } from '@/actions'


export async function generateMetadata(){ 
  const resData = await getPage({slug:'seller'})      
  return {
     title: resData.meta_title,
     description: resData.meta_description,
  } 
}

const page = async ({ searchParams }) => {

  const pageData = await getPage({slug:'seller'})      
  return (
    <Seller pageData={pageData} />
  );
};
export default page;
