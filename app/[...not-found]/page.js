import "@/globals.css";
import Link from 'next/link'
import Image from 'next/image'

import { MoveLeft } from "lucide-react"

export const metadata = {
  title: "Page not found",
  description: "",
};

const Not_found = () =>{
  return (
    <>  
    <div className="container mx-auto text-center">
        <div className="mt-8">
          <h1 className="text-5xl font-bold leading-tight text-blue-800">404</h1>
          <h2 className="text-3xl font-bold leading-tight text-blue-800 mb-4">The page you are looking for doesn't exist.</h2>
          
          <Link className="bg-primary text-white font-bold py-2 px-4 rounded" href="/">
          <MoveLeft size={20} className="inline-block" />&nbsp;
          Back to home 
          </Link>
          
        </div> 
    </div>
    </>
  );
}
export default Not_found
