import * as allData from '@/app/data';
import { Era, Conflict, Commander, Battle, Campaign, Weapon, WeaponTech, Tactic, Strategy, Side } from '@/app/data/types';

export interface SearchableEntity {
  id: string;
  name: string;
  type: 'commander' | 'battle' | 'campaign' | 'weapon' | 'tactic' | 'strategy' | 'side' | 'era' | 'conflict';
  description?: string;
  era: string;
  eraSlug: string;
  conflict?: string;
  conflictSlug?: string;
  theater?: string;
  theaterSlug?: string;
  startYear?: number;
  endYear?: number;
  image?: string;
  metadata: Record<string, any>;
}

export interface DataIndex {
  entities: SearchableEntity[];
  commandersByConflict: Record<string, Commander[]>;
  battlesByConflict: Record<string, Battle[]>;
  weaponsByConflict: Record<string, Weapon[]>;
  statistics: {
    totalCommanders: number;
    totalBattles: number;
    totalWeapons: number;
    totalTactics: number;
    totalStrategies: number;
    totalCampaigns: number;
    totalEras: number;
    totalConflicts: number;
    yearRange: { start: number; end: number };
  };
}

class DataAggregator {
  private index: DataIndex | null = null;

  /**
   * Build the complete searchable index from all data files
   */
  buildIndex(): DataIndex {
    if (this.index) return this.index;

    const entities: SearchableEntity[] = [];
    const commandersByConflict: Record<string, Commander[]> = {};
    const battlesByConflict: Record<string, Battle[]> = {};
    const weaponsByConflict: Record<string, Weapon[]> = {};

    let totalCommanders = 0;
    let totalBattles = 0;
    let totalWeapons = 0;
    let totalTactics = 0;
    let totalStrategies = 0;
    let totalCampaigns = 0;
    let totalEras = 0;
    let totalConflicts = 0;
    const years: number[] = [];

    // Process all eras
    Object.entries(allData.eras).forEach(([eraSlug, era]) => {
      totalEras++;
      entities.push({
        id: `era-${eraSlug}`,
        name: era.name,
        type: 'era',
        description: era.description,
        era: era.name,
        eraSlug,
        startYear: era.startYear,
        endYear: era.endYear,
        metadata: { icon: era.icon },
      });

      if (era.startYear) years.push(era.startYear);
      if (era.endYear) years.push(era.endYear);

      // Process all conflicts in this era
      Object.entries(era.conflicts).forEach(([conflictSlug, conflict]) => {
        totalConflicts++;
        const conflictKey = `${eraSlug}/${conflictSlug}`;

        entities.push({
          id: `conflict-${conflictKey}`,
          name: conflict.name,
          type: 'conflict',
          description: conflict.description,
          era: era.name,
          eraSlug,
          conflict: conflict.name,
          conflictSlug,
          startYear: conflict.startYear,
          endYear: conflict.endYear,
          metadata: { casualty: conflict.casualty, side: conflict.side },
        });

        if (conflict.startYear) years.push(conflict.startYear);
        if (conflict.endYear) years.push(conflict.endYear);

        // Process commanders
        if (conflict.commanders) {
          commandersByConflict[conflictKey] = conflict.commanders;
          totalCommanders += conflict.commanders.length;

          conflict.commanders.forEach((commander) => {
            entities.push({
              id: `commander-${conflictKey}-${commander.slug}`,
              name: commander.name,
              type: 'commander',
              description: commander.description,
              era: era.name,
              eraSlug,
              conflict: conflict.name,
              conflictSlug,
              image: commander.image,
              metadata: {
                side: commander.side,
                nationality: commander.nationality,
                rank: commander.rank,
              },
            });
          });
        }

        // Process battles
        if (conflict.battles) {
          battlesByConflict[conflictKey] = conflict.battles;
          totalBattles += conflict.battles.length;

          conflict.battles.forEach((battle) => {
            entities.push({
              id: `battle-${conflictKey}-${battle.slug}`,
              name: battle.name,
              type: 'battle',
              description: battle.description,
              era: era.name,
              eraSlug,
              conflict: conflict.name,
              conflictSlug,
              startYear: battle.year,
              image: battle.image,
              metadata: {
                year: battle.year,
                location: battle.location,
                commanders: battle.commanders,
                outcome: battle.outcome,
              },
            });

            if (battle.year) years.push(battle.year);
          });
        }

        // Process campaigns
        if (conflict.campaigns) {
          totalCampaigns += conflict.campaigns.length;
          conflict.campaigns.forEach((campaign) => {
            entities.push({
              id: `campaign-${conflictKey}-${campaign.slug}`,
              name: campaign.name,
              type: 'campaign',
              description: campaign.description,
              era: era.name,
              eraSlug,
              conflict: conflict.name,
              conflictSlug,
              metadata: {
                objectives: campaign.objectives,
                outcome: campaign.outcome,
              },
            });
          });
        }

        // Process weapons
        if (conflict.weapons) {
          weaponsByConflict[conflictKey] = conflict.weapons;
          totalWeapons += conflict.weapons.length;

          conflict.weapons.forEach((weapon) => {
            entities.push({
              id: `weapon-${conflictKey}-${weapon.slug}`,
              name: weapon.name,
              type: 'weapon',
              description: weapon.description,
              era: era.name,
              eraSlug,
              conflict: conflict.name,
              conflictSlug,
              image: weapon.image,
              metadata: {
                category: weapon.category,
                effectiveness: weapon.effectiveness,
                origin: weapon.origin,
              },
            });
          });
        }

        // Process tactics
        if (conflict.tactics) {
          totalTactics += conflict.tactics.length;
          conflict.tactics.forEach((tactic) => {
            entities.push({
              id: `tactic-${conflictKey}-${tactic.slug}`,
              name: tactic.name,
              type: 'tactic',
              description: tactic.description,
              era: era.name,
              eraSlug,
              conflict: conflict.name,
              conflictSlug,
              metadata: { effectiveness: tactic.effectiveness },
            });
          });
        }

        // Process strategies
        if (conflict.strategies) {
          totalStrategies += conflict.strategies.length;
          conflict.strategies.forEach((strategy) => {
            entities.push({
              id: `strategy-${conflictKey}-${strategy.slug}`,
              name: strategy.name,
              type: 'strategy',
              description: strategy.description,
              era: era.name,
              eraSlug,
              conflict: conflict.name,
              conflictSlug,
              metadata: { effectiveness: strategy.effectiveness },
            });
          });
        }

        // Process sides
        if (conflict.sides) {
          conflict.sides.forEach((side) => {
            entities.push({
              id: `side-${conflictKey}-${side.slug}`,
              name: side.name,
              type: 'side',
              description: side.description,
              era: era.name,
              eraSlug,
              conflict: conflict.name,
              conflictSlug,
              metadata: {
                countries: side.countries,
                ideology: side.ideology,
                allies: side.allies,
              },
            });
          });
        }
      });
    });

    const yearsSorted = years.filter((y) => y && y > 0).sort((a, b) => a - b);

    this.index = {
      entities,
      commandersByConflict,
      battlesByConflict,
      weaponsByConflict,
      statistics: {
        totalCommanders,
        totalBattles,
        totalWeapons,
        totalTactics,
        totalStrategies,
        totalCampaigns,
        totalEras,
        totalConflicts,
        yearRange: {
          start: yearsSorted[0] || 1000,
          end: yearsSorted[yearsSorted.length - 1] || 2025,
        },
      },
    };

    return this.index;
  }

