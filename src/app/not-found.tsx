import type { Metadata } from "next";

import { NotFoundView } from "@/components/sections/NotFoundView";
import { en } from "@/i18n/messages/en";

export const metadata: Metadata = {
  title: en.notFound.label,
};

export default function NotFound() {
  return <NotFoundView />;
}
