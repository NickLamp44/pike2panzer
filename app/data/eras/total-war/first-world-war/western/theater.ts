import type { Theater } from "../../../../types";

export const westernFront: Theater = {
  slug: "western-front",
  title: "Western Front",
  description:
    "The main theater of World War I in Western Europe, stretching from the North Sea to the Swiss border. Characterized by static trench warfare, attrition battles, and devastating human cost, it became the defining symbol of the Great War.",
  cardImage: "/eras/total-war/first-world-war/western-front/hero.jpg",
  sides: [
    {
      name: "Allied Powers",
      aliances: [
        { name: "France", flag: "/flags/france.png" },
        { name: "United Kingdom", flag: "/flags/uk.png" },
        { name: "Belgium", flag: "/flags/belgium.png" },
        { name: "United States", flag: "/flags/us.png" },
        { name: "Canada", flag: "/flags/canada.png" },
        { name: "Australia", flag: "/flags/australia.png" },
        { name: "New Zealand", flag: "/flags/newzealand.png" },
      ],
    },
    {
      name: "Central Powers",
      aliances: [
        { name: "German Empire", flag: "/flags/germany.png" },
        { name: "Austro-Hungarian Empire", flag: "/flags/austria-hungary.png" },
      ],
    },
  ],
  majorBattles: [],
  startDate: "1914-08",
  endDate: "1918-11",
  impact: [
    "Resulted in over 7 million military deaths and an estimated 13 million total casualties, making it one of the deadliest theaters in human history.",
    "Introduced industrial-scale warfare with machine guns, poison gas, tanks, and aircraft fundamentally changing military strategy.",
    "Led to the exhaustion and collapse of the German Empire and contributed to revolutionary movements across Europe.",
    "Massive physical destruction of northern France and Belgium, displacing millions and crippling agricultural and industrial regions.",
    "Psychological trauma from trench warfare created the term 'shell shock' and reshaped public perception of war.",
    "Ultimately, the Allied breakthrough in 1918 and the subsequent German retreat led directly to the Armistice of November 11, 1918.",
  ],
};
