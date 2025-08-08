import { LifeBuoy, Mail, MapPin, MoveRight, Phone, Smile } from "lucide-react";
import Image from "next/image";
import React from "react";
import Link from "next/link";

import Newsletter from "@/_components/Newsletter";

const Footer = () => {
  return (
    <footer className="bg-[#111111] text-white pb-6 text-sm py-8 md:py-16">
      {/* <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-[3fr_2fr_2fr_2fr_3fr] gap-8">  */}
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 items-start md:grid-cols-[4fr_2fr_4fr] gap-8">
        <div className="grid grid-cols-2 space-y-8">
          <div className="flex items-start gap-2 text-[#C61AFF] text-xl font-bold">
            <Image
              src="/logoFooter.png"
              alt="VERA Logo"
              width={90}
              height={40}
            />
          </div>
          <>
            <div className="text-gray-400 space-y-6">
              <div className="flex gap-2 items-start">
                <MapPin strokeWidth={1} size="24" />
                <p>
                  45 Innovation Street,
                  <br />
                  Berlin Tech Park,
                  <br />
                  10115 Berlin, Germany
                </p>
              </div>
              <div className="flex gap-2 items-start">
                <Mail strokeWidth={1} size="24" />
                <p>
                  <a href="mailto:info@example.com">info@example.com</a>
                </p>
              </div>
              <p className="text-2xl text-white font-bold">
                <a href="tel:(+92) 3942 7879">(+49) 3942 7879</a>
              </p>
            </div>
          </>
        </div>

        <div>
          <h3 className="font-semibold mb-4">SHOPPING</h3>
          <ul className="space-y-4 text-white text-sm">
            <li>
              <Link href="/categories">Browse Categories</Link>
            </li>
            <li>
              <Link href="/request-a-quote">Request a Quote</Link>
            </li>
            <li>
              <Link href="/offers">Offers</Link>
            </li>
            {/* <li>
              <Link href="/track-order">Track order</Link>
            </li>
            <li>
              <Link href="/size-guide">Size Guide</Link>
            </li> */}
          </ul>
          <div className="flex gap-4 space-x-2 text-lg text-gray-100 mt-4">
            <Image
              src="/social/facebook.png"
              alt="facebook"
              width={20}
              height={25}
            ></Image>
            <Image
              src="/social/x.png"
              alt="facebook"
              width={20}
              height={25}
            ></Image>

        </div>
        </div>

        {/* <div>
          <h3 className="font-semibold mb-8">INFORMATION</h3>
          <ul className="space-y-6 text-white">
            <li><Link href="/become-a-vendor">Become a Vendor</Link></li>
            <li><Link href="/seller-guidelines">Seller Guidelines</Link></li>
            <li><Link href="/commission-policy">Commission Policy</Link></li>
            <li><Link href="/support-for-sellers">Support for Sellers</Link></li>
            <li><Link href="/gift-cards">Gift Cards</Link></li>
          </ul>
        </div> */}

        {/* <div>
          <h3 className="font-semibold mb-8">ACCOUNT</h3>
          <ul className="space-y-6 text-white">
            <li><Link href="/cart">Cart</Link></li>
            <li><Link href="/my-account">My account</Link></li>
            <li><Link href="/my-orders">My orders</Link></li>
            <li><Link href="/wishlist">Wishlist</Link></li>
            <li><Link href="/affiliate-program">Affiliate Program</Link></li>
          </ul>
        </div> */}

        {/* Newsletter + Social */}
        {/* <div className="space-y-6">
          <Newsletter />

          <div className="flex gap-4 space-x-2 text-lg text-gray-100">
            <Image
              src="/social/facebook.png"
              alt="facebook"
              width={20}
              height={25}
            ></Image>
            <Image
              src="/social/tiktok.png"
              alt="facebook"
              width={20}
              height={25}
            ></Image>
            <Image
              src="/social/x.png"
              alt="facebook"
              width={20}
              height={25}
            ></Image>
            <Image
              src="/social/youtube.png"
              alt="facebook"
              width={20}
              height={25}
            ></Image>
            <Image
              src="/social/instagram.png"
              alt="facebook"
              width={20}
              height={25}
            ></Image>
          </div>
        </div> */}

        <div className=" px-4 border border-gray-600 py-8 md:py-8 md:px-8 grid gap-4  text-gray-300 rounded text-center">
          <div className="flex gap-4 items-start">
            <Phone size={32} />
            <div className="flex justify-center flex-col items-start">
              <p className="text-lg font-bold">
                Didn't find what you were looking for?
              </p>
              <p className="underline cursor-pointer">Contact Us</p>
            </div>
          </div>

          <div className="flex gap-4 items-center">
            <Smile size={32} />
            <div className="flex justify-center flex-col items-start">
              <p className="text-lg font-bold">How can we help you today?</p>
              <p className="underline cursor-pointer">Help Center</p>
            </div>
          </div>
          <div className="flex gap-4 items-center">
            <LifeBuoy size={32} />
            <div className="flex justify-center flex-col items-start">
              <p className="text-lg font-bold">
                {" "}
                We'd love to hear what you think!
              </p>
              <p className="underline cursor-pointer">Give Feedback</p>
            </div>
          </div>
        </div>
      </div>

      {/* Help Strip */}
      {/* <div className="max-w-7xl mx-auto px-4 border border-gray-600 py-8 md:py-8 md:px-8 my-8 grid grid-cols-1 md:grid-cols-3 text-gray-300 rounded text-center gap-4">
        <div className="flex gap-4 items-center">
          <Phone size={32} />
          <div className="flex justify-center flex-col items-start">
            <p className="text-lg font-bold">
              Didn't find what you were looking for?
            </p>
            <p className="underline cursor-pointer">Contact Us</p>
          </div>
        </div>

        <div className="flex gap-4 items-center">
          <Smile size={32} />
          <div className="flex justify-center flex-col items-start">
            <p className="text-lg font-bold">How can we help you today?</p>
            <p className="underline cursor-pointer">Help Center</p>
          </div>
        </div>
        <div className="flex gap-4 items-center">
          <LifeBuoy size={32} />
          <div className="flex justify-center flex-col items-start">
            <p className="text-lg font-bold">
              {" "}
              We'd love to hear what you think!
            </p>
            <p className="underline cursor-pointer">Give Feedback</p>
          </div>
        </div>
      </div> */}

      {/* Bottom */}
      {/* <div className="max-w-7xl m-auto mt-6 pt-4 px-4 flex flex-col md:flex-row justify-between items-center text-gray-500">
        <p>© 2025 VERA Technologies. All rights reserved.</p>
        <div className="flex gap-3 mt-3 md:mt-0"> */}
      {/* <img src="/icons/paypal.svg" alt="PayPal" className="h-5" />
          <img src="/icons/applepay.svg" alt="Apple Pay" className="h-5" />
          <img src="/icons/visa.svg" alt="Visa" className="h-5" />
          <img src="/icons/discover.svg" alt="Discover" className="h-5" />
          <img src="/icons/jcb.svg" alt="JCB" className="h-5" />
          <img src="/icons/amex.svg" alt="American Express" className="h-5" /> */}
      {/* <Image
            src="/payment/image.png"
            alt="facebook"
            width={350}
            height={25}
          ></Image>
        </div>
      </div> */}
    </footer>
  );
};

export default Footer;