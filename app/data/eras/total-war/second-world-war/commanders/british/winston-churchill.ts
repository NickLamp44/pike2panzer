import type { Commander } from "../../../../../types";

export const winstonChurchill: Commander = {
  slug: "winston-churchill",
  name: "Winston Churchill",
  rank: "Prime Minister",
  faction: ["allies"],
  nationality: "British",
  dateOfBirth: "1874-11-30",
  dateOfDeath: "1965-01-24",
  image: "/winston-churchill-portrait.jpg",
  flag: "/british-flag.jpg",
  description: [
    "Winston Churchill served as Prime Minister of the United Kingdom during World War II, leading Britain through its darkest hour.",
    "His stirring speeches and refusal to surrender inspired the British people during the Blitz and beyond.",
  ],
  awards: [
    {
      name: "Nobel Prize in Literature",
      description:
        "Awarded for his mastery of historical and biographical description",
      dateAwarded: "1953",
    },
  ],
};
