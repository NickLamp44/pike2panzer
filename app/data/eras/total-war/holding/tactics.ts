// important tactics that were developed or widely used in this theatre

import type { Tactic } from "../../../types";

export const tactics: Tactic[] = [
  {
    name: "Creeping Barrage",
    description: [
      "Artillery fire that advanced in stages just ahead of attacking infantry, suppressing enemy defenders and cutting barbed wire.",
      "Required precise coordination between gunners and infantry; widely used by British and French armies from 1916 onward.",
    ],
    side: [
      {
        name: "Allied Powers",
        aliances: [
          { name: "France", flag: "/" },
          { name: "United Kingdom", flag: "/" },
          { name: "Canada", flag: "/" },
        ],
      },
    ],
  },
  {
    name: "Stormtrooper (Stoßtruppen) Tactics",
    description: [
      "Small, mobile German assault units infiltrated weak points in enemy lines rather than attacking head-on.",
      "They used grenades, light machine guns, and flamethrowers to bypass strongholds and disrupt command centers.",
    ],
    side: [
      {
        name: "Central Powers",
        aliances: [{ name: "German Empire", flag: "/" }],
      },
    ],
  },
  {
    name: "Infiltration Tactics",
    description: [
      "Used by both sides in the later stages of the war to exploit enemy weaknesses and gain ground without mass casualties.",
      "Focused on speed, surprise, and decentralized command rather than rigid formations.",
    ],
    side: [
      {
        name: "Central Powers",
        aliances: [{ name: "German Empire", flag: "/" }],
      },
    ],
  },
  {
    name: "Rolling Barrage",
    description: [
      "A variation of the creeping barrage where multiple artillery lines fired in overlapping waves.",
      "Provided a continuous wall of fire to protect advancing troops while cutting enemy communications and defenses.",
    ],
    side: [
      {
        name: "Allied Powers",
        aliances: [
          { name: "United Kingdom", flag: "/" },
          { name: "France", flag: "/" },
        ],
      },
    ],
  },
  {
    name: "Bite and Hold",
    description: [
      "Limited-objective attacks designed to seize and consolidate small sections of enemy line before reinforcing against counterattacks.",
      "Used extensively by the British after the Somme to minimize losses and secure steady gains.",
    ],
    side: [
      {
        name: "Allied Powers",
        aliances: [{ name: "United Kingdom", flag: "/" }],
      },
    ],
  },
  {
    name: "Counter-Battery Fire",
    description: [
      "Specialized artillery targeting of enemy gun positions using aerial spotting and sound ranging.",
      "Aimed to neutralize enemy artillery before and during offensives.",
    ],
    side: [
      {
        name: "Allied Powers",
        aliances: [
          { name: "United Kingdom", flag: "/" },
          { name: "France", flag: "/" },
        ],
      },
    ],
  },
  {
    name: "Night Raids",
    description: [
      "Small-scale attacks under cover of darkness used to gather intelligence, capture prisoners, or destroy enemy outposts.",
      "Relied on stealth and coordination rather than large numbers.",
    ],
    side: [
      {
        name: "Allied Powers",
        aliances: [
          { name: "United Kingdom", flag: "/" },
          { name: "Canada", flag: "/" },
        ],
      },
    ],
  },
  {
    name: "Defense in Depth",
    description: [
      "Multi-layered defense system with front, support, and reserve zones allowing defenders to absorb and counter enemy assaults.",
      "Allowed defenders to retreat slightly under pressure and then counterattack when attackers were overextended.",
    ],
    side: [
      {
        name: "Central Powers",
        aliances: [{ name: "German Empire", flag: "/" }],
      },
    ],
  },
  {
    name: "Gas Attacks",
    description: [
      "Use of chemical weapons like chlorine, phosgene, and mustard gas to break stalemates and inflict psychological terror.",
      "Initially deployed by Germany in 1915 and later adopted by all major belligerents.",
    ],
    side: [
      {
        name: "Central Powers",
        aliances: [{ name: "German Empire", flag: "/" }],
      },
      {
        name: "Allied Powers",
        aliances: [
          { name: "France", flag: "/" },
          { name: "United Kingdom", flag: "/" },
        ],
      },
    ],
  },
  {
    name: "Tunneling and Mining Operations",
    description: [
      "Underground mines were dug beneath enemy trenches and filled with explosives to destroy fortifications before assaults.",
      "Famously used at the Battle of Messines Ridge in 1917 where British tunnellers detonated 19 mines simultaneously.",
    ],
    side: [
      {
        name: "Allied Powers",
        aliances: [
          { name: "United Kingdom", flag: "/" },
          { name: "Canada", flag: "/" },
        ],
      },
    ],
  },
  {
    name: "Artillery Registration and Spotting",
    description: [
      "Coordination between air reconnaissance and artillery units to improve accuracy of shelling.",
      "A major technological advance that allowed precise bombardment of trenches, supply routes, and enemy batteries.",
    ],
    side: [
      {
        name: "Allied Powers",
        aliances: [
          { name: "United Kingdom", flag: "/" },
          { name: "France", flag: "/" },
        ],
      },
    ],
  },
  {
    name: "Shock and Disruption",
    description: [
      "German approach to offensives in 1918: concentrated artillery and gas bombardments, rapid infantry infiltration, and the targeting of enemy command and logistics centers.",
      "Aimed to break the enemy’s coordination before reserves could react.",
    ],
    side: [
      {
        name: "Central Powers",
        aliances: [{ name: "German Empire", flag: "/" }],
      },
    ],
  },
];
