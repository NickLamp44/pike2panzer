'use client';

import { createBrowserClient } from '@supabase/ssr';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createBrowserClient(supabaseUrl, supabaseAnonKey);

// Export types for use throughout the app
export type Database = {
  public: {
    Tables: {
      eras: {
        Row: Era;
        Insert: EraInsert;
        Update: EraUpdate;
      };
      conflicts: {
        Row: Conflict;
        Insert: ConflictInsert;
        Update: ConflictUpdate;
      };
      commanders: {
        Row: Commander;
        Insert: CommanderInsert;
        Update: CommanderUpdate;
      };
      battles: {
        Row: Battle;
        Insert: BattleInsert;
        Update: BattleUpdate;
      };
      weapons: {
        Row: Weapon;
        Insert: WeaponInsert;
        Update: WeaponUpdate;
      };
      tactics: {
        Row: Tactic;
        Insert: TacticInsert;
        Update: TacticUpdate;
      };
      strategies: {
        Row: Strategy;
        Insert: StrategyInsert;
        Update: StrategyUpdate;
      };
      sides: {
        Row: Side;
        Insert: SideInsert;
        Update: SideUpdate;
      };
      campaigns: {
        Row: Campaign;
        Insert: CampaignInsert;
        Update: CampaignUpdate;
      };
      theaters: {
        Row: Theater;
        Insert: TheaterInsert;
        Update: TheaterUpdate;
      };
    };
  };
};

// Base entity types
export interface Era {
  id: string;
  slug: string;
  name: string;
  description: string | null;
  start_year: number | null;
  end_year: number | null;
  icon: string | null;
  image_url: string | null;
  created_at: string;
  updated_at: string;
}

export interface EraInsert extends Omit<Era, 'id' | 'created_at' | 'updated_at'> {}
export interface EraUpdate extends Partial<Omit<Era, 'id' | 'created_at' | 'updated_at'>> {}

export interface Conflict {
  id: string;
  era_id: string;
  slug: string;
  name: string;
  description: string | null;
  start_year: number | null;
  end_year: number | null;
  image_url: string | null;
  created_at: string;
  updated_at: string;
}

export interface ConflictInsert extends Omit<Conflict, 'id' | 'created_at' | 'updated_at'> {}
export interface ConflictUpdate extends Partial<Omit<Conflict, 'id' | 'created_at' | 'updated_at'>> {}

export interface Theater {
  id: string;
  conflict_id: string;
  slug: string;
  name: string;
  description: string | null;
  location: string | null;
  image_url: string | null;
  created_at: string;
  updated_at: string;
}

export interface TheaterInsert extends Omit<Theater, 'id' | 'created_at' | 'updated_at'> {}
export interface TheaterUpdate extends Partial<Omit<Theater, 'id' | 'created_at' | 'updated_at'>> {}

export interface Side {
  id: string;
  conflict_id: string;
  name: string;
  description: string | null;
  color_code: string | null;
  flag_url: string | null;
  created_at: string;
  updated_at: string;
}

export interface SideInsert extends Omit<Side, 'id' | 'created_at' | 'updated_at'> {}
export interface SideUpdate extends Partial<Omit<Side, 'id' | 'created_at' | 'updated_at'>> {}

export interface Commander {
  id: string;
  conflict_id: string;
  side_id: string;
  name: string;
  title: string | null;
  description: string | null;
  born_year: number | null;
  died_year: number | null;
  image_url: string | null;
  achievements: string[] | null;
  created_at: string;
  updated_at: string;
}

export interface CommanderInsert extends Omit<Commander, 'id' | 'created_at' | 'updated_at'> {}
export interface CommanderUpdate extends Partial<Omit<Commander, 'id' | 'created_at' | 'updated_at'>> {}

export interface Battle {
  id: string;
  conflict_id: string;
  theater_id: string | null;
  name: string;
  description: string | null;
  date_start: string;
  date_end: string | null;
  location: string | null;
  outcome: string | null;
  estimated_casualties: number | null;
  significance: string | null;
  image_url: string | null;
  created_at: string;
  updated_at: string;
}

export interface BattleInsert extends Omit<Battle, 'id' | 'created_at' | 'updated_at'> {}
export interface BattleUpdate extends Partial<Omit<Battle, 'id' | 'created_at' | 'updated_at'>> {}

export interface Campaign {
  id: string;
  conflict_id: string;
  name: string;
  description: string | null;
  date_start: string | null;
  date_end: string | null;
  commander_id: string | null;
  objectives: string | null;
  created_at: string;
  updated_at: string;
}

export interface CampaignInsert extends Omit<Campaign, 'id' | 'created_at' | 'updated_at'> {}
export interface CampaignUpdate extends Partial<Omit<Campaign, 'id' | 'created_at' | 'updated_at'>> {}

export interface Strategy {
  id: string;
  conflict_id: string;
  name: string;
  description: string | null;
  type: string | null;
  effectiveness_rating: number | null;
  created_at: string;
  updated_at: string;
}

export interface StrategyInsert extends Omit<Strategy, 'id' | 'created_at' | 'updated_at'> {}
export interface StrategyUpdate extends Partial<Omit<Strategy, 'id' | 'created_at' | 'updated_at'>> {}

export interface Tactic {
  id: string;
  conflict_id: string;
  name: string;
  description: string | null;
  type: string | null;
  advantage_against: string | null;
  disadvantage_against: string | null;
  created_at: string;
  updated_at: string;
}

export interface TacticInsert extends Omit<Tactic, 'id' | 'created_at' | 'updated_at'> {}
export interface TacticUpdate extends Partial<Omit<Tactic, 'id' | 'created_at' | 'updated_at'>> {}

export interface Weapon {
  id: string;
  conflict_id: string;
  name: string;
  description: string | null;
  type: string | null;
  year_introduced: number | null;
  range_meters: number | null;
  effectiveness_rating: number | null;
  image_url: string | null;
  created_at: string;
  updated_at: string;
}

export interface WeaponInsert extends Omit<Weapon, 'id' | 'created_at' | 'updated_at'> {}
export interface WeaponUpdate extends Partial<Omit<Weapon, 'id' | 'created_at' | 'updated_at'>> {}
