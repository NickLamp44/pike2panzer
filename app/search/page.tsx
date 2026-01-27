'use client';

import { useState, useCallback, useEffect } from 'react';
import { SearchableEntity } from '@/lib/dataAggregator';
import Link from 'next/link';

const typeColors: Record<string, { bg: string; text: string; label: string }> = {
  commander: { bg: 'bg-blue-500/10', text: 'text-blue-400', label: 'Commander' },
  battle: { bg: 'bg-red-500/10', text: 'text-red-400', label: 'Battle' },
  campaign: { bg: 'bg-purple-500/10', text: 'text-purple-400', label: 'Campaign' },
  weapon: { bg: 'bg-amber-500/10', text: 'text-amber-400', label: 'Weapon' },
  tactic: { bg: 'bg-cyan-500/10', text: 'text-cyan-400', label: 'Tactic' },
  strategy: { bg: 'bg-indigo-500/10', text: 'text-indigo-400', label: 'Strategy' },
  side: { bg: 'bg-pink-500/10', text: 'text-pink-400', label: 'Side' },
  conflict: { bg: 'bg-orange-500/10', text: 'text-orange-400', label: 'Conflict' },
  era: { bg: 'bg-green-500/10', text: 'text-green-400', label: 'Era' },
};

interface GroupedResults {
  [key: string]: SearchableEntity[];
}

export default function SearchPage() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchableEntity[]>([]);
  const [groupedResults, setGroupedResults] = useState<GroupedResults>({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState({ type: '', era: '' });

  const performSearch = useCallback(async (searchQuery: string) => {
    if (!searchQuery.trim()) {
      setResults([]);
      setGroupedResults({});
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const params = new URLSearchParams({
        q: searchQuery,
        ...(filters.type && { type: filters.type }),
        ...(filters.era && { era: filters.era }),
      });

      const response = await fetch(`/api/search?${params}`);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Search failed');
      }

      const searchResults = data.results || [];
      setResults(searchResults);

      // Group results by type
      const grouped: GroupedResults = {};
      searchResults.forEach((entity: SearchableEntity) => {
        if (!grouped[entity.type]) grouped[entity.type] = [];
        grouped[entity.type].push(entity);
      });
      setGroupedResults(grouped);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      setResults([]);
      setGroupedResults({});
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    const timer = setTimeout(() => {
      performSearch(query);
    }, 300);

    return () => clearTimeout(timer);
  }, [query, filters, performSearch]);

  const getContextLink = (entity: SearchableEntity) => {
    if (entity.eraSlug && entity.conflictSlug) {
      return `/eras/${entity.eraSlug}/${entity.conflictSlug}`;
    }
    if (entity.eraSlug) {
      return `/eras/${entity.eraSlug}`;
    }
    return '#';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-white mb-3">Global Search Database</h1>
          <p className="text-slate-400">Search across commanders, battles, weapons, tactics, strategies, and more across all eras</p>
        </div>

        {/* Search Input */}
        <div className="mb-8">
          <div className="relative">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search commanders, battles, weapons, eras..."
              className="w-full px-6 py-4 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <div className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400">
              {query && !loading && <span className="text-sm">{results.length} results</span>}
              {loading && <span className="text-sm animate-pulse">Searching...</span>}
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="flex gap-3 mb-8 flex-wrap">
          <select
            value={filters.type}
            onChange={(e) => setFilters({ ...filters, type: e.target.value })}
            className="px-4 py-2 bg-slate-800 border border-slate-700 rounded text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All Types</option>
            <option value="commander">Commanders</option>
            <option value="battle">Battles</option>
            <option value="campaign">Campaigns</option>
            <option value="weapon">Weapons</option>
            <option value="tactic">Tactics</option>
            <option value="strategy">Strategies</option>
            <option value="conflict">Conflicts</option>
            <option value="era">Eras</option>
          </select>

          <select
            value={filters.era}
            onChange={(e) => setFilters({ ...filters, era: e.target.value })}
            className="px-4 py-2 bg-slate-800 border border-slate-700 rounded text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All Eras</option>
            <option value="late-medieval">Late Medieval</option>
            <option value="rise-of-gunpowder">Rise of Gunpowder</option>
            <option value="revolutionary-imperial">Revolutionary & Imperial</option>
            <option value="dawn-industrial-warfare">Industrial Warfare</option>
            <option value="total-war">Total War</option>
            <option value="post-war">Post-War</option>
          </select>
        </div>

        {/* Error State */}
        {error && (
          <div className="bg-red-900/20 border border-red-700 text-red-300 px-4 py-3 rounded mb-6">
            {error}
          </div>
        )}

        {/* Results */}
        <div className="space-y-8">
          {query === '' ? (
            <div className="text-center py-12">
              <p className="text-slate-400 text-lg">Enter a search term to explore the database</p>
            </div>
          ) : loading ? (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mb-4"></div>
              <p className="text-slate-400">Searching across all data...</p>
            </div>
          ) : results.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-slate-400 text-lg">No results found for "{query}"</p>
            </div>
          ) : (
            Object.entries(groupedResults).map(([type, typeResults]) => (
              <div key={type}>
                <div className="flex items-center mb-4">
                  <h2 className="text-xl font-semibold text-white">{typeColors[type]?.label}s</h2>
                  <span className={`ml-3 px-3 py-1 rounded text-sm font-medium ${typeColors[type]?.bg} ${typeColors[type]?.text}`}>
                    {typeResults.length}
                  </span>
                </div>

                <div className="grid gap-4">
                  {typeResults.map((entity) => (
                    <SearchResultCard key={entity.id} entity={entity} />
                  ))}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

function SearchResultCard({ entity }: { entity: SearchableEntity }) {
  const typeInfo = typeColors[entity.type];
  const contextLink =
    entity.eraSlug && entity.conflictSlug
      ? `/eras/${entity.eraSlug}/${entity.conflictSlug}`
      : entity.eraSlug
        ? `/eras/${entity.eraSlug}`
        : '#';

  return (
    <Link href={contextLink}>
      <div className="group bg-slate-800/50 hover:bg-slate-700/50 border border-slate-700 hover:border-slate-600 rounded-lg p-5 transition-all cursor-pointer">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-3 mb-2">
              <h3 className="text-lg font-semibold text-white truncate group-hover:text-blue-400 transition">{entity.name}</h3>
              <span className={`px-2 py-1 rounded text-xs font-medium whitespace-nowrap ${typeInfo?.bg} ${typeInfo?.text}`}>
                {typeInfo?.label}
              </span>
            </div>
            {entity.description && (
              <p className="text-slate-400 text-sm mb-2 line-clamp-2">{entity.description}</p>
            )}
            <p className="text-slate-500 text-xs">
              <span className="font-medium">Context:</span> {entity.era}
              {entity.conflict && ` • ${entity.conflict}`}
              {entity.startYear && ` • ${entity.startYear}`}
            </p>
          </div>
          {entity.image && (
            <div className="flex-shrink-0 w-16 h-16 rounded overflow-hidden bg-slate-700">
              <img src={entity.image} alt={entity.name} className="w-full h-full object-cover" />
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}
