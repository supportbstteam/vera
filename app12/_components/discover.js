import React from "react"

const Discover = () => {
  return (
    <div>
      <section className="max-w-[1300px] mx-auto px-4 py-8 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr_1fr] gap-6">
          {/* Box 1 */}
          <div
            className="bg-white rounded-lg overflow-hidden flex items-center shadow-sm relative bg-center bg-cover"
            style={{
              backgroundImage: ` url('/assets/discover1.jpg')`
            }}
          >
            <div className=" p-6 text-black">
              <h3 className=" h3 mb-1">
                Discover
                <br />
                VERA
              </h3>
              <p className="text-base text-gray-700">
                Where Smart Buyers Meet Competitive Sellers
              </p>
            </div>
          </div>

          {/* Box 2 */}
          <div
            className="bg-white rounded-lg overflow-hidden flex items-center shadow-sm bg-right bg-cover"
            style={{
              backgroundImage: ` url('/assets/discover2.jpg')`
            }}
          >
            <div className="p-6 text-black">
              <h3 className="h3 mb-4">VERA Helps Your Business</h3>
              <ul className="space-y-2 text-base">
                <li className="flex items-center gap-2">
                  ✅ Bulk Quote Requests
                </li>
                <li className="flex items-center gap-2">
                  ✅ Verified Vendor Network
                </li>
                <li className="flex items-center gap-2">
                  ✅ Transparent Price Comparison
                </li>
              </ul>
            </div>
          </div>

          {/* Box 3 */}
          <div className="bg-orange-400 rounded-lg overflow-hidden shadow-sm">
            <img
              src="/assets/discover3.jpg"
              alt="Success Image"
              className="w-full h-[300px] object-cover"
            />
          </div>
        </div>
      </section>
    </div>
  )
}

export default Discover
