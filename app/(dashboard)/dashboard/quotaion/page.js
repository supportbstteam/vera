import Link from 'next/link'
import Image from "next/image";
import QuotationList from "./QuotationList"
import DashboardNavigation from "@/_components/layout/DashboardNavigation"

export const metadata = {
  title: "My Quotaion",
  description: "",
};

const page = () => {

  return (
    <>
      <div className="max-w-7xl m-auto py-16 flex flex-col gap-6">
        <DashboardNavigation />
        <QuotationList />         
      </div>
    </>
  )
}
export default page
