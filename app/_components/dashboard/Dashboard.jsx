import React from "react";
import Card from "../ui/Card";

const Dashboard = () => {
  const info = [
    { title: "Quotations Received", value: "2040", trend:"up", image: "/icons/bagBG.png", time:"yesterday", percent:"5.8" },
    { title: "Accept Quotation", value: "2040", trend:"down", image: "/icons/checkHand.png", time:"yesterday", percent:"6.3" },
    { title: "Reject Quotation", value: "2040", trend:"up", image: "/icons/time.png", time:"yesterday", percent:"1.6" },
  ];
  return (
    <div className="grid grid-cols-3 gap-6 ">
      {info.map((item, index) => (
        <Card key={index} className="mb-4" item={item} />
      ))}
    </div>
  );
};

export default Dashboard;
