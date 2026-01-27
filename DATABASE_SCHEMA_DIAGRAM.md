# Database Schema Diagram

## Table Relationships

```
┌─────────────────────────────────────────────────────────────────┐
│                          ERAS                                   │
│  (Late Medieval, Revolutionary-Imperial, Rise of Gunpowder...)  │
│  id, slug, name, start_year, end_year, image_url              │
└────────────────────────┬────────────────────────────────────────┘
                         │ 1 era : many conflicts
                         ↓
┌──────────────────────────────────────┐
│         CONFLICTS                    │
│  (WWI, WWII, Napoleonic Wars...)    │
│  id, era_id, slug, name, years      │
└──────────────┬──────────────┬────────┘
               │              │
    1 conflict: many theaters │ 1 conflict: many entities
               ↓              │
    ┌──────────────────┐      │
    │    THEATERS      │      │
    │  (Western Front, │      │
    │   Pacific...)    │      │
    │  id, name, loc   │      │
    └──────────────────┘      │
                              ├─ COMMANDERS ─┐
                              │  (side_id)   │
                              │              │
    ┌─────────────────────────┴──────────┐   │
    │                                    │   │
    ↓                                    ↓   ↓
┌──────────────┐  ┌────────────────┐  ┌──────────┐
│   BATTLES    │  │     SIDES      │  │ COMMANDS │
│ (theater_id)│  │ (factions/nat) │  │ ERS      │
│ date_start  │  │ color_code     │  │ (side_id)│
│ outcome     │  │ flag_url       │  └──────────┘
│ casualties  │  └────────────────┘
└──┬───────────┘
   │
   ├─ 1:many ─→ BATTLE_COMMANDERS ←─ many:many ─→ COMMANDERS
   │            (who fought here)
   │
   ├─ 1:many ─→ BATTLE_TACTICS ←─ many:many ─→ TACTICS
   │            (how they fought)
   │
   ├─ 1:many ─→ BATTLE_WEAPONS ←─ many:many ─→ WEAPONS
   │            (what they used)
   │
   └─ many:1 ─→ CAMPAIGN ─ 1:many ─→ CAMPAIGN_BATTLES
                (military operation)
```

## Query Flow Examples

### Example 1: Get a Battle with All Context
```
Battle ID
  ├ Get battle row
  ├ Join theaters (via theater_id)
  ├ Join conflicts (via conflict_id)
  ├ Join eras (via conflict.era_id)
  ├ Get battle_commanders (junction)
  │   └ Join commanders (via commander_id)
  │       └ Join sides (via side_id)
  ├ Get battle_tactics (junction)
  │   └ Join tactics (via tactic_id)
  └ Get battle_weapons (junction)
      └ Join weapons (via weapon_id)
```

### Example 2: Find All Battles a Commander Participated In
```
Commander ID
  ├ Find all battle_commanders rows
  │ (WHERE commander_id = ?)
  ├ Get all battle_ids
  └ Fetch all battles with full context
```

### Example 3: Compare Two Conflicts
```
Conflict A ID          Conflict B ID
  │                      │
  ├─ Count battles       ├─ Count battles
  ├─ Count commanders    ├─ Count commanders
  ├─ Sum casualties      ├─ Sum casualties
  ├─ List weapons        ├─ List weapons
  ├─ List tactics        ├─ List tactics
  └─ Timeline dates      └─ Timeline dates
```

## Indexes for Performance

```
Search Performance:
├─ Full-text search on commanders (name + title + description)
├─ Full-text search on battles (name + description + location)
├─ Full-text search on weapons (name + description)
└─ Foreign key indexes on all relationships

Query Speed Optimization:
├─ idx_conflicts_era_id
├─ idx_battles_conflict_id
├─ idx_commanders_conflict_id
├─ idx_battle_commanders_commander_id
└─ ... (one for each major relationship)
```

## Data Flow: User Search → Results

```
User types "Napoleon" in search box
                │
                ↓
        globalSearch("Napoleon")
                │
    ┌───────────┼───────────┬───────────┬───────────┐
    ↓           ↓           ↓           ↓           ↓
SEARCH:    COMMANDERS   BATTLES     WEAPONS     TACTICS
 WHERE     (using       (using      (using      (using
 .ilike    full-text)   full-text)  full-text)  full-text)
 
    ↓           ↓           ↓           ↓           ↓
  FILTER  Return 5 max, include conflict/era context
  
    ↓
  COMBINE results from all tables
  
    ↓
  SearchResult[] with:
  - id, type, name, description
  - context: { conflictName, eraName }
  - imageUrl
  
    ↓
  Return to UI (via API route)
  
    ↓
  Display as card/list items with context
```

## Foreign Key Relationships (Constraints)

```
All these relationships are enforced by database constraints:

ERAS ──1─────────∞── CONFLICTS
                      ├─ 1 ─────────∞ THEATERS
                      ├─ 1 ─────────∞ BATTLES
                      ├─ 1 ─────────∞ SIDES
                      ├─ 1 ─────────∞ COMMANDERS
                      ├─ 1 ─────────∞ CAMPAIGNS
                      ├─ 1 ─────────∞ STRATEGIES
                      ├─ 1 ─────────∞ TACTICS
                      └─ 1 ─────────∞ WEAPONS

SIDES ──1──────────∞── COMMANDERS (commander must belong to a side)
COMMANDERS (many) ←──────→ (many) BATTLES (via battle_commanders)
BATTLES (many) ←─────────→ (many) TACTICS (via battle_tactics)
BATTLES (many) ←─────────→ (many) WEAPONS (via battle_weapons)
CAMPAIGNS (many) ←───────→ (many) BATTLES (via campaign_battles)
```

## Cascade Rules

When you delete...

```
DELETE Era → Deletes all its CONFLICTS
           → Which deletes all their BATTLES
           → Which deletes all BATTLE_COMMANDERS entries
           → Which deletes references to COMMANDERS
           (but COMMANDERS still exist if in other conflicts)

DELETE Conflict → Deletes all relationships within
DELETE Battle → Deletes all junction table entries
DELETE Commander → Deletes BATTLE_COMMANDERS entries
                 (but battles remain)
```

This design ensures **referential integrity** - you can't have orphaned data.

## Key Takeaways

1. **Everything relates to CONFLICT** - that's your central concept
2. **Junction tables** handle many-to-many relationships cleanly
3. **Foreign keys** enforce data integrity
4. **Indexes** make searches fast
5. **Hierarchical flow** - Era → Conflict → Battles/Entities
6. **Flexible querying** - Can navigate relationships in any direction

This is a professional, scalable data model suitable for production systems!
