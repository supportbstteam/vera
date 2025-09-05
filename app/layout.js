import { Geist, Geist_Mono, Manrope } from "next/font/google"
import "./globals.css"
import AuthWrapper from "@/_components/auth/AuthWrapper"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"]
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"]
})

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope", // CSS variable name
  display: "swap"
})


import ReduxProvider from '@/_library/redux/ReduxProvider';
import Script from 'next/script'

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={` ${manrope.variable} antialiased font-sans`} suppressHydrationWarning={true}>        
        <ReduxProvider>
          <AuthWrapper />
          {children}
        </ReduxProvider>       
      </body>
    </html>
  )
}
