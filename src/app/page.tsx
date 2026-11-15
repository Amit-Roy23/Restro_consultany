import { AboutSection } from "@/components/sections/home/AboutSection";
import { AskSection } from "@/components/sections/home/AskSection";
import { Clients } from "@/components/sections/home/Clients";
import { CtaBand } from "@/components/sections/home/CtaBand";
import { Hero } from "@/components/sections/home/Hero";
import { Projects } from "@/components/sections/home/Projects";
import { Services } from "@/components/sections/home/Services";
import { Wall } from "@/components/sections/home/Wall";

export default function HomePage() {
  return (
    <>
      <Hero />
      <AskSection />
      <AboutSection />
      <Services />
      <Projects />
      <Clients />
      <Wall />
      <CtaBand />
    </>
  );
}
