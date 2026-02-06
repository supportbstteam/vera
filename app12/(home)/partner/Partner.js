"use client"
import React, { useState, useEffect, useRef } from "react"
import { LifeBuoy, Mail, MapPin, MoveRight, Phone, Smile } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import Loader from "@/_components/ui/Loader" 
import Button from "@/_components/ui/button";
import Api from '@/_library/Api';
import validation from '@/_library/validation';

const Partner = ({pageData}) =>{  

  return (
    <>
    <div dangerouslySetInnerHTML={{ __html: pageData.content }} ></div>    
    </>
  )
}
export default Partner;