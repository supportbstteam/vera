import GrowthSection from "@/_components/growthSection"
import Banner from "@/_components/layout/banner"
import Testimonial from "@/_components/testimonial"
// import ThreeStepSection from "@/_components/whyy";
// import TrendingSlider from "@/_components/trendingSlider";
import Usps from "@/_components/usps"
import Why from "@/_components/why"
import TextMedia from "@/_components/TextMedia"
import CTA from "@/_components/CTA"

export default function Home(){
  return (
    <>
      <Banner bgImage={"url('/assets/bg.jpg')"} />
      <Usps />
      <TextMedia />
      <Why />
      {/* <CategoryGrid /> */}
      {/* <ThreeStepSection /> */}
      {/* <TrendingSlider /> */}
      {/* <Discover /> */}
      {/* <BestCategorySection /> */}
      {/* <Countries /> */}
      <GrowthSection />
      <CTA />
      <Testimonial />
    </>
  )
}
