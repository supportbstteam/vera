import Button from "@/_components/ui/button" 

const vendors = [
  {
    name: "ABC Electronics Pvt Ltd",
    price: "€679",
    rating: "3.8/5",
    reviews: 256,
    warranty: "1 Year Warranty",
    description:
      "We offer 100% genuine products with manufacturer warranty and free delivery for your peace of mind."
  },
  {
    name: "Urban Gadget Hub",
    price: "€699",
    rating: "4.8/5",
    reviews: 256,
    warranty: "1 Year Warranty",
    description: "N/A"
  },
  {
    name: "Global Electronics Traders",
    price: "€689",
    rating: "2.8/5",
    reviews: 256,
    warranty: "6 Year Warranty",
    description: "Your satisfaction is our priority."
  }
]

export default function VendorQuotationCard() {
  return (
    <div className="p-4 rounded-lg shadow-sm">
      {/* Header */}
      <div className="flex justify-between items-start p-4  rounded-lg mb-4">
        <div className="flex gap-3">
          <img
            src="/assets/laptop.png"
            alt="Laptop"
            className="w-12 h-12 rounded object-cover"
          />
          <div>
            <p className="font-medium">
              Laptop Asus Vivobook I5 1355U, 8GB RAM, 512GB SSD
            </p>
            <p className="text-sm text-gray-500">Posted on : July 25, 2025</p>
          </div>
        </div>
        {/* <Button variant="ghost" size="icon">
          <X  size={24} />
        </Button> */}
      </div>

      {/* Vendor List */}
      <>
        {vendors.map((vendor, index) => (
          <div key={index} className="divide-y divide-stock">
            <div className="grid grid-cols-[1fr_1fr_2fr_1fr] items-center justify-between py-4 px-6 ">
              <div>
                <p className="font-medium">{vendor.name}</p>
                <div className="flex items-center text-base text-gray-900">
                  <span>⭐ {vendor.rating}</span>
                  <span className="ml-1">({vendor.reviews} reviews)</span>
                </div>
              </div>

              <div className="">
                <p className="text-base text-gray-900">{vendor.price}</p>
                <p className="text-base text-gray-900">{vendor.warranty}</p>
              </div>

              <p className="text-base text-gray-900 flex-1 ml-4">
                {vendor.description}
              </p>
              <div className="flex items-center justify-end gap-2">
                <Button variant="outline" size="sm" className="w-fit">
                  Select Vendor
                </Button>
              </div>
            </div>
            {/* {index < vendors.length - 1 && <Separator />} */}
          </div>
        ))}
      </>

      {/* Footer */}
      <div className="flex items-center justify-between mt-4 p-6">
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-600">Active Quotation</span>
          {/* <Switch defaultChecked /> */}
        </div>
        <Button variant="outline" size="sm" className="w-fit">
          Delete Quotation
        </Button>
      </div>
    </div>
  )
}
