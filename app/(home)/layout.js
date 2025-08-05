
import Header from "@/_components/layout/header"
import HeaderMobile from "@/_components/layout/headerMobile"
import Footer from "@/_components/layout/footer"

export const metadata = {
  title: "Vera",
  description: ""
}

export default function HomeLayout({ children }) {
  return (
    <>    
    {/* <HeaderMobile /> */}
    <Header />
    {children}
    <Footer />
    </>      
  )
}
