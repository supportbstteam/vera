"use client"
import React, { useState, useEffect, useRef } from "react"
import { LifeBuoy, Mail, MapPin, MoveRight, Phone, Smile } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import Loader from "@/_components/ui/Loader" 
import Button from "@/_components/ui/button";
import Api from '@/_library/Api';
import validation from '@/_library/validation';

const Terms = () =>{  

  return (
    <>
    <div className="max-w-7xl mx-auto px-4 py-8 md:py-16">
    <div className="grid grid-cols-1 items-center">
      <div className="flex flex-col items-start justify-center gap-4">
      Terms and condition....
      </div>                      
    </div>
    </div>
    </>
  )
}
export default Terms;