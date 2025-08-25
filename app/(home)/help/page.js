import React from "react";
import Image from "next/image";
import Link from "next/link";
import Help from "./Help";

export const metadata = {
  title: "Help Center",
  description: ""
}

const page = async ({ searchParams }) => {
  return (
    <Help />
  );
};
export default page;
