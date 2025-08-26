import React from "react";
import Image from "next/image";
import Link from "next/link";
import Terms from "./Terms";
import { getPage } from '@/actions'

export async function generateMetadata(){ 
  const resData = await getPage({slug:'terms-and-condition'})      
  return {
     title: resData.meta_title,
     description: resData.meta_description,
  } 
}

const page = async ({ searchParams }) => {
  const pageData = await getPage({slug:'terms-and-condition'})      
  return (
    <Terms pageData={pageData} />
  );
};
export default page;
