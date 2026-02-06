import GrowthSection from "@/_components/growthSection";
import Banner from "@/_components/layout/banner";
import Testimonial from "@/_components/testimonial";
// import ThreeStepSection from "@/_components/whyy";
// import TrendingSlider from "@/_components/trendingSlider";
import Usps from "@/_components/usps";
import Why from "@/_components/why";
import TextMedia from "@/_components/TextMedia";
import CTA from "@/_components/CTA";
import HowItWorks from "@/_components/layout/HowItWorks";
import { getToken } from "@/actions";
import RequestDemoBanner from "@/_components/layout/RequestDemoBanner";
export default async function Home() {
  const loggedIn = await getToken();
  return (
    <>
      <Banner loggedIn={loggedIn} bgImage={"url('/assets/bg.jpg')"} />
      <HowItWorks />
      {/* <Usps /> */}
      <TextMedia />
      <Why />
      {/* <CategoryGrid /> */}
      {/* <ThreeStepSection /> */}
      {/* <TrendingSlider /> */}
      {/* <Discover /> */}
      {/* <BestCategorySection /> */}
      {/* <Countries /> */}
      {/* <GrowthSection /> */}
      <CTA />
      <RequestDemoBanner />
      {/* <Testimonial /> */}
    </>
  );
}
