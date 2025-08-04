"use client";
import React, { useState } from "react";
import Button from "../ui/button";
import Input from "../ui/Input";

const AuthForm = ({ type }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  return (
    <div className="grid gap-6">

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
      <Button >{type === "register" ? "Sign Up" : "Login"}</Button>
      <div className="flex flex-col items-center ">
        <p>Or</p>
      </div>
      <Button variant="gray">{type === "register" ? "Register" : "Login"} with Google</Button>
    </div>
  );
};

export default AuthForm;
