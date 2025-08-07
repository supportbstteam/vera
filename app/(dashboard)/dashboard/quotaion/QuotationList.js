// components/QuotationList.tsx
import Image from "next/image"
import Button from "@/_components/ui/button"  
import DashboardNavigation from "@/_components/layout/DashboardNavigation"

const orders = [
  {
    id: 1,
    title: "Laptop Asus Vivobook I5 1355U, 8GB RAM, 512GB SSD",
    postedOn: "July 25,2025",
    vendorInterest: 3,
    status: "Active",
    image: "/assets/laptop.png"
  },
  {
    id: 2,
    title: "OPPO A79 Pro 5G – 6000 mAh Battery, 8GB RAM, 128GB, 4k UltraHD",
    postedOn: "July 25,2025",
    vendorInterest: 3,
    status: "Active",
    image: "/assets/laptop.png"
  },
  {
    id: 3,
    title: "PowerA Wired Controller For Xbox Series X|S",
    postedOn: "March 06,2025",
    vendorInterest: 6,
    status: "Closed",
    image: "/assets/laptop.png"
  },
  {
    id: 1,
    title: "Laptop Asus Vivobook I5 1355U, 8GB RAM, 512GB SSD",
    postedOn: "July 25,2025",
    vendorInterest: 3,
    status: "Active",
    image: "/assets/laptop.png"
  },
  {
    id: 2,
    title: "OPPO A79 Pro 5G – 6000 mAh Battery, 8GB RAM, 128GB, 4k UltraHD",
    postedOn: "July 25,2025",
    vendorInterest: 3,
    status: "Active",
    image: "/assets/laptop.png"
  },
  {
    id: 3,
    title: "PowerA Wired Controller For Xbox Series X|S",
    postedOn: "March 06,2025",
    vendorInterest: 6,
    status: "Closed",
    image: "/assets/laptop.png"
  }
  
]

const statusColors = {
  Active: "bg-green-100 text-green-700",
  Closed: "bg-red-100 text-red-600"
}

export default function QuotationList() {
  return (
    <div className="max-w-7xl m-auto py-16 flex flex-col gap-6">
        <DashboardNavigation />
    <div className="divide-y divide-stock">
      {orders.map((item, i) => (
        <div key={i}>
          <div className="flex items-center justify-between gap-4 py-4">
            {/* Image + Content */}
            <div className="w-6/12 flex items-center gap-4 ">
              <Image
                src={item.image}
                alt={item.title}
                width={80}
                height={50}
                className="rounded-md"
              />
              <div className="">
                <h3 className="font-medium text-base">{item.title}</h3>
                <p className="text-sm text-gray-500">
                  Posted on : {item.postedOn}
                </p>
              </div>
            </div>

            {/* Info Tags */}
            <div className="w-6/12 flex items-center justify-between gap-4 ">
              <span className="text-sm bg-purple-100 text-purple-600 px-3 py-2 rounded-full">
                {String(item.vendorInterest).padStart(2, "0")} Vendor Show
                Interest
              </span>

              <span
                className={`text-sm px-3 py-2 rounded-full flex items-center gap-1 ${
                  statusColors[item.status]
                }`}
              >
                <span className="h-2 w-2 bg-current rounded-full" />
                {item.status} Order
              </span>

              <Button variant="outline" size="sm" color="primary">
                View Detail
              </Button>
            </div>
          </div>

          {/* Divider */}
          {/* {i !== orders.length - 1 && <hr className="my-4 border border-stock" />} */}
          {/* {i !== orders.length - 1 && <hr className="my-4 border-[0.75px] border-stock" />} */}
        </div>
      ))}
    </div>
    </div>
  )
}
