import type { Metadata } from "next";

import { BrandPartners } from "@/components/sections/biz/BrandPartners";
import { PageHeader } from "@/components/sections/PageHeader";
import { TeamSection } from "@/components/sections/biz/TeamSection";
import { VisionSection } from "@/components/sections/biz/VisionSection";
import { WhySection } from "@/components/sections/biz/WhySection";
import { AboutSection } from "@/components/sections/home/AboutSection";
import { Clients } from "@/components/sections/home/Clients";
import { CtaBand } from "@/components/sections/home/CtaBand";
import { en } from "@/i18n/messages/en";

export const metadata: Metadata = {
  title: en.pages.about.label,
  description: en.pages.about.intro,
};

export default function AboutPage() {
  return (
    <>
      <PageHeader page="about" />
      <AboutSection />
      <TeamSection />
      <VisionSection />
      <Clients />
      <BrandPartners />
      <WhySection />
      <CtaBand />
    </>
  );
}
