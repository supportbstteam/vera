import React from "react";
import Image from "next/image";
import Link from "next/link";
import Contact_us from "./Contact_us";

export const metadata = {
  title: "Contact us",
  description: ""
}

const page = async ({ searchParams }) => {
  return (
    <Contact_us />
  );
};
export default page;
