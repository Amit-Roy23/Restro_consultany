"use client";

import { PageHeader } from "@/components/sections/PageHeader";
import { Button } from "@/components/ui/Button";
import { useContent } from "@/i18n/LanguageProvider";

export function NotFoundView() {
  const { notFoundContent } = useContent();
  return (
    <PageHeader page="notFound">
      <Button href={notFoundContent.cta.href} variant="outline" className="mt-10">
        {notFoundContent.cta.label}
      </Button>
    </PageHeader>
  );
}
