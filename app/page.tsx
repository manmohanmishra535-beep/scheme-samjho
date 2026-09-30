import Hero from "../Components/Home/Hero";
import QuickIntro from "../Components/Home/QuickIntro";
import Categories from "../Components/Home/Categories";
import FeaturedSchemes from "../Components/Home/FeaturedSchemes";
import HowItWorks from "../Components/Home/HowItWorks";
import HomeCTA from "../Components/Home/HomeCTA";
import Disclaimer from "../Components/Home/Disclaimer";

import { getAllSchemes } from "../lib/schemes";

export const dynamic = "force-dynamic";

export default async function Home() {
  // Load only published schemes from Supabase
  const schemes = await getAllSchemes();

  return (
    <>
      {/* Hero */}
      <Hero />

      {/* Introduction */}
      <QuickIntro />

      {/* Browse by category */}
      <Categories />

      {/* Featured schemes */}
      <FeaturedSchemes schemes={schemes} />

      {/* How it works */}
      <HowItWorks />

      {/* Eligibility CTA */}
      <HomeCTA />

      {/* Disclaimer */}
      <Disclaimer />
    </>
  );
}