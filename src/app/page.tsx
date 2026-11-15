import { AskSection } from "@/components/sections/home/AskSection";
import { CtaBand } from "@/components/sections/home/CtaBand";
import { FeaturedWork } from "@/components/sections/home/FeaturedWork";
import { Hero } from "@/components/sections/home/Hero";
import { HowWeHelp } from "@/components/sections/home/HowWeHelp";
import { Insights } from "@/components/sections/home/Insights";

export default function HomePage() {
  return (
    <>
      <Hero />
      <AskSection />
      <FeaturedWork />
      <HowWeHelp />
      <Insights />
      <CtaBand />
    </>
  );
}
