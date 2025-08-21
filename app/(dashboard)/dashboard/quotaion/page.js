import Link from 'next/link'
import Image from "next/image";
import QuotationList from "./QuotationList"

export const metadata = {
  title: "My Quotaion",
  description: "",
};

const page = async ({ searchParams }) => {

  const mySearch = await searchParams 

  const __filterData = {  
    page: (mySearch.page) ? mySearch.page :  1,	 
	}

  return (
    <>
      <QuotationList __filterData={__filterData} /> 
    </>
  )
}
export default page
