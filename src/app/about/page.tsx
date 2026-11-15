import type { Metadata } from "next";

import { StubPage } from "@/components/sections/StubPage";
import { stubPages } from "@/content/pages";

export const metadata: Metadata = {
  title: stubPages.about.title,
};

export default function AboutPage() {
  return <StubPage content={stubPages.about} />;
}
