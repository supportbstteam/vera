import React from "react";
import Image from "next/image";
import Link from "next/link";
import Help from "./Help";
import { getPage } from '@/actions'

export async function generateMetadata(){ 
  const resData = await getPage({slug:'help'})      
  return {
     title: resData.meta_title,
     description: resData.meta_description,
  } 
}

const page = async ({ searchParams }) => {

  const pageData = await getPage({slug:'help'})      

  return (
    <Help pageData={pageData} />
  );
};
export default page;
