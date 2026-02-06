"use client"
import Image from "next/image"
import React, { useState } from "react";
import { IoIosSearch } from "react-icons/io";
import LoginModal from "@/_components/auth/LoginModal";
import RegisterModal from "@/_components/auth/RegisterModal";
import ForgotPasswordModal from "@/_components/auth/ForgotPasswordModal";
import WelcomeModal from "@/_components/auth/WelcomeModal";
import WelcomeSupplierModal from "@/_components/auth/WelcomeSupplierModal";
import ModalDialog from "@/_components/ui/ModalDialog";
import TextModal from "@/_components/ui/TextModal";
import QuotationRequestModal from "@/_components/QuotationRequestModal";
import ThankYouModal from "@/_components/ThankYouModal";
import { searchAction } from '@/_library/redux/actions/click'

const Banner =  ({ bgImage , loggedIn}) => {

 console.log(loggedIn);
  const [selected_category, set_selected_category] = useState("")
  const [modalType, setModalType] = useState(null);
  const usps = [
    { title: "25,000+ Product Available" },
    { title: "35K+ Verified Vendor" },
    { title: "Leading B2B Marketplace" }
  ]
  const handleModalType = (type) => {
    setModalType(type);
  };
  const openQuoteModel = async () => {

    const currentTime = Date.now();
    localStorage.setItem(process.env.APP_PREFIX + 'selected_category_time', currentTime);
    localStorage.setItem(process.env.APP_PREFIX + 'selected_category', JSON.stringify(selected_category));
    localStorage.setItem(process.env.APP_PREFIX + 'search_text', search_text);

    if (loggedIn) {
      handleModalType('quotation_request')
    }
    else {
      handleModalType('login')
    }
    dispatch(searchAction(false))
  }
  const [search_text, set_search_text] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    openQuoteModel()
  }
  return (
    <>
      <section
        style={
          {
            // backgroundImage: ` url('/icons/hello.gif'), linear-gradient(135deg, #000, #000)`,
          }
        }
        className="relative bg-top bg-no-repeat bg-cover bg-[url('/homebanner.webp')]"
      >
        {/* <Image
        src="/icons/hello.gif"
        alt="Background"
        className="absolute inset-0 w-full h-full object-cover z-[-1]"
        width={100}
        height={100}
        priority
      /> */}
        {/* <div className="absolute inset-0 bg-[#000000] opacity-50 z-0"></div> */}
        <div className=" z-1 flex items-center">
          <div className="relative w-full flex flex-col py-[80px] md:py-[100px] px-[20px] items-center justify-center text-center">
            
            <div className="relative ">

              <h2 className="h1 font-alternate text-white md:!text-[96px]">
                JUST ASK <span className="text-primary ">VERA</span>
              </h2>
              <p className="text-white text-[16px] mb-10 mt-2 block">Here to make sourcing simple. <b>what are you looking for today?</b></p>
              <div className="flex items-center  gap-2 px-4 md:max-w-[512px] mx-auto border-2 border-white rounded-full bg-[#e8e8e82b]">
                <IoIosSearch className="text-white h-8 w-8" />
                <form method="post" onSubmit={handleSubmit} className="">

                  <input
                    type="text"
                    placeholder=""
                    className="w-full py-2.5 px-2  text-2xl text-white placeholder-gray-100 focus:outline-none focus:ring-0 transition"
                    name="search_text"
                    value={search_text}
                    autoComplete="off"
                    onChange={(e) => {
                      set_search_text(e.target.value)
                    }}
                  />
                </form>
                {/* <Search size={20} color="#fff"  className="cursor-pointer" 
        onClick={()=>{
          handleSearch()
        }}
        />  */}
                {/* <Button type="submit" size="none" variant="none" icon={<Search size={20} color="#fff"  className="cursor-pointer" />} />         */}
              </div>
              <div>

              </div>
            </div>
          </div>
        </div>
      </section>
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
      ) : (
        ""
      )}
    </>
  )
}

export default Banner
