import React from "react";
import Image from "next/image";
import Link from "next/link";
import Terms from "./Terms";

export const metadata = {
  title: "Terms and condition",
  description: ""
}

const page = async ({ searchParams }) => {
  return (
    <Terms />
  );
};
export default page;
