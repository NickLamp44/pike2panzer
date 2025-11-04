import type { MajorBattle } from "../../../types";
import type { Campaign } from "../../../types";

export const majorBattles: MajorBattle[] = [
  {
    name: "",
    startDate: "",
    endDate: "",
    description:
      "",
    sides: [
      {
        name: "",
        aliances: [
          { name: "", flag: "" },
          { name: "", flag: "" },
          { name: "", flag: "" },
        ],
      },
      { name: "" },
    ],
    strategies: [{ name: "" }, { name: "" }],
    tactics: [{ name: "" }],
    weapons: [
      {
        name: "",
        images: [
          {
            url: "",
            alt: "",
            source: "",
          },
        ],
      },
    ],
    impact: [
      "",
    ],
  },
]

export const campaign: Campaign[] = [
  {
    name: "",
    startDate: "",
    endDate: "",
    sides: [
      {
        name: "",
        aliances: [
          { name: "", flag: "" },
          { name: "", flag: "" },
          { name: "", flag: "" },
        ],
      },
      {
        name: "",
      },
    ],
    description:
      "",
    majorBattles: [
      {
        name: "",
        description:
          "",
        startDate: "",
        endDate: "",
      },
      
    ],
  },
]