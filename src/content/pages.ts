import type { Messages } from "@/i18n/messages/en";
import type { PageHeaderContent } from "@/types";

/** Inner-page copy for the active language. */
export function buildPagesContent(m: Messages) {
  const pageHeaders = m.pages satisfies Record<string, PageHeaderContent>;

  const contactPage = m.contact;

  const galleryPage = {
    number: 4,
    label: m.gallery.label,
    title: m.gallery.title,
    sections: [
      { category: "kitchen", title: m.gallery.kitchen },
      { category: "interior", title: m.gallery.interior },
      { category: "training", title: m.gallery.training },
      { category: "team", title: m.gallery.team },
      { category: "creative", title: m.gallery.creative },
      { category: "press", title: m.gallery.press },
    ] as const,
  };

  const notFoundContent = {
    label: m.notFound.label,
    title: m.notFound.title,
    intro: m.notFound.intro,
    cta: { label: m.notFound.cta, href: "/" },
  };

  return { pageHeaders, contactPage, galleryPage, notFoundContent };
}
