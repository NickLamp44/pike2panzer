import type { Era, Conflict } from "./types";

// Helper function to dynamically load conflict data
export async function getConflictData(eraSlug: string, conflictSlug: string) {
  try {
    const conflictModule = await import(
      `./eras/${eraSlug}/${conflictSlug}/${conflictSlug}`
    );

    // Load optional files - some may not exist yet
    const [
      sidesModule,
      commandersModule,
      weaponsModule,
      strategyModule,
      tacticsModule,
      campaignsModule,
    ] = await Promise.allSettled([
      import(`./eras/${eraSlug}/${conflictSlug}/sides`),
      import(`./eras/${eraSlug}/${conflictSlug}/commanders`),
      import(`./eras/${eraSlug}/${conflictSlug}/weaponTech`),
      import(`./eras/${eraSlug}/${conflictSlug}/strategy`),
      import(`./eras/${eraSlug}/${conflictSlug}/tactics`),
      import(`./eras/${eraSlug}/${conflictSlug}/campaigns`),
    ]);

    return {
      conflict:
        conflictModule.default ||
        conflictModule[Object.keys(conflictModule)[0]],

      sides:
        sidesModule.status === "fulfilled" ? sidesModule.value.sides || [] : [],

      commanders:
        commandersModule.status === "fulfilled"
          ? commandersModule.value.commanders || []
          : [],

      weaponTech:
        weaponsModule.status === "fulfilled"
          ? weaponsModule.value.weaponTech || []
          : [],

      strategy:
        strategyModule.status === "fulfilled"
          ? strategyModule.value.strategy || []
          : [],

      tactics:
        tacticsModule.status === "fulfilled"
          ? tacticsModule.value.tactics || []
          : [],

      campaigns:
        campaignsModule.status === "fulfilled"
          ? campaignsModule.value.campaigns || []
          : [],
    };
  } catch (error) {
    console.error(
      `Failed to load conflict data for ${eraSlug}/${conflictSlug}:`,
      error
    );
    return null;
  }
}

// Helper function to dynamically load theater data
export async function getTheaterData(
  eraSlug: string,
  conflictSlug: string,
  theaterSlug: string
) {
  try {
    const theaterModule = await import(
      `./eras/${eraSlug}/${conflictSlug}/${theaterSlug}/${theaterSlug}`
    );

    // Load optional files - some may not exist yet
    const [
      sidesModule,
      commandersModule,
      weaponsModule,
      strategyModule,
      tacticsModule,
    ] = await Promise.allSettled([
      import(`./eras/${eraSlug}/${conflictSlug}/${theaterSlug}/sides`),
      import(`./eras/${eraSlug}/${conflictSlug}/${theaterSlug}/commanders`),
      import(`./eras/${eraSlug}/${conflictSlug}/${theaterSlug}/weapons`),
      import(`./eras/${eraSlug}/${conflictSlug}/${theaterSlug}/strategy`),
      import(`./eras/${eraSlug}/${conflictSlug}/${theaterSlug}/tactics`),
    ]);

    return {
      theater:
        theaterModule.default || theaterModule[Object.keys(theaterModule)[0]],
      sides:
        sidesModule.status === "fulfilled" ? sidesModule.value.sides || [] : [],
      commanders:
        commandersModule.status === "fulfilled"
          ? commandersModule.value.commanders || []
          : [],
      weapons:
        weaponsModule.status === "fulfilled"
          ? weaponsModule.value.weapons || []
          : [],
      strategy:
        strategyModule.status === "fulfilled"
          ? strategyModule.value.strategy || []
          : [],
      tactics:
        tacticsModule.status === "fulfilled"
          ? tacticsModule.value.tactics || []
          : [],
    };
  } catch (error) {
    console.error(
      `Failed to load theater data for ${eraSlug}/${conflictSlug}/${theaterSlug}:`,
      error
    );
    return null;
  }
}

