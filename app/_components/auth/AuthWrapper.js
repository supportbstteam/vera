"use client";
import React, { useState, useEffect, useRef, useCallback, Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from 'react-redux'
import { fetchUser } from '@/_library/redux/slice/userReducer'

const AuthWrapper = () => {

  const dispatch     = useDispatch()
  const userState    = useSelector( (state)=> state.user )  
  const user         = (userState.data) ? userState.data : {};

  useEffect(() => {    
    dispatch(fetchUser())   
    console.log('user::',user)     
  },[]);   

  return (
    <></>
  );
};
export default AuthWrapper;
