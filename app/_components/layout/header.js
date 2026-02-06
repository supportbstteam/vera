"use client";
import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";

import Api from "@/_library/Api";
import { useSelector, useDispatch } from "react-redux";
import { fetchUser } from "@/_library/redux/slice/userReducer";

import Button from "@/_components/ui/button";
import ProfileButton from "./ProfileButton";
import SearchBar from "@/_components/ui/searchBar";

import LoginModal from "@/_components/auth/LoginModal";
import RegisterModal from "@/_components/auth/RegisterModal";
import ForgotPasswordModal from "@/_components/auth/ForgotPasswordModal";
import WelcomeModal from "@/_components/auth/WelcomeModal";
import WelcomeSupplierModal from "@/_components/auth/WelcomeSupplierModal";
import ModalDialog from "@/_components/ui/ModalDialog";
import TextModal from "@/_components/ui/TextModal";

import QuotationRequestModal from "@/_components/QuotationRequestModal";
import ThankYouModal from "@/_components/ThankYouModal";
import { Tally1, Search, ChevronDown, CrossIcon, Menu, X } from "lucide-react";
import { IoIosSearch } from "react-icons/io";
import HowToModal from "../auth/HowToModal";

const Header = ({ loggedIn }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  const userState = useSelector((state) => state.user);
  const user = userState.data ? userState.data : {};

  const [openIndex, setOpenIndex] = useState(null);
  const [modalType, setModalType] = useState(null);
  const [search_text, set_search_text] = useState("");
  const [openSubmenus, setOpenSubmenus] = useState({});
  useEffect(() => {
    dispatch(fetchUser());
  }, []);

  const handleModalType = (type) => {
    setModalType(type);
  };

  const options = [];
  // const options = [
  //   { name: 'option1', link: '#' },
  //   { name: 'option2', link: '#' },
  //   { name: 'option3', link: '#' },
  //   { name: 'option4', link: '#' },
  //   { name: 'option5', link: '#' },
  // ]
  const menu = [
    {
      label: "Electronic",
      href: "/",
      submenu: [
        { label: "Camera", href: "/" },
        { label: "Smart Watch", href: "/" },
      ],
    },
    {
      label: "Fashion",
      href: "/",
      submenu: [
        { label: "Men's Wear", href: "/" },
        { label: "Women's Wear", href: "/" },
      ],
    },
    {
      label: "Phone & Tablet",
      href: "/",
      submenu: [
        { label: "Ios", href: "/" },
        { label: "Android", href: "/" },
      ],
    },
    {
      label: "Laptop & Computer",
      href: "/",
      submenu: [
        { label: "Gaming Laptops", href: "/" },
        { label: "Accessories", href: "/" },
      ],
    },
    {
      label: "TV, Audio - Video",
      href: "/",
      submenu: [
        { label: "Mi", href: "/" },
        { label: "Samsung", href: "/" },
      ],
    },
  ];

  const toggleSubmenu = (idx) => {
    setOpenSubmenus((prev) => ({
      ...prev,
      [idx]: !prev[idx],
    }));
  };

  // console.log("loggedIn in header:", loggedIn);
  return (
    <>
      <header className="md:block bg-black">
        <div className="px-4 py-5 border-[#858585] border-b-[.2px]">
          <div className="max-w-7xl mx-auto  flex flex-col items-center justify-between gap-4">
            <div className=" flex items-center gap-4 justify-between w-full">
              <div className="flex gap-20 items-center w-[80%] sm:w-2/12 lg:w-4/12">
                <Link href="/" className="">
                  <Image
                    src="/logomain.svg"
                    alt="Logo"
                    width={162}
                    height={86}
                    className="w-auto h-12"
                  />
                </Link>
                {/* <Link href="/about-us" className="text-white font-semibold hidden lg:block">About Us</Link> */}
              </div>
              {/* <div className="w-6/12 hidden md:flex justify-center ">
                <SearchBar
                  handleModalType={handleModalType}
                  loggedIn={loggedIn}
                />
              </div> */}
              <div className="6/12 md:w-9/12 flex justify-end ">
                {loggedIn ? (
                  <div className="flex items-center gap-2">
                    <Link
                      href="/about-us"
                      className="text-white text-sm  items-center font-[500] hidden lg:flex"
                    >
                      About Us
                    </Link>

                    <div className="flex items-center ml-5 group">
                      <div
                        onClick={() => setModalType("customer")}
                        className="block cursor-pointer px-4 py-2 text-sm text-white hover:underline"
                      >
                        Customer How to
                      </div>

                      <div
                        onClick={() => setModalType("supplier")}
                        className="block cursor-pointer px-4 py-2 text-sm text-white hover:underline"
                      >
                        Supplier How to
                      </div>
                    </div>

                    <ProfileButton />

                    {/* <div className="relative hidden lg:flex items-center ml-5 group">
                     
                      <span
                        className="relative pr-3 text-white text-sm font-[500] cursor-pointer
      after:absolute after:h-[50%]  after:right-[-2px] after:content-['']"
                      >
                        How to
                      </span>
                      
                    </div> */}
                  </div>
                ) : (
                  <div className="flex items-center w-6 md:w-full justify-end ">
                    <Menu
                      color="white"
                      className="block md:hidden"
                      onClick={() => setIsOpen(!isOpen)}
                    />
                    {/* <ProfileButton /> */}
                    <Link
                      href="/about-us"
                      className="relative pr-3 text-white text-sm items-center font-[500] hidden lg:flex
         after:absolute after:h-[50%] after:w-px after:bg-white after:right-[-2px] after:content-['']"
                    >
                      About Us
                    </Link>

                    <div className="flex items-center ml-5 group">
                      <div
                        onClick={() => setModalType("customer")}
                        className="block cursor-pointer px-4 py-2 text-sm text-white hover:underline"
                      >
                        Customer How to
                      </div>

                      <div
                        onClick={() => setModalType("supplier")}
                        className="block cursor-pointer px-4 py-2 text-sm text-white hover:underline"
                      >
                        Supplier How to
                      </div>
                    </div>

                    <div className="hidden md:flex items-center justify-end gap-6 ">
                      <Button
                        variant=""
                        color="white"
                        type="submit"
                        onClick={() => setModalType("login")}
                        className="py-1 "
                      >
                        Login
                      </Button>
                      <Button onClick={() => setModalType("register")}>
                        Create Account
                      </Button>
                    </div>

                    {/* <div className="relative hidden lg:flex items-center ml-5 group">
                      <span
                        className="relative pr-3 text-white text-sm font-[500] cursor-pointer
      after:absolute after:h-[50%]  after:right-[-2px] after:content-['']"
                      >
                        How to
                      </span>
                      <div
                        className="absolute left-full top-1/2 -translate-y-1/2 ml-4
      w-44 rounded-md shadow-lg
      opacity-0 invisible group-hover:opacity-100 group-hover:visible
      transition-all duration-200 border-l-red-500 "
                      >
                        <Link
                          href="/how-to/customer"
                          className="block px-4 py-2 text-sm text-white hover:underline"
                        >
                          For Customer
                        </Link>

                        <Link
                          href="/how-to/supplier"
                          className="block px-4 py-2 text-sm text-white hover:underline"
                        >
                          For Supplier
                        </Link>
                      </div>
                    </div> */}
                  </div>
                )}
              </div>
            </div>
            {/* <div className="w-full block md:hidden mt-4">
              <SearchBar
                handleModalType={handleModalType}
                loggedIn={loggedIn}
              />
            </div> */}

            <div
              className={`${
                isOpen === true && loggedIn === false ? "block" : "hidden"
              } w-8/12 top-0  fixed z-1 right-0 p-4 bg-black h-full`}
            >
              <div className="flex flex-col items-end gap-4">
                <X
                  color="white"
                  onClick={() => setIsOpen(false)}
                  className="cursor-pointer"
                />

                <Link href="/about-us" className="text-white font-semibold">
                  About Us
                </Link>

                {/* <ul className="flex flex-col gap-4 w-full items-end">
          {menu.map((item, idx) => (
            <li key={idx} className="w-full text-right">
              <div
                onClick={() => toggleSubmenu(idx)}
                className="flex justify-between items-center text-gray-300 hover:text-white cursor-pointer"
              >
                <span>{item.label}</span>
                {item.submenu && <ChevronDown size={16} className={`transition-transform ${openSubmenus[idx] ? "rotate-180" : ""}`} />}
              </div>

              {item.submenu && openSubmenus[idx] && (
                <ul className="mt-2 space-y-2 text-sm text-gray-400">
                  {item.submenu.map((subitem, subIdx) => (
                    <li key={subIdx}>
                      <Link href={subitem.href} className="block hover:text-white">
                        {subitem.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul> */}

                <Button
                  variant="outline"
                  color="white"
                  type="submit"
                  size="full"
                  onClick={() => {
                    setModalType("login");
                    setIsOpen(false);
                  }}
                  className="py-1"
                >
                  Login
                </Button>

                <Button
                  size="full"
                  onClick={() => {
                    setModalType("register");
                    setIsOpen(false);
                  }}
                >
                  Create Account
                </Button>
              </div>
            </div>
          </div>
        </div>
        {/* <div className="max-w-7xl mx-auto py-5 px-0 gap-6 items-center hidden md:flex md:flex-wrap md:justify-start max-md:justify-center md:px-5
">
          <div className="flex  items-center  gap-2 border-r-2 border-gray-500"><IoIosSearch className="text-primary h-8 w-8" />  <input
          type="text"
          placeholder="Search by Category"
          className="w-full text-white placeholder-gray-100 focus:outline-none focus:ring-0 transition"
          name="search_text" 
          value={search_text}
          autoComplete="off"
          onChange={(e)=>{           
            set_search_text(e.target.value)
          }}
        /></div>
          
          <ul className="flex space-x-3 md:space-x-8">
            {menu.map((item, idx) => (
            <li key={idx} className="relative group">
            <Link
              href={item.href}
              className="flex items-center text-gray-300 hover:text-white transition"
            >
              {item.label}
              {item.submenu && (
                <span className="ml-1 transition-transform duration-200 group-hover:rotate-180">
                  <ChevronDown size={16} />
                </span>
              )}
            </Link>

            {item.submenu && (
              <ul className="absolute top-full left-0 mt-2 w-48 bg-white text-black shadow-lg opacity-0 group-hover:opacity-100 invisible group-hover:visible transition-all duration-200 z-10">
                {item.submenu.map((subitem, subIdx) => (
                  <li key={subIdx}>
                    <Link
                      href={subitem.href}
                      className="block px-4 py-2 hover:bg-gray-100"
                    >
                      {subitem.label}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </li>
            ))}
          </ul>
        </div> */}
      </header>
      {modalType === "login" ? (
        <ModalDialog isOpen={true} onClose={() => setModalType(false)}>
          <LoginModal handleModalType={handleModalType} />
        </ModalDialog>
      ) : modalType === "register" ? (
        <ModalDialog isOpen={true} onClose={() => setModalType(false)}>
          <RegisterModal handleModalType={handleModalType} />
        </ModalDialog>
      ) : modalType === "forgot_password" ? (
        <ModalDialog isOpen={true} onClose={() => setModalType(false)}>
          <ForgotPasswordModal handleModalType={handleModalType} />
        </ModalDialog>
      ) : modalType === "welcome" ? (
        <ModalDialog isOpen={true} onClose={() => setModalType(false)}>
          <WelcomeModal handleModalType={handleModalType} />
        </ModalDialog>
      ) : modalType === "welcome_supplier" ? (
        <ModalDialog isOpen={true} onClose={() => setModalType(false)}>
          <WelcomeSupplierModal handleModalType={handleModalType} />
        </ModalDialog>
      ) : modalType === "quotation_request" ? (
        <ModalDialog isOpen={true} onClose={() => setModalType(false)}>
          <QuotationRequestModal handleModalType={handleModalType} />
        </ModalDialog>
      ) : modalType === "thank_you" ? (
        <ModalDialog isOpen={true} onClose={() => setModalType(false)}>
          <ThankYouModal handleModalType={handleModalType} />
        </ModalDialog>
      ) : modalType === "select_category" ? (
        <ModalDialog isOpen={true} onClose={() => setModalType(false)}>
          <TextModal
            handleModalType={handleModalType}
            data={{
              text: "Please select category",
            }}
          />
        </ModalDialog>
      ) : modalType === "customer" ? (
        <ModalDialog isOpen={true} onClose={() => setModalType(false)}>
          <HowToModal isCustomer={true} />
        </ModalDialog>
      ) : modalType === "supplier" ? (
        <ModalDialog isOpen={true} onClose={() => setModalType(false)}>
          <HowToModal isCustomer={false} />
        </ModalDialog>
      ) : null}
    </>
  );
};
export default Header;
