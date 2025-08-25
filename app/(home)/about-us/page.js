import React from "react";
import Image from "next/image";
import Link from "next/link";
import About_us from "./About_us";

export const metadata = {
  title: "About us",
  description: ""
}

const page = async ({ searchParams }) => {
  return (
    <About_us />
  );
};
export default page;
