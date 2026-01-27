import { globalSearch } from '@/lib/supabase/queries/search';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q');

    if (!query || query.trim().length === 0) {
      return Response.json(
        { error: 'Search query is required', results: [] },
        { status: 400 }
      );
    }

    const results = await globalSearch(query);

    return Response.json({
      success: true,
      query,
      resultCount: results.length,
      results,
    });
  } catch (error) {
    console.error('Search API error:', error);
    return Response.json(
      { error: 'Failed to perform search', results: [] },
      { status: 500 }
    );
  }
}
