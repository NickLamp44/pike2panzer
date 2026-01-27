# Supabase Integration Structure

This directory contains all Supabase-related code for Pike2Panzer.

## Directory Organization

```
lib/
├── supabase/
│   ├── client.ts           # Client initialization & types
│   ├── queries/            # Query functions organized by entity
│   │   ├── commanders.ts
│   │   ├── battles.ts
│   │   ├── weapons.ts
│   │   ├── tactics.ts
│   │   ├── strategies.ts
│   │   └── search.ts       # Cross-entity search queries
│   ├── mutations/          # Insert/update/delete functions
│   │   ├── commanders.ts
│   │   ├── battles.ts
│   │   └── ...
│   └── types.ts            # Generated types from schema
│
app/
├── api/
│   ├── search/
│   │   └── route.ts        # Global search endpoint
│   ├── analytics/
│   │   └── route.ts        # Analytics/statistics endpoint
│   └── [entity]/
│       ├── route.ts        # GET endpoints
│       └── [id]/route.ts   # GET, PATCH, DELETE for specific items
│
scripts/
├── supabase-schema.sql    # Schema definition (run in Supabase console)
└── seed-data.ts           # Seed script from existing TypeScript data
```

## Benefits of This Organization

1. **Separation of Concerns** - Queries, mutations, and types are isolated
2. **Scalability** - Easy to add new entities
3. **Reusability** - Query functions used across components and API routes
4. **Type Safety** - Generated TypeScript types prevent runtime errors
5. **Performance** - Centralized query optimization

## Setup Steps

1. Create Supabase project
2. Run `supabase-schema.sql` in SQL Editor
3. Run seed script: `npx ts-node scripts/seed-data.ts`
4. Initialize client in `lib/supabase/client.ts`
5. Build query functions in `lib/supabase/queries/`
6. Create API routes in `app/api/`
