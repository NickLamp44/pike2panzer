
export const majorBattles: MajorBattle[] = [
  {
    name: "Battle of the Frontiers",
    slug: "",
    startDate: "August 7th, 1914",
    endDate: "September 13th, 1914",
    description:
      "A series of early clashes along France’s eastern borders as the German army advanced through Belgium and into France. The battles marked the opening phase of the Western Front.",
    sides: [
      {
        name: "Allied Forces",
        aliances: [
          { name: "France", flag: "/flags/france.png" },
          { name: "United Kingdom", flag: "/flags/uk.png" },
          { name: "Belgium", flag: "/flags/belgium.png" },
        ],
      },
      { name: "German Empire" },
    ],
    strategies: [{ name: "Offensive à outrance" }, { name: "Schlieffen Plan" }],
    tactics: [{ name: "Massed Infantry Assaults" }],
    weapons: [
      {
        name: "Gewehr 98",
        images: [
          {
            url: "",
            alt: "Standard German infantry rifle during early WWI campaigns.",
            source: "",
          },
        ],
      },
    ],
    impact: [
      "Heavy Allied losses forced a retreat to the Marne, leading to the first major Allied counteroffensive.",
    ],
  },
  {
    name: "First Battle of the Marne",
    slug: "",
    startDate: "1914-09-06",
    endDate: "1914-09-12",
    description:
      "A decisive Allied counterattack that halted the German advance toward Paris, forcing a retreat and ending hopes for a quick victory under the Schlieffen Plan.",
    sides: [
      {
        name: "Allied Forces",
        aliances: [
          { name: "France", flag: "/flags/france.png" },
          { name: "United Kingdom", flag: "/flags/uk.png" },
        ],
      },
      { name: "German Empire" },
    ],
    strategies: [
      { name: "Defense in Depth" },
      { name: "Flank Counteroffensive" },
    ],
    tactics: [{ name: "Rapid Redeployment via Rail" }],
    weapons: [
      {
        name: "Lebel Model 1886 M93",
        images: [
          {
            url: "",
            alt: "Primary French rifle used during the Battle of the Marne.",
            source: "",
          },
        ],
      },
    ],
    impact: [
      "Stopped the German advance and began the long stalemate of trench warfare.",
    ],
  },
  {
    name: "Battle of Verdun",
    slug: "",
    startDate: "1916-02-21",
    endDate: "1916-12-18",
    description:
      "The longest and one of the bloodiest battles of the war, where German forces sought to 'bleed France white' through relentless attacks on the fortress city of Verdun.",
    sides: [
      {
        name: "Allied Forces",
        aliances: [{ name: "France", flag: "/flags/france.png" }],
      },
      { name: "German Empire" },
    ],
    strategies: [{ name: "Attrition Warfare" }, { name: "Defense in Depth" }],
    tactics: [{ name: "Rotational Defense" }, { name: "Artillery Barrages" }],
    weapons: [
      {
        name: "75mm Canon de 1897",
        images: [
          {
            url: "",
            alt: "French field gun known for its rapid-fire capability during Verdun.",
            source: "",
          },
        ],
      },
    ],
    impact: [
      "Massive casualties, symbolic of French endurance, and weakened the German army.",
    ],
  },
  {
    name: "Battle of the Somme",
    slug: "",
    startDate: "1916-07-01",
    endDate: "1916-11-18",
    description:
      "A massive Allied offensive intended to relieve pressure on Verdun and break German lines. It introduced the first use of tanks in warfare.",
    sides: [
      {
        name: "Allied Forces",
        aliances: [
          { name: "United Kingdom", flag: "/flags/uk.png" },
          { name: "France", flag: "/flags/france.png" },
        ],
      },
      { name: "German Empire" },
    ],
    strategies: [{ name: "Combined Arms Offensive" }],
    tactics: [{ name: "Creeping Barrage" }, { name: "Trench Raids" }],
    weapons: [
      {
        name: "Mark I Tank",
        images: [
          {
            url: "",
            alt: "First tank used in battle, introduced by the British at the Somme.",
            source: "",
          },
        ],
      },
    ],
    impact: [
      "High casualties with limited territorial gains, but marked technological evolution in warfare.",
    ],
  },
  {
    name: "Third Battle of Ypres (Passchendaele)",
    slug: "",
    startDate: "1917-07-31",
    endDate: "1917-11-10",
    description:
      "A British-led offensive through the mud and rain of Flanders, aimed at breaking through German lines and seizing Passchendaele Ridge.",
    sides: [
      {
        name: "Allied Forces",
        aliances: [
          { name: "United Kingdom", flag: "/flags/uk.png" },
          { name: "Canada", flag: "/flags/canada.png" },
          { name: "Australia", flag: "/flags/australia.png" },
        ],
      },
      { name: "German Empire" },
    ],
    strategies: [{ name: "Exhaustion Strategy" }],
    tactics: [{ name: "Creeping Barrage" }, { name: "Night Raids" }],
    weapons: [
      {
        name: "Vickers Machine Gun",
        images: [
          {
            url: "",
            alt: "British heavy machine gun used extensively during Passchendaele.",
            source: "",
          },
        ],
      },
    ],
    impact: [
      "Symbolized the futility of trench warfare and the human cost of attrition battles.",
    ],
  },
  {
    name: "German Spring Offensive",
    slug: "",
    startDate: "1918-03-21",
    endDate: "1918-07-18",
    description:
      "Germany’s final attempt to break the stalemate before American forces fully deployed. Initially successful, the offensives ultimately failed to achieve a decisive victory.",
    sides: [
      {
        name: "Allied Forces",
        aliances: [
          { name: "France", flag: "/flags/france.png" },
          { name: "United Kingdom", flag: "/flags/uk.png" },
          { name: "United States", flag: "/flags/usa.png" },
        ],
      },
      { name: "German Empire" },
    ],
    strategies: [
      { name: "Hutier Tactics" },
      { name: "Shock Troop Infiltration" },
    ],
    tactics: [{ name: "Stormtrooper Assaults" }],
    weapons: [
      {
        name: "MG08",
        images: [
          {
            url: "",
            alt: "German heavy machine gun used during the Spring Offensive.",
            source: "",
          },
        ],
      },
    ],
    impact: [
      "Initial gains exhausted German forces, setting the stage for the Allied Hundred Days Offensive.",
    ],
  },
  {
    name: "Hundred Days Offensive",
    slug: "",
    startDate: "1918-08-08",
    endDate: "1918-11-11",
    description:
      "The final Allied push that broke the Hindenburg Line and forced Germany to seek an armistice. Marked by mobile warfare and coordination between infantry, armor, and aircraft.",
    sides: [
      {
        name: "Allied Forces",
        aliances: [
          { name: "France", flag: "/flags/france.png" },
          { name: "United Kingdom", flag: "/flags/uk.png" },
          { name: "United States", flag: "/flags/usa.png" },
          { name: "Canada", flag: "/flags/canada.png" },
        ],
      },
      { name: "German Empire" },
    ],
    strategies: [{ name: "All-Arms Coordination" }],
    tactics: [
      { name: "Combined Arms Maneuver" },
      { name: "Rolling Artillery Barrage" },
    ],
    weapons: [
      {
        name: "Renault FT Tank",
        images: [
          {
            url: "",
            alt: "Light French tank used effectively during the Hundred Days Offensive.",
            source: "",
          },
        ],
      },
    ],
    impact: [
      "Broke the German defensive line, leading directly to the Armistice of November 11, 1918.",
    ],
  },
];


