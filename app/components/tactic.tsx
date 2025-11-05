import { Zap } from "lucide-react";
import type { Tactic } from "../data/types";

interface TacticCardProps {
  tactic: Tactic;
}

export function TacticCard({ tactic }: TacticCardProps) {
  return (
    <div className="bg-card border border-border rounded-lg p-4 space-y-4">
      {/* Tactic Header */}
      <div className="flex items-start gap-3">
        <Zap className="w-5 h-5 text-amber-500 flex-shrink-0 mt-1" />
        <h3 className="font-semibold text-foreground text-lg">{tactic.name}</h3>
      </div>

      {/* Description */}
      {tactic.description && tactic.description.length > 0 && (
        <div className="space-y-2 text-sm text-muted-foreground">
          {tactic.description.map((desc, idx) => (
            <p key={idx} className="leading-relaxed">
              {desc}
            </p>
          ))}
        </div>
      )}

      {/* Associated Weapons */}
      {tactic.weapons && tactic.weapons.length > 0 && (
        <div className="space-y-2 pt-2 border-t border-border">
          <h4 className="text-xs font-semibold text-foreground uppercase tracking-wider">
            Key Weapons
          </h4>
          <div className="flex flex-wrap gap-2">
            {tactic.weapons.map((weapon, idx) => (
              <span
                key={idx}
                className="inline-block text-xs bg-muted text-muted-foreground px-2 py-1 rounded"
              >
                {weapon.name}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
