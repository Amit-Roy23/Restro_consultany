import { img } from "@/content/gallery";

/**
 * Founder and team videos ("Meet the people behind Resto").
 *
 * Add the files to `public/videos/` (MP4/H.264) and set `src`, e.g.
 * `src: "/videos/founder-message.mp4"`. Until then the card shows its poster
 * with "Video coming soon".
 */
export const videoStories = {
  founder: {
    src: undefined as string | undefined,
    poster: img("/images/team/founder.jpg"),
  },
  team: {
    src: undefined as string | undefined,
    poster: img("/images/team/chef-brigade-2.jpg"),
  },
};
