import React from "react"
import { Star, UserRoundCheck } from "lucide-react"
import Image from "next/image"

const products = [
  {
    title: "Ipad Mini 6 A15 Bionic chip, 8.3 inch, 6th Gen, Wi-Fi",
    image: "/assets/phone.png"
  },
  {
    title: "OPPO A79 Pro 5G - 6000 mAh Battery, 8GB Ram",
    image: "/assets/phone.png"
  },
  {
    title: "Apple iPhone 11 Pro, 256GB, Black – Fully Unlocked",
    image: "/assets/phone.png"
  },
  {
    title: "SAMSUNG Galaxy Tab S8 11” 128GB WiFi 6E Android",
    image: "/assets/phone.png"
  },
  {
    title: "Unlocked Dual-SIM Android Smart Phone, 6.7” LCD",
    image: "/assets/phone.png"
  },
  {
    title: "Expansive Touchscreen Tablet, 12.7” 3K Display",
    image: "/assets/phone.png"
  }
]

const BestCategorySection = () => {
  return (
    <section className="max-w-[1300px] mx-auto px-4 ">
      <div className="flex items-center justify-between mb-6 flex-wrap gap-2">
        <h2 className="text-xl md:text-2xl font-semibold">
          Shop By Best Category
        </h2>
        <ul className="flex flex-col md:flex-row gap-4 text-sm ">
          {[
            "Phone & Tablet",
            "Laptop & Computer",
            "TV,flexVideo & Audio",
            "Other Accessories",
            "See all Product"
          ].map((tab, i) => (
            <li
              key={i}
              className={`cursor-pointer pb-2 ${
                i === 0
                  ? "font-semibold border-b-2 border-black"
                  : "text-gray-600"
              }`}
            >
              {tab}
            </li>
          ))}
        </ul>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-px bg-gray-200 border border-gray-200">
        {products.map((product, i) => (
          <div
            key={i}
            className="grid grid-cols-[5fr_7fr] gap-4 py-8 px-6 bg-white "
          >
            <Image
              src={product.image}
              alt={product.title}
              width={100}
              height={100}
              className="w-24 h-28 object-contain"
            />
            <div className="grid gap-2">
              <h3 className="text-sm font-medium leading-snug">
                {product.title}
              </h3>
              <div className="flex gap-2 mt-2 flex-wrap text-xs">
                <span className="bg-purple-100 text-purple-700 px-2 py-1 rounded-full">
                  🟣 Vira Verified
                </span>
                <div className="bg-purple-100 text-purple-700 px-2 py-1 rounded-full flex gap-1 justify-between-around">
                  <UserRoundCheck size={14} /> 10 Vendor
                </div>
              </div>
              <div className="flex items-center text-sm text-gray-700 mt-2 ">
                {[...Array(4)].map((_, i) => (
                  <Star key={i} size={14} fill="#facc15" stroke="transparent" />
                ))}
                <Star size={14} stroke="#facc15" />
                <span className="ml-2 text-xs">4.9 (47)</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default BestCategorySection
