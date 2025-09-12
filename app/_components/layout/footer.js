"use client";
import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  Suspense,
} from "react";
import { LifeBuoy, Mail, MapPin, MoveRight, Phone, Smile } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import Api from "@/_library/Api";
import Newsletter from "@/_components/Newsletter";
import Loader from "@/_components/ui/Loader";

const Footer = () => {
  const [setting, setSetting] = useState(null);

  useEffect(() => {
    get_settings();
  }, []);

  const get_settings = async () => {
    const res = await Api.settings();
    const resData = res.data;
    setSetting(resData.data);
  };

  return (
    <footer className="bg-[#111111] text-white pb-6 text-sm py-8 md:py-16">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 items-start sm:grid-cols-2 lg:grid-cols-[1fr_3fr_2fr_4fr] gap-8">
        <div className="flex items-start gap-2 text-[#C61AFF] text-xl font-bold">
          <Image src="/logoFooter.png" alt="VERA Logo" width={90} height={40} />
        </div>
        <div className="text-gray-400 space-y-2">
          {setting ? (
            <>
              <div className="flex gap-2 items-start">
                <MapPin strokeWidth={1} size="24" />
                <p
                  dangerouslySetInnerHTML={{
                    __html: setting.contact_address,
                  }}
                ></p>
              </div>
              <div className="flex gap-2 items-start">
                <Mail strokeWidth={1} size="24" />
                <p>
                  <a href={`mailto:${setting.contact_email}`}>
                    {setting.contact_email}
                  </a>
                </p>
              </div>
              <p className="text-2xl text-white font-bold mt-4">
                <a href={`tel:${setting.contact_phone}`}>
                  {setting.contact_phone}
                </a>
              </p>
            </>
          ) : (
            <Loader />
          )}
        </div>

        <div>
          <h3 className="font-semibold mb-4">View More</h3>
          <ul className="space-y-4 text-white text-sm">
            <li>
              <Link href="/contact-us">Contact Us</Link>
            </li>
            <li>
              <Link href="/about-us">About Us</Link>
            </li>
            <li>
              <Link href="/terms-and-condition">Terms & Condition</Link>
            </li>
            <li>
              <Link href="/privacy-policy">Privacy Policy</Link>
            </li>
          </ul>
          <div className="flex gap-4 space-x-2 text-lg text-gray-100 mt-4">
            {setting && (
              <>
                <Link href={setting.facebook_url}>
                  <Image
                    src="/social/facebook.png"
                    alt="facebook"
                    width={20}
                    height={25}
                  ></Image>
                </Link>

                <Link href={setting.twitter_url}>
                  <Image
                    src="/social/x.png"
                    alt="facebook"
                    width={20}
                    height={25}
                  ></Image>
                </Link>
              </>
            )}
          </div>
        </div>

        <div className="border border-gray-600 px-4 py-4 md:py-8 md:px-8 grid gap-4  text-gray-300 rounded-md text-center">
          <div className="flex gap-4 items-center">
            <Phone size={32} />
            <div className="flex justify-center flex-col items-start">
              <p className="text-base md:text-lg font-bold text-left">
                Didn't find what you were looking for?
              </p>
              <p className="underline cursor-pointer">
                <Link href="/contact-us">Contact Us</Link>
              </p>
            </div>
          </div>

          <div className="flex gap-4 items-center">
            <Smile size={32} />
            <div className="flex justify-center flex-col items-start">
              <p className="text-base md:text-lg font-bold text-left">How can we help you today?</p>
              <p className="underline cursor-pointer">
                <Link href="/help">Help Center</Link>
              </p>
            </div>
          </div>
          <div className="flex gap-4 items-center">
            <LifeBuoy size={32} />
            <div className="flex justify-center flex-col items-start">
              <p className="text-base md:text-lg font-bold text-left">
                {" "}
                We'd love to hear what you think!
              </p>
              <p className="underline cursor-pointer">
                <Link href="/feedback">Give Feedback</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
