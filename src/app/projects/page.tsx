import type { Metadata } from "next";

import { GalleryGrid } from "@/components/sections/GalleryGrid";
import { PageHeader } from "@/components/sections/PageHeader";
import { CtaBand } from "@/components/sections/home/CtaBand";
import { Projects } from "@/components/sections/home/Projects";
import { pageHeaders } from "@/content/pages";

export const metadata: Metadata = {
  title: pageHeaders.projects.label,
  description: pageHeaders.projects.intro,
};

export default function ProjectsPage() {
  return (
    <>
      <PageHeader content={pageHeaders.projects} />
      <Projects showCta={false} showHeading={false} />
      <GalleryGrid />
      <CtaBand />
    </>
  );
}
