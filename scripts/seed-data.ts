/**
 * Seed Script for Pike2Panzer Supabase Database
 * 
 * This script populates your Supabase database with military history data
 * from your existing TypeScript files in app/data/
 * 
 * Run with: npx ts-node scripts/seed-data.ts
 */

import { createClient } from '@supabase/supabase-js';
import * as fs from 'fs';
import * as path from 'path';
import type {
  Era,
  EraInsert,
  Conflict,
  ConflictInsert,
  Commander,
  CommanderInsert,
  Battle,
  BattleInsert,
  Weapon,
  WeaponInsert,
  Tactic,
  TacticInsert,
  Strategy,
  StrategyInsert,
  Side,
  SideInsert,
} from '../lib/supabase/client';

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Missing Supabase environment variables. Check .env.local');
}

const supabase = createClient(supabaseUrl, supabaseKey);

interface RawEra {
  slug: string;
  title: string;
  description?: string;
  cardImage?: string;
  period?: string;
  start_year?: number;
  end_year?: number;
}

interface RawConflict {
  slug: string;
  title: string;
  description?: string;
  cardImage?: string;
  era_slug: string;
  start_year?: number;
  end_year?: number;
  casualtiesEstimate?: number;
}

interface RawCommander {
  name: string;
  title?: string;
  side?: string;
  description?: string;
  born?: number;
  died?: number;
  image?: string;
  achievements?: string[];
}

interface RawBattle {
  name: string;
  date?: string;
  dateStart?: string;
  location?: string;
  description?: string;
  outcome?: string;
  casualties?: number;
  significance?: string;
  image?: string;
  commanders?: string[];
}

/**
 * Seed data - Add your military history data here
 * This is a sample structure that you can expand
 */
const seedEras: RawEra[] = [
  {
    slug: 'late-medieval',
    title: 'Late Medieval',
    description: 'The final centuries of medieval warfare (1200-1500)',
    period: '1200-1500',
    start_year: 1200,
    end_year: 1500,
    cardImage: '/eras/late-medieval/hero.jpg',
  },
  {
    slug: 'rise-of-gunpowder',
    title: 'Rise of Gunpowder',
    description: 'Gunpowder weapons revolutionize warfare (1500-1700)',
    period: '1500-1700',
    start_year: 1500,
    end_year: 1700,
    cardImage: '/eras/rise-of-gun-powder/hero.jpg',
  },
  {
    slug: 'revolutionary-imperial',
    title: 'Revolutionary & Imperial Wars',
    description: 'Wars of revolution and empire building (1700-1850)',
    period: '1700-1850',
    start_year: 1700,
    end_year: 1850,
    cardImage: '/eras/revolutionary-imperial/hero.jpg',
  },
  {
    slug: 'industrial-warfare',
    title: 'Dawn of Industrial Warfare',
    description: 'Industrial revolution transforms military technology (1850-1914)',
    period: '1850-1914',
    start_year: 1850,
    end_year: 1914,
    cardImage: '/eras/industrial-warfare/hero.jpg',
  },
  {
    slug: 'total-war',
    title: 'Total War',
    description: 'World wars mobilize entire nations (1914-1945)',
    period: '1914-1945',
    start_year: 1914,
    end_year: 1945,
    cardImage: '/eras/total-war/hero.jpg',
  },
  {
    slug: 'cold-war',
    title: 'Cold War',
    description: 'Conflicts during Cold War era (1945-1991)',
    period: '1945-1991',
    start_year: 1945,
    end_year: 1991,
    cardImage: '/eras/cold-war/hero.jpg',
  },
];

const seedConflicts: RawConflict[] = [
  // Late Medieval
  {
    slug: 'hundred-years-war',
    title: "Hundred Years' War",
    era_slug: 'late-medieval',
    description: 'Conflict between England and France',
    start_year: 1337,
    end_year: 1453,
    cardImage: '/eras/late-medieval/100-years-war/hero.jpg',
  },
  {
    slug: 'war-of-roses',
    title: 'War of the Roses',
    era_slug: 'late-medieval',
    description: 'Civil war in England',
    start_year: 1455,
    end_year: 1485,
    cardImage: '/eras/late-medieval/war-of-roses/hero.jpg',
  },
  // Total War
  {
    slug: 'first-world-war',
    title: 'First World War',
    era_slug: 'total-war',
    description: 'The Great War (1914-1918)',
    start_year: 1914,
    end_year: 1918,
    cardImage: '/eras/total-war/ww1/hero.jpg',
    casualtiesEstimate: 20000000,
  },
  {
    slug: 'second-world-war',
    title: 'Second World War',
    era_slug: 'total-war',
    description: 'World War II (1939-1945)',
    start_year: 1939,
    end_year: 1945,
    cardImage: '/eras/total-war/ww2/hero.jpg',
    casualtiesEstimate: 70000000,
  },
  // Cold War
  {
    slug: 'korean-war',
    title: 'Korean War',
    era_slug: 'cold-war',
    description: 'Cold War hot conflict in Korea',
    start_year: 1950,
    end_year: 1953,
    cardImage: '/eras/cold-war/korean-war/hero.jpg',
  },
  {
    slug: 'vietnam-war',
    title: 'Vietnam War',
    era_slug: 'cold-war',
    description: 'Proxy war in Southeast Asia',
    start_year: 1955,
    end_year: 1975,
    cardImage: '/eras/cold-war/vietnam-war/hero.jpg',
  },
];

