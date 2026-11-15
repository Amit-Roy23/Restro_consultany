import type { Metadata } from "next";

import { PageHeader } from "@/components/sections/PageHeader";
import { Button } from "@/components/ui/Button";
import { notFoundContent } from "@/content/pages";

export const metadata: Metadata = {
  title: notFoundContent.label,
};

export default function NotFound() {
  return (
    <PageHeader content={notFoundContent}>
      <Button href={notFoundContent.cta.href} variant="outline" className="mt-10">
        {notFoundContent.cta.label}
      </Button>
    </PageHeader>
  );
}
