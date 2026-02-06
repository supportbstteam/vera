import Link from 'next/link'
import Image from "next/image";

import Dashboard from "./Dashboard";

export const metadata = {
  title: "Dashboard",
  description: "",
};

const Page = async ({ params, searchParams }) => {  
  return (
    <> 
    <Dashboard />
    </>
  );
}
export default Page
