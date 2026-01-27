## Pike to Panzer - Custom API Architecture

### Overview
This project showcases a **full-stack data management system** with a comprehensive API layer built on top of a well-organized TypeScript data structure. The system demonstrates proficiency in data aggregation, API design, and frontend-backend integration.

---

## Architecture Components

### 1. **Data Layer** (`/lib/dataAggregator.ts`)
A singleton service that indexes all military history data and provides a queryable interface.

**Key Features:**
- **DataAggregator Class**: Builds a complete searchable index from all data files on initialization
- **SearchableEntity Interface**: Unified representation of any data item (commanders, battles, weapons, etc.)
- **Index Structure**: Organizes data by type and relationship for efficient querying
- **Caching**: Uses singleton pattern to cache the index after first build

**Methods:**
- `buildIndex()` - Aggregates all data into searchable entities
- `search(query, filters)` - Full-text search with optional filtering
- `getByType(type)` - Retrieve all entities of a specific type
- `getConflictData()` - Get all data for a specific conflict
- `getStatistics()` - Summary statistics across the database
- `getTimeline()` - Chronological battle and conflict data
- `getCommanderNetwork()` - Build relationship graph for visualization
- `getEraStatistics()` - Per-era breakdown of data

**Portfolio Value**: Shows ability to work with complex data structures, design scalable systems, and think about performance (caching, indexing).

---

### 2. **API Routes** (`/app/api/`)

#### **Search API** (`/api/search?q=query`)
- Searches across all entity types
- Supports filtering by type, era, and conflict
- Returns top 50 results with context
- **Shows**: RESTful design, query parameters, filtering logic

#### **Analytics API** (`/api/analytics`)
- Returns global statistics (total entities by type)
- Era-wise breakdown
- Timeline data (battles and conflicts chronologically)
- **Shows**: Data aggregation at the API level, response shaping

#### **Entities API** (`/api/entities?type=commander`)
- Retrieve all entities of a specific type
- Type validation
- **Shows**: Type safety and validation patterns

#### **Conflict API** (`/api/conflicts/[eraSlug]/[conflictSlug]`)
- Nested dynamic routes
- Returns all data related to a conflict
- Commander network for visualization
- **Shows**: Dynamic routing, nested resources, relationship building

**Portfolio Value**: Demonstrates RESTful API design, error handling, type validation, and dynamic routing.

---

### 3. **Frontend Pages**

#### **Search Page** (`/app/search/page.tsx`)
- Real-time search with debouncing (300ms)
- Multi-faceted filters (type, era)
- Results grouped by type
- Shows context (era, conflict, year)
- Display images when available
- **Shows**: React hooks (useState, useEffect, useCallback), debouncing, API integration, grouping logic

#### **Analytics Page** (`/app/analytics/page.tsx`)
- Statistics cards showing database metrics
- Era-by-era breakdown
- Timeline visualizations (battles and conflicts)
- Historical span calculation
- **Shows**: Data visualization, responsive grid layouts, loading states, error handling

**Portfolio Value**: Shows ability to build interactive UIs that consume API data, handle async operations, and create engaging data presentations.

---

## Data Flow

```
TypeScript Data Files (/app/data)
        ↓
DataAggregator (indexes all data)
        ↓
API Routes (serve data via REST)
        ↓
Frontend Pages (consume via fetch)
        ↓
User Interface
```

---

## Key Technical Decisions

### 1. **Why DataAggregator?**
- **Centralized Logic**: All data queries go through one service
- **Performance**: Single index build on first access, then cached
- **Flexibility**: Easy to add new query methods without touching API routes
- **Type Safety**: Unified SearchableEntity type ensures consistency

### 2. **Why API Routes?**
- **Separation of Concerns**: Business logic separate from presentation
- **Scalability**: Could easily swap data source (files → database)
- **Reusability**: Multiple frontends could consume same API
- **Portfolio Appeal**: Shows you understand backend development

### 3. **Why Client-Side Fetch?**
- **Simple**: No need for SSR complexity
- **Interactive**: Search results update in real-time
- **Shows**: Understanding of client-server architecture

---

## Skills Demonstrated

### Data Organization
- Multi-level data hierarchy
- Type-safe data structures
- Relationship mapping between entities

### Backend Development
- REST API design
- Route handling with Next.js
- Error handling and validation
- Type safety with TypeScript

### Frontend Development
- React hooks and state management
- Async data fetching and debouncing
- Responsive design
- User experience considerations

### System Design
- Service layer architecture
- Caching and performance optimization
- Scalable data aggregation
- Separation of concerns

---

## Usage Examples

### Search API
```
GET /api/search?q=napoleon&type=commander&era=revolutionary-imperial
```

### Analytics API
```
GET /api/analytics
```

### Conflict Data API
```
GET /api/conflicts/total-war/second-world-war
```

### Entities API
```
GET /api/entities?type=battle
```

---

## Future Enhancements

1. **Add Database**: Replace files with Supabase/PostgreSQL
2. **Advanced Queries**: Full-text search, fuzzy matching
3. **Caching Layer**: Redis for frequently accessed data
4. **Rate Limiting**: Protect API endpoints
5. **Pagination**: Handle large result sets
6. **Network Visualization**: D3.js/Cytoscape for relationship graphs
7. **Timeline Component**: Interactive Gantt chart or timeline

---

## File Structure Summary

```
/lib/dataAggregator.ts          # Core data service
/app/api/
  ├── search/route.ts           # Search endpoint
  ├── analytics/route.ts         # Analytics endpoint
  ├── entities/route.ts          # Type-based retrieval
  └── conflicts/[eraSlug]/[conflictSlug]/route.ts  # Conflict details
/app/search/page.tsx            # Search UI
/app/analytics/page.tsx         # Analytics dashboard
/app/components/navBar.tsx      # Updated navigation
```

---

## Why This Matters for Your Portfolio

This implementation shows:
1. **Full-Stack Capability**: From data organization to UI
2. **Scalable Thinking**: Architecture ready to handle growth
3. **API Design**: RESTful patterns and best practices
4. **Type Safety**: Proper use of TypeScript
5. **User Experience**: Interactive, responsive interfaces
6. **Performance**: Caching, debouncing, optimization
7. **Maintainability**: Clear separation of concerns

You've built something that goes beyond just displaying data—you've created a queryable, searchable, analytics-powered system that could serve as a portfolio showcase piece.
