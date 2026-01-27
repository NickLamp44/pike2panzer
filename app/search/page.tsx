'use client';

import { useState, useEffect, useMemo } from 'react';
import { buildSearchIndex, searchData, groupResultsByType } from '@/lib/search';
import type { SearchResult } from '@/lib/search';
import Link from 'next/link';
import { Card } from '@/components/ui/card';

const typeColors: Record<string, { bg: string; text: string; label: string; icon: string }> = {
  commander: { bg: 'bg-blue-500/10', text: 'text-blue-400', label: 'Commander', icon: '⚔️' },
  battle: { bg: 'bg-red-500/10', text: 'text-red-400', label: 'Major Battle', icon: '💥' },
  weapon: { bg: 'bg-amber-500/10', text: 'text-amber-400', label: 'Weapon', icon: '🔫' },
  conflict: { bg: 'bg-purple-500/10', text: 'text-purple-400', label: 'Conflict', icon: '🛡️' },
  era: { bg: 'bg-green-500/10', text: 'text-green-400', label: 'Era', icon: '📚' },
  tactic: { bg: 'bg-cyan-500/10', text: 'text-cyan-400', label: 'Tactic', icon: '🎯' },
  strategy: { bg: 'bg-indigo-500/10', text: 'text-indigo-400', label: 'Strategy', icon: '🧠' },
  weapontech: { bg: 'bg-orange-500/10', text: 'text-orange-400', label: 'Weapon Tech', icon: '⚙️' },
  side: { bg: 'bg-pink-500/10', text: 'text-pink-400', label: 'Side', icon: '🚩' },
};

export default function SearchPage() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [groupedResults, setGroupedResults] = useState<Record<string, SearchResult[]>>({});
  const [loading, setLoading] = useState(false);
  const index = useMemo(() => buildSearchIndex(), []);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      setGroupedResults({});
      setLoading(false);
      return;
    }

    setLoading(true);
    const timer = setTimeout(() => {
      const filtered = searchData(query, index);
      setResults(filtered);
      setGroupedResults(groupResultsByType(filtered));
      setLoading(false);
    }, 200);

    return () => clearTimeout(timer);
  }, [query, index]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-5xl font-bold text-white mb-3">Search Military History</h1>
          <p className="text-slate-400 text-lg">
            Explore commanders, battles, weapons, tactics, strategies, and historical eras
          </p>
        </div>

        {/* Search Input */}
        <div className="mb-12">
          <div className="relative">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search for commanders, battles, weapons, eras..."
              className="w-full px-6 py-4 bg-slate-800 border-2 border-slate-700 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
              autoFocus
            />
            {loading && (
              <div className="absolute right-4 top-1/2 -translate-y-1/2">
                <div className="animate-spin text-blue-400">⚙️</div>
              </div>
            )}
          </div>
        </div>

        {/* Results stats */}
        {query && (
          <div className="mb-8 flex items-center justify-between">
            <p className="text-slate-300">
              Found <span className="font-bold text-white text-lg">{results.length}</span> result
              {results.length !== 1 ? 's' : ''} for "<span className="font-bold">{query}</span>"
            </p>
          </div>
        )}

        {/* Results */}
        <div className="space-y-8">
          {query === '' ? (
            <div className="text-center py-16">
              <p className="text-slate-400 text-xl mb-3">Start typing to search</p>
              <p className="text-slate-500">Search across all historical data in the database</p>
            </div>
          ) : loading ? (
            <div className="text-center py-16">
              <p className="text-slate-400">Searching...</p>
            </div>
          ) : results.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-slate-400 text-lg">No results found for "{query}"</p>
              <p className="text-slate-500 text-sm mt-2">Try a different search term</p>
            </div>
          ) : (
            Object.entries(groupedResults).map(([type, typeResults]) => (
              <div key={type}>
                <div className="flex items-center gap-3 mb-6">
                  <span className="text-2xl">{typeColors[type]?.icon}</span>
                  <h2 className="text-2xl font-semibold text-white">{typeColors[type]?.label}s</h2>
                  <span className={`ml-auto px-3 py-1 rounded-full text-sm font-semibold ${typeColors[type]?.bg} ${typeColors[type]?.text}`}>
                    {typeResults.length}
                  </span>
                </div>

                <div className="grid gap-4">
                  {typeResults.map((result) => (
                    <SearchResultCard key={result.id} result={result} />
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

function SearchResultCard({ result }: { result: SearchResult }) {
  const typeInfo = typeColors[result.type];

  return (
    <Link href={`/eras/${result.slug}`}>
      <Card className="bg-slate-800/30 hover:bg-slate-700/50 border-slate-700 hover:border-slate-600 rounded-lg p-5 transition-all cursor-pointer group">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-3 mb-2 flex-wrap">
              <h3 className="text-lg font-semibold text-white group-hover:text-blue-400 transition">
                {result.title}
              </h3>
              <span className={`px-2 py-1 rounded text-xs font-semibold whitespace-nowrap ${typeInfo?.bg} ${typeInfo?.text}`}>
                {typeInfo?.label}
              </span>
            </div>
            <p className="text-slate-400 text-sm mb-3 line-clamp-2">{result.description}</p>
            <p className="text-slate-500 text-xs">
              <span className="font-medium">Context:</span> {result.context}
            </p>
            {(result.startDate || result.endDate) && (
              <p className="text-slate-500 text-xs mt-2">
                {result.startDate && <span>{result.startDate}</span>}
                {result.startDate && result.endDate && <span> - </span>}
                {result.endDate && <span>{result.endDate}</span>}
              </p>
            )}
          </div>
          {result.image && (
            <div className="flex-shrink-0 w-16 h-16 rounded overflow-hidden bg-slate-700">
              <img src={result.image} alt={result.title} className="w-full h-full object-cover" />
            </div>
          )}
        </div>
      </Card>
    </Link>
  );
}