// Static era data (lightweight, can be imported directly)
export const eras: Era[] = [
  {
    slug: "late-medieval",
    title: "Late Medieval",
    cardDescription: "The transition from medieval to early modern warfare.",
    description: "The transition from medieval to early modern warfare.",
    cardImage: "/eras/late-medieval/hero.jpg",
    period: "1200-1500",
  },
  {
    slug: "rise-of-gunpowder",
    title: "Rise of Gunpowder",
    cardDescription: "The transition from medieval to early modern warfare.",
    description: "The introduction of gunpowder weapons transformed warfare.",
    cardImage: "/eras/rise-of-gun-powder/hero.jpg",
    period: "1500-1700",
  },
  {
    slug: "revolutionary-imperial",
    title: "Revolutionary & Imperial Wars",
    cardDescription: "The transition from medieval to early modern warfare.",
    description: "Wars of revolution and empire building.",
    cardImage: "/eras/revolutionary-imperial/hero.jpg",
    period: "1700-1850",
  },
  {
    slug: "dawn-industrial-warfare",
    title: "Dawn of Industrial Warfare",
    cardDescription: "The transition from medieval to early modern warfare.",
    description: "Industrial revolution transforms military technology.",
    cardImage: "/eras/industrial-warfare/hero.jpg",
    period: "1850-1914",
  },
  {
    slug: "post-war",
    title: "Cold War",
    cardDescription: "The transition from medieval to early modern warfare.",
    description: "Conflicts during the Cold War era.",
    cardImage: "/eras/cold-war/hero.jpg",
    period: "1945-1991",
  },
  {
    slug: "total-war",
    title: "Total War",
    cardDescription: "The transition from medieval to early modern warfare.",
    description: "The world wars that mobilized entire nations.",
    cardImage: "/eras/total-war/hero.jpg",
    period: "1914-1945",
    conflicts: ["first-world-war", "second-world-war"],
  },
];

// Helper to get era by slug
export function getEraBySlug(slug: string): Era | undefined {
  return eras.find((era) => era.slug === slug);
}

// Helper to get list of conflicts for an era (reads from filesystem)
export async function getConflictsForEra(eraSlug: string): Promise<Conflict[]> {
  const conflictSlugs = await getConflictSlugsForEra(eraSlug);
  const conflicts = await Promise.all(
    conflictSlugs.map(async (slug) => {
      try {
        const conflictModule = await import(
          `./eras/${eraSlug}/${slug}/${slug}`
        );
        return conflictModule.secondWorldWar || conflictModule.conflict;
      } catch (error) {
        console.error(`Failed to load conflict ${slug}:`, error);
        return null;
      }
    })
  );
  return conflicts.filter(Boolean) as Conflict[];
}

export async function getEraWithConflicts(eraSlug: string) {
  const era = getEraBySlug(eraSlug);

  if (!era) {
    console.error(`Era not found: ${eraSlug}`);
    return null;
  }

  try {
    // Dynamically load conflicts for this era
    const conflictModule = await import(`./eras/${eraSlug}/conflicts`);
    const conflictArray = Object.values(conflictModule.conflicts);
    return {
      ...era,
      conflicts: conflictArray,
    };
  } catch (error) {
    console.error(`Failed to load conflicts for era ${eraSlug}:`, error);
    return { ...era, conflicts: [] };
  }
}

export async function getConflictWithAllData(
  eraSlug: string,
  conflictSlug: string
) {
  try {
    // Load conflict for any era dynamically
    const { conflicts } = await import(`./eras/${eraSlug}/conflicts`);
    const conflict = conflicts[conflictSlug as keyof typeof conflicts];

    if (!conflict) {
      console.error(`Conflict not found: ${eraSlug}/${conflictSlug}`);
      return null;
    }

    // Load optional data modules for this specific conflict
    const [sidesModule, commandersModule, theatersModule, weaponTechModule] =
      await Promise.allSettled([
        import(`./eras/${eraSlug}/${conflictSlug}/sides`),
        import(`./eras/${eraSlug}/${conflictSlug}/commanders`),
        import(`./eras/${eraSlug}/${conflictSlug}/theaters`),
        import(`./eras/${eraSlug}/${conflictSlug}/weapon-tech`),
      ]);

    const allSides =
      sidesModule.status === "fulfilled" ? sidesModule.value.sides || [] : [];
    const allCommanders =
      commandersModule.status === "fulfilled"
        ? commandersModule.value.commanders || []
        : [];
    const allTheaters =
      theatersModule.status === "fulfilled"
        ? theatersModule.value.theaters || []
        : [];
    const allWeaponTech =
      weaponTechModule.status === "fulfilled"
        ? weaponTechModule.value.weaponTech || []
        : [];

    // Resolve side slugs to actual Side objects with full commander data
    const resolvedSides = conflict.sides
      ? conflict.sides
          .map((sideSlug: string) => {
            const side = allSides.find((s: any) => s.slug === sideSlug);
            if (!side) return null;

            const resolvedCommanders = side.commanders
              ? side.commanders
                  .map((commanderSlug: string) => {
                    const commander = allCommanders.find(
                      (c: any) => c.slug === commanderSlug
                    );
                    return commander || null;
                  })
                  .filter(Boolean)
              : [];

            return {
              ...side,
              commanders: resolvedCommanders,
            };
          })
          .filter(Boolean)
      : [];

    // Resolve theater slugs
    const resolvedTheaters = conflict.theaters
      ? conflict.theaters
          .map((theaterSlug: string) => {
            const theater = allTheaters.find(
              (t: any) => t.slug === theaterSlug
            );
            return theater || null;
          })
          .filter(Boolean)
      : [];

    // Resolve weapon tech slugs
    const resolvedWeaponTech = conflict.weaponTech
      ? conflict.weaponTech
          .map((weaponSlug: string) => {
            const weapon = allWeaponTech.find(
              (w: any) => w.slug === weaponSlug
            );
            return weapon || null;
          })
          .filter(Boolean)
      : [];

    return {
      ...conflict,
      sides: resolvedSides,
      theaters: resolvedTheaters,
      weaponTech: resolvedWeaponTech,
    };
  } catch (error) {
    console.error(
      `Failed to load conflict data for ${eraSlug}/${conflictSlug}:`,
      error
    );
    return null;
  }
}

