import { buildNavigation } from "@/config/navigation";
import { buildHomeContent } from "@/content/home";
import { buildPagesContent } from "@/content/pages";
import { buildTeamContent } from "@/content/team";
import type { Messages } from "@/i18n/messages/en";

/** Everything the UI renders, in one language. */
export function buildContent(m: Messages) {
  return {
    ...buildHomeContent(m),
    ...buildPagesContent(m),
    ...buildNavigation(m),
    intro: m.intro,
    welcome: m.welcome,
    tagline: m.site.tagline,
    biz: m.biz,
    team: buildTeamContent(m),
  };
}

export type SiteContent = ReturnType<typeof buildContent>;
