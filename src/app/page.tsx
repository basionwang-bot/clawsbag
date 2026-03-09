import { HeroSection } from "@/components/HeroSection";
import { StatsBar } from "@/components/StatsBar";
import { IndustryShowcase } from "@/components/IndustryShowcase";
import { HowItWorks } from "@/components/HowItWorks";
import { CaseShowcase } from "@/components/CaseShowcase";
import { BottomCTA } from "@/components/BottomCTA";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <StatsBar />
      <IndustryShowcase />
      <HowItWorks />
      <CaseShowcase />
      <BottomCTA />
    </>
  );
}
