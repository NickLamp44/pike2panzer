import { Target } from "lucide-react";
import type { Strategy } from "../data/types";

interface StrategyCardProps {
  strategy: Strategy;
  showSide?: boolean;
}

export function StrategyCard({ strategy, showSide = true }: StrategyCardProps) {
  return (
    <div className="bg-card border border-border rounded-lg p-4 space-y-3">
      {/* Strategy Header */}
      <div className="flex items-start gap-3">
        <Target className="w-5 h-5 text-blue-500 flex-shrink-0 mt-1" />
        <div className="flex-1">
          <h3 className="font-semibold text-foreground text-lg">
            {strategy.name || "Strategy"}
          </h3>
          {showSide && strategy.side && (
            <p className="text-xs text-muted-foreground mt-1">
              {strategy.side}
            </p>
          )}
        </div>
      </div>

      {/* Description */}
      {strategy.description && strategy.description.length > 0 && (
        <div className="space-y-2 text-sm text-muted-foreground">
          {Array.isArray(strategy.description) ? (
            strategy.description.map((desc, idx) => (
              <p key={idx} className="leading-relaxed">
                {desc}
              </p>
            ))
          ) : (
            <p className="leading-relaxed">{strategy.description}</p>
          )}
        </div>
      )}
    </div>
  );
}
