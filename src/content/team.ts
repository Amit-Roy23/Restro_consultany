import type { Messages } from "@/i18n/messages/en";

export type TeamMember = {
  /** Leave empty until the client confirms the name; the role is shown instead. */
  name: string;
  role: string;
  image: { src: string; width: number; height: number; alt: string };
  /** Qualifications and past roles, kept as written (not translated). */
  credentials: string[];
};

/** "The faces behind Resto" — the people the client introduces by name. */
export function buildTeamContent(m: Messages) {
  const members: TeamMember[] = [
    {
      name: "Chef Sukhmanpreet Kaur",
      role: m.biz.team.roles.corporateChef,
      image: {
        src: "/images/team/chef-sukhmanpreet-kaur.jpg",
        width: 292,
        height: 418,
        alt: "Chef Sukhmanpreet Kaur in a black Resto chef's jacket, arms folded",
      },
      credentials: [],
    },
    {
      name: "", // TODO: the director's name was not supplied
      role: m.biz.team.roles.director,
      image: {
        src: "/images/team/director.jpg",
        width: 300,
        height: 335,
        alt: "Resto's director in a dark suit and red tie",
      },
      credentials: [
        "M Sc (Food Technology)",
        "MBA (Hotel & Operation Management)",
        "Ex. Asst. Professor (HMFA-MIET)",
        "Ex. AGM Army War College (MHOW India)",
      ],
    },
  ];

  return {
    label: m.biz.team.label,
    title: m.biz.team.title,
    intro: m.biz.team.intro,
    members,
  };
}
