'use client';

import { useEffect, useState } from 'react';
import { SearchableEntity } from '@/lib/dataAggregator';

interface NetworkNode {
  id: string;
  label: string;
  type: 'commander' | 'battle' | 'weapon' | 'tactic' | 'strategy' | 'conflict';
  year?: number;
  color: string;
}

interface NetworkEdge {
  source: string;
  target: string;
  type: string;
}

interface NetworkData {
  nodes: NetworkNode[];
  edges: NetworkEdge[];
}

const typeColors: Record<string, string> = {
  commander: '#3b82f6', // blue
  battle: '#ef4444', // red
  weapon: '#f59e0b', // amber
  tactic: '#06b6d4', // cyan
  strategy: '#6366f1', // indigo
  conflict: '#ec4899', // pink
};

export default function NetworkVisualization() {
  const [eraSlug, setEraSlug] = useState<string>('');
  const [conflictSlug, setConflictSlug] = useState<string>('');
  const [networkData, setNetworkData] = useState<NetworkData>({ nodes: [], edges: [] });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedNode, setSelectedNode] = useState<NetworkNode | null>(null);

  // Simulated eras and conflicts for demo
  const eraOptions = [
    { slug: 'late-medieval', name: 'Late Medieval' },
    { slug: 'rise-of-gunpowder', name: 'Rise of Gunpowder' },
    { slug: 'revolutionary-imperial', name: 'Revolutionary & Imperial' },
    { slug: 'dawn-industrial-warfare', name: 'Industrial Warfare' },
    { slug: 'total-war', name: 'Total War' },
  ];

  const conflictOptions: Record<string, Array<{ slug: string; name: string }>> = {
    'late-medieval': [
      { slug: '100-years-war', name: '100 Years War' },
      { slug: 'war-of-roses', name: 'War of the Roses' },
      { slug: 'mongol-invasions', name: 'Mongol Invasions' },
    ],
    'rise-of-gunpowder': [
      { slug: '30-years-war', name: '30 Years War' },
      { slug: 'anglo-spanish', name: 'Anglo-Spanish' },
      { slug: 'ming-manchu', name: 'Ming-Manchu' },
    ],
    'revolutionary-imperial': [
      { slug: '7-years-war', name: '7 Years War' },
      { slug: 'american-revolution', name: 'American Revolution' },
      { slug: 'french-revolution', name: 'French Revolution' },
    ],
    'dawn-industrial-warfare': [
      { slug: 'austro-prussian', name: 'Austro-Prussian' },
      { slug: 'franco-prussian', name: 'Franco-Prussian' },
    ],
    'total-war': [
      { slug: 'first-world-war', name: 'First World War' },
      { slug: 'second-world-war', name: 'Second World War' },
    ],
  };

  const loadNetworkData = async () => {
    if (!eraSlug || !conflictSlug) return;

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`/api/conflicts/${eraSlug}/${conflictSlug}`);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to load conflict data');
      }

      // Transform conflict data into network nodes and edges
      const nodes: NetworkNode[] = [];
      const edges: NetworkEdge[] = [];
      const nodeIds = new Set<string>();

      // Add commanders
      data.commanders?.forEach((commander: any) => {
        const nodeId = `commander-${commander.slug}`;
        nodes.push({
          id: nodeId,
          label: commander.name,
          type: 'commander',
          color: typeColors.commander,
        });
        nodeIds.add(nodeId);
      });

      // Add battles
      data.battles?.forEach((battle: any) => {
        const nodeId = `battle-${battle.slug}`;
        nodes.push({
          id: nodeId,
          label: battle.name,
          type: 'battle',
          year: battle.year,
          color: typeColors.battle,
        });
        nodeIds.add(nodeId);

        // Create edges: commanders -> battles
        battle.commanders?.forEach((cmdSlug: string) => {
          edges.push({
            source: `commander-${cmdSlug}`,
            target: nodeId,
            type: 'commanded',
          });
        });
      });

      // Add weapons
      data.weapons?.forEach((weapon: any) => {
        const nodeId = `weapon-${weapon.slug}`;
        nodes.push({
          id: nodeId,
          label: weapon.name,
          type: 'weapon',
          color: typeColors.weapon,
        });
        nodeIds.add(nodeId);

        // Create edges: battles -> weapons (used in)
        data.battles?.forEach((battle: any) => {
          if (battle.weapons?.includes(weapon.slug)) {
            edges.push({
              source: nodeId,
              target: `battle-${battle.slug}`,
              type: 'used_in',
            });
          }
        });
      });

      setNetworkData({ nodes, edges });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadNetworkData();
  }, [eraSlug, conflictSlug]);

  // Calculate node positions using simple force-directed layout
  const getNodePosition = (index: number, total: number) => {
    const angle = (index / total) * Math.PI * 2;
    const radius = 150;
    return {
      x: Math.cos(angle) * radius + 250,
      y: Math.sin(angle) * radius + 250,
    };
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-3">Network Visualization</h1>
          <p className="text-slate-400">Explore relationships between commanders, battles, and weapons in military conflicts</p>
        </div>

        {/* Filters */}
        <div className="flex gap-4 mb-8">
          <select
            value={eraSlug}
            onChange={(e) => {
              setEraSlug(e.target.value);
              setConflictSlug('');
            }}
            className="px-4 py-2 rounded bg-slate-800 text-white border border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select Era</option>
            {eraOptions.map((era) => (
              <option key={era.slug} value={era.slug}>
                {era.name}
              </option>
            ))}
          </select>

          <select
            value={conflictSlug}
            onChange={(e) => setConflictSlug(e.target.value)}
            disabled={!eraSlug}
            className="px-4 py-2 rounded bg-slate-800 text-white border border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
          >
            <option value="">Select Conflict</option>
            {eraSlug &&
              conflictOptions[eraSlug]?.map((conflict) => (
                <option key={conflict.slug} value={conflict.slug}>
                  {conflict.name}
                </option>
              ))}
          </select>
        </div>

        {/* Legend */}
        <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-4 mb-8">
          <p className="text-slate-300 font-semibold mb-3">Legend:</p>
          <div className="grid grid-cols-2 md:grid-cols-6 gap-3">
            {Object.entries(typeColors).map(([type, color]) => (
              <div key={type} className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: color }}></div>
                <span className="text-slate-300 text-sm capitalize">{type}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Canvas */}
        {loading && (
          <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-12 text-center">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mb-4"></div>
            <p className="text-slate-300">Loading network data...</p>
          </div>
        )}

        {error && (
          <div className="bg-red-900/20 border border-red-700 text-red-300 px-6 py-4 rounded-lg">
            {error}
          </div>
        )}

        {!loading && networkData.nodes.length > 0 && (
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Canvas */}
            <div className="lg:col-span-3 bg-slate-800/50 border border-slate-700 rounded-lg overflow-hidden">
              <svg width="100%" height="500" className="bg-slate-900">
                {/* Draw edges */}
                {networkData.edges.map((edge, idx) => {
                  const sourceNode = networkData.nodes.find((n) => n.id === edge.source);
                  const targetNode = networkData.nodes.find((n) => n.id === edge.target);

                  if (!sourceNode || !targetNode) return null;

                  const sourcePos = getNodePosition(
                    networkData.nodes.indexOf(sourceNode),
                    networkData.nodes.length
                  );
                  const targetPos = getNodePosition(
                    networkData.nodes.indexOf(targetNode),
                    networkData.nodes.length
                  );

                  return (
                    <line
                      key={idx}
                      x1={sourcePos.x}
                      y1={sourcePos.y}
                      x2={targetPos.x}
                      y2={targetPos.y}
                      stroke="#64748b"
                      strokeWidth="1"
                      opacity="0.5"
                    />
                  );
                })}

                {/* Draw nodes */}
                {networkData.nodes.map((node, idx) => {
                  const pos = getNodePosition(idx, networkData.nodes.length);
                  return (
                    <g key={node.id}>
                      <circle
                        cx={pos.x}
                        cy={pos.y}
                        r="12"
                        fill={node.color}
                        opacity={selectedNode?.id === node.id ? 1 : 0.7}
                        className="cursor-pointer hover:opacity-100 transition-opacity"
                        onClick={() => setSelectedNode(node)}
                      />
                    </g>
                  );
                })}
              </svg>
            </div>

            {/* Details Sidebar */}
            <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-4">
              <h3 className="text-white font-semibold mb-4">Network Info</h3>
              <div className="space-y-3 text-sm text-slate-300">
                <div>
                  <p className="text-slate-400 mb-1">Total Nodes</p>
                  <p className="text-2xl font-bold text-blue-400">{networkData.nodes.length}</p>
                </div>
                <div>
                  <p className="text-slate-400 mb-1">Relationships</p>
                  <p className="text-2xl font-bold text-purple-400">{networkData.edges.length}</p>
                </div>
              </div>

              {selectedNode && (
                <div className="mt-6 pt-6 border-t border-slate-700">
                  <p className="text-slate-400 text-xs mb-2">Selected Node</p>
                  <div
                    className="w-3 h-3 rounded-full mb-2"
                    style={{ backgroundColor: selectedNode.color }}
                  ></div>
                  <p className="font-semibold text-white break-words">{selectedNode.label}</p>
                  <p className="text-slate-400 text-xs mt-2 capitalize">{selectedNode.type}</p>
                  {selectedNode.year && (
                    <p className="text-slate-400 text-xs mt-2">Year: {selectedNode.year}</p>
                  )}
                </div>
              )}
            </div>
          </div>
        )}

        {!loading && networkData.nodes.length === 0 && !error && (
          <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-12 text-center">
            <p className="text-slate-300">Select an era and conflict to view the network</p>
          </div>
        )}
      </div>
    </div>
  );
}
