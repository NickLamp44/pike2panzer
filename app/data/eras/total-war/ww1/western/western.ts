import type { Theater } from "../../../../types";

export const westernFront: Theater = {
  slug: "western-front",
  title: "Western Front",
  description:
    "The main theater of war in Western Europe, characterized by trench warfare.",
  cardImage: "/eras/total-war/first-world-war/western-front/hero.jpg",
  sides: [
    {
      name: "Allied Powers",
      aliances: [
        { name: "United Kingdom", flag: "/" },
        { name: "France", flag: "/" },
        { name: "United States", flag: "/" },
      ],
    },
    {
      name: "Central Powers ",
      aliances: [
        { name: "German Empire", flag: "/" },
      ],
    },
  ],
  startDate: "1914-08",
  endDate: "1918-11",
};