// Helper function to dynamically load theater data with all sections
export async function getTheaterWithAllData(
  eraSlug: string,
  conflictSlug: string,
  theaterSlug: string
) {
  try {
    const theaterModule = await import(
      `./eras/${eraSlug}/${conflictSlug}/${theaterSlug}/${theaterSlug}`
    );
    const theater =
      theaterModule.default || theaterModule[Object.keys(theaterModule)[0]];

    // Try to load optional files
    const [
      sidesModule,
      commandersModule,
      weaponsModule,
      strategyModule,
      tacticsModule,
    ] = await Promise.allSettled([
      import(`./eras/${eraSlug}/${conflictSlug}/${theaterSlug}/sides`),
      import(`./eras/${eraSlug}/${conflictSlug}/${theaterSlug}/commanders`),
      import(`./eras/${eraSlug}/${conflictSlug}/${theaterSlug}/weapons`),
      import(`./eras/${eraSlug}/${conflictSlug}/${theaterSlug}/strategy`),
      import(`./eras/${eraSlug}/${conflictSlug}/${theaterSlug}/tactics`),
    ]);

    return {
      ...theater,
      sides:
        sidesModule.status === "fulfilled" ? sidesModule.value.sides || [] : [],
      commanders:
        commandersModule.status === "fulfilled"
          ? commandersModule.value.commanders || []
          : [],
      weapons:
        weaponsModule.status === "fulfilled"
          ? weaponsModule.value.weapons || []
          : [],
      strategy:
        strategyModule.status === "fulfilled"
          ? strategyModule.value.strategy || []
          : [],
      tactics:
        tacticsModule.status === "fulfilled"
          ? tacticsModule.value.tactics || []
          : [],
    };
  } catch (error) {
    console.error(
      `Failed to load theater data for ${eraSlug}/${conflictSlug}/${theaterSlug}:`,
      error
    );
    return null;
  }
}

// Helper to get conflict slugs for an era
async function getConflictSlugsForEra(eraSlug: string): Promise<string[]> {
  const conflictMap: Record<string, string[]> = {
    "late-medieval": ["hundred-years-war", "war-of-roses", "mongol-invasions"],
    "rise-of-gunpowder": ["ming-manchu", "30-years-war", "anglo-spanish"],
    "revolutionary-imperial": [
      "american-revolution",
      "french-revolution",
      "napoleonic-wars",
    ],
    "dawn-industrial-warfare": [
      "american-civil-war",
      "austro-prussian-war",
      "franco-prussian-war",
    ],
    "total-war": ["first-world-war", "second-world-war"],
    "post-war": ["korean-war", "vietnam-war", "falklands-war", "gulf-war"],
  };
  return conflictMap[eraSlug] || [];
}

// Helper to get theater slugs for a conflict
async function getTheaterSlugsForConflict(
  eraSlug: string,
  conflictSlug: string
): Promise<string[]> {
  const theaterMap: Record<string, Record<string, string[]>> = {
    "total-war": {
      ww1: ["western", "eastern", "italian", "gallipoli"],
      ww2: ["western", "eastern", "pacific", "north-africa"],
    },
  };
  return theaterMap[eraSlug]?.[conflictSlug] || [];
}

// Export allData object for client-side data access
export const allData = {
  eras,
};
