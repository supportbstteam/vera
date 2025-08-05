
import Header from "@/_components/layout/header"
import HeaderMobile from "@/_components/layout/headerMobile"
import Footer from "@/_components/layout/footer"

export const metadata = {
  title: "Vera dashboard",
  description: ""
}

export default function DashboardLayout({ children }) {
  return (
    <>  
    <Header />
    {children}
    <Footer />
    </>      
  )
}
