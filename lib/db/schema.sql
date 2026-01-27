-- Eras Table
CREATE TABLE eras (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  start_year INT,
  end_year INT,
  image_url TEXT,
  created_at TIMESTAMP DEFAULT now()
);

-- Conflicts Table
CREATE TABLE conflicts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  era_id UUID NOT NULL REFERENCES eras(id) ON DELETE CASCADE,
  slug TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  start_year INT,
  end_year INT,
  duration_years INT,
  image_url TEXT,
  created_at TIMESTAMP DEFAULT now()
);

-- Theaters Table
CREATE TABLE theaters (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  conflict_id UUID NOT NULL REFERENCES conflicts(id) ON DELETE CASCADE,
  slug TEXT NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  region TEXT,
  image_url TEXT,
  created_at TIMESTAMP DEFAULT now(),
  UNIQUE(conflict_id, slug)
);

-- Sides/Factions Table
CREATE TABLE sides (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  conflict_id UUID NOT NULL REFERENCES conflicts(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT,
  flag_url TEXT,
  color_hex TEXT,
  created_at TIMESTAMP DEFAULT now(),
  UNIQUE(conflict_id, name)
);

-- Commanders Table
CREATE TABLE commanders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  title TEXT,
  description TEXT,
  image_url TEXT,
  birth_year INT,
  death_year INT,
  nationality TEXT,
  awards TEXT[], -- array of award names
  created_at TIMESTAMP DEFAULT now()
);

-- Commander-Side Junction Table (many-to-many)
CREATE TABLE commander_sides (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  commander_id UUID NOT NULL REFERENCES commanders(id) ON DELETE CASCADE,
  side_id UUID NOT NULL REFERENCES sides(id) ON DELETE CASCADE,
  rank TEXT,
  role TEXT,
  created_at TIMESTAMP DEFAULT now(),
  UNIQUE(commander_id, side_id)
);

-- Battles Table
CREATE TABLE battles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  conflict_id UUID NOT NULL REFERENCES conflicts(id) ON DELETE CASCADE,
  theater_id UUID REFERENCES theaters(id) ON DELETE SET NULL,
  name TEXT NOT NULL,
  description TEXT,
  date DATE,
  start_year INT,
  end_year INT,
  location TEXT,
  outcome TEXT,
  significance_level INT, -- 1-5 scale
  image_url TEXT,
  created_at TIMESTAMP DEFAULT now()
);

-- Campaigns Table
CREATE TABLE campaigns (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  conflict_id UUID NOT NULL REFERENCES conflicts(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT,
  start_date DATE,
  end_date DATE,
  objective TEXT,
  outcome TEXT,
  created_at TIMESTAMP DEFAULT now()
);

-- Strategies Table
CREATE TABLE strategies (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  conflict_id UUID NOT NULL REFERENCES conflicts(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT,
  commander_id UUID REFERENCES commanders(id) ON DELETE SET NULL,
  side_id UUID REFERENCES sides(id) ON DELETE SET NULL,
  effectiveness INT, -- 1-5 scale
  created_at TIMESTAMP DEFAULT now()
);

-- Tactics Table
CREATE TABLE tactics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  strategy_id UUID NOT NULL REFERENCES strategies(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT,
  type TEXT, -- e.g., "offensive", "defensive", "mobility"
  created_at TIMESTAMP DEFAULT now()
);

-- Weapons Table
CREATE TABLE weapons (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  conflict_id UUID NOT NULL REFERENCES conflicts(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT,
  weapon_type TEXT, -- e.g., "rifle", "artillery", "aircraft"
  technology_level INT,
  effectiveness INT, -- 1-5 scale
  year_introduced INT,
  image_url TEXT,
  created_at TIMESTAMP DEFAULT now()
);

-- Battle-Weapon Junction (many-to-many)
CREATE TABLE battle_weapons (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  battle_id UUID NOT NULL REFERENCES battles(id) ON DELETE CASCADE,
  weapon_id UUID NOT NULL REFERENCES weapons(id) ON DELETE CASCADE,
  created_at TIMESTAMP DEFAULT now(),
  UNIQUE(battle_id, weapon_id)
);

-- Battle-Commander Junction (many-to-many)
CREATE TABLE battle_commanders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  battle_id UUID NOT NULL REFERENCES battles(id) ON DELETE CASCADE,
  commander_id UUID NOT NULL REFERENCES commanders(id) ON DELETE CASCADE,
  side_id UUID NOT NULL REFERENCES sides(id) ON DELETE CASCADE,
  role TEXT, -- e.g., "commanding officer", "subordinate"
  created_at TIMESTAMP DEFAULT now(),
  UNIQUE(battle_id, commander_id)
);

-- Create indexes for better query performance
CREATE INDEX idx_conflicts_era_id ON conflicts(era_id);
CREATE INDEX idx_theaters_conflict_id ON theaters(conflict_id);
CREATE INDEX idx_sides_conflict_id ON sides(conflict_id);
CREATE INDEX idx_battles_conflict_id ON battles(conflict_id);
CREATE INDEX idx_battles_theater_id ON battles(theater_id);
CREATE INDEX idx_campaigns_conflict_id ON campaigns(conflict_id);
CREATE INDEX idx_strategies_conflict_id ON strategies(conflict_id);
CREATE INDEX idx_tactics_strategy_id ON tactics(strategy_id);
CREATE INDEX idx_weapons_conflict_id ON weapons(conflict_id);
CREATE INDEX idx_commander_sides_commander_id ON commander_sides(commander_id);
CREATE INDEX idx_battle_weapons_battle_id ON battle_weapons(battle_id);
CREATE INDEX idx_battle_commanders_battle_id ON battle_commanders(battle_id);
