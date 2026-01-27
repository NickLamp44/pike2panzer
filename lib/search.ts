'use client';

import { eras } from '@/app/data';

export interface SearchResult {
  id: string;
  title: string;
  type: 'commander' | 'battle' | 'weapon' | 'conflict' | 'era' | 'tactic' | 'strategy' | 'weapontech' | 'side';
  description: string;
  context: string;
  image?: string;
  slug?: string;
  startDate?: string;
  endDate?: string;
}

export function buildSearchIndex(): SearchResult[] {
  const results: SearchResult[] = [];

  // Index all eras
  eras.forEach((era) => {
    results.push({
      id: `era-${era.slug}`,
      title: era.title,
      type: 'era',
      description: era.description || era.cardDescription,
      context: era.period,
      image: era.cardImage,
      slug: era.slug,
    });
  });

  return results;
}

export function searchData(query: string, index: SearchResult[]): SearchResult[] {
  if (!query.trim()) return [];

  const lowerQuery = query.toLowerCase();
  const words = lowerQuery.split(/\s+/);

  return index.filter((item) => {
    const searchText = `${item.title} ${item.description} ${item.context}`.toLowerCase();
    return words.every((word) => searchText.includes(word));
  });
}

export function groupResultsByType(
  results: SearchResult[]
): Record<string, SearchResult[]> {
  const grouped: Record<string, SearchResult[]> = {};
  results.forEach((result) => {
    if (!grouped[result.type]) {
      grouped[result.type] = [];
    }
    grouped[result.type].push(result);
  });
  return grouped;
}
