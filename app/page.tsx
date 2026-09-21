import Hero from "../Components/Home/Hero";
import QuickIntro from "../Components/Home/QuickIntro";
import Categories from "../Components/Home/Categories";
import FeaturedSchemes from "../Components/Home/FeaturedSchemes";
import HowItWorks from "../Components/Home/HowItWorks";
import HomeCTA from "../Components/Home/HomeCTA";
import Disclaimer from "../Components/Home/Disclaimer";

export default function Home() {
  return (
    <>
      <Hero />
      <QuickIntro />
      <Categories />
      <FeaturedSchemes />
      <HowItWorks />
      <HomeCTA />
      <Disclaimer />
    </>
  );
}