"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import Input from "./ui/Input";
import Textarea from "./ui/Textarea";
import Button from "./ui/button";
import QuantityStepper from "./ui/QuantityStepper";
import ThankYou from "./ui/ThankYou";

const QuotationRequest = () => {
  const [full_name, setFull_name] = useState();
  const [email, setEmail] = useState();
  return (
    <section className="max-w-2xl m-auto p-6">
      <div>
        <h3 className="h3">Request a Quotation</h3>
        <p>
          Fill in the details below so our vendors can send you the best price.
        </p>
      </div>
      <div className="grid grid-cols-[2fr_3fr] justify-start  items-center gap-6 mt-8 ">
        <span className="inline-flex justify-center items-center gap-2 text-primary bg-primaryLight px-6 py-3 rounded-[8px]">
          <Image
            src="/icons/laptop.png"
            alt=""
            width={30}
            height={30}
            unoptimized
          />{" "}
          Laptop & Computer
        </span>
        {/* <span className="inline-flex justify-center items-center gap-2 text-black px-6 py-3 rounded-[8px] border border-gray focus:outline-none focus:ring-2 focus:ring-primary">
          Laptop Asus Vivobook I5 1355U, 8GB RAM, 512GB SSD
        </span> */}

          <Input
            label=""
            placeholder="Laptop Asus Vivobook I5 1355U, 8GB RAM, 512GB SSD"
            name="first_name"
            value="Laptop Asus Vivobook I5 1355U, 8GB RAM, 512GB SSD"
            className="h-14"
          />
      </div>
      <div className=" grid grid-cols-3 gap-6 my-6 ">
        <Input
          label="First Name"
          placeholder="First Name"
          name="first_name"
          value={full_name}
          mandatory={true}

        />
        <Input
          label="Email"
          type="text"
          placeholder="you@example.com"
          name="email"
          value={email}
          mandatory={true}

        />
        <Input
          label="Phone"
          type="text"
          placeholder="Contact No"
          name="first_name"
          value={full_name}
          mandatory={true}
        />
      </div>
      <Textarea
        label="Special Requirements"
        placeholder="Add any details or specifications for your request"
        type="address"
        rows="4"
      />
      <div className="flex justify-between items-end mt-4 ">
        <QuantityStepper />
        <Button>Request Quotes from Vendors</Button>
      </div>
      <ThankYou/>
    </section>
  );
};

export default QuotationRequest;
