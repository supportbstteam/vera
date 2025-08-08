import Link from 'next/link'
import Image from "next/image";

import Lead from "./Lead";

export const metadata = {
  title: "Dashboard",
  description: "",
};

const Page = async ({ params, searchParams }) => {  
  return (
    <> 
    <Lead />
    </>
  );
}
export default Page
