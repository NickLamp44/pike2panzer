// Sides.ts
//intended to be a directory file with the basic information about each faction involved. their commanders-Slugs,

import type { Side } from "../app/data/types";
export const sides: Side[] = [
  {
    name: "United Kingdom",
    color: "blue",
    slug: "united-kingdom",
    flag: "/flags/Flag_of_the_United_Kingdom.png",
    dateJoined: "August 4th, 1914",
    commanders: ["king-george-v", "h-h-asquith", "david-lloyd-george"],
  },
  {
    name: "France",
    color: "blue",
    slug: "french-republic",
    flag: "/flags/Flag_of_France.png",
    dateJoined: "August 4th, 1914",
    commanders: ["raymond-poincaré", "georges-clemenceau"],
  },
  {
    name: "Russian Empire",
    color: "blue",
    slug: "russian-empire",
    flag: "/flags/Flag_of_Russia_(1914-1917).png",
    dateJoined: "August 4th, 1914",
    commanders: ["raymond-poincaré", "georges-clemenceau"],
  },
  {
    name: "German Empire",
    color: "red",
    slug: "german-empire",
    flag: "/flags/Flag_of_Germany_(1867–1918).png",
    dateJoined: "August 4th, 1914",
    commanders: ["king-george-v", "h-h-asquith"],
  },
  {
    name: "Austrian & Hungarian Empire",
    color: "red",
    slug: "aus-hun-empire",
    flag: "/flags/Ensign_of_Austro-Hungarian(1869-1918).png",
    dateJoined: "August 4th, 1914",
    commanders: ["king-george-v", "h-h-asquith"],
  },
  {
    name: "Italy",
    color: "red",
    slug: "italy",
    flag: "/flags/Flag_of_Germany_(1867–1918).png",
    dateJoined: "August 4th, 1914",
    commanders: ["king-george-v", "h-h-asquith"],
  },
  // {
  //   name: "Central Powers ",
  //   slug: "central-powers-pre-ww1",
  //   aliances: [
  //     {
  //       name: "Germany",
  //       flag: "/flags/Flag_of_Germany_(1867–1918).png",
  //     },
  //     {
  //       name: "Austria-Hungary",
  //       flag: "/flags/Ensign_of_Austro-Hungarian(1869-1918).png",
  //     },
  //     {
  //       name: "Italy",
  //       flag: "/flags/Flag_of_Italy_(1861–1946).png",
  //     },
  //   ],
  // },

  // //War Time

  // //Allied Powers
  // {
  //   name: "Allied Powers",
  //   slug: "allied-powers-ww1",
  //   aliances: [
  //     // United Kingdom
  //     {
  //       name: "United Kingdom",
  //       flag: "/public/flags/Flag_of_the_United_Kingdom.png",
  //     },

  //     //commonwealth
  //     {
  //       name: "Canada",
  //       flag: "/flags/Flag_of_Canada.png",
  //     },
  //     {
  //       name: "India",
  //       flag: "/flags/Flag_of_Imperial_India.svg",
  //     },
  //     {
  //       name: "New Zealand",
  //       flag: "/flags/Flag_of_New_Zealand.png",
  //     },
  //     {
  //       name: "Australia",
  //       flag: "/flags/Flag_of_Australia.png",
  //     },

  //     //France
  //     {
  //       name: "France",
  //       flag: "/public/flags/Flag_of_France.png",
  //     },

  //     //Russian Empire
  //     {
  //       name: "Russian Empire",
  //       flag: "/public/flags/Flag_of_Russia_(1914-1917).png",
  //     },

  //     //United States
  //     {
  //       name: "United States",
  //       flag: "/",
  //     },

  //     // Italy
  //     {
  //       name: "Italy",
  //       flag: "/public/flags/Flag_of_Italy_(1861–1946).png",
  //     },

  //     //
  //     {
  //       name: "",
  //       flag: "/",
  //     },
  //   ],
  // },

  // //Central Powers
  // {
  //   name: "Central Powers ",
  //   slug: "central-powers-ww1",
  //   aliances: [
  //     {
  //       name: "Germany",
  //       slug:
  //       flag: "/flags/Flag_of_Germany_(1867–1918).png",
  //     },

  //     {
  //       name: "Austria-Hungary",
  //       flag: "/flags/Ensign_of_Austro-Hungarian(1869-1918).png",
  //     },

  //     {
  //       name: "Ottoman Empire",
  //       flag: "/flags/Flag_of_the_Ottoman_Empire_(1844–1922).png",
  //     },

  //     {
  //       name: "Bulgaria",
  //       flag: "/flags/Flag_of_Bulgaria.png",
  //     },
  //   ],
  // },
];
