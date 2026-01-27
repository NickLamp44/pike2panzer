# Supabase Setup Guide for Pike2Panzer

## Step 1: Create Supabase Project

1. Go to [supabase.com](https://supabase.com)
2. Click "New Project"
3. Choose organization, name your project (e.g., "pike2panzer")
4. Set a strong database password
5. Choose your region (closest to your users)
6. Wait for project to initialize

## Step 2: Set Environment Variables

After project creation, copy these from the Supabase dashboard:

Create `.env.local` in your project root:

```env
NEXT_PUBLIC_SUPABASE_URL=your_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
```

Find these in: **Settings → API → Project API keys**

## Step 3: Create Database Schema

1. Go to your Supabase dashboard
2. Click **SQL Editor** (left sidebar)
3. Click **New Query**
4. Copy the entire contents of `/scripts/supabase-schema.sql`
5. Paste into the SQL editor
6. Click **Run** (or Cmd+Enter)
7. Wait for all tables to be created

You should see confirmation that all tables, indexes, and relationships were created.

## Step 4: Seed Your Data

Now populate the database with your existing military history data.

### Create the seed script first:

Run this command to install dependencies:
```bash
npm install @supabase/supabase-js
```

Then create and run the seed script (creates `scripts/seed-data.ts`):

```bash
npx ts-node scripts/seed-data.ts
```

This will read your existing TypeScript data files and populate Supabase.

## Step 5: Verify Data in Supabase

1. Go to **Table Editor** in Supabase dashboard
2. You should see all these tables populated:
   - eras
   - conflicts
   - theaters
   - commanders
   - battles
   - weapons
   - tactics
   - strategies
   - sides
   - campaigns

Click through a few to verify data looks correct.

## Step 6: Test Connection in Your App

Create a simple test file to verify connection works:

```typescript
// app/api/test/route.ts
import { supabase } from '@/lib/supabase/client';

export async function GET() {
  const { data, error } = await supabase
    .from('eras')
    .select('*')
    .limit(1);

  if (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }

  return Response.json({ success: true, data });
}
```

Visit `/api/test` - should return era data.

## Step 7: Enable RLS (Row Level Security) [Optional but Recommended]

If you want to add user authentication later:

1. Go to **Authentication → Policies** in Supabase
2. For each table, create a policy:
   - All authenticated users can read
   - Only admin role can write/update/delete

This adds security without affecting your current read-only use case.

## Troubleshooting

### "Missing Supabase environment variables"
- Make sure `.env.local` has both `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- Restart your dev server after adding env vars

### "Table does not exist"
- Run the schema SQL script again
- Check that all queries completed without errors

### "No data appearing"
- Verify seed script ran successfully
- Check the Table Editor in Supabase dashboard
- If empty, manually insert a test row to verify connection

### Network errors in production
- Make sure your Supabase project allows the deployment domain
- Add deployment URL to allowed hosts in Supabase settings

## Project Structure Summary

```
lib/supabase/
├── client.ts                 # Client initialization & types
├── queries/
│   ├── search.ts            # Global search functions
│   └── analytics.ts         # Analytics & statistics functions
└── README.md

app/api/
├── search/route.ts          # Search endpoint
└── analytics/route.ts       # Analytics endpoint

scripts/
├── supabase-schema.sql      # Database schema definition
└── seed-data.ts             # Populate from existing data
```

## Next Steps

1. Implement API routes in `app/api/search/` and `app/api/analytics/`
2. Build search UI component using the `globalSearch()` function
3. Create analytics dashboard using the analytics functions
4. Implement timeline visualization
5. Build network relationship visualization

All query functions are ready to use in your components!
