import { searchIndex } from '@/lib/search-service';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const query = request.nextUrl.searchParams.get('q');
  const limit = parseInt(request.nextUrl.searchParams.get('limit') || '20');

  if (!query) {
    return NextResponse.json(
      { error: 'Query parameter required' },
      { status: 400 }
    );
  }

  await searchIndex.initialize();
  const results = searchIndex.search(query, limit);

  return NextResponse.json({
    query,
    count: results.length,
    results,
  });
}
