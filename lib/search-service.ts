'use client';

import { eras, getConflictWithAllData } from '@/app/data';
import type {
  Era,
  Conflict,
  Commander,
  MajorBattle,
  Weapon,
  WeaponTech,
  Strategy,
  Tactic,
  Side,
} from '@/app/data/types';

export interface SearchResult {
  id: string;
  type: 'era' | 'conflict' | 'commander' | 'battle' | 'weapon' | 'weapontech' | 'strategy' | 'tactic' | 'side';
  title: string;
  description: string;
  image?: string;
  context: {
    era?: string;
    conflict?: string;
    eraSlug?: string;
    conflictSlug?: string;
  };
  searchableText: string;
}

class SearchIndex {
  private index: SearchResult[] = [];
  private isInitialized = false;

  async initialize() {
    if (this.isInitialized) return;

    // Index all eras
    eras.forEach((era) => {
      this.index.push({
        id: era.slug,
        type: 'era',
        title: era.title,
        description: era.description || era.cardDescription,
        image: era.cardImage,
        context: { eraSlug: era.slug },
        searchableText: `${era.title} ${era.description} ${era.period}`.toLowerCase(),
      });
    });

    // Index conflicts from all eras
    for (const era of eras) {
      try {
        const conflictSlugs = await this.getConflictSlugsForEra(era.slug);
        
        for (const conflictSlug of conflictSlugs) {
          try {
            const conflictData = await getConflictWithAllData(era.slug, conflictSlug);
            
            if (conflictData?.sides) {
              this.index.push({
                id: `${era.slug}-${conflictSlug}`,
                type: 'conflict',
                title: conflictData.title,
                description: conflictData.cardDescription,
                image: conflictData.cardImage,
                context: {
                  era: era.title,
                  eraSlug: era.slug,
                  conflictSlug,
                },
                searchableText: `${conflictData.title} ${conflictData.cardDescription} ${conflictData.startDate || ''} ${conflictData.endDate || ''}`.toLowerCase(),
              });

              // Index commanders in this conflict
              conflictData.sides?.forEach((side: any) => {
                side.commanders?.forEach((commander: Commander) => {
                  this.index.push({
                    id: commander.slug,
                    type: 'commander',
                    title: commander.name,
                    description: commander.description?.[0] || '',
                    image: commander.image,
                    context: {
                      era: era.title,
                      conflict: conflictData.title,
                      eraSlug: era.slug,
                      conflictSlug,
                    },
                    searchableText: `${commander.name} ${commander.rank} ${commander.nationality} ${commander.description?.join(' ')}`.toLowerCase(),
                  });
                });
              });

              // Index sides
              conflictData.sides?.forEach((side: Side) => {
                this.index.push({
                  id: side.slug || side.name,
                  type: 'side',
                  title: side.name,
                  description: side.description || '',
                  image: side.flag,
                  context: {
                    era: era.title,
                    conflict: conflictData.title,
                    eraSlug: era.slug,
                    conflictSlug,
                  },
                  searchableText: `${side.name} ${side.description}`.toLowerCase(),
                });
              });

              // Index weapon tech
              conflictData.weaponTech?.forEach((weapon: WeaponTech) => {
                this.index.push({
                  id: weapon.slug,
                  type: 'weapontech',
                  title: weapon.name,
                  description: weapon.description?.[0] || '',
                  image: weapon.image,
                  context: {
                    era: era.title,
                    conflict: conflictData.title,
                    eraSlug: era.slug,
                    conflictSlug,
                  },
                  searchableText: `${weapon.name} ${weapon.type} ${weapon.description?.join(' ')}`.toLowerCase(),
                });
              });
            }
          } catch (error) {
            console.error(`Failed to index conflict ${conflictSlug}:`, error);
          }
        }
      } catch (error) {
        console.error(`Failed to load conflicts for era ${era.slug}:`, error);
      }
    }

    this.isInitialized = true;
  }

  private async getConflictSlugsForEra(eraSlug: string): Promise<string[]> {
    const conflictMap: Record<string, string[]> = {
      'late-medieval': ['100-years-war', 'war-of-roses', 'mongol-invasions'],
      'rise-of-gunpowder': ['ming-manchu', '30-years-war', 'anglo-spanish'],
      'revolutionary-imperial': ['american-revolution', 'french-revolution', 'napoleonic-wars'],
      'dawn-industrial-warfare': ['austro-prussian', 'franco-prussian'],
      'total-war': ['first-world-war', 'second-world-war'],
      'post-war': ['korean-war', 'vietnam-war'],
    };
    return conflictMap[eraSlug] || [];
  }

  search(query: string, limit = 20): SearchResult[] {
    if (!query.trim()) return [];

    const searchTerms = query.toLowerCase().split(' ');
    
    const results = this.index
      .filter((item) =>
        searchTerms.every((term) => item.searchableText.includes(term))
      )
      .slice(0, limit);

    return results;
  }

  getByType(type: SearchResult['type']): SearchResult[] {
    return this.index.filter((item) => item.type === type);
  }

  getStats() {
    return {
      totalIndexed: this.index.length,
      eras: this.index.filter((i) => i.type === 'era').length,
      conflicts: this.index.filter((i) => i.type === 'conflict').length,
      commanders: this.index.filter((i) => i.type === 'commander').length,
      sides: this.index.filter((i) => i.type === 'side').length,
      weaponTech: this.index.filter((i) => i.type === 'weapontech').length,
    };
  }
}

export const searchIndex = new SearchIndex();
