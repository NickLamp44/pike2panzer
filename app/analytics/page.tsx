'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

interface Statistics {
  totalCommanders: number;
  totalBattles: number;
  totalWeapons: number;
  totalTactics: number;
  totalStrategies: number;
  totalCampaigns: number;
  totalEras: number;
  totalConflicts: number;
  yearRange: { start: number; end: number };
}

interface EraStatistic {
  era: string;
  slug: string;
  conflicts: number;
  battles: number;
  commanders: number;
  weapons: number;
  yearRange: { start: number; end: number };
}

interface TimelineItem {
  name: string;
  year?: number;
  startYear?: number;
  endYear?: number;
  conflict?: string;
  era?: string;
}

export default function AnalyticsPage() {
  const [stats, setStats] = useState<Statistics | null>(null);
  const [eraStats, setEraStats] = useState<EraStatistic[]>([]);
  const [timeline, setTimeline] = useState<{ battles: TimelineItem[]; conflicts: TimelineItem[] }>({
    battles: [],
    conflicts: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const response = await fetch('/api/analytics');
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || 'Failed to fetch analytics');
        }

        setStats(data.statistics);
        setEraStats(data.eraStatistics);
        setTimeline(data.timeline);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mb-4"></div>
          <p className="text-slate-300">Loading analytics...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 p-6">
        <div className="max-w-4xl mx-auto">
          <div className="bg-red-900/20 border border-red-700 text-red-300 px-6 py-4 rounded-lg">
            <h2 className="font-semibold mb-2">Error Loading Analytics</h2>
            <p>{error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-white mb-3">Database Analytics</h1>
          <p className="text-slate-400">Explore statistics and visualizations across all military history data</p>
        </div>

        {/* Statistics Cards */}
        {stats && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
            <StatCard label="Total Eras" value={stats.totalEras} color="blue" />
            <StatCard label="Total Conflicts" value={stats.totalConflicts} color="purple" />
            <StatCard label="Total Battles" value={stats.totalBattles} color="red" />
            <StatCard label="Total Commanders" value={stats.totalCommanders} color="green" />
            <StatCard label="Total Weapons" value={stats.totalWeapons} color="yellow" />
            <StatCard label="Total Tactics" value={stats.totalTactics} color="cyan" />
            <StatCard label="Total Strategies" value={stats.totalStrategies} color="indigo" />
            <StatCard label="Total Campaigns" value={stats.totalCampaigns} color="pink" />
          </div>
        )}

        {/* Time Range */}
        {stats && (
          <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6 mb-12">
            <h2 className="text-xl font-semibold text-white mb-2">Historical Span</h2>
            <p className="text-slate-300">
              Database covers {stats.yearRange.start} to {stats.yearRange.end}
              <span className="text-slate-400 ml-2">({stats.yearRange.end - stats.yearRange.start} years)</span>
            </p>
          </div>
        )}

        {/* Era Statistics */}
        {eraStats.length > 0 && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-white mb-6">Statistics by Era</h2>
            <div className="grid gap-6">
              {eraStats.map((era) => (
                <Link key={era.slug} href={`/eras/${era.slug}`}>
                  <div className="group bg-slate-800/50 hover:bg-slate-700/50 border border-slate-700 hover:border-slate-600 rounded-lg p-6 transition-all cursor-pointer">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-xl font-semibold text-white group-hover:text-blue-400 transition">{era.era}</h3>
                      <span className="text-slate-400 text-sm">
                        {era.yearRange.start} - {era.yearRange.end}
                      </span>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div>
                        <p className="text-slate-400 text-sm">Conflicts</p>
                        <p className="text-2xl font-bold text-blue-400">{era.conflicts}</p>
                      </div>
                      <div>
                        <p className="text-slate-400 text-sm">Battles</p>
                        <p className="text-2xl font-bold text-red-400">{era.battles}</p>
                      </div>
                      <div>
                        <p className="text-slate-400 text-sm">Commanders</p>
                        <p className="text-2xl font-bold text-green-400">{era.commanders}</p>
                      </div>
                      <div>
                        <p className="text-slate-400 text-sm">Weapons</p>
                        <p className="text-2xl font-bold text-yellow-400">{era.weapons}</p>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Timeline - Recent Battles */}
        {timeline.battles.length > 0 && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-white mb-6">Timeline - Major Battles</h2>
            <div className="space-y-2 max-h-96 overflow-y-auto">
              {timeline.battles.slice(0, 20).map((battle, idx) => (
                <div key={idx} className="bg-slate-800/30 border border-slate-700/50 rounded px-4 py-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-semibold text-white">{battle.name}</p>
                      <p className="text-sm text-slate-400">{battle.conflict} • {battle.era}</p>
                    </div>
                    <span className="text-slate-300 font-mono">{battle.year}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Timeline - Conflicts */}
        {timeline.conflicts.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold text-white mb-6">Timeline - Major Conflicts</h2>
            <div className="space-y-2 max-h-96 overflow-y-auto">
              {timeline.conflicts.slice(0, 20).map((conflict, idx) => (
                <div key={idx} className="bg-slate-800/30 border border-slate-700/50 rounded px-4 py-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-semibold text-white">{conflict.name}</p>
                      <p className="text-sm text-slate-400">{conflict.era}</p>
                    </div>
                    <span className="text-slate-300 font-mono">
                      {conflict.startYear} - {conflict.endYear}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

interface StatCardProps {
  label: string;
  value: number;
  color: 'blue' | 'purple' | 'red' | 'green' | 'yellow' | 'cyan' | 'indigo' | 'pink';
}

function StatCard({ label, value, color }: StatCardProps) {
  const colorClasses: Record<string, string> = {
    blue: 'bg-blue-500/10 text-blue-400',
    purple: 'bg-purple-500/10 text-purple-400',
    red: 'bg-red-500/10 text-red-400',
    green: 'bg-green-500/10 text-green-400',
    yellow: 'bg-yellow-500/10 text-yellow-400',
    cyan: 'bg-cyan-500/10 text-cyan-400',
    indigo: 'bg-indigo-500/10 text-indigo-400',
    pink: 'bg-pink-500/10 text-pink-400',
  };

  return (
    <div className={`${colorClasses[color]} border border-${color}-500/20 rounded-lg p-6`}>
      <p className="text-slate-400 text-sm mb-2">{label}</p>
      <p className="text-4xl font-bold">{value}</p>
    </div>
  );
}