/**
 * Helper: Extract year range from period string
 */
function extractYears(period?: string): { start: number; end: number } | null {
  if (!period) return null;
  const match = period.match(/(\d{4})-(\d{4})/);
  if (match) {
    return { start: parseInt(match[1]), end: parseInt(match[2]) };
  }
  return null;
}

/**
 * Main seed function
 */
async function seedDatabase() {
  try {
    console.log('🌱 Starting database seed...\n');

    // Seed Eras
    console.log('📍 Seeding eras...');
    const eraRecords: Era[] = [];
    for (const era of seedEras) {
      const years = extractYears(era.period);
      const eraData: EraInsert = {
        slug: era.slug,
        name: era.title,
        description: era.description || null,
        icon: null,
        image_url: era.cardImage || null,
        start_year: era.start_year || years?.start || null,
        end_year: era.end_year || years?.end || null,
      };

      const { data, error } = await supabase
        .from('eras')
        .insert([eraData])
        .select()
        .single();

      if (error) {
        console.error(`❌ Error seeding era ${era.slug}:`, error);
      } else {
        console.log(`✅ Seeded era: ${era.title}`);
        eraRecords.push(data);
      }
    }

    // Seed Conflicts
    console.log('\n🎭 Seeding conflicts...');
    const conflictRecords: Map<string, Conflict> = new Map();
    for (const conflict of seedConflicts) {
      const eraRecord = eraRecords.find((e) => e.slug === conflict.era_slug);
      if (!eraRecord) {
        console.warn(`⚠️ Era not found for conflict ${conflict.slug}`);
        continue;
      }

      const conflictData: ConflictInsert = {
        era_id: eraRecord.id,
        slug: conflict.slug,
        name: conflict.title,
        description: conflict.description || null,
        start_year: conflict.start_year || null,
        end_year: conflict.end_year || null,
        image_url: conflict.cardImage || null,
      };

      const { data, error } = await supabase
        .from('conflicts')
        .insert([conflictData])
        .select()
        .single();

      if (error) {
        console.error(`❌ Error seeding conflict ${conflict.slug}:`, error);
      } else {
        console.log(`✅ Seeded conflict: ${conflict.title}`);
        conflictRecords.set(conflict.slug, data);
      }
    }

    // Seed Sides (Factions/Nations)
    console.log('\n🏳️ Seeding sides (factions)...');
    const sides = [
      { conflict_slug: 'first-world-war', name: 'Allies', description: 'Allied Powers' },
      { conflict_slug: 'first-world-war', name: 'Central Powers', description: 'Central Powers' },
      { conflict_slug: 'second-world-war', name: 'Allies', description: 'Allied Powers' },
      { conflict_slug: 'second-world-war', name: 'Axis', description: 'Axis Powers' },
    ];

    for (const side of sides) {
      const conflict = conflictRecords.get(side.conflict_slug);
      if (!conflict) continue;

      const sideData: SideInsert = {
        conflict_id: conflict.id,
        name: side.name,
        description: side.description || null,
        color_code: null,
        flag_url: null,
      };

      const { error } = await supabase.from('sides').insert([sideData]);
      if (error) {
        console.error(`❌ Error seeding side ${side.name}:`, error);
      } else {
        console.log(`✅ Seeded side: ${side.name}`);
      }
    }

    // Seed Weapons (sample data)
    console.log('\n⚔️ Seeding weapons...');
    const weapons = [
      {
        conflict_slug: 'first-world-war',
        name: 'Lee-Enfield Rifle',
        type: 'Rifle',
        year_introduced: 1895,
        range_meters: 600,
        effectiveness_rating: 8,
      },
      {
        conflict_slug: 'first-world-war',
        name: 'Vickers Machine Gun',
        type: 'Machine Gun',
        year_introduced: 1912,
        range_meters: 1000,
        effectiveness_rating: 9,
      },
      {
        conflict_slug: 'second-world-war',
        name: 'Karabiner 98k',
        type: 'Rifle',
        year_introduced: 1898,
        range_meters: 800,
        effectiveness_rating: 8,
      },
    ];

    for (const weapon of weapons) {
      const conflict = conflictRecords.get(weapon.conflict_slug);
      if (!conflict) continue;

      const weaponData: WeaponInsert = {
        conflict_id: conflict.id,
        name: weapon.name,
        description: `${weapon.name} - Used in ${conflict.name}`,
        type: weapon.type || null,
        year_introduced: weapon.year_introduced || null,
        range_meters: weapon.range_meters || null,
        effectiveness_rating: weapon.effectiveness_rating || null,
        image_url: null,
      };

      const { error } = await supabase.from('weapons').insert([weaponData]);
      if (error) {
        console.error(`❌ Error seeding weapon ${weapon.name}:`, error);
      } else {
        console.log(`✅ Seeded weapon: ${weapon.name}`);
      }
    }

    // Seed Tactics (sample data)
    console.log('\n🎯 Seeding tactics...');
    const tactics = [
      {
        conflict_slug: 'first-world-war',
        name: 'Trench Warfare',
        type: 'Defensive',
        description: 'Defensive strategy using trenches',
      },
      {
        conflict_slug: 'first-world-war',
        name: 'Artillery Barrage',
        type: 'Offensive',
        description: 'Heavy artillery bombardment before assault',
      },
      {
        conflict_slug: 'second-world-war',
        name: 'Blitzkrieg',
        type: 'Offensive',
        description: 'Lightning war - rapid armor and air assault',
      },
    ];

    for (const tactic of tactics) {
      const conflict = conflictRecords.get(tactic.conflict_slug);
      if (!conflict) continue;

      const tacticData: TacticInsert = {
        conflict_id: conflict.id,
        name: tactic.name,
        description: tactic.description || null,
        type: tactic.type || null,
        advantage_against: null,
        disadvantage_against: null,
      };

      const { error } = await supabase.from('tactics').insert([tacticData]);
      if (error) {
        console.error(`❌ Error seeding tactic ${tactic.name}:`, error);
      } else {
        console.log(`✅ Seeded tactic: ${tactic.name}`);
      }
    }

    // Seed Strategies
    console.log('\n📋 Seeding strategies...');
    const strategies = [
      {
        conflict_slug: 'first-world-war',
        name: 'Attrition Warfare',
        type: 'Defensive',
        description: 'Wear down enemy through constant conflict',
        effectiveness_rating: 6,
      },
      {
        conflict_slug: 'second-world-war',
        name: 'Two-Front Strategy',
        type: 'Mixed',
        description: 'Fight on multiple fronts simultaneously',
        effectiveness_rating: 5,
      },
    ];

    for (const strategy of strategies) {
      const conflict = conflictRecords.get(strategy.conflict_slug);
      if (!conflict) continue;

      const strategyData: StrategyInsert = {
        conflict_id: conflict.id,
        name: strategy.name,
        description: strategy.description || null,
        type: strategy.type || null,
        effectiveness_rating: strategy.effectiveness_rating || null,
      };

      const { error } = await supabase.from('strategies').insert([strategyData]);
      if (error) {
        console.error(`❌ Error seeding strategy ${strategy.name}:`, error);
      } else {
        console.log(`✅ Seeded strategy: ${strategy.name}`);
      }
    }

    // Seed Battles
    console.log('\n⚔️ Seeding battles...');
    const battles = [
      {
        conflict_slug: 'first-world-war',
        name: 'Battle of the Somme',
        date_start: '1916-07-01',
        date_end: '1916-11-18',
        location: 'France',
        outcome: 'Pyrrhic British Victory',
        casualties: 1000000,
        significance: 'One of the largest battles in history',
      },
      {
        conflict_slug: 'first-world-war',
        name: 'Battle of Verdun',
        date_start: '1916-02-21',
        date_end: '1916-12-18',
        location: 'France',
        outcome: 'French Victory',
        casualties: 700000,
        significance: 'Longest battle of WWI',
      },
      {
        conflict_slug: 'second-world-war',
        name: 'Battle of Stalingrad',
        date_start: '1942-08-23',
        date_end: '1943-02-02',
        location: 'Soviet Union',
        outcome: 'Soviet Victory',
        casualties: 2000000,
        significance: 'Turning point of Eastern Front',
      },
    ];

    for (const battle of battles) {
      const conflict = conflictRecords.get(battle.conflict_slug);
      if (!conflict) continue;

      const battleData: BattleInsert = {
        conflict_id: conflict.id,
        theater_id: null,
        name: battle.name,
        description: battle.significance || null,
        date_start: battle.date_start,
        date_end: battle.date_end || null,
        location: battle.location || null,
        outcome: battle.outcome || null,
        estimated_casualties: battle.casualties || null,
        significance: battle.significance || null,
        image_url: null,
      };

      const { error } = await supabase.from('battles').insert([battleData]);
      if (error) {
        console.error(`❌ Error seeding battle ${battle.name}:`, error);
      } else {
        console.log(`✅ Seeded battle: ${battle.name}`);
      }
    }

    console.log('\n✨ Database seeding complete!');
    console.log('You can now use globalSearch() and analytics functions!');
  } catch (error) {
    console.error('💥 Fatal error during seeding:', error);
    process.exit(1);
  }
}

// Run the seed
seedDatabase();
