# Quick Reference: Supabase Data Organization

## What Was Built

You now have a complete Supabase data architecture with:

### Files Created:

1. **`/scripts/supabase-schema.sql`** - Database schema (run once in Supabase)
2. **`/lib/supabase/client.ts`** - Client initialization + TypeScript types
3. **`/lib/supabase/queries/search.ts`** - Global search functions
4. **`/lib/supabase/queries/analytics.ts`** - Statistics and analytics functions
5. **`/SUPABASE_SETUP.md`** - Step-by-step setup instructions
6. **`/SUPABASE_ARCHITECTURE.md`** - Architecture and design decisions
7. **`/lib/supabase/README.md`** - Folder organization guide

### Database Schema Includes:

**Core Tables:**
- `eras` - Historical periods
- `conflicts` - Major wars/conflicts
- `theaters` - Geographic subdivisions
- `sides` - Nations/factions
- `commanders` - Military leaders
- `battles` - Major engagements
- `campaigns` - Multi-battle operations

**Concept Tables:**
- `strategies` - Overall approaches
- `tactics` - Battle techniques
- `weapons` - Military equipment

**Junction Tables** (many-to-many relationships):
- `battle_commanders` - Who fought in which battles
- `battle_tactics` - Which tactics were used in battles
- `battle_weapons` - Which weapons were used in battles
- `campaign_battles` - Which battles compose campaigns

### Query Functions Ready to Use:

```typescript
// Search
globalSearch(query)              // Find anything across all types
advancedSearch(query, filters)   // Search with era/conflict filtering

// Retrieve
getConflictCommanders(conflictId)
getConflictBattles(conflictId)
getBattleDetails(battleId)
getConflictWeapons(conflictId)
getConflictTactics(conflictId)

// Analytics
getGlobalStatistics()
getEraStatistics(eraId)
getConflictStatistics(conflictId)
getTimelineData(eraId?)
getNetworkData(conflictId)
getWarfareEvolution(conflictId)
```

## How to Use

### 1. Setup Supabase (One Time)
Follow `/SUPABASE_SETUP.md` step-by-step.

### 2. Import and Use in Components
```typescript
import { globalSearch, getConflictStatistics } from '@/lib/supabase/queries/search';

// In your component
const results = await globalSearch('Napoleon');
const stats = await getConflictStatistics(conflictId);
```

### 3. Create API Routes
Wrap query functions in route handlers:
```typescript
// app/api/search/route.ts
export async function GET(request: Request) {
  const q = new URL(request.url).searchParams.get('q');
  const results = await globalSearch(q);
  return Response.json(results);
}
```

### 4. Use in Your Features
- **Search page** - Call `globalSearch()` on user input
- **Analytics dashboard** - Call `getGlobalStatistics()` and `getConflictStatistics()`
- **Timeline** - Call `getTimelineData()` and visualize with charts
- **Network diagram** - Call `getNetworkData()` and render with D3/Cytoscape

## Folder Structure

```
project-root/
├── scripts/
│   └── supabase-schema.sql          ← Run in Supabase SQL Editor
│
├── lib/
│   └── supabase/
│       ├── client.ts                 ← Client + types
│       ├── README.md
│       └── queries/
│           ├── search.ts             ← Use globalSearch() etc
│           └── analytics.ts          ← Use getTimeline() etc
│
├── app/
│   ├── api/
│   │   ├── search/route.ts          ← Build this next
│   │   └── analytics/route.ts       ← Build this next
│   └── [your pages]
│
├── SUPABASE_SETUP.md                 ← Follow this first
└── SUPABASE_ARCHITECTURE.md          ← Understand the design
```

## Immediate Next Steps

1. **Set up Supabase** (15 min)
   - Create project on supabase.com
   - Add env variables to `.env.local`
   - Run SQL schema

2. **Verify connection** (5 min)
   - Create `/app/api/test/route.ts`
   - Visit `/api/test` to confirm database works

3. **Build API routes** (30 min)
   - Create `/app/api/search/route.ts` using `globalSearch()`
   - Create `/app/api/analytics/route.ts` using analytics functions

4. **Build UI components** (depends on your design)
   - Search page consuming `/api/search`
   - Analytics dashboard consuming `/api/analytics`
   - Timeline visualization
   - Network diagram

## Key Design Benefits

- **Normalized schema** - No data duplication, efficient storage
- **Full-text search** - Pre-indexed for fast queries
- **Relationships tracked** - Know exactly who fought what battles
- **Scalable** - Handles 500-5000+ entries with ease
- **Well organized** - Clear folder structure, reusable functions
- **Portfolio gold** - Shows database design, API development, and architectural thinking

You're ready to build the frontend features!
