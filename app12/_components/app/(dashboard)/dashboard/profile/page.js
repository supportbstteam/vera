import Link from 'next/link'
import Image from "next/image";
import Profile from "./Profile"

export const metadata = {
  title: "My Profile",
  description: "",
};

const page = () => {
  return (
    <>
    <Profile /> 
    </>
  )
}
export default page
