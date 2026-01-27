'use client';

import { eras } from '@/app/data';
import { Card } from '@/components/ui/card';

export default function TimelinePage() {
  const eraList = eras.sort((a, b) => {
    const aStart = parseInt(a.period.split('-')[0]);
    const bStart = parseInt(b.period.split('-')[0]);
    return aStart - bStart;
  });

  const parseYear = (period: string): number => {
    const match = period.match(/\d{3,4}/);
    return match ? parseInt(match[0]) : 0;
  };

  const minYear = Math.min(...eraList.map((e) => parseYear(e.period)));
  const maxYear = Math.max(...eraList.map((e) => parseYear(e.period.split('-')[1] || e.period)));
  const timelineRange = maxYear - minYear;

  const getPositionPercent = (year: number): number => {
    return ((year - minYear) / timelineRange) * 100;
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 py-16 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-16">
          <h1 className="text-5xl font-bold text-white mb-4">Military History Timeline</h1>
          <p className="text-slate-300 text-lg">
            Explore the evolution of warfare across {timelineRange} years of history
          </p>
        </div>

        {/* Timeline Container */}
        <div className="relative">
          {/* Main timeline line */}
          <div className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 w-1 h-full bg-gradient-to-b from-blue-500 via-purple-500 to-emerald-500" />

          {/* Timeline items */}
          <div className="space-y-12">
            {eraList.map((era, idx) => {
              const isEven = idx % 2 === 0;
              const startYear = parseYear(era.period);

              return (
                <div key={era.slug} className="relative">
                  {/* Timeline dot */}
                  <div className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 w-4 h-4 bg-slate-900 border-4 border-blue-500 rounded-full -top-2" />

                  {/* Content */}
                  <div className={`md:w-1/2 ${isEven ? 'md:pr-12' : 'md:ml-auto md:pl-12'}`}>
                    <Card className="bg-slate-800/50 border-slate-700/50 p-6 hover:border-slate-600 transition-colors">
                      {/* Era image */}
                      {era.cardImage && (
                        <div className="w-full h-40 bg-slate-700 rounded-lg overflow-hidden mb-4">
                          <img
                            src={era.cardImage}
                            alt={era.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      )}

                      {/* Era title and period */}
                      <div className="mb-3">
                        <h3 className="text-2xl font-bold text-white">{era.title}</h3>
                        <p className="text-blue-400 text-sm font-semibold">{era.period}</p>
                      </div>

                      {/* Description */}
                      <p className="text-slate-300 mb-4 line-clamp-3">
                        {era.description || era.cardDescription}
                      </p>

                      {/* Timeline bar */}
                      <div className="mt-4 pt-4 border-t border-slate-700">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-xs font-semibold text-slate-400">PERIOD SPAN</span>
                        </div>
                        <div className="w-full bg-slate-700 rounded-full h-1">
                          <div className="bg-gradient-to-r from-blue-500 to-purple-500 h-1 rounded-full" style={{ width: '100%' }} />
                        </div>
                      </div>
                    </Card>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Summary section */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="bg-slate-800/50 border-slate-700/50 p-6">
            <div className="text-blue-300 text-sm font-semibold mb-2">Time Span</div>
            <div className="text-3xl font-bold text-white">
              {minYear} - {maxYear}
            </div>
            <p className="text-slate-400 text-xs mt-2">{timelineRange} years covered</p>
          </Card>

          <Card className="bg-slate-800/50 border-slate-700/50 p-6">
            <div className="text-purple-300 text-sm font-semibold mb-2">Historical Eras</div>
            <div className="text-3xl font-bold text-white">{eraList.length}</div>
            <p className="text-slate-400 text-xs mt-2">Major historical periods</p>
          </Card>

          <Card className="bg-slate-800/50 border-slate-700/50 p-6">
            <div className="text-emerald-300 text-sm font-semibold mb-2">Data Coverage</div>
            <div className="text-3xl font-bold text-white">Comprehensive</div>
            <p className="text-slate-400 text-xs mt-2">Medieval to modern warfare</p>
          </Card>
        </div>
      </div>
    </main>
  );
}
