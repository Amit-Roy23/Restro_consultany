import type { Metadata } from "next";

import { PageHeader } from "@/components/sections/PageHeader";
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
      <Clients />
      <CtaBand />
    </>
  );
}
