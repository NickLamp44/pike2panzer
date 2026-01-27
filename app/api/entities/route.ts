import { NextRequest, NextResponse } from 'next/server';
import { dataAggregator } from '@/lib/dataAggregator';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const type = searchParams.get('type');

    if (!type) {
      return NextResponse.json(
        { error: 'Type parameter is required' },
        { status: 400 }
      );
    }

    const validTypes = ['commander', 'battle', 'campaign', 'weapon', 'tactic', 'strategy', 'side', 'era', 'conflict'];
    if (!validTypes.includes(type)) {
      return NextResponse.json(
        { error: `Invalid type. Must be one of: ${validTypes.join(', ')}` },
        { status: 400 }
      );
    }

    const results = dataAggregator.getByType(type as any);

    return NextResponse.json({
      success: true,
      type,
      count: results.length,
      results,
    });
  } catch (error) {
    console.error('Entities API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
