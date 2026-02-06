import React from "react";
import Image from "next/image";
import Link from "next/link";
import Feedback from "./Feedback";

export const metadata = {
  title: "Feedback",
  description: ""
}

const page = async ({ searchParams }) => {
  return (
    <Feedback />
  );
};
export default page;
