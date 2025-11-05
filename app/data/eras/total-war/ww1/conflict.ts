import type { Conflict } from "../../../types";

export const firstWorldWar: Conflict = {
  slug: "first-world-war",
  title: "The Great War",
  cardImage: "/eras/total-war/first-world-war/hero.jpg",
  description:
    "Global conflict from 1914-1918 involving most of the world's nations.",
  sides: [
    {
      name: "Triple Entente",
      aliances: [
        { name: "United Kingdom", flag: "/" },
        { name: "France", flag: "/" },
        { name: "Russian Empire", flag: "/" },
      ],
    },
    {
      name: "Central Powers ",
      aliances: [
        { name: "Germany", flag: "/" },
        { name: "Austria-Hungary", flag: "/" },
        { name: "Italy", flag: "/" },
      ],
    },
    {
      name: "Allied Powers",
      aliances: [
        { name: "United Kingdom", flag: "/" },
        { name: "France", flag: "/" },
        { name: "Russian Empire", flag: "/" },
        { name: "United States", flag: "/" },
        { name: "Italy", flag: "/" },
      ],
    },
    {
      name: "Central Powers ",
      aliances: [
        { name: "German Empire", flag: "/" },
        { name: "Austria-Hungary", flag: "/" },
        { name: "Ottoman Empire", flag: "/" },
        { name: "Bulgaria", flag: "/" },
      ],
    },
  ],
  hasTheaters: true,
  startDate: "1914-07-28",
  endDate: "1918-11-11",
};
