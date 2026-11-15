import type { Metadata } from "next";

import { StubPage } from "@/components/sections/StubPage";
import { stubPages } from "@/content/pages";

export const metadata: Metadata = {
  title: stubPages.contact.title,
};

export default function ContactPage() {
  return <StubPage content={stubPages.contact} />;
}
