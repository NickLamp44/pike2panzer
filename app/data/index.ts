import type { Era, Conflict } from "./types";

// Helper function to dynamically load conflict data
export async function getConflictData(eraSlug: string, conflictSlug: string) {
  try {
    const conflictModule = await import(
      `./eras/${eraSlug}/${conflictSlug}/${conflictSlug}.ts`
    );
    const sidesModule = await import(
      `./eras/${eraSlug}/${conflictSlug}/sides.ts`
    );
    const commandersModule = await import(
      `./eras/${eraSlug}/${conflictSlug}/commanders.ts`
    );
    const weaponsModule = await import(
      `./eras/${eraSlug}/${conflictSlug}/weaponsTech.ts`
    );
    const strategyModule = await import(
      `./eras/${eraSlug}/${conflictSlug}/strategy.ts`
    );
    const tacticsModule = await import(
      `./eras/${eraSlug}/${conflictSlug}/tactics.ts`
    );

    return {
      conflict:
        conflictModule.default ||
        conflictModule[Object.keys(conflictModule)[0]],
      sides: sidesModule.sides || [],
      commanders: commandersModule.commanders || [],
      weaponsTech: weaponsModule.weaponsTech || [],
      strategy: strategyModule.strategy || [],
      tactics: tacticsModule.tactics || [],
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
      `./eras/${eraSlug}/${conflictSlug}/${theaterSlug}/${theaterSlug}.ts`
    );
    const sidesModule = await import(
      `./eras/${eraSlug}/${conflictSlug}/${theaterSlug}/sides.ts`
    );
    const commandersModule = await import(
      `./eras/${eraSlug}/${conflictSlug}/${theaterSlug}/commanders.ts`
    );
    const weaponsModule = await import(
      `./eras/${eraSlug}/${conflictSlug}/${theaterSlug}/weaponsTech.ts`
    );
    const strategyModule = await import(
      `./eras/${eraSlug}/${conflictSlug}/${theaterSlug}/strategy.ts`
    );
    const tacticsModule = await import(
      `./eras/${eraSlug}/${conflictSlug}/${theaterSlug}/tactics.ts`
    );

    return {
      theater:
        theaterModule.default || theaterModule[Object.keys(theaterModule)[0]],
      sides: sidesModule.sides || [],
      commanders: commandersModule.commanders || [],
      weaponsTech: weaponsModule.weaponsTech || [],
      strategy: strategyModule.strategy || [],
      tactics: tacticsModule.tactics || [],
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
    description: "The transition from medieval to early modern warfare.",
    cardImage: "/eras/late-medieval/hero.jpg",
    period: "1200-1500",
  },
  {
    slug: "rise-of-gunpowder",
    title: "Rise of Gunpowder",
    description: "The introduction of gunpowder weapons transformed warfare.",
    cardImage: "/eras/rise-of-gunpowder/hero.jpg",
    period: "1500-1700",
  },
  {
    slug: "revolutionary-imperial",
    title: "Revolutionary & Imperial Wars",
    description: "Wars of revolution and empire building.",
    cardImage: "/eras/revolutionary-imperial/hero.jpg",
    period: "1700-1850",
  },
  {
    slug: "dawn-industrial-warfare",
    title: "Dawn of Industrial Warfare",
    description: "Industrial revolution transforms military technology.",
    cardImage: "/eras/dawn-industrial-warfare/hero.jpg",
    period: "1850-1914",
  },
  {
    slug: "total-war",
    title: "Total War",
    description: "The world wars that mobilized entire nations.",
    cardImage: "/eras/total-war/hero.jpg",
    period: "1914-1945",
  },
  {
    slug: "post-war",
    title: "Cold War",
    description: "Conflicts during the Cold War era.",
    cardImage: "/eras/post-war/hero.jpg",
    period: "1945-1991",
  },
];

// Helper to get era by slug
export function getEraBySlug(slug: string): Era | undefined {
  return eras.find((era) => era.slug === slug);
}

// Helper to get list of conflicts for an era (reads from filesystem)
export async function getConflictsForEra(eraSlug: string): Promise<Conflict[]> {
  // This would need to be populated based on your actual folder structure
  // For now, return empty array - you'll populate this as you add conflicts
  return [];
}

// Helper function to dynamically load era data with conflicts
export async function getEraWithConflicts(eraSlug: string) {
  try {
    const eraModule = await import(`./eras/${eraSlug}/${eraSlug}.ts`);
    const era = eraModule.default || eraModule[Object.keys(eraModule)[0]];

    // Get list of conflicts by scanning the folder
    const conflictSlugs = await getConflictSlugsForEra(eraSlug);
    const conflicts = await Promise.all(
      conflictSlugs.map(async (slug) => {
        const conflictModule = await import(
          `./eras/${eraSlug}/${slug}/${slug}.ts`
        );
        return (
          conflictModule.default ||
          conflictModule[Object.keys(conflictModule)[0]]
        );
      })
    );

    return { ...era, conflicts };
  } catch (error) {
    console.error(`Failed to load era data for ${eraSlug}:`, error);
    return null;
  }
}

// Helper function to dynamically load conflict data with all sections
export async function getConflictWithAllData(
  eraSlug: string,
  conflictSlug: string
) {
  try {
    const conflictModule = await import(
      `./eras/${eraSlug}/${conflictSlug}/${conflictSlug}.ts`
    );
    const conflict =
      conflictModule.default || conflictModule[Object.keys(conflictModule)[0]];

    // Try to load optional files (some conflicts may not have all sections)
    const [
      sidesModule,
      commandersModule,
      weaponsModule,
      strategyModule,
      tacticsModule,
    ] = await Promise.allSettled([
      import(`./eras/${eraSlug}/${conflictSlug}/sides.ts`),
      import(`./eras/${eraSlug}/${conflictSlug}/commanders.ts`),
      import(`./eras/${eraSlug}/${conflictSlug}/weapons.ts`),
      import(`./eras/${eraSlug}/${conflictSlug}/strategy.ts`),
      import(`./eras/${eraSlug}/${conflictSlug}/tactics.ts`),
    ]);

    return {
      ...conflict,
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
      `./eras/${eraSlug}/${conflictSlug}/${theaterSlug}/${theaterSlug}.ts`
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
      import(`./eras/${eraSlug}/${conflictSlug}/${theaterSlug}/sides.ts`),
      import(`./eras/${eraSlug}/${conflictSlug}/${theaterSlug}/commanders.ts`),
      import(`./eras/${eraSlug}/${conflictSlug}/${theaterSlug}/weapons.ts`),
      import(`./eras/${eraSlug}/${conflictSlug}/${theaterSlug}/strategy.ts`),
      import(`./eras/${eraSlug}/${conflictSlug}/${theaterSlug}/tactics.ts`),
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
  // This requires a mapping since we can't dynamically scan folders at runtime
  // You can either hardcode this or create a conflicts.ts file listing them
  const conflictMap: Record<string, string[]> = {
    "late-medieval": ["hundred-years-war", "war-of-roses", "mongol-invasions"],
    "rise-of-gunpowder": [],
    "revolutionary-imperial": [],
    "dawn-industrial-warfare": [
      "american-civil-war",
      "austro-prussian-war",
      "franco-prussian-war",
    ],
    "total-war": ["ww1", "ww2"],
    "post-war": [],
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

// Re-export types
export type {
  Era,
  Conflict,
  Theater,
  Commander,
  Side,
  WeaponTech,
  Strategy,
  Tactic,
} from "./types";
