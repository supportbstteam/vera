import React from "react";
import Image from "next/image";
import Link from "next/link";
import Button from "@/_components/ui/button";

const TextModal = ({data}) => {
  return (
    <div className="bg-gray-100 p-8 ">
      <div className="max-w-5xl mx-auto flex items-center justify-center flex-col">
        <div className="w-fit rounded-md grid grid-cols-1 sm:grid-cols-1">          
          <div className="p-8 py-12 flex flex-col items-center">           
            <h2 style={{fontSize:"18px"}}>{data.text}</h2> 
          </div>
        </div>
      </div>
    </div>
  );
};
export default TextModal;