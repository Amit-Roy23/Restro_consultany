import type { Metadata } from "next";

import { GalleryGrid } from "@/components/sections/GalleryGrid";
import { PageHeader } from "@/components/sections/PageHeader";
import { CtaBand } from "@/components/sections/home/CtaBand";
import { Projects } from "@/components/sections/home/Projects";
import { en } from "@/i18n/messages/en";

export const metadata: Metadata = {
  title: en.pages.projects.label,
  description: en.pages.projects.intro,
};

export default function ProjectsPage() {
  return (
    <>
      <PageHeader page="projects" />
      <Projects showCta={false} showHeading={false} />
      <GalleryGrid />
      <CtaBand />
    </>
  );
}
