'use client';

import { useEffect, useState } from 'react';
import { Card } from '@/components/ui/card';

interface Statistics {
  totalEras?: number;
  totalConflicts?: number;
  totalBattles?: number;
  totalCommanders?: number;
  totalWeapons?: number;
  estimatedTotalCasualties?: number;
}

interface TimelineEvent {
  id: string;
  name: string;
  date: string;
  dateEnd?: string;
  location?: string;
  outcome?: string;
  conflictName: string;
  eraName: string;
  imageUrl?: string;
}

export function AnalyticsDashboard() {
  const [stats, setStats] = useState<Statistics | null>(null);
  const [timelineData, setTimelineData] = useState<TimelineEvent[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);

        // Fetch global statistics
        const statsResponse = await fetch('/api/analytics?type=global');
        const statsData = await statsResponse.json();

        if (statsData.success) {
          setStats(statsData.data);
        }

        // Fetch timeline data
        const timelineResponse = await fetch('/api/analytics?type=timeline');
        const timelineDataResponse = await timelineResponse.json();

        if (timelineDataResponse.success) {
          setTimelineData(timelineDataResponse.data);
        }

        setError(null);
      } catch (err) {
        console.error('Error fetching analytics:', err);
        setError('Failed to load analytics data');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const formatNumber = (num: number | undefined) => {
    if (!num) return '0';
    return num.toLocaleString();
  };

  const formatCasualties = (num: number | undefined) => {
    if (!num) return '0';
    if (num >= 1000000) {
      return `${(num / 1000000).toFixed(1)}M`;
    }
    if (num >= 1000) {
      return `${(num / 1000).toFixed(1)}K`;
    }
    return num.toLocaleString();
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <p className="text-gray-600">Loading analytics...</p>
      </div>
    );
  }

  if (error) {
    return (
      <Card className="p-6 bg-red-50 text-red-800">
        <p className="font-semibold">Error Loading Analytics</p>
        <p className="text-sm">{error}</p>
      </Card>
    );
  }

  return (
    <div className="space-y-8">
      {/* Statistics Cards */}
      <div>
        <h2 className="text-2xl font-bold mb-4">Overview</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <StatCard
            title="Historical Eras"
            value={formatNumber(stats?.totalEras)}
            icon="📅"
          />
          <StatCard
            title="Major Conflicts"
            value={formatNumber(stats?.totalConflicts)}
            icon="🏳️"
          />
          <StatCard
            title="Battles Recorded"
            value={formatNumber(stats?.totalBattles)}
            icon="⚔️"
          />
          <StatCard
            title="Military Commanders"
            value={formatNumber(stats?.totalCommanders)}
            icon="👤"
          />
          <StatCard
            title="Weapons & Equipment"
            value={formatNumber(stats?.totalWeapons)}
            icon="🔫"
          />
          <StatCard
            title="Estimated Casualties"
            value={formatCasualties(stats?.estimatedTotalCasualties)}
            icon="📊"
            subtitle="Total across all conflicts"
          />
        </div>
      </div>

      {/* Timeline */}
      <div>
        <h2 className="text-2xl font-bold mb-4">Battle Timeline</h2>
        {timelineData.length > 0 ? (
          <div className="space-y-3 max-h-96 overflow-y-auto">
            {timelineData.slice(0, 20).map((event) => (
              <TimelineItem key={event.id} event={event} />
            ))}
            {timelineData.length > 20 && (
              <p className="text-sm text-gray-500 p-2">
                ... and {timelineData.length - 20} more battles
              </p>
            )}
          </div>
        ) : (
          <Card className="p-6 text-center text-gray-500">
            No timeline data available
          </Card>
        )}
      </div>

      {/* Legend */}
      <Card className="p-4 bg-gray-50">
        <h3 className="font-semibold text-sm mb-3">Quick Facts</h3>
        <ul className="space-y-2 text-sm text-gray-600">
          <li>
            <strong>Coverage:</strong> Spans {stats?.totalEras} major historical eras
          </li>
          <li>
            <strong>Scale:</strong> {stats?.totalConflicts} conflicts documented with{' '}
            {stats?.totalBattles} major battles
          </li>
          <li>
            <strong>Military Leaders:</strong> {stats?.totalCommanders} commanders across
            conflicts
          </li>
          <li>
            <strong>Equipment:</strong> {stats?.totalWeapons} different weapons and
            technologies recorded
          </li>
        </ul>
      </Card>
    </div>
  );
}

interface StatCardProps {
  title: string;
  value: string;
  icon: string;
  subtitle?: string;
}

function StatCard({ title, value, icon, subtitle }: StatCardProps) {
  return (
    <Card className="p-4 space-y-2">
      <div className="flex items-start justify-between">
        <h3 className="font-semibold text-gray-700">{title}</h3>
        <span className="text-2xl">{icon}</span>
      </div>
      <p className="text-3xl font-bold text-gray-900">{value}</p>
      {subtitle && <p className="text-xs text-gray-500">{subtitle}</p>}
    </Card>
  );
}

interface TimelineItemProps {
  event: TimelineEvent;
}

function TimelineItem({ event }: TimelineItemProps) {
  const dateString = event.date
    ? new Date(event.date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      })
    : 'Unknown Date';

  return (
    <Card className="p-4 hover:shadow-md transition-shadow">
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0 w-24">
          <p className="text-xs font-semibold text-gray-500 uppercase">{dateString}</p>
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="font-semibold text-gray-900">{event.name}</h4>
          {event.location && (
            <p className="text-sm text-gray-600">📍 {event.location}</p>
          )}
          {event.outcome && (
            <p className="text-sm text-gray-600">
              <span className="font-medium">Outcome:</span> {event.outcome}
            </p>
          )}
          <div className="flex gap-2 mt-2 flex-wrap">
            <span className="inline-block px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">
              {event.eraName}
            </span>
            <span className="inline-block px-2 py-1 bg-gray-100 text-gray-800 text-xs rounded">
              {event.conflictName}
            </span>
          </div>
        </div>
      </div>
    </Card>
  );
}
