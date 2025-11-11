import type { Conflict } from "../../../types";

export const firstWorldWar: Conflict = {
  slug: "first-world-war",
  title: "The Great War",
  startDate: "July 28th, 1914",
  endDate: "November 11th, 1918",
  cardImage: "/eras/total-war/first-world-war/hero.jpg",
  cardDescription:
    "Global conflict from 1914-1918 involving most of the world's nations.",

  //short introduction to the wider conflict
  intro: [
    {
      text: [
        "The First World War erupted from mounting tensions in Europe, driven by nationalism, imperial rivalries, militarism, and a rigid system of alliances. While the assassination of Archduke Franz Ferdinand in June 1914 served as the immediate trigger, it was longstanding rivalries and a series of diplomatic and strategic miscalculations that transformed a regional crisis into a global conflict. As key powers mobilized out of fear, treaty obligations, and strategic necessity, Europe was plunged into a war on multiple fronts.",
        "On the Eastern Front, stretching from the Baltic to the Black Sea, Germany, Austria-Hungary, and later the Ottoman Empire fought against Imperial Russia. Unlike the trench deadlock of the Western Front, warfare in the East was marked by sweeping movements and massive battles across vast and underdeveloped terrain. The early years saw Russian advances followed by devastating German counterattacks. Over time, internal unrest, battlefield losses, and economic collapse weakened Russia, culminating in the 1917 Revolution. This upheaval led to the withdrawal of Russia from the war in 1918 through the Treaty of Brest-Litovsk—ending hostilities in the East but igniting a global communist revolution that would reshape the 20th century.",
      ],
    },
  ],

  // various alliances
  sides: [
    "triple-entente-pre-ww1",
    "central-powers-pre-ww1",
    "allied-powers-ww1",
    "central-powers-ww1",
  ],

  // slugs of important or notable commanders or rulers
  commanders: ["king-george-v", "h-h-asquith", "david-lloyd-george"],

  hasTheaters: true,
  theater: [
    "western-front",
    "eastern-front",
    "izonzo",
    "war-at-sea",
    "gallipoli",
    "middle-east",
    "africa",
    "irish",
  ],

  //important weapons tech   renders small cards that tell more information on the subject
  weaponTech: [
    "machine-gun",
    "tank",
    "poison-gas",
    "submarine",
    "air-craft",
    "artillery",
    "dreadnoughts",
  ],
};
