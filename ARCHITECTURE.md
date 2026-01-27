# Architecture Diagram: Pike2Panzer with Supabase

## Data Flow

```
┌─────────────────────────────────────────────────────────────┐
│                     FRONTEND LAYER                          │
│  ┌──────────────────────────────────────────────────────┐   │
│  │  React Components (app/search, app/analytics, etc)  │   │
│  │  - Display UI                                       │   │
│  │  - Handle user interactions                         │   │
│  │  - Use SWR for data fetching                        │   │
│  └──────────┬───────────────────────────────────────────┘   │
└─────────────┼─────────────────────────────────────────────────┘
              │ HTTP Requests (JSON)
              ▼
┌─────────────────────────────────────────────────────────────┐
│                     API ROUTE LAYER                         │
│  ┌──────────────────────────────────────────────────────┐   │
│  │  Next.js API Routes (app/api/*)                     │   │
│  │  - /api/search      → POST search query             │   │
│  │  - /api/analytics   → GET conflict stats            │   │
│  │  - /api/conflicts   → GET conflict data             │   │
│  │  - /api/battles     → GET battle data               │   │
│  │  - /api/commanders  → GET commander data            │   │
│  └──────────┬───────────────────────────────────────────┘   │
└─────────────┼─────────────────────────────────────────────────┘
              │ Function Calls
              ▼
┌─────────────────────────────────────────────────────────────┐
│                   SERVICE LAYER                            │
│  ┌──────────────────────────────────────────────────────┐   │
│  │  Business Logic & Data Transformation (lib/api/*)   │   │
│  │  - analytics.ts    → Calculate statistics           │   │
│  │  - search.ts       → Format search results          │   │
│  │  - timeline.ts     → Generate timeline data         │   │
│  │  - commanders.ts   → Enrich commander data          │   │
│  └──────────┬───────────────────────────────────────────┘   │
└─────────────┼─────────────────────────────────────────────────┘
              │ Function Calls
              ▼
┌─────────────────────────────────────────────────────────────┐
│                   QUERY LAYER                              │
│  ┌──────────────────────────────────────────────────────┐   │
│  │  Database Queries (lib/db/queries/*)                │   │
│  │  - conflicts.ts    → getConflictById()              │   │
│  │  - battles.ts      → getBattlesByConflict()         │   │
│  │  - commanders.ts   → getCommandersByBattle()        │   │
│  │  - weapons.ts      → getWeaponsByConflict()         │   │
│  │  - search.ts       → searchAllContent()             │   │
│  └──────────┬───────────────────────────────────────────┘   │
└─────────────┼─────────────────────────────────────────────────┘
              │ Supabase Client (RLS, Auth)
              ▼
┌─────────────────────────────────────────────────────────────┐
│                   DATABASE LAYER                           │
│                    (SUPABASE)                              │
│  ┌──────────────────────────────────────────────────────┐   │
│  │  Tables (Normalized/Relational)                     │   │
│  │  ┌────────────────────────────────────────────────┐  │   │
│  │  │ eras → conflicts → theaters → battles         │  │   │
│  │  │                  → campaigns                  │  │   │
│  │  │                  → strategies → tactics       │  │   │
│  │  │                  → sides                      │  │   │
│  │  │ commanders (many-to-many with sides/battles)  │  │   │
│  │  │ weapons (many-to-many with battles)           │  │   │
│  │  └────────────────────────────────────────────────┘  │   │
│  └──────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
```

## Query Flow Example: Search for "Napoleon"

```
1. User Types "Napoleon" in Search Box
   ↓
2. Frontend Component (app/search/page.tsx)
   - Captures search input
   - Calls: fetch('/api/search', { query: 'Napoleon' })
   ↓
3. API Route (app/api/search/route.ts)
   - Validates query
   - Calls: searchService.globalSearch('Napoleon')
   ↓
4. Service Layer (lib/api/search.ts)
   - Calls multiple query functions:
     • searchCommanders('Napoleon')
     • searchBattles('Napoleon')
     • searchWeapons('Napoleon')
   - Aggregates and formats results
   ↓
5. Query Layer (lib/db/queries/*.ts)
   - executeQueries in parallel:
     • SELECT * FROM commanders WHERE name ILIKE '%Napoleon%'
     • SELECT * FROM battles WHERE name ILIKE '%Napoleon%'
     • SELECT * FROM weapons WHERE name ILIKE '%Napoleon%'
   ↓
6. Supabase (PostgreSQL)
   - Executes SQL queries
   - Returns results with joins
   ↓
7. Data Returns Back Up Stack
   - Service formats as SearchResult[]
   - API returns JSON
   - Frontend displays results
```

## Normalized Database Relationships

```
                    eras
                     |
                 (1:many)
                     |
                 conflicts
                  /  |  \
         (1:many)/   |   \(1:many)
               /     |     \
          theaters  sides  campaigns
             |       |
          (1:m)   (1:m)
             |       |
          battles    |
             |       |
      (many:many via |
      battle_commanders
      & commander_sides)
             |       |
        commanders   weapons
             |
          (many:many via
          battle_weapons)

Key Benefits:
- No data duplication
- Single source of truth
- Complex queries easy
- Indices for speed
- Maintains referential integrity
```

## Performance Optimization

```
Indexes Created:
- idx_conflicts_era_id
- idx_theaters_conflict_id
- idx_battles_conflict_id
- idx_commanders_by_nationality
- idx_weapons_conflict_id

Query Optimization Strategies:
- Preload related data with select() joins
- Use WHERE clauses on indexed columns
- Limit result sets when possible
- Cache frequently accessed data with SWR
```

## Portfolio Skills Demonstrated

This architecture showcases:
- ✅ Database Design (Normalized schema with foreign keys)
- ✅ SQL Knowledge (Complex queries with joins)
- ✅ API Design (RESTful endpoints with proper structure)
- ✅ Backend Logic (Service layer for business logic)
- ✅ Frontend Integration (React with SWR/fetch)
- ✅ Performance (Indexes, query optimization)
- ✅ Type Safety (Full TypeScript with generated types)
- ✅ Separation of Concerns (Clean layer architecture)
