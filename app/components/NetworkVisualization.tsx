'use client';

import { useEffect, useRef, useState } from 'react';
import { Card } from '@/components/ui/card';

interface Node {
  id: string;
  label: string;
  type: 'commander' | 'battle' | 'weapon' | 'tactic';
}

interface Edge {
  source: string;
  target: string;
  type: string;
}

interface NetworkData {
  nodes: Node[];
  edges: Edge[];
}

const nodeColors: Record<Node['type'], string> = {
  commander: '#3B82F6',
  battle: '#EF4444',
  weapon: '#6B7280',
  tactic: '#A855F7',
};

const nodeSize: Record<Node['type'], number> = {
  commander: 20,
  battle: 25,
  weapon: 15,
  tactic: 18,
};

export function NetworkVisualization({ conflictId }: { conflictId: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [networkData, setNetworkData] = useState<NetworkData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedNode, setSelectedNode] = useState<Node | null>(null);

  useEffect(() => {
    const fetchNetworkData = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(
          `/api/analytics?type=network&conflictId=${conflictId}`
        );
        const data = await response.json();

        if (data.success) {
          setNetworkData(data.data);
        } else {
          setError('Failed to load network data');
        }
      } catch (err) {
        console.error('Error fetching network data:', err);
        setError('Failed to load network visualization');
      } finally {
        setIsLoading(false);
      }
    };

    fetchNetworkData();
  }, [conflictId]);

  useEffect(() => {
    if (!networkData || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    // Calculate node positions using force-directed layout (simplified)
    const positions = new Map<string, { x: number; y: number }>();
    const { nodes, edges } = networkData;

    // Initialize random positions
    nodes.forEach((node) => {
      positions.set(node.id, {
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
      });
    });

    // Simple force-directed simulation (few iterations for performance)
    for (let iter = 0; iter < 20; iter++) {
      nodes.forEach((node) => {
        let fx = 0;
        let fy = 0;

        // Repulsive forces from other nodes
        nodes.forEach((other) => {
          if (node.id === other.id) return;

          const pos1 = positions.get(node.id)!;
          const pos2 = positions.get(other.id)!;
          const dx = pos1.x - pos2.x;
          const dy = pos1.y - pos2.y;
          const dist = Math.sqrt(dx * dx + dy * dy) || 1;

          const repulsion = (50 * 50) / (dist * dist);
          fx += (dx / dist) * repulsion;
          fy += (dy / dist) * repulsion;
        });

        // Attractive forces from edges
        edges.forEach((edge) => {
          if (edge.source === node.id) {
            const pos1 = positions.get(node.id)!;
            const pos2 = positions.get(edge.target)!;
            if (!pos2) return;

            const dx = pos2.x - pos1.x;
            const dy = pos2.y - pos1.y;
            const dist = Math.sqrt(dx * dx + dy * dy) || 1;

            const attraction = dist * 0.1;
            fx += (dx / dist) * attraction;
            fy += (dy / dist) * attraction;
          } else if (edge.target === node.id) {
            const pos1 = positions.get(node.id)!;
            const pos2 = positions.get(edge.source)!;
            if (!pos2) return;

            const dx = pos2.x - pos1.x;
            const dy = pos2.y - pos1.y;
            const dist = Math.sqrt(dx * dx + dy * dy) || 1;

            const attraction = dist * 0.1;
            fx += (dx / dist) * attraction;
            fy += (dy / dist) * attraction;
          }
        });

        // Update position with damping
        const pos = positions.get(node.id)!;
        pos.x += fx * 0.1;
        pos.y += fy * 0.1;

        // Keep within bounds
        pos.x = Math.max(50, Math.min(canvas.width - 50, pos.x));
        pos.y = Math.max(50, Math.min(canvas.height - 50, pos.y));
      });
    }

    // Draw
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw edges
    ctx.strokeStyle = '#D1D5DB';
    ctx.lineWidth = 1;
    edges.forEach((edge) => {
      const pos1 = positions.get(edge.source);
      const pos2 = positions.get(edge.target);
      if (pos1 && pos2) {
        ctx.beginPath();
        ctx.moveTo(pos1.x, pos1.y);
        ctx.lineTo(pos2.x, pos2.y);
        ctx.stroke();
      }
    });

    // Draw nodes
    nodes.forEach((node) => {
      const pos = positions.get(node.id)!;
      const size = nodeSize[node.type];
      const color = nodeColors[node.type];

      ctx.fillStyle = color;
      ctx.beginPath();
      ctx.arc(pos.x, pos.y, size, 0, Math.PI * 2);
      ctx.fill();

      ctx.strokeStyle = '#FFF';
      ctx.lineWidth = 2;
      ctx.stroke();
    });

    // Draw labels for selected node
    if (selectedNode) {
      const pos = positions.get(selectedNode.id);
      if (pos) {
        ctx.fillStyle = '#000';
        ctx.font = 'bold 12px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(selectedNode.label, pos.x, pos.y + 35);
      }
    }
  }, [networkData, selectedNode]);

  if (isLoading) {
    return (
      <Card className="w-full h-96 flex items-center justify-center">
        <p className="text-gray-600">Loading network visualization...</p>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="w-full p-6 bg-red-50 text-red-800">
        <p className="font-semibold">Error Loading Visualization</p>
        <p className="text-sm">{error}</p>
      </Card>
    );
  }

  if (!networkData || networkData.nodes.length === 0) {
    return (
      <Card className="w-full p-6 text-center text-gray-500">
        No relationship data available for this conflict
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      <div>
        <h3 className="font-semibold text-gray-900 mb-2">Relationship Network</h3>
        <p className="text-sm text-gray-600 mb-4">
          Shows connections between commanders, battles, weapons, and tactics
        </p>
      </div>

      <Card className="overflow-hidden bg-white">
        <canvas
          ref={canvasRef}
          className="w-full bg-gradient-to-br from-gray-50 to-gray-100 cursor-pointer"
          style={{ height: '400px', display: 'block' }}
        />
      </Card>

      {/* Legend */}
      <Card className="p-4 space-y-2">
        <h4 className="font-semibold text-sm">Legend</h4>
        <div className="grid grid-cols-2 gap-3 text-sm">
          <div className="flex items-center gap-2">
            <div
              className="w-4 h-4 rounded-full"
              style={{ backgroundColor: nodeColors.commander }}
            ></div>
            <span>Commanders</span>
          </div>
          <div className="flex items-center gap-2">
            <div
              className="w-5 h-5 rounded-full"
              style={{ backgroundColor: nodeColors.battle }}
            ></div>
            <span>Battles</span>
          </div>
          <div className="flex items-center gap-2">
            <div
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: nodeColors.weapon }}
            ></div>
            <span>Weapons</span>
          </div>
          <div className="flex items-center gap-2">
            <div
              className="w-4 h-4 rounded-full"
              style={{ backgroundColor: nodeColors.tactic }}
            ></div>
            <span>Tactics</span>
          </div>
        </div>
      </Card>

      {/* Node List */}
      <Card className="p-4 space-y-2 max-h-48 overflow-y-auto">
        <h4 className="font-semibold text-sm sticky top-0 bg-white">
          Entities ({networkData.nodes.length})
        </h4>
        <div className="space-y-1">
          {networkData.nodes.map((node) => (
            <div
              key={node.id}
              className="flex items-center gap-2 p-2 rounded hover:bg-gray-100 cursor-pointer"
              onClick={() => setSelectedNode(node)}
            >
              <div
                className="w-3 h-3 rounded-full flex-shrink-0"
                style={{ backgroundColor: nodeColors[node.type] }}
              ></div>
              <span className="text-sm truncate">{node.label}</span>
              <span className="text-xs text-gray-500 flex-shrink-0">({node.type})</span>
            </div>
          ))}
        </div>
      </Card>

      {/* Statistics */}
      <Card className="p-4 grid grid-cols-2 gap-4 text-sm">
        <div>
          <p className="text-gray-600">Total Entities</p>
          <p className="text-2xl font-bold">{networkData.nodes.length}</p>
        </div>
        <div>
          <p className="text-gray-600">Relationships</p>
          <p className="text-2xl font-bold">{networkData.edges.length}</p>
        </div>
      </Card>
    </div>
  );
}
