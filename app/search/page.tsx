'use client';

import { useState, useEffect, useMemo } from 'react';
import { SearchResult, buildSearchIndex, searchData, groupResultsByType } from '@/lib/search';
import Link from 'next/link';

const typeColors: Record<string, { bg: string; text: string; label: string }> = {
  commander: { bg: 'bg-blue-500/10', text: 'text-blue-400', label: 'Commander' },
  battle: { bg: 'bg-red-500/10', text: 'text-red-400', label: 'Major Battle' },
  weapon: { bg: 'bg-amber-500/10', text: 'text-amber-400', label: 'Weapon' },
  conflict: { bg: 'bg-purple-500/10', text: 'text-purple-400', label: 'Conflict' },
  era: { bg: 'bg-green-500/10', text: 'text-green-400', label: 'Era' },
  tactic: { bg: 'bg-cyan-500/10', text: 'text-cyan-400', label: 'Tactic' },
  strategy: { bg: 'bg-indigo-500/10', text: 'text-indigo-400', label: 'Strategy' },
  weapontech: { bg: 'bg-orange-500/10', text: 'text-orange-400', label: 'Weapon Tech' },
};

interface ResultsGrouped {
  [key: string]: SearchResult[];
}

export default function SearchPage() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [groupedResults, setGroupedResults] = useState<ResultsGrouped>({});
  const index = useMemo(() => buildSearchIndex(), []);

  useEffect(() => {
    const filtered = searchData(query, index);
    setResults(filtered);
    setGroupedResults(groupResultsByType(filtered));
  }, [query, index]);

  const resultCount = results.length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-white mb-3">Search History Database</h1>
          <p className="text-slate-400">Search across commanders, battles, weapons, tactics, strategies, and more</p>
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
              {query && <span className="text-sm">{resultCount} results</span>}
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="space-y-8">
          {query === '' ? (
            <div className="text-center py-12">
              <p className="text-slate-400 text-lg">Enter a search term to explore the database</p>
            </div>
          ) : resultCount === 0 ? (
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
    <Link href={`/search/${result.type}/${result.slug}`}>
      <div className="group bg-slate-800/50 hover:bg-slate-700/50 border border-slate-700 hover:border-slate-600 rounded-lg p-5 transition-all cursor-pointer">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-3 mb-2">
              <h3 className="text-lg font-semibold text-white truncate group-hover:text-blue-400 transition">{result.title}</h3>
              <span className={`px-2 py-1 rounded text-xs font-medium whitespace-nowrap ${typeInfo?.bg} ${typeInfo?.text}`}>
                {typeInfo?.label}
              </span>
            </div>
            <p className="text-slate-400 text-sm mb-2 line-clamp-2">{result.description}</p>
            <p className="text-slate-500 text-xs">
              <span className="font-medium">Context:</span> {result.context}
            </p>
            {(result.startDate || result.endDate) && (
              <p className="text-slate-500 text-xs mt-1">
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
      </div>
    </Link>
  );
}
