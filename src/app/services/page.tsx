import type { Metadata } from "next";

import { PageHeader } from "@/components/sections/PageHeader";
import { LicensingSection } from "@/components/sections/biz/LicensingSection";
import { ManagementSection } from "@/components/sections/biz/ManagementSection";
import { ManpowerSection } from "@/components/sections/biz/ManpowerSection";
import { MottoBand } from "@/components/sections/biz/MottoBand";
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
      <Services showCta={false} showHeading={false} turnkey />
      <ManagementSection />
      <LicensingSection />
      <ManpowerSection />
      <MottoBand />
    </>
  );
}
