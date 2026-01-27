// PROJECT STRUCTURE FOR SUPABASE INTEGRATION

/*
project-root/
├── lib/
│   ├── db/
│   │   ├── schema.sql              # Normalized database schema (run in Supabase SQL editor)
│   │   ├── types.ts                # TypeScript types matching Supabase tables
│   │   ├── client.ts               # Supabase client initialization
│   │   ├── migrations/
│   │   │   └── seed.ts             # Seeding script to populate from your current data files
│   │   └── queries/                # Database query layer
│   │       ├── eras.ts             # Queries for eras
│   │       ├── conflicts.ts        # Queries for conflicts
│   │       ├── battles.ts          # Queries for battles
│   │       ├── commanders.ts       # Queries for commanders
│   │       ├── weapons.ts          # Queries for weapons
│   │       ├── strategies.ts       # Queries for strategies
│   │       └── search.ts           # Advanced search queries
│   │
│   └── api/                        # API service layer (calls database queries)
│       ├── search.ts               # Search service
│       ├── analytics.ts            # Analytics calculations
│       ├── conflicts.ts            # Conflict services
│       ├── commanders.ts           # Commander services
│       └── timeline.ts             # Timeline data generation
│
├── app/
│   ├── api/                        # Next.js API routes (calls lib/api services)
│   │   ├── search/
│   │   │   └── route.ts            # POST /api/search
│   │   ├── analytics/
│   │   │   └── route.ts            # GET /api/analytics
│   │   ├── conflicts/
│   │   │   └── route.ts            # GET /api/conflicts
│   │   ├── battles/
│   │   │   └── route.ts            # GET /api/battles
│   │   ├── commanders/
│   │   │   └── route.ts            # GET /api/commanders
│   │   └── seed/                   # One-time setup
│   │       └── route.ts            # POST /api/seed (admin only)
│   │
│   ├── search/
│   │   └── page.tsx                # Search UI (calls /api/search)
│   │
│   ├── analytics/
│   │   └── page.tsx                # Analytics dashboard (calls /api/analytics)
│   │
│   ├── timeline/
│   │   └── page.tsx                # Timeline visualization (calls /api/timeline)
│   │
│   └── data/                       # Keep your current data files for reference/backup
│       └── (existing structure)
│
├── .env.local                      # Local environment variables
│   ├── NEXT_PUBLIC_SUPABASE_URL
│   └── NEXT_PUBLIC_SUPABASE_ANON_KEY
│   └── SUPABASE_SERVICE_ROLE_KEY   # (optional, for admin operations)
│
└── package.json
    └── Add dependency: "supabase": "^2.43.0"

*/

// LAYER EXPLANATION:

// Layer 1: Database (/lib/db/)
// - Defines schema and types
// - Contains pure query functions
// - Returns raw database data
// Example: queries/battles.ts -> getBattlesByConflict(conflictId)

// Layer 2: Services (/lib/api/)
// - Business logic and data transformation
// - Calls database queries
// - Enriches and formats data for frontend
// Example: services/analytics.ts -> getConflictStatistics(conflictId)

// Layer 3: API Routes (/app/api/)
// - HTTP endpoints
// - Authentication/authorization
// - Calls services, returns JSON
// Example: POST /api/search -> calls search service

// Layer 4: Frontend (/app/)
// - UI components
// - Calls API routes via fetch/SWR
// - Displays data

// BENEFITS OF THIS STRUCTURE:
// - Separation of concerns
// - Easy to test each layer
// - Reusable query functions
// - Shows full-stack architecture knowledge
// - Professional code organization
