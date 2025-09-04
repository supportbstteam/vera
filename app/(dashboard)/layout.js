
import Header from "@/_components/layout/header"
import HeaderMobile from "@/_components/layout/headerMobile"
import Footer from "@/_components/layout/footer"
import { getToken } from '@/actions'
import AuthWrapper from "@/_components/auth/AuthWrapper"

export const metadata = {
  title: "Vera dashboard",
  description: ""
}

const DashboardLayout = async ({ children }) => {
  const loggedIn = await getToken() 
  return (
    <>  
    <AuthWrapper />
    <Header loggedIn={loggedIn} />
    {children}
    <Footer />
    </>      
  )
}
export default DashboardLayout