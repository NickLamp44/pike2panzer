// Generated types matching Supabase schema
export type Era = {
  id: string;
  slug: string;
  name: string;
  description: string | null;
  start_year: number | null;
  end_year: number | null;
  image_url: string | null;
  created_at: string;
};

export type Conflict = {
  id: string;
  era_id: string;
  slug: string;
  name: string;
  description: string | null;
  start_year: number | null;
  end_year: number | null;
  duration_years: number | null;
  image_url: string | null;
  created_at: string;
};

export type Theater = {
  id: string;
  conflict_id: string;
  slug: string;
  name: string;
  description: string | null;
  region: string | null;
  image_url: string | null;
  created_at: string;
};

export type Side = {
  id: string;
  conflict_id: string;
  name: string;
  description: string | null;
  flag_url: string | null;
  color_hex: string | null;
  created_at: string;
};

export type Commander = {
  id: string;
  name: string;
  title: string | null;
  description: string | null;
  image_url: string | null;
  birth_year: number | null;
  death_year: number | null;
  nationality: string | null;
  awards: string[] | null;
  created_at: string;
};

export type CommanderSide = {
  id: string;
  commander_id: string;
  side_id: string;
  rank: string | null;
  role: string | null;
  created_at: string;
};

export type Battle = {
  id: string;
  conflict_id: string;
  theater_id: string | null;
  name: string;
  description: string | null;
  date: string | null;
  start_year: number | null;
  end_year: number | null;
  location: string | null;
  outcome: string | null;
  significance_level: number | null;
  image_url: string | null;
  created_at: string;
};

export type Campaign = {
  id: string;
  conflict_id: string;
  name: string;
  description: string | null;
  start_date: string | null;
  end_date: string | null;
  objective: string | null;
  outcome: string | null;
  created_at: string;
};

export type Strategy = {
  id: string;
  conflict_id: string;
  name: string;
  description: string | null;
  commander_id: string | null;
  side_id: string | null;
  effectiveness: number | null;
  created_at: string;
};

export type Tactic = {
  id: string;
  strategy_id: string;
  name: string;
  description: string | null;
  type: string | null;
  created_at: string;
};

export type Weapon = {
  id: string;
  conflict_id: string;
  name: string;
  description: string | null;
  weapon_type: string | null;
  technology_level: number | null;
  effectiveness: number | null;
  year_introduced: number | null;
  image_url: string | null;
  created_at: string;
};

export type BattleWeapon = {
  id: string;
  battle_id: string;
  weapon_id: string;
  created_at: string;
};

export type BattleCommander = {
  id: string;
  battle_id: string;
  commander_id: string;
  side_id: string;
  role: string | null;
  created_at: string;
};

// Joined/enriched types for common queries
export type BattleWithRelations = Battle & {
  conflict?: Conflict;
  theater?: Theater;
  commanders?: (Commander & { side?: Side })[];
  weapons?: Weapon[];
};

export type CommanderWithRelations = Commander & {
  sides?: (Side & { conflict?: Conflict })[];
  battles?: Battle[];
};

export type ConflictWithRelations = Conflict & {
  era?: Era;
  sides?: Side[];
  battles?: Battle[];
  commanders?: Commander[];
  theaters?: Theater[];
};

export type SearchResult = {
  type: 'commander' | 'battle' | 'conflict' | 'weapon' | 'strategy' | 'tactic';
  id: string;
  name: string;
  description: string | null;
  context: string; // e.g., "WW2 > Eastern Front"
  image_url: string | null;
};
