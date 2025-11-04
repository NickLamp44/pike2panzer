import type { Tactic } from "../../../../types";

export const tactics: Tactic[] = [
  {
    title: "Creeping Barrage",
    description: [
      "Artillery fire that moved forward ahead of advancing infantry to suppress defenders.",
    ],
  },
  {
    title: "Storm Trooper Tactics",
    description: [
      "Small groups of elite infantry using infiltration tactics to bypass strong points.",
    ],
    side: [
      {
        name: "Central Powers ",
        aliances: [{ name: "German Empire", flag: "/" }],
      },
    ],
  },
];
