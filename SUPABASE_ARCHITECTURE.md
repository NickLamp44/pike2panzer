# Supabase Data Organization Strategy

## Overview

Your data has been reorganized into a **normalized relational schema** designed for efficient querying, searching, and cross-conflict analysis while maintaining your hierarchical structure.

## Data Architecture

### Hierarchy Flow

```
ERA
 ├── CONFLICT
 │    ├── THEATER (optional geographic subdivision)
 │    ├── SIDE (factions/nations)
 │    │    ├── COMMANDER
 │    │    └── [connects to] BATTLE
 │    ├── BATTLE
 │    │    ├── [WHEN] date_start, date_end
 │    │    ├── [WHERE] location, theater
 │    │    ├── [WHO] battle_commanders (via junction)
 │    │    ├── [HOW] battle_tactics (via junction)
 │    │    └── [WITH] battle_weapons (via junction)
 │    ├── CAMPAIGN (multi-battle operation)
 │    │    ├── commander_id (led by)
 │    │    └── campaign_battles (via junction)
 │    ├── STRATEGY (overall approach)
 │    ├── TACTIC (specific technique)
 │    └── WEAPON (equipment/technology)
```

## Key Design Decisions

### 1. **Normalized Tables** (Not Nested JSON)
- ✅ Better query performance
- ✅ Easier to search across entities
- ✅ Relationships are explicit via foreign keys
- ✅ Scales efficiently

### 2. **Junction Tables for Many-to-Many**
```
battle_commanders  → links battles with commanders who participated
battle_tactics     → links battles with tactics used
battle_weapons     → links battles with weapons used
campaign_battles   → links campaigns with their component battles
```

### 3. **Hierarchical IDs via Foreign Keys**
```
Conflict.era_id        → belongs to ERA
Battle.conflict_id     → belongs to CONFLICT
Battle.theater_id      → belongs to THEATER (optional)
Commander.conflict_id  → belongs to CONFLICT
Commander.side_id      → belongs to SIDE
```

### 4. **Full-Text Search Indexes**
Pre-built on:
- `commanders.name + title + description`
- `battles.name + description + location`
- `weapons.name + description`
- `strategies.name + description`

Enables fast global search across all entities.

## Query Patterns

### Pattern 1: Get All Data for One Conflict
```typescript
// Get everything about WWI
const { data } = await supabase
  .from('battles')
  .select(`
    *,
    battle_commanders(commanders(*)),
    battle_tactics(tactics(*)),
    battle_weapons(weapons(*))
  `)
  .eq('conflict_id', wwiConflictId);
```

### Pattern 2: Global Search
```typescript
// Search across all entity types
const results = await globalSearch('Napoleon');
// Returns commanders, battles, weapons, tactics from all conflicts
```

### Pattern 3: Timeline View
```typescript
// Get all battles chronologically across eras
const battles = await getTimelineData();
// Returns ordered by date_start with era context
```

### Pattern 4: Network/Relationships
```typescript
// Show how commanders, battles, tactics, weapons are connected
const { nodes, edges } = await getNetworkData(conflictId);
// Visualize as graph/network diagram
```

## File Organization

```
lib/supabase/
├── client.ts                  # Client init + TypeScript types
├── queries/
│   ├── search.ts             # globalSearch(), advancedSearch()
│   └── analytics.ts          # Statistics, timeline, network data
└── README.md

scripts/
├── supabase-schema.sql       # Run once to create tables
└── seed-data.ts              # Populate from existing TypeScript data

app/api/
├── search/route.ts           # GET /api/search?q=...
└── analytics/route.ts        # GET /api/analytics/[conflict]

SUPABASE_SETUP.md             # Step-by-step setup guide
```

## Benefits for Your Portfolio

### Shows You Understand:
- **Database Design** - Normalized schema, proper relationships
- **Query Optimization** - Indexes on frequently searched fields
- **API Development** - RESTful endpoints consuming database
- **TypeScript** - Fully typed queries and responses
- **Scalability** - Can handle 500-5000+ entries efficiently
- **Best Practices** - Foreign keys, constraints, full-text search

### Demonstrates:
- Ability to think through complex data relationships
- Knowledge of SQL and database design patterns
- Proficiency with modern backend (Supabase/PostgreSQL)
- API architecture and design
- Cross-entity querying and aggregation

## Next Steps

1. **Follow SUPABASE_SETUP.md** to create project and load schema
2. **Run seed script** to populate with your existing data
3. **Build API routes** in `app/api/` using query functions
4. **Create components** that consume the APIs
5. **Implement visualizations** (timeline, network, stats)

You now have:
- ✅ Clean, normalized schema
- ✅ Query functions for common operations
- ✅ Full-text search capability
- ✅ Relationship tracking
- ✅ Analytics ready to implement

This architecture is production-ready and shows serious backend thinking!
