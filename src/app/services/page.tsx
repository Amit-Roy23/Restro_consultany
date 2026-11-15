import type { Metadata } from "next";

import { PageHeader } from "@/components/sections/PageHeader";
import { CtaBand } from "@/components/sections/home/CtaBand";
import { Services } from "@/components/sections/home/Services";
import { pageHeaders } from "@/content/pages";

export const metadata: Metadata = {
  title: pageHeaders.services.label,
  description: pageHeaders.services.intro,
};

export default function ServicesPage() {
  return (
    <>
      <PageHeader content={pageHeaders.services} />
      <Services showCta={false} showHeading={false} />
      <CtaBand />
    </>
  );
}
