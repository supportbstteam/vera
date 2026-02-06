import React from "react";
import { video } from "@/utils/Images";

function HowToModal({isCustomer=true}) {
  return (
    <div className="bg-black rounded-xl overflow-hidden shadow-2xl max-w-4xl w-full mx-auto">
      {/* Header */}
      <div className="px-4 py-3 border-b border-white/10">
        <h2 className="text-white text-md font-medium">{isCustomer ? "Customer" : "Supplier"} How to</h2>
      </div>

      {/* Video Wrapper */}
      <div
        className="relative w-full bg-black"
        style={{ aspectRatio: "16 / 9" }}
      >
        <video src={isCustomer ? video.customer : video.supplier} controls />
      </div>

      {/* Footer */}
      <div className="px-4 py-3 bg-black/80">
        <p className="text-xs text-gray-400">
          Watch this short video to understand the complete flow.
        </p>
      </div>
    </div>
  );
}

export default HowToModal;

