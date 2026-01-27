import { searchIndex } from '@/lib/search-service';
import { NextResponse } from 'next/server';

export async function GET() {
  await searchIndex.initialize();
  const stats = searchIndex.getStats();

  return NextResponse.json(stats);
}
