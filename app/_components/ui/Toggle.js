"use client";
import { useState } from "react";

export default function Toggle() {
  const [isOn, setIsOn] = useState(false);

  return (
    <button
      onClick={() => setIsOn(!isOn)}
      className={` w-8 p-[2px] rounded-full transition-all duration-300
        bg-primary  flex ${isOn ? "justify-start" : "justify-end"} transition `}
    >
      {/* {isOn ? "ON" : "OFF"} */}
      <div className={`w-4 h-4 rounded-full transition-all duration-300 bg-white`}> </div>
    </button>
  );
}