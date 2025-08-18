"use client"
import React, { useState, useEffect, useRef } from "react"
import Link from "next/link"
import Image from "next/image"

import Api from "@/_library/Api"
import { useSelector, useDispatch } from 'react-redux'
import { fetchUser } from '@/_library/redux/slice/userReducer'

import Button from '@/_components/ui/button'
import ProfileButton from "./ProfileButton";
import SearchBar from '@/_components/ui/searchBar'

import LoginModal from '@/_components/auth/LoginModal'
import RegisterModal from '@/_components/auth/RegisterModal'
import ForgotPasswordModal from '@/_components/auth/ForgotPasswordModal'
import WelcomeModal from '@/_components/auth/WelcomeModal'
import ModalDialog from '@/_components/ui/ModalDialog'

import QuotationRequestModal from '@/_components/QuotationRequestModal'
import ThankYouModal from '@/_components/ThankYouModal'

const Header = ({loggedIn}) => {

  const dispatch     = useDispatch()
  const userState    = useSelector( (state)=> state.user )  
  const user         = (userState.data) ? userState.data : {};  

  const [openIndex, setOpenIndex] = useState(null)
  const [modalType, setModalType] = useState(null)

  useEffect(() => {
    dispatch(fetchUser())        
  },[]);  
  
  const handleModalType = (type) => {
    setModalType(type)
  }
  

  const options = []
  // const options = [
  //   { name: 'option1', link: '#' },
  //   { name: 'option2', link: '#' },
  //   { name: 'option3', link: '#' },
  //   { name: 'option4', link: '#' },
  //   { name: 'option5', link: '#' },
  // ]

  
  return (
    <>
    <header className="hidden md:block bg-black">
      <div className="max-w-7xl mx-auto px-4 py-6 flex items-center justify-between gap-4 border-b border-stock">
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
          <SearchBar handleModalType={handleModalType} loggedIn={loggedIn} />
          <div className="flex items-center gap-6">
             {
                loggedIn ?
                <ProfileButton /> 
                :
                <>                
                <Button variant="outline" color="white" type="submit" onClick={() => setModalType("login")} className="py-1">Login</Button>  
                <Button onClick={() => setModalType("register")}>Create Account</Button>                
                </>
            }
          </div>
        </div>
      </div>
    </header>
    {
      modalType === "login" ?
      <ModalDialog
        isOpen={true}
        onClose={ () => setModalType(false) }
        >
        <LoginModal handleModalType={handleModalType} />
      </ModalDialog>
      :
      modalType === "register" ?
      <ModalDialog
        isOpen={true}
        onClose={ () => setModalType(false) }
        >
        <RegisterModal handleModalType={handleModalType} />
      </ModalDialog>
      :
      modalType === "forgot_password" ?
      <ModalDialog
        isOpen={true}
        onClose={ () => setModalType(false) }
        >
        <ForgotPasswordModal handleModalType={handleModalType} />
      </ModalDialog>
      :
      modalType === "welcome" ?
      <ModalDialog
        isOpen={true}
        onClose={ () => setModalType(false) }
        >
        <WelcomeModal handleModalType={handleModalType} />
      </ModalDialog>
      :
      modalType === "quotation_request" ?
      <ModalDialog
        isOpen={true}
        onClose={ () => setModalType(false) }
        >
        <QuotationRequestModal handleModalType={handleModalType} />
      </ModalDialog>
      :
      modalType === "thank_you" ?
      <ModalDialog
        isOpen={true}
        onClose={ () => setModalType(false) }
        >
        <ThankYouModal handleModalType={handleModalType} />
      </ModalDialog>
      :
      ''
    }
    </>
  )
}
export default Header
