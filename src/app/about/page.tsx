import type { Metadata } from "next";

import { PageHeader } from "@/components/sections/PageHeader";
import { AboutSection } from "@/components/sections/home/AboutSection";
import { Clients } from "@/components/sections/home/Clients";
import { CtaBand } from "@/components/sections/home/CtaBand";
import { pageHeaders } from "@/content/pages";

export const metadata: Metadata = {
  title: pageHeaders.about.label,
  description: pageHeaders.about.intro,
};

export default function AboutPage() {
  return (
    <>
      <PageHeader content={pageHeaders.about} />
      <AboutSection />
      <Clients />
      <CtaBand />
    </>
  );
}