export const campaign: Campaign[] = [
  {
    name: "Opening Campaign – Battle of the Frontiers",
    slug: "",
    startDate: "1914-08-07",
    endDate: "1914-09-13",
    sides: [
      {
        name: "Allied Forces",
        aliances: [
          { name: "France", flag: "/flags/france.png" },
          { name: "United Kingdom", flag: "/flags/uk.png" },
          { name: "Belgium", flag: "/flags/belgium.png" },
        ],
      },
      {
        name: "German Empire",
      },
    ],
    description:
      "The initial phase of fighting on the Western Front, as German forces executed the Schlieffen Plan by invading Belgium and northern France, meeting fierce resistance from French and British forces.",
    majorBattles: [
      {
        name: "Battle of the Frontiers",
        slug: "",
        description:
          "A series of engagements across Alsace, Lorraine, and southern Belgium that resulted in heavy Allied losses and a strategic retreat toward the Marne.",
        startDate: "1914-08-07",
        endDate: "1914-09-13",
      },
      {
        name: "First Battle of the Marne",
        slug: "",
        description:
          "A critical Allied counterattack that stopped the German advance toward Paris, ending hopes for a quick victory and setting the stage for trench warfare.",
        startDate: "1914-09-06",
        endDate: "1914-09-12",
      },
    ],
  },

  {
    name: "Race to the Sea",
    slug: "",
    startDate: "1914-09-17",
    endDate: "1914-11-19",
    sides: [
      {
        name: "Allied Forces",
        aliances: [
          { name: "France", flag: "/flags/france.png" },
          { name: "United Kingdom", flag: "/flags/uk.png" },
          { name: "Belgium", flag: "/flags/belgium.png" },
        ],
      },
      {
        name: "German Empire",
      },
    ],
    description:
      "Both sides attempted to outflank each other northward toward the North Sea, leading to entrenched stalemate lines stretching from Switzerland to the Channel.",
    majorBattles: [
      {
        name: "First Battle of Ypres",
        slug: "",
        description:
          "British and French troops halted the final German push toward the Channel ports, solidifying the trench line that would define the Western Front.",
        startDate: "1914-10-19",
        endDate: "1914-11-22",
      },
    ],
  },

  {
    name: "Verdun and Somme Campaigns",
    slug: "",
    startDate: "1916-02-21",
    endDate: "1916-11-18",
    sides: [
      {
        name: "Allied Forces",
        aliances: [
          { name: "France", flag: "/flags/france.png" },
          { name: "United Kingdom", flag: "/flags/uk.png" },
        ],
      },
      {
        name: "German Empire",
      },
    ],
    description:
      "The twin battles of Verdun and the Somme represented the height of attritional warfare in 1916, with both sides suffering immense casualties for limited territorial gain.",
    majorBattles: [
      {
        name: "Battle of Verdun",
        slug: "",
        description:
          "Germany’s attempt to wear down French morale and defenses in a prolonged siege that became a symbol of French determination.",
        startDate: "1916-02-21",
        endDate: "1916-12-18",
      },
      {
        name: "Battle of the Somme",
        slug: "",
        description:
          "A massive Anglo-French offensive designed to relieve Verdun and break through German lines; marked the first use of tanks.",
        startDate: "1916-07-01",
        endDate: "1916-11-18",
      },
    ],
  },

  {
    name: "Ypres and Passchendaele Campaign",
    slug: "",
    startDate: "1917-07-31",
    endDate: "1917-11-10",
    sides: [
      {
        name: "Allied Forces",
        aliances: [
          { name: "United Kingdom", flag: "/flags/uk.png" },
          { name: "Canada", flag: "/flags/canada.png" },
          { name: "Australia", flag: "/flags/australia.png" },
        ],
      },
      {
        name: "German Empire",
      },
    ],
    description:
      "A major British-led offensive in Flanders intended to wear down German forces and capture vital high ground near Ypres, remembered for the catastrophic mud and human loss.",
    majorBattles: [
      {
        name: "Third Battle of Ypres (Passchendaele)",
        slug: "",
        description:
          "A prolonged, rain-soaked offensive marked by heavy artillery and minimal gains, epitomizing the futility of trench warfare.",
        startDate: "1917-07-31",
        endDate: "1917-11-10",
      },
    ],
  },

  {
    name: "German Spring Offensive",
    slug: "",
    startDate: "1918-03-21",
    endDate: "1918-07-18",
    sides: [
      {
        name: "Allied Forces",
        aliances: [
          { name: "France", flag: "/flags/france.png" },
          { name: "United Kingdom", flag: "/flags/uk.png" },
          { name: "United States", flag: "/flags/usa.png" },
        ],
      },
      {
        name: "German Empire",
      },
    ],
    description:
      "Germany’s last major attempt to win the war before American reinforcements arrived in full strength. A series of powerful offensives initially made deep gains but failed to achieve a decisive victory.",
    majorBattles: [
      {
        name: "Operation Michael (Battle of the Somme 1918)",
        slug: "",
        description:
          "Germany’s main thrust against British lines, achieving rapid advances before exhausting its momentum.",
        startDate: "1918-03-21",
        endDate: "1918-04-05",
      },
      {
        name: "Battle of Lys",
        slug: "",
        description:
          "A secondary German offensive targeting British and Portuguese sectors in Flanders, part of the wider spring push.",
        startDate: "1918-04-09",
        endDate: "1918-04-29",
      },
    ],
  },

  {
    name: "Hundred Days Offensive",
    slug: "",
    startDate: "1918-08-08",
    endDate: "1918-11-11",
    sides: [
      {
        name: "Allied Forces",
        aliances: [
          { name: "France", flag: "/flags/france.png" },
          { name: "United Kingdom", flag: "/flags/uk.png" },
          { name: "United States", flag: "/flags/usa.png" },
          { name: "Canada", flag: "/flags/canada.png" },
        ],
      },
      {
        name: "German Empire",
      },
    ],
    description:
      "A series of rapid Allied offensives that broke through the Hindenburg Line and forced Germany to request an armistice, marking the end of the First World War.",
    majorBattles: [
      {
        name: "Battle of Amiens",
        slug: "",
        description:
          "The opening blow of the Hundred Days, combining tanks, aircraft, and artillery to achieve a stunning Allied breakthrough.",
        startDate: "1918-08-08",
        endDate: "1918-08-12",
      },
      {
        name: "Battle of the Hindenburg Line",
        slug: "",
        description:
          "The final destruction of Germany’s last major defensive line, leading to retreat and collapse.",
        startDate: "1918-09-26",
        endDate: "1918-10-17",
      },
    ],
  },
];
