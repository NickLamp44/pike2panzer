import { Era, Conflict, Commander, MajorBattle, Weapon, Strategy, Tactic, WeaponTech } from '@/app/data/types';
import { allData } from '@/app/data';

export interface SearchResult {
  id: string;
  title: string;
  type: 'commander' | 'battle' | 'weapon' | 'conflict' | 'era' | 'tactic' | 'strategy' | 'weapontech';
  description: string;
  context: string; // Shows era/conflict this belongs to
  image?: string;
  slug?: string;
  startDate?: string;
  endDate?: string;
}

export function buildSearchIndex(): SearchResult[] {
  const results: SearchResult[] = [];

  // Index Eras
  Object.entries(allData.eras).forEach(([eraKey, era]) => {
    results.push({
      id: `era-${era.slug}`,
      title: era.title,
      type: 'era',
      description: era.cardDescription,
      context: era.period,
      image: era.cardImage,
      slug: era.slug,
    });

    // Index Conflicts within each Era
    Object.entries(era.conflicts || {}).forEach(([conflictKey, conflict]) => {
      results.push({
        id: `conflict-${conflict.slug}`,
        title: conflict.title,
        type: 'conflict',
        description: conflict.cardDescription,
        context: `${era.title} - ${conflict.startDate ? conflict.startDate.split('-')[0] : 'Unknown'}`,
        image: conflict.cardImage,
        slug: conflict.slug,
        startDate: conflict.startDate,
        endDate: conflict.endDate,
      });

      // Index Commanders within Conflict
      if (conflict.commanders) {
        conflict.commanders.forEach((cmdSlug) => {
          const commander = findCommanderBySlug(cmdSlug);
          if (commander) {
            results.push({
              id: `commander-${commander.slug}`,
              title: commander.name,
              type: 'commander',
              description: commander.description[0] || 'Military commander',
              context: `${conflict.title} - ${era.title}`,
              image: commander.image,
              slug: commander.slug,
              startDate: commander.dateOfBirth,
              endDate: commander.dateOfDeath,
            });
          }
        });
      }

      // Index Major Battles
      if (conflict.majorBattles) {
        conflict.majorBattles.forEach((battleSlug) => {
          const battle = findBattleBySlug(battleSlug);
          if (battle) {
            results.push({
              id: `battle-${battle.slug}`,
              title: battle.title,
              type: 'battle',
              description: battle.cardDescription || 'Major battle',
              context: `${conflict.title} - ${era.title}`,
              image: battle.cardImage,
              slug: battle.slug,
              startDate: battle.startDate,
              endDate: battle.endDate,
            });
          }
        });
      }

      // Index Weapons
      if (conflict.weapons) {
        conflict.weapons.forEach((weaponSlug) => {
          const weapon = findWeaponBySlug(weaponSlug);
          if (weapon) {
            results.push({
              id: `weapon-${weapon.slug}`,
              title: weapon.name,
              type: 'weapon',
              description: weapon.cardDescription,
              context: `${conflict.title} - ${era.title}`,
              image: weapon.cardImage,
              slug: weapon.slug,
            });
          }
        });
      }

      // Index Weapon Technologies
      if (conflict.weaponTech) {
        conflict.weaponTech.forEach((techSlug) => {
          const tech = findWeaponTechBySlug(techSlug);
          if (tech) {
            results.push({
              id: `weapontech-${tech.slug}`,
              title: tech.name,
              type: 'weapontech',
              description: tech.description[0] || 'Weapon technology',
              context: `${conflict.title} - ${era.title}`,
              image: tech.image,
              slug: tech.slug,
            });
          }
        });
      }

      // Index Tactics
      if (conflict.tactics) {
        conflict.tactics.forEach((tacticSlug) => {
          const tactic = findTacticBySlug(tacticSlug);
          if (tactic) {
            results.push({
              id: `tactic-${tactic.name}`,
              title: tactic.name,
              type: 'tactic',
              description: tactic.description?.[0] || 'Military tactic',
              context: `${conflict.title} - ${era.title}`,
            });
          }
        });
      }

      // Index Strategies
      if (conflict.strategies) {
        conflict.strategies.forEach((strategySlug) => {
          const strategy = findStrategyBySlug(strategySlug);
          if (strategy) {
            results.push({
              id: `strategy-${strategy.name}`,
              title: strategy.name,
              type: 'strategy',
              description: strategy.description?.[0] || 'Military strategy',
              context: `${conflict.title} - ${era.title}`,
            });
          }
        });
      }
    });
  });

  return results;
}

export function searchData(query: string, index: SearchResult[]): SearchResult[] {
  if (!query.trim()) return [];

  const lowerQuery = query.toLowerCase();
  return index.filter((item) => {
    const titleMatch = item.title.toLowerCase().includes(lowerQuery);
    const descriptionMatch = item.description.toLowerCase().includes(lowerQuery);
    const contextMatch = item.context.toLowerCase().includes(lowerQuery);
    return titleMatch || descriptionMatch || contextMatch;
  });
}

export function groupResultsByType(results: SearchResult[]): Record<string, SearchResult[]> {
  const grouped: Record<string, SearchResult[]> = {};
  results.forEach((result) => {
    if (!grouped[result.type]) {
      grouped[result.type] = [];
    }
    grouped[result.type].push(result);
  });
  return grouped;
}

// Helper functions to find items by slug
function findCommanderBySlug(slug: string): Commander | null {
  for (const era of Object.values(allData.eras)) {
    for (const conflict of Object.values(era.conflicts || {})) {
      if (conflict.commanders) {
        // Search in commanders
      }
    }
  }
  return null;
}

function findBattleBySlug(slug: string): MajorBattle | null {
  return null;
}

function findWeaponBySlug(slug: string): Weapon | null {
  return null;
}

function findWeaponTechBySlug(slug: string): WeaponTech | null {
  return null;
}

function findTacticBySlug(slug: string): Tactic | null {
  return null;
}

function findStrategyBySlug(slug: string): Strategy | null {
  return null;
}
