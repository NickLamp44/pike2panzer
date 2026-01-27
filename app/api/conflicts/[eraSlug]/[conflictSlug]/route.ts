import { NextRequest, NextResponse } from 'next/server';
import { dataAggregator } from '@/lib/dataAggregator';

export async function GET(
  request: NextRequest,
  { params }: { params: { eraSlug: string; conflictSlug: string } }
) {
  try {
    const { eraSlug, conflictSlug } = params;

    if (!eraSlug || !conflictSlug) {
      return NextResponse.json(
        { error: 'Missing era or conflict slug' },
        { status: 400 }
      );
    }

    const conflictData = dataAggregator.getConflictData(eraSlug, conflictSlug);
    const commanderNetwork = dataAggregator.getCommanderNetwork(`${eraSlug}/${conflictSlug}`);

    return NextResponse.json({
      success: true,
      eraSlug,
      conflictSlug,
      ...conflictData,
      commanderNetwork,
    });
  } catch (error) {
    console.error('Conflict API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
