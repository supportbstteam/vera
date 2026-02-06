import Link from 'next/link'
import Image from "next/image";

import Lead from "./Lead";

export const metadata = {
  title: "My Leads",
  description: "",
};

const Page = async ({ searchParams }) => {  

  const mySearch = await searchParams 

  const __filterData = {  
    page: (mySearch.page) ? mySearch.page :  1,	 
	}
  return (
    <> 
    <Lead __filterData={__filterData}  />
    </>
  );
}
export default Page
