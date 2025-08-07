import Link from 'next/link'
import Image from "next/image";
import EditProfile from "./EditProfile"
import DashboardNavigation from "@/_components/layout/DashboardNavigation"

export const metadata = {
  title: "Edit Profile",
  description: "",
};

const page = () => {

  return (
    <>
      <div className="max-w-7xl m-auto py-16 flex flex-col gap-6">
        <DashboardNavigation />
        <EditProfile />         
      </div>
    </>
  )
}
export default page
