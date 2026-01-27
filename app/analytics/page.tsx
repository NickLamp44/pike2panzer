'use client';

import { useMemo } from 'react';
import { allData } from '@/app/data';
import { MajorBattle } from '@/app/data/types';

interface Statistics {
  totalEras: number;
  totalConflicts: number;
  totalCommanders: number;
  totalBattles: number;
  totalWeapons: number;
  totalTactics: number;
  totalStrategies: number;
  totalWeaponTechs: number;
  eraBreakdown: Array<{ era: string; conflicts: number }>;
  dateRange: { oldest: string; newest: string };
}

function calculateStatistics(): Statistics {
  let totalEras = 0;
  let totalConflicts = 0;
  let totalCommanders = 0;
  let totalBattles = 0;
  let totalWeapons = 0;
  let totalTactics = 0;
  let totalStrategies = 0;
  let totalWeaponTechs = 0;
  const eraBreakdown: Array<{ era: string; conflicts: number }> = [];
  let oldestDate = '9999';
  let newestDate = '0000';

  Object.entries(allData.eras).forEach(([eraKey, era]) => {
    totalEras++;
    const conflictCount = Object.keys(era.conflicts || {}).length;
    eraBreakdown.push({ era: era.title, conflicts: conflictCount });
    totalConflicts += conflictCount;

    Object.entries(era.conflicts || {}).forEach(([conflictKey, conflict]) => {
      if (conflict.startDate) {
        const year = conflict.startDate.split('-')[0];
        if (year < oldestDate) oldestDate = year;
        if (year > newestDate) newestDate = year;
      }

      totalCommanders += conflict.commanders?.length || 0;
      totalBattles += conflict.majorBattles?.length || 0;
      totalWeapons += conflict.weapons?.length || 0;
      totalTactics += conflict.tactics?.length || 0;
      totalStrategies += conflict.strategies?.length || 0;
      totalWeaponTechs += conflict.weaponTech?.length || 0;
    });
  });

  return {
    totalEras,
    totalConflicts,
    totalCommanders,
    totalBattles,
    totalWeapons,
    totalTactics,
    totalStrategies,
    totalWeaponTechs,
    eraBreakdown,
    dateRange: { oldest: oldestDate, newest: newestDate },
  };
}

const StatCard = ({ label, value, unit = '', description = '' }: { label: string; value: number | string; unit?: string; description?: string }) => (
  <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6 hover:border-slate-600 transition">
    <div className="flex items-start justify-between">
      <div>
        <p className="text-slate-400 text-sm font-medium mb-2">{label}</p>
        <p className="text-3xl font-bold text-white">
          {value}
          {unit && <span className="text-lg text-slate-400 ml-1">{unit}</span>}
        </p>
        {description && <p className="text-slate-500 text-xs mt-2">{description}</p>}
      </div>
    </div>
  </div>
);

export default function AnalyticsPage() {
  const stats = useMemo(() => calculateStatistics(), []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-white mb-3">Database Statistics</h1>
          <p className="text-slate-400">Comprehensive overview of the military history database</p>
        </div>

        {/* Key Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <StatCard label="Historical Eras" value={stats.totalEras} description="Centuries of warfare" />
          <StatCard label="Conflicts" value={stats.totalConflicts} description="Wars and campaigns" />
          <StatCard label="Major Battles" value={stats.totalBattles} description="Significant engagements" />
          <StatCard label="Commanders" value={stats.totalCommanders} description="Military leaders" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <StatCard label="Weapons" value={stats.totalWeapons} description="Types of arms" />
          <StatCard label="Weapon Technologies" value={stats.totalWeaponTechs} description="Revolutionary tech" />
          <StatCard label="Tactics" value={stats.totalTactics} description="Combat maneuvers" />
          <StatCard label="Strategies" value={stats.totalStrategies} description="Overall plans" />
        </div>

        {/* Date Range */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6">
            <p className="text-slate-400 text-sm font-medium mb-2">Time Span Covered</p>
            <p className="text-2xl font-bold text-white mb-2">
              {stats.dateRange.oldest} to {stats.dateRange.newest}
            </p>
            <p className="text-slate-500 text-xs">
              {parseInt(stats.dateRange.newest) - parseInt(stats.dateRange.oldest)} years of history
            </p>
          </div>
          <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6">
            <p className="text-slate-400 text-sm font-medium mb-2">Data Coverage</p>
            <div className="space-y-2">
              <p className="text-slate-300 text-sm">
                <span className="font-semibold">{stats.totalConflicts}</span> conflicts across <span className="font-semibold">{stats.totalEras}</span> eras
              </p>
              <p className="text-slate-300 text-sm">
                <span className="font-semibold">{stats.totalCommanders}</span> commanders documented
              </p>
            </div>
          </div>
        </div>

        {/* Era Breakdown */}
        <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6">
          <h2 className="text-xl font-semibold text-white mb-6">Conflicts by Era</h2>
          <div className="space-y-4">
            {stats.eraBreakdown.map((item) => (
              <div key={item.era}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-slate-300 font-medium">{item.era}</span>
                  <span className="text-blue-400 font-semibold">{item.conflicts} conflicts</span>
                </div>
                <div className="w-full bg-slate-700 rounded-full h-2 overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-blue-500 to-blue-400 h-full rounded-full transition-all duration-300"
                    style={{
                      width: `${(item.conflicts / Math.max(...stats.eraBreakdown.map((e) => e.conflicts))) * 100}%`,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Data Categories Overview */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Personnel</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-slate-300">Commanders</span>
                <span className="text-blue-400 font-semibold">{stats.totalCommanders}</span>
              </div>
            </div>
          </div>

          <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Warfare Elements</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-slate-300">Tactics</span>
                <span className="text-purple-400 font-semibold">{stats.totalTactics}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-300">Strategies</span>
                <span className="text-indigo-400 font-semibold">{stats.totalStrategies}</span>
              </div>
            </div>
          </div>

          <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Engagements</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-slate-300">Major Battles</span>
                <span className="text-red-400 font-semibold">{stats.totalBattles}</span>
              </div>
            </div>
          </div>

          <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Military Technology</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-slate-300">Weapons</span>
                <span className="text-amber-400 font-semibold">{stats.totalWeapons}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-300">Weapon Technologies</span>
                <span className="text-orange-400 font-semibold">{stats.totalWeaponTechs}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
