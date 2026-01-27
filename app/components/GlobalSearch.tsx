'use client';

import { useState, useCallback, useMemo } from 'react';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';

interface SearchResult {
  id: string;
  type: 'commander' | 'battle' | 'weapon' | 'tactic' | 'strategy' | 'conflict';
  name: string;
  description: string | null;
  context: {
    conflictName: string;
    eraName: string;
  };
  imageUrl: string | null;
}

const typeColors: Record<SearchResult['type'], string> = {
  commander: 'bg-blue-100 text-blue-800',
  battle: 'bg-red-100 text-red-800',
  weapon: 'bg-gray-100 text-gray-800',
  tactic: 'bg-purple-100 text-purple-800',
  strategy: 'bg-green-100 text-green-800',
  conflict: 'bg-yellow-100 text-yellow-800',
};

const typeIcons: Record<SearchResult['type'], string> = {
  commander: '👤',
  battle: '⚔️',
  weapon: '🔫',
  tactic: '🎯',
  strategy: '📋',
  conflict: '🏳️',
};

export function GlobalSearch() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = useCallback(async (searchQuery: string) => {
    if (!searchQuery.trim()) {
      setResults([]);
      setHasSearched(false);
      return;
    }

    setIsLoading(true);
    setHasSearched(true);

    try {
      const response = await fetch(`/api/search?q=${encodeURIComponent(searchQuery)}`);
      const data = await response.json();

      if (data.success) {
        setResults(data.results);
      } else {
        setResults([]);
      }
    } catch (error) {
      console.error('Search error:', error);
      setResults([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const groupedResults = useMemo(() => {
    const grouped: Record<SearchResult['type'], SearchResult[]> = {
      commander: [],
      battle: [],
      weapon: [],
      tactic: [],
      strategy: [],
      conflict: [],
    };

    results.forEach((result) => {
      grouped[result.type].push(result);
    });

    return grouped;
  }, [results]);

  const debouncedSearch = useCallback(
    (() => {
      let timeoutId: NodeJS.Timeout;
      return (value: string) => {
        clearTimeout(timeoutId);
        setQuery(value);
        timeoutId = setTimeout(() => {
          handleSearch(value);
        }, 300);
      };
    })(),
    [handleSearch]
  );

  return (
    <div className="w-full space-y-6">
      {/* Search Input */}
      <div className="space-y-2">
        <label htmlFor="search" className="block text-sm font-semibold">
          Search Military History
        </label>
        <Input
          id="search"
          type="text"
          placeholder="Search commanders, battles, weapons, tactics..."
          value={query}
          onChange={(e) => debouncedSearch(e.target.value)}
          className="w-full text-base"
        />
        {isLoading && <p className="text-sm text-gray-500">Searching...</p>}
      </div>

      {/* Results Summary */}
      {hasSearched && !isLoading && (
        <div className="text-sm text-gray-600">
          Found {results.length} result{results.length !== 1 ? 's' : ''} for "{query}"
        </div>
      )}

      {/* Grouped Results */}
      <div className="space-y-6">
        {Object.entries(groupedResults).map(([type, typeResults]) => {
          if (typeResults.length === 0) return null;

          return (
            <div key={type} className="space-y-3">
              <h3 className="text-sm font-semibold text-gray-600 uppercase tracking-wide">
                {typeIcons[type as SearchResult['type']]} {type}s ({typeResults.length})
              </h3>

              <div className="space-y-2">
                {typeResults.map((result) => (
                  <Card
                    key={result.id}
                    className="p-4 hover:shadow-lg transition-shadow cursor-pointer"
                  >
                    <div className="flex items-start gap-3">
                      {/* Type Badge */}
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-semibold whitespace-nowrap ${
                          typeColors[result.type as SearchResult['type']]
                        }`}
                      >
                        {result.type}
                      </span>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-gray-900 truncate">
                          {result.name}
                        </h4>
                        {result.description && (
                          <p className="text-sm text-gray-600 line-clamp-2">
                            {result.description}
                          </p>
                        )}
                        <div className="flex gap-2 mt-2 text-xs text-gray-500">
                          <span>{result.context.eraName}</span>
                          <span>•</span>
                          <span>{result.context.conflictName}</span>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* No Results */}
      {hasSearched && !isLoading && results.length === 0 && (
        <Card className="p-8 text-center">
          <p className="text-gray-600">No results found for "{query}"</p>
          <p className="text-sm text-gray-500 mt-2">
            Try searching for commanders, battles, weapons, or tactics
          </p>
        </Card>
      )}
    </div>
  );
}
