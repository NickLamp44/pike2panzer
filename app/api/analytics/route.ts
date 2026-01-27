import { NextResponse } from 'next/server';
import { dataAggregator } from '@/lib/dataAggregator';

export async function GET() {
  try {
    const statistics = dataAggregator.getStatistics();
    const eraStats = dataAggregator.getEraStatistics();
    const timeline = dataAggregator.getTimeline();

    return NextResponse.json({
      success: true,
      statistics,
      eraStatistics: eraStats,
      timeline,
    });
  } catch (error) {
    console.error('Analytics API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