  /**
   * Search across all entities
   */
  search(query: string, filters?: { type?: string; era?: string; conflict?: string }): SearchableEntity[] {
    const index = this.buildIndex();
    const queryLower = query.toLowerCase();

    let results = index.entities.filter((entity) => {
      const nameMatch = entity.name.toLowerCase().includes(queryLower);
      const descMatch = entity.description?.toLowerCase().includes(queryLower);
      return nameMatch || descMatch;
    });

    // Apply filters
    if (filters?.type) {
      results = results.filter((e) => e.type === filters.type);
    }
    if (filters?.era) {
      results = results.filter((e) => e.eraSlug === filters.era);
    }
    if (filters?.conflict) {
      results = results.filter((e) => e.conflictSlug === filters.conflict);
    }

    return results.slice(0, 50); // Limit to 50 results
  }

  /**
   * Get all entities of a specific type
   */
  getByType(type: SearchableEntity['type']): SearchableEntity[] {
    const index = this.buildIndex();
    return index.entities.filter((e) => e.type === type);
  }

  /**
   * Get all entities for a conflict
   */
  getConflictData(eraSlug: string, conflictSlug: string) {
    const index = this.buildIndex();
    const conflictKey = `${eraSlug}/${conflictSlug}`;

    return {
      entities: index.entities.filter(
        (e) => e.eraSlug === eraSlug && e.conflictSlug === conflictSlug
      ),
      commanders: index.commandersByConflict[conflictKey] || [],
      battles: index.battlesByConflict[conflictKey] || [],
      weapons: index.weaponsByConflict[conflictKey] || [],
    };
  }

  /**
   * Get statistics and analytics
   */
  getStatistics() {
    const index = this.buildIndex();
    return index.statistics;
  }

  /**
   * Get timeline data for visualization
   */
  getTimeline() {
    const index = this.buildIndex();

    const battles = index.entities
      .filter((e) => e.type === 'battle' && e.startYear)
      .map((e) => ({
        name: e.name,
        year: e.startYear,
        conflict: e.conflict,
        era: e.era,
      }))
      .sort((a, b) => a.year! - b.year!);

    const conflicts = index.entities
      .filter((e) => e.type === 'conflict' && e.startYear)
      .map((e) => ({
        name: e.name,
        startYear: e.startYear,
        endYear: e.endYear,
        era: e.era,
      }))
      .sort((a, b) => a.startYear! - b.startYear!);

    return { battles, conflicts };
  }

  /**
   * Get commander network (for visualization)
   */
  getCommanderNetwork(conflictKey: string) {
    const index = this.buildIndex();
    const commanders = index.commandersByConflict[conflictKey] || [];

    return commanders.map((c) => ({
      id: c.slug,
      name: c.name,
      side: c.side,
      nationality: c.nationality,
      rank: c.rank,
      image: c.image,
    }));
  }

  /**
   * Get era-wise statistics
   */
  getEraStatistics() {
    const index = this.buildIndex();

    const eraStats = Object.values(allData.eras).map((era) => {
      const eraEntities = index.entities.filter((e) => e.eraSlug === era.slug);
      return {
        era: era.name,
        slug: era.slug,
        conflicts: eraEntities.filter((e) => e.type === 'conflict').length,
        battles: eraEntities.filter((e) => e.type === 'battle').length,
        commanders: eraEntities.filter((e) => e.type === 'commander').length,
        weapons: eraEntities.filter((e) => e.type === 'weapon').length,
        yearRange: {
          start: era.startYear,
          end: era.endYear,
        },
      };
    });

    return eraStats;
  }
}

// Export singleton instance
export const dataAggregator = new DataAggregator();
