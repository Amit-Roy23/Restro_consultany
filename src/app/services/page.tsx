import type { Metadata } from "next";

import { PageHeader } from "@/components/sections/PageHeader";
import { CtaBand } from "@/components/sections/home/CtaBand";
import { Services } from "@/components/sections/home/Services";
import { en } from "@/i18n/messages/en";

export const metadata: Metadata = {
  title: en.pages.services.label,
  description: en.pages.services.intro,
};

export default function ServicesPage() {
  return (
    <>
      <PageHeader page="services" />
      <Services showCta={false} showHeading={false} />
      <CtaBand />
    </>
  );
}
