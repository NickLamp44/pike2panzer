import type { Theater } from "../../../../../types";

export const warAtSea: Theater = {
  slug: "war-at-sea",
  title: "War at Sea",
  startDate: "1914-08",
  endDate: "1918-11",
  cardImage: "/eras/total-war/ww1/war-at-sea/hero.jpg",
  cardDescription:
    "The global naval campaign of World War I, fought across the Atlantic, North Sea, Baltic, Mediterranean, and beyond. Dominated by the struggle between the British Royal Navy and the German Imperial Navy, it saw the evolution of submarine warfare, blockades, and the first major clashes of modern battleships.",

  sides: [],
  majorBattles: ["battle-of-jutland"],
  campaigns: ["u-boat-blockade", "atlantic-convoys"],
  impact: [
    "The British naval blockade effectively strangled the Central Powers’ economy and supplies, contributing to severe shortages and eventual collapse on the home front.",
    "The Battle of Jutland (1916) proved inconclusive tactically but confirmed Allied naval dominance for the remainder of the war.",
    "German U-boat campaigns revolutionized submarine warfare, sinking merchant shipping on an unprecedented scale and drawing neutral powers — notably the United States — into the conflict.",
    "Convoy systems introduced by the Allies in 1917 drastically reduced losses to submarines and ensured vital supplies reached Britain and France.",
    "The war demonstrated the decline of battleship dominance and heralded the rise of submarine and aircraft-carrier strategies in future conflicts.",
    "Naval mines, Q-ships, and early anti-submarine technologies represented significant technological innovation in maritime warfare.",
  ],
};
