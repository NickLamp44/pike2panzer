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
    image: "/eras/late-medieval/hero.jpg",
    period: "1200-1500",
  },
  {
    slug: "rise-of-gunpowder",
    title: "Rise of Gunpowder",
    description: "The introduction of gunpowder weapons transformed warfare.",
    image: "/eras/rise-of-gunpowder/hero.jpg",
    period: "1500-1700",
  },
  {
    slug: "revolutionary-imperial",
    title: "Revolutionary & Imperial Wars",
    description: "Wars of revolution and empire building.",
    image: "/eras/revolutionary-imperial/hero.jpg",
    period: "1700-1850",
  },
  {
    slug: "dawn-industrial-warfare",
    title: "Dawn of Industrial Warfare",
    description: "Industrial revolution transforms military technology.",
    image: "/eras/dawn-industrial-warfare/hero.jpg",
    period: "1850-1914",
  },
  {
    slug: "total-war",
    title: "Total War",
    description: "The world wars that mobilized entire nations.",
    image: "/eras/total-war/hero.jpg",
    period: "1914-1945",
  },
  {
    slug: "post-war",
    title: "Cold War",
    description: "Conflicts during the Cold War era.",
    image: "/eras/post-war/hero.jpg",
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
