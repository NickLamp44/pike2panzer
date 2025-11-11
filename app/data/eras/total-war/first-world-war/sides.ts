import type { Side } from "../../../types";
export const side: Side[] = [

  //Treaties
  {
    name: "Triple Entente",
    slug: "triple-entente-ww1",
    aliances: [
      {
        name: "United Kingdom",
        flag: "/flags/Flag_of_the_United_Kingdom.png",
      },
      { name: "France", flag: "/public/flags/Flag_of_France.png" },
      {
        name: "Russian Empire",
        flag: "/flags/Flag_of_Russia_(1914-1917).png",
      },
    ],
  },
  {
    name: "Central Powers ",
    slug: "central-powers-pre-ww1",
    aliances: [
      {
        name: "Germany",
        flag: "/flags/Flag_of_Germany_(1867–1918).png",
      },
      {
        name: "Austria-Hungary",
        flag: "/flags/Ensign_of_Austro-Hungarian(1869-1918).png",
      },
      {
        name: "Italy",
        flag: "/flags/Flag_of_Italy_(1861–1946).png",
      },
    ],
  },

  //War Time

  //Allied Powers
  {
    name: "Allied Powers",
    slug: "allied-powers-ww1",
    aliances: [
      // United Kingdom
      {
        name: "United Kingdom",
        flag: "/public/flags/Flag_of_the_United_Kingdom.png",
      },

      //commonwealth
      {
        name: "Canada",
        flag: "/flags/Flag_of_Canada.png",
      },
      {
        name: "India",
        flag: "/flags/Flag_of_Imperial_India.svg",
      },
      {
        name: "New Zealand",
        flag: "/flags/Flag_of_New_Zealand.png",
      },
      {
        name: "Australia",
        flag: "/flags/Flag_of_Australia.png",
      },

      //France
      {
        name: "France",
        flag: "/public/flags/Flag_of_France.png",
      },

      //Russian Empire
      {
        name: "Russian Empire",
        flag: "/public/flags/Flag_of_Russia_(1914-1917).png",
      },

      //United States
      {
        name: "United States",
        flag: "/",
      },

      // Italy
      {
        name: "Italy",
        flag: "/public/flags/Flag_of_Italy_(1861–1946).png",
      },

      //
      {
        name: "",
        flag: "/",
      },
    ],
  },

  //Central Powers
  {
    name: "Central Powers ",
    slug: "central-powers-ww1",
    aliances: [
      {
        name: "Germany",
        flag: "/flags/Flag_of_Germany_(1867–1918).png",
      },

      {
        name: "Austria-Hungary",
        flag: "/flags/Ensign_of_Austro-Hungarian(1869-1918).png",
      },

      {
        name: "Ottoman Empire",
        flag: "/flags/Flag_of_the_Ottoman_Empire_(1844–1922).png",
      },

      {
        name: "Bulgaria",
        flag: "/flags/Flag_of_Bulgaria.png",
      },
    ],
  },
];
