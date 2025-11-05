import { Calendar, Swords, AlertCircle } from "lucide-react";
import type { MajorBattle } from "../data/types";
import Image from "next/image";

interface MajorBattleCardProps {
  battle: MajorBattle;
}

export function MajorBattleCard({ battle }: MajorBattleCardProps) {
  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden">
      {/* Battle Image */}
      {battle.imageUrl && (
        <div className="relative w-full h-48 overflow-hidden">
          <Image
            src={battle.imageUrl || "/placeholder.svg"}
            alt={battle.name}
            fill
            className="object-cover"
          />
        </div>
      )}

      <div className="p-6 space-y-4">
        {/* Battle Header */}
        <div>
          <div className="flex items-center gap-2">
            <Swords className="w-5 h-5 text-red-500" />
            <h3 className="text-2xl font-bold text-foreground">
              {battle.name}
            </h3>
          </div>
        </div>

        {/* Dates */}
        {(battle.startDate || battle.endDate) && (
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Calendar className="w-4 h-4" />
            <span>
              {battle.startDate} {battle.endDate && `- ${battle.endDate}`}
            </span>
          </div>
        )}

        {/* Description */}
        <p className="text-foreground leading-relaxed">{battle.description}</p>

        {/* Paragraphs */}
        {battle.paragraphs && battle.paragraphs.length > 0 && (
          <div className="space-y-2 text-sm text-muted-foreground">
            {battle.paragraphs.map((para, idx) => (
              <p key={idx} className="leading-relaxed">
                {para}
              </p>
            ))}
          </div>
        )}

        {/* Impact */}
        {battle.impact && battle.impact.length > 0 && (
          <div className="space-y-2 pt-2 border-t border-border">
            <div className="flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-amber-500" />
              <h4 className="font-semibold text-foreground text-sm">Impact</h4>
            </div>
            <ul className="space-y-1 text-sm text-muted-foreground">
              {battle.impact.map((item, idx) => (
                <li key={idx} className="pl-4 border-l-2 border-border">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
