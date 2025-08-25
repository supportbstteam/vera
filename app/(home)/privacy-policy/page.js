import React from "react";
import Image from "next/image";
import Link from "next/link";
import Privacy_policy from "./Privacy_policy";

export const metadata = {
  title: "Privacy policy",
  description: ""
}

const page = async ({ searchParams }) => {
  return (
    <Privacy_policy />
  );
};
export default page;
