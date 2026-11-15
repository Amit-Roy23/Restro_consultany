import type { Metadata } from "next";

import { StubPage } from "@/components/sections/StubPage";
import { notFoundContent } from "@/content/pages";

export const metadata: Metadata = {
  title: notFoundContent.label,
};

export default function NotFound() {
  return <StubPage content={notFoundContent} cta={notFoundContent.cta} />;
}
