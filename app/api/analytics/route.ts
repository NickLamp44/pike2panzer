import {
  getGlobalStatistics,
  getConflictStatistics,
  getTimelineData,
  getNetworkData,
} from '@/lib/supabase/queries/analytics';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type') || 'global';
    const conflictId = searchParams.get('conflictId');

    if (type === 'conflict' && !conflictId) {
      return Response.json(
        { error: 'conflictId is required for conflict statistics' },
        { status: 400 }
      );
    }

    let data = {};

    switch (type) {
      case 'global':
        data = await getGlobalStatistics();
        break;

      case 'conflict':
        data = await getConflictStatistics(conflictId!);
        break;

      case 'timeline':
        const eraId = searchParams.get('eraId');
        data = await getTimelineData(eraId || undefined);
        break;

      case 'network':
        const networkData = await getNetworkData(conflictId!);
        data = networkData;
        break;

      default:
        return Response.json({ error: 'Invalid type parameter' }, { status: 400 });
    }

    return Response.json({
      success: true,
      type,
      data,
    });
  } catch (error) {
    console.error('Analytics API error:', error);
    return Response.json(
      { error: 'Failed to fetch analytics data' },
      { status: 500 }
    );
  }
}
