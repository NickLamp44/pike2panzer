
import type { Award } from "../data/types";


interface AwardCardProps {
  award: Award;
}

export function AwardCard({ award }: AwardCardProps) {
  return (
    <div className="bg-card border border-border rounded-lg p-4 space-y-3">
      {/* Award Header */}
      <div className="flex items-start gap-3">
        
        <div className="flex-1">
          <h3 className="font-semibold text-foreground text-lg">
            {award.name}
          </h3>
          {award.dateAwarded && (
            <div className="flex items-center gap-1 text-sm text-muted-foreground mt-1">
              
              <span>{award.dateAwarded}</span>
            </div>
          )}
        </div>
      </div>

      {/* Description */}
      {award.description && (
        <p className="text-sm text-muted-foreground leading-relaxed">
          {award.description}
        </p>
      )}

     
    </div>
  );
}
