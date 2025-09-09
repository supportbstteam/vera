import Link from 'next/link'
import Image from "next/image";
import Settings from "./Settings"

export const metadata = {
  title: "Settings",
  description: "",
};

const page = () => {
  return (
    <>
    <Settings /> 
    </>
  )
}
export default page
