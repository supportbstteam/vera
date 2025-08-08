"use client";
import React, { useState, useEffect, useRef, useCallback } from "react";
import SearchBar from "../ui/searchBar";
import { ChevronDown, Search, Tally1 } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import Button from "../ui/button";

import Api from "@/_library/Api";

import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import ProfileButton from "../dashboard/ProfileButton";

const Header = () => {
  const [categories, set_categories] = useState([]);
  const [openIndex, setOpenIndex] = useState(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    fetchCategoryData();
  }, []);

  const fetchCategoryData = async () => {
    const res = await Api.categories({});
    const resData = res.data;
    set_categories(resData.data);
  };

  const options = [];

  // const options = [
  //   { name: 'option1', link: '#' },
  //   { name: 'option2', link: '#' },
  //   { name: 'option3', link: '#' },
  //   { name: 'option4', link: '#' },
  //   { name: 'option5', link: '#' },
  // ]

  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpenIndex(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="hidden md:block bg-black ">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-4 border-b border-stock">
        <div className="flex items-center gap-4 justify-between w-full">
          <Link href="/">
            <Image
              src="/logo.png"
              alt="Logo"
              width={162}
              height={86}
              className="w-auto h-12"
            />
          </Link>
          <SearchBar />
          <div className="flex items-center gap-6">
            {/* <ProfileButton /> */}
            {/* <Link href="/login" className="text-sm text-white cursor-pointer">
              <span className="hidden md:inline">Login</span>
            </Link> */}
            <Link href="/testing" className="text-sm text-white cursor-pointer">
              <span className="text-sm text-white cursor-pointer">testing</span>
            </Link>
            <Link
              href="/register"
              className="text-sm text-white cursor-pointer"
            >
              <Button>Create Account</Button>
            </Link>
            
              
          </div>
        </div>
      </div>
                                                                  
    </header>
  );
};
export default Header;
