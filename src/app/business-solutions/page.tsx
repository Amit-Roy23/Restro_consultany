import type { Metadata } from "next";

import { PageHeader } from "@/components/sections/PageHeader";
import {
  BusinessSolutions,
  SolutionsJumpLinks,
} from "@/components/sections/biz/BusinessSolutions";
import { en } from "@/i18n/messages/en";

export const metadata: Metadata = {
  title: `${en.biz.solutions.label} – ${en.biz.solutions.title}`,
  description: en.biz.solutions.intro,
};

export default function BusinessSolutionsPage() {
  return (
    <>
      <PageHeader page="solutions">
        <SolutionsJumpLinks />
      </PageHeader>
      <BusinessSolutions />
    </>
  );
}
