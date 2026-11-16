import { FooterContent } from "@/components/layout/FooterContent";

async function CopyrightYear() {
  "use cache";
  return <>{new Date().getFullYear()}</>;
}

/** Server wrapper: supplies the (cached) copyright year to the client footer. */
export function Footer() {
  return <FooterContent year={<CopyrightYear />} />;
}
