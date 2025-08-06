import { BaggageClaim, ChevronDown, LogOut, SettingsIcon, ShoppingBag, Tag, TreePalmIcon, UserIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const items = [
  { image: "/icons/shoppingBag.png", label: "My Profile", href: "/dashboard/profile" },
  { image: "/icons/quotaion.png", label: "My Quotaion", href: "/dashboard/billing" },
  { image: "/icons/baggageClaim.png", label: "Recent Activity", href: "/dashboard/team" },
  { image: "/icons/settings.png", label: "Settings", href: "/dashboard/settings" },
];


const ProfileButton = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  return (
    <button className="relative" onClick={() => setIsOpen(!isOpen)}>
      <div className="flex items-center gap-2 px-2 py-1.5 rounded-full bg-[#1e1e1e] text-white border border-gray-700 hover:bg-[#2a2a2a]">
        <Image
          src="/user.jpg" // Replace with your image path
          alt="User Avatar"
          width={28}
          height={28}
          className="rounded-full"
        />
        <span className="text-sm font-medium">Cameron Williamson</span>
        {isOpen ? (
          <ChevronDown size={20} strokeWidth={2.5} className="transform rotate-180 transition-transform duration-200" />
        ) : (
          <ChevronDown size={20} strokeWidth={2.5} className="transition-transform duration-200" />
        )}
      </div>
      <div className={`absolute z-3 right-0 mt-2 w-full bg-white rounded-md shadow-lg ${isOpen ? "block" : "hidden"}`}>
        <ul className="py-1 divide-y divide-gray-200">
          {items.map((item) => (
            <li key={item.label} >
              <Link
                href={item.href}
                className="flex items-center gap-2 px-4 py-2 text-black hover:bg-gray-100"
              >
                <Image src={item.image} alt={item.label} width={24} height={16} className="inline-block" />
                <span className="text-base">{item.label}</span>
              </Link>
            </li>
          ))}
          <li className="flex items-center justify-center gap-2 px-4 py-2 text-base text-black hover:bg-gray-100">
            Logout <LogOut size={16}/>
          </li>
        </ul>
      </div>
    </button>
  );
};

export default ProfileButton;
