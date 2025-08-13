"use client";
import React, { useState } from "react";
import Button from "../ui/button";
import Input from "../ui/Input";
import Image from "next/image";
import ReCAPTCHA from "react-google-recaptcha";

const AuthForm = ({ type }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [captchaValue, setCaptchaValue] = useState(null);

  const handleCaptchaChange = (value) => {
    console.log("Captcha value:", value);
    setCaptchaValue(value);
  };

  return (
    <div className="grid gap-4">
      {type === "register" && (
        <div className={`grid grid-cols-1 sm:grid-cols-2 gap-6`}>
          <Input
            label="First Name"
            placeholder="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          <Input
            label="Last Name"
            placeholder="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>
      )}
      <Input
        label="Email"
        type="email"
        placeholder="you@example.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <div className={type === "register" ? "grid grid-cols-2 gap-6" : ""}>
        <Input
          label="Password"
          type="password"
          placeholder="********"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {type === "register" && (
          <Input
            label="Confirm Password"
            type="password"
            placeholder="********"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        )}
      </div>
      <div className="recaptcha-scale">
        <ReCAPTCHA
          sitekey="YOUR_SITE_KEY" // Replace with your actual key
          onChange={handleCaptchaChange}
        />
      </div>
      <div className="grid gap-2">
        <Button>{type === "register" ? "Sign Up" : "Login"}</Button>
        <div className="flex flex-col items-center ">
          <p>Or</p>
        </div>
        <Button
          variant="gray"
          icon={
            <Image
              src="/icons/google.png"
              alt="Google"
              width={20}
              height={20}
            />
          }
          iconPosition="left"
        >
          {type === "register" ? "Register" : "Login"} with Google
        </Button>
      </div>
    </div>
  );
};

export default AuthForm;
