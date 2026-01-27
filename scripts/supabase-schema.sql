/**
 * Supabase Schema Design for Pike2Panzer
 * 
 * This normalized schema captures the hierarchical military history data
 * while enabling efficient searching, filtering, and cross-conflict analysis.
 */

-- ============================================
-- CORE HIERARCHICAL TABLES
-- ============================================

-- ERAS: Top-level historical periods (Late Medieval, Revolutionary-Imperial, etc.)
CREATE TABLE eras (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug VARCHAR(100) UNIQUE NOT NULL,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  start_year INT,
  end_year INT,
  icon VARCHAR(100),
  image_url VARCHAR(500),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- CONFLICTS: Major conflicts/wars within an era (Napoleonic Wars, WWI, etc.)
CREATE TABLE conflicts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  era_id UUID NOT NULL REFERENCES eras(id) ON DELETE CASCADE,
  slug VARCHAR(100) UNIQUE NOT NULL,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  start_year INT,
  end_year INT,
  image_url VARCHAR(500),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- THEATERS: Geographic/campaign areas within a conflict (Western Front, Pacific Theater, etc.)
CREATE TABLE theaters (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  conflict_id UUID NOT NULL REFERENCES conflicts(id) ON DELETE CASCADE,
  slug VARCHAR(100) NOT NULL,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  location VARCHAR(255),
  image_url VARCHAR(500),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- ============================================
-- MILITARY ENTITIES
-- ============================================

-- SIDES: Factions/Nations in a conflict
CREATE TABLE sides (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  conflict_id UUID NOT NULL REFERENCES conflicts(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  color_code VARCHAR(7),
  flag_url VARCHAR(500),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- COMMANDERS: Military leaders
CREATE TABLE commanders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  conflict_id UUID NOT NULL REFERENCES conflicts(id) ON DELETE CASCADE,
  side_id UUID NOT NULL REFERENCES sides(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  title VARCHAR(255),
  description TEXT,
  born_year INT,
  died_year INT,
  image_url VARCHAR(500),
  achievements TEXT[],
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- BATTLES: Major engagements
CREATE TABLE battles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  conflict_id UUID NOT NULL REFERENCES conflicts(id) ON DELETE CASCADE,
  theater_id UUID REFERENCES theaters(id) ON DELETE SET NULL,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  date_start DATE NOT NULL,
  date_end DATE,
  location VARCHAR(255),
  outcome VARCHAR(100),
  estimated_casualties INT,
  significance TEXT,
  image_url VARCHAR(500),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- CAMPAIGNS: Multi-battle operations
CREATE TABLE campaigns (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  conflict_id UUID NOT NULL REFERENCES conflicts(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  date_start DATE,
  date_end DATE,
  commander_id UUID REFERENCES commanders(id) ON DELETE SET NULL,
  objectives TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- ============================================
-- MILITARY CONCEPTS & EQUIPMENT
-- ============================================

-- STRATEGIES: Overall military approaches
CREATE TABLE strategies (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  conflict_id UUID NOT NULL REFERENCES conflicts(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  type VARCHAR(100),
  effectiveness_rating INT CHECK (effectiveness_rating BETWEEN 1 AND 10),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- TACTICS: Specific battle techniques
CREATE TABLE tactics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  conflict_id UUID NOT NULL REFERENCES conflicts(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  type VARCHAR(100),
  advantage_against TEXT,
  disadvantage_against TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- WEAPONS: Military equipment and weapons
CREATE TABLE weapons (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  conflict_id UUID NOT NULL REFERENCES conflicts(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  type VARCHAR(100),
  year_introduced INT,
  range_meters INT,
  effectiveness_rating INT CHECK (effectiveness_rating BETWEEN 1 AND 10),
  image_url VARCHAR(500),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- ============================================
-- MANY-TO-MANY RELATIONSHIPS
-- ============================================

-- Connect battles to commanders who participated
CREATE TABLE battle_commanders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  battle_id UUID NOT NULL REFERENCES battles(id) ON DELETE CASCADE,
  commander_id UUID NOT NULL REFERENCES commanders(id) ON DELETE CASCADE,
  role VARCHAR(100),
  created_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(battle_id, commander_id)
);

-- Connect battles to campaigns they're part of
CREATE TABLE campaign_battles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  campaign_id UUID NOT NULL REFERENCES campaigns(id) ON DELETE CASCADE,
  battle_id UUID NOT NULL REFERENCES battles(id) ON DELETE CASCADE,
  sequence_order INT,
  created_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(campaign_id, battle_id)
);

-- Connect tactics to battles where they were used
CREATE TABLE battle_tactics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  battle_id UUID NOT NULL REFERENCES battles(id) ON DELETE CASCADE,
  tactic_id UUID NOT NULL REFERENCES tactics(id) ON DELETE CASCADE,
  side_id UUID NOT NULL REFERENCES sides(id) ON DELETE CASCADE,
  created_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(battle_id, tactic_id, side_id)
);

-- Connect weapons to battles where they were used
CREATE TABLE battle_weapons (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  battle_id UUID NOT NULL REFERENCES battles(id) ON DELETE CASCADE,
  weapon_id UUID NOT NULL REFERENCES weapons(id) ON DELETE CASCADE,
  side_id UUID NOT NULL REFERENCES sides(id) ON DELETE CASCADE,
  created_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(battle_id, weapon_id, side_id)
);

-- Connect commanders to weapons they used
CREATE TABLE commander_weapons (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  commander_id UUID NOT NULL REFERENCES commanders(id) ON DELETE CASCADE,
  weapon_id UUID NOT NULL REFERENCES weapons(id) ON DELETE CASCADE,
  created_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(commander_id, weapon_id)
);

-- ============================================
-- INDEXES FOR QUERY PERFORMANCE
-- ============================================

CREATE INDEX idx_conflicts_era_id ON conflicts(era_id);
CREATE INDEX idx_theaters_conflict_id ON theaters(conflict_id);
CREATE INDEX idx_sides_conflict_id ON sides(conflict_id);
CREATE INDEX idx_commanders_conflict_id ON commanders(conflict_id);
CREATE INDEX idx_commanders_side_id ON commanders(side_id);
CREATE INDEX idx_battles_conflict_id ON battles(conflict_id);
CREATE INDEX idx_battles_theater_id ON battles(theater_id);
CREATE INDEX idx_campaigns_conflict_id ON campaigns(conflict_id);
CREATE INDEX idx_strategies_conflict_id ON strategies(conflict_id);
CREATE INDEX idx_tactics_conflict_id ON tactics(conflict_id);
CREATE INDEX idx_weapons_conflict_id ON weapons(conflict_id);
CREATE INDEX idx_battle_commanders_battle_id ON battle_commanders(battle_id);
CREATE INDEX idx_battle_commanders_commander_id ON battle_commanders(commander_id);
CREATE INDEX idx_battle_tactics_battle_id ON battle_tactics(battle_id);
CREATE INDEX idx_battle_weapons_battle_id ON battle_weapons(battle_id);

-- ============================================
-- FULL-TEXT SEARCH INDEX
-- ============================================

-- Create search index for commanders
CREATE INDEX idx_commanders_search ON commanders USING GIN(
  to_tsvector('english', name || ' ' || COALESCE(title, '') || ' ' || COALESCE(description, ''))
);

-- Create search index for battles
CREATE INDEX idx_battles_search ON battles USING GIN(
  to_tsvector('english', name || ' ' || COALESCE(description, '') || ' ' || COALESCE(location, ''))
);

-- Create search index for weapons
CREATE INDEX idx_weapons_search ON weapons USING GIN(
  to_tsvector('english', name || ' ' || COALESCE(description, ''))
);

-- Create search index for strategies
CREATE INDEX idx_strategies_search ON strategies USING GIN(
  to_tsvector('english', name || ' ' || COALESCE(description, ''))
);
