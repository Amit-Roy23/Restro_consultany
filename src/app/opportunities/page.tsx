import type { Metadata } from "next";

import { PageHeader } from "@/components/sections/PageHeader";
import { BuySellSection } from "@/components/sections/biz/BuySellSection";
import { OpportunitiesSection } from "@/components/sections/biz/OpportunitiesSection";
import { MottoBand } from "@/components/sections/biz/MottoBand";
import { en } from "@/i18n/messages/en";

export const metadata: Metadata = {
  title: en.biz.page.label,
  description: en.biz.page.intro,
};

export default function OpportunitiesPage() {
  return (
    <>
      <PageHeader page="opportunities" />
      <OpportunitiesSection />
      <BuySellSection />
      <MottoBand />
    </>
  );
}
