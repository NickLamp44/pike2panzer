import type { Theater } from "../../../types";

export const warAtSea: Theater = {
  slug: "war-at-sea",
  title: "War at Sea",
  description:
    "The global naval campaign of World War I, fought across the Atlantic, North Sea, Baltic, Mediterranean, and beyond. Dominated by the struggle between the British Royal Navy and the German Imperial Navy, it saw the evolution of submarine warfare, blockades, and the first major clashes of modern battleships.",
  cardImage: "/eras/total-war/first-world-war/war-at-sea/hero.jpg",
  sides: [
    {
      name: "Allied Powers",
      aliances: [
        { name: "United Kingdom", flag: "/flags/uk.png" },
        { name: "France", flag: "/flags/france.png" },
        { name: "United States", flag: "/flags/us.png" },
        { name: "Italy", flag: "/flags/italy.png" },
        { name: "Japan", flag: "/flags/japan.png" },
        { name: "Russia", flag: "/flags/russia.png" },
      ],
    },
    {
      name: "Central Powers",
      aliances: [
        { name: "German Empire", flag: "/flags/germany.png" },
        { name: "Austro-Hungarian Empire", flag: "/flags/austria-hungary.png" },
        { name: "Ottoman Empire", flag: "/flags/ottoman.png" },
      ],
    },
  ],
  startDate: "1914-08",
  endDate: "1918-11",
  impact: [
    "The British naval blockade effectively strangled the Central Powers’ economy and supplies, contributing to severe shortages and eventual collapse on the home front.",
    "The Battle of Jutland (1916) proved inconclusive tactically but confirmed Allied naval dominance for the remainder of the war.",
    "German U-boat campaigns revolutionized submarine warfare, sinking merchant shipping on an unprecedented scale and drawing neutral powers — notably the United States — into the conflict.",
    "Convoy systems introduced by the Allies in 1917 drastically reduced losses to submarines and ensured vital supplies reached Britain and France.",
    "The war demonstrated the decline of battleship dominance and heralded the rise of submarine and aircraft-carrier strategies in future conflicts.",
    "Naval mines, Q-ships, and early anti-submarine technologies represented significant technological innovation in maritime warfare.",
  ],
};
