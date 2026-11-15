import type { Metadata } from "next";

import { ContactSection } from "@/components/sections/ContactSection";
import { PageHeader } from "@/components/sections/PageHeader";
import { pageHeaders } from "@/content/pages";

export const metadata: Metadata = {
  title: pageHeaders.contact.label,
  description: pageHeaders.contact.intro,
};

export default function ContactPage() {
  return (
    <>
      <PageHeader content={pageHeaders.contact} />
      <ContactSection />
    </>
  );
}
