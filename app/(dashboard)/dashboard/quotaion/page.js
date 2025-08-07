import Link from 'next/link'
import Image from "next/image";
import QuotationList from "./QuotationList"

export const metadata = {
  title: "My Quotaion",
  description: "",
};

const page = () => {

  return (
    <>
      <QuotationList /> 
    </>
  )
}
export default page
