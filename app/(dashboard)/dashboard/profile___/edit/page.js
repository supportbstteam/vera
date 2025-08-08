import Link from 'next/link'
import Image from "next/image";
import EditProfile from "./EditProfile"

export const metadata = {
  title: "Edit Profile",
  description: "",
};

const page = () => {
  return (
    <>
    <EditProfile />  
    </>
  )
}
export default page
