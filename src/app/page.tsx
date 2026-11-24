import { BrandPartners } from "@/components/sections/biz/BrandPartners";
import { HospiverseSection } from "@/components/sections/biz/HospiverseSection";
import { MoreWays } from "@/components/sections/biz/MoreWays";
import { MottoBand } from "@/components/sections/biz/MottoBand";
import { TeamSection } from "@/components/sections/biz/TeamSection";
import { VideoStories } from "@/components/sections/biz/VideoStories";
import { VisionSection } from "@/components/sections/biz/VisionSection";
import { WhySection } from "@/components/sections/biz/WhySection";
import { AboutSection } from "@/components/sections/home/AboutSection";
import { AskSection } from "@/components/sections/home/AskSection";
import { Clients } from "@/components/sections/home/Clients";
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
      <TeamSection />
      <VideoStories />
      <VisionSection />
      <Services />
      <MoreWays />
      <Projects />
      <Clients />
      <BrandPartners />
      <HospiverseSection />
      <WhySection />
      <Wall />
      <MottoBand />
    </>
  );
}
