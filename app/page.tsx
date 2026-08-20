import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { Hero } from "@/components/landing/hero";
import { Benefits } from "@/components/landing/benefits";
import { ExploreCareers } from "@/components/landing/explore-careers";
import { HowItWorks } from "@/components/landing/how-it-works";
import { SocialProof } from "@/components/landing/social-proof";
import { FinalCta } from "@/components/landing/final-cta";

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main>
        <Hero />
        <Benefits />
        <ExploreCareers />
        <HowItWorks />
        <SocialProof />
        <FinalCta />
      </main>
      <SiteFooter />
    </>
  );
}