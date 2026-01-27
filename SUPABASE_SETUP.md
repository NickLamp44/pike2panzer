# Supabase Setup Guide for Pike2Panzer

## Step 1: Create Supabase Project
1. Go to [supabase.com](https://supabase.com)
2. Click "New Project"
3. Select a region close to your users
4. Save your password safely (you'll need it to access the database)

## Step 2: Copy Your Credentials
1. Go to **Settings > API**
2. Copy these values and add to `.env.local`:

```
NEXT_PUBLIC_SUPABASE_URL=https://[your-project-id].supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=[your-anon-key]
SUPABASE_SERVICE_ROLE_KEY=[your-service-role-key]  # Optional, for admin operations
```

## Step 3: Create Database Schema
1. Go to **SQL Editor** in Supabase
2. Click "New Query"
3. Copy the entire contents of `/lib/db/schema.sql`
4. Paste into the SQL Editor
5. Click "Run"
6. Wait for all tables to be created

## Step 4: Add Dependencies
```bash
npm install @supabase/supabase-js
```

## Step 5: Understand the Architecture

### Query Pattern (Normalized/Relational)
```typescript
// lib/db/queries/battles.ts
export async function getBattlesByConflict(conflictId: string) {
  const { data } = await supabase
    .from('battles')
    .select(`
      *,
      conflicts:conflict_id (id, name),
      commanders:battle_commanders (
        commanders:commander_id (id, name)
      )
    `)
    .eq('conflict_id', conflictId);
  
  return data;
}
```

### Service Layer (Business Logic)
```typescript
// lib/api/analytics.ts
import { getBattlesByConflict } from '@/lib/db/queries/battles';

export async function getConflictStatistics(conflictId: string) {
  const battles = await getBattlesByConflict(conflictId);
  return {
    totalBattles: battles.length,
    averageSignificance: battles.reduce((sum, b) => sum + (b.significance_level || 0), 0) / battles.length,
    // ... more calculations
  };
}
```

### API Route (HTTP Endpoint)
```typescript
// app/api/analytics/route.ts
import { getConflictStatistics } from '@/lib/api/analytics';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const conflictId = searchParams.get('conflictId');
  
  const stats = await getConflictStatistics(conflictId!);
  return Response.json(stats);
}
```

### Frontend (React Component)
```typescript
// app/analytics/page.tsx
'use client';

import useSWR from 'swr';

export default function AnalyticsPage() {
  const { data } = useSWR(`/api/analytics?conflictId=123`, fetcher);
  
  return <div>{data?.totalBattles} battles</div>;
}
```

## Step 6: Key Differences from File-Based Approach

| Aspect | File-Based | Supabase |
|--------|-----------|----------|
| Search | Array filtering | SQL WHERE clauses (faster) |
| Joins | Manual code | Supabase joins (clean queries) |
| Scalability | Limited | Unlimited |
| Maintenance | Manual sync | Single source of truth |
| Portfolio Value | Basic | Full-stack demonstration |

## Step 7: File Organization
```
lib/
  db/
    schema.sql           # Your database blueprint
    types.ts             # TypeScript types for each table
    client.ts            # Supabase client setup
    queries/             # Pure database queries
      conflicts.ts
      battles.ts
      commanders.ts
      weapons.ts
      search.ts
  api/                   # Business logic & services
    analytics.ts
    search.ts
    timeline.ts
app/
  api/                   # HTTP endpoints
    search/route.ts
    analytics/route.ts
    conflicts/route.ts
```

## Step 8: Normalized Database Benefits You're Showcasing

- **Foreign Keys & Relationships**: Shows understanding of relational databases
- **Indexes**: Demonstrates query optimization knowledge
- **Joins**: Complex queries with multiple relationships
- **Data Integrity**: Constraints ensure data quality
- **Scalability**: Handles thousands of entries efficiently

## Step 9: Next Steps
1. Run schema.sql to create tables
2. Create seeding script to import your current data
3. Build query functions in lib/db/queries/
4. Create API routes in app/api/
5. Build frontend components using API routes

## Resources
- [Supabase Docs](https://supabase.com/docs)
- [Supabase Client Library](https://supabase.com/docs/reference/javascript)
- [SQL Guide](https://www.postgresql.org/docs/current/sql.html)
