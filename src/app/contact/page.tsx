import type { Metadata } from "next";

import { ContactSection } from "@/components/sections/ContactSection";
import { PageHeader } from "@/components/sections/PageHeader";
import { en } from "@/i18n/messages/en";

export const metadata: Metadata = {
  title: en.pages.contact.label,
  description: en.pages.contact.intro,
};

export default function ContactPage() {
  return (
    <>
      <PageHeader page="contact" />
      <ContactSection />
    </>
  );
}
