import { AwardIcon, Calendar } from "lucide-react";
import type { Award } from "../data/types";
import Image from "next/image";

interface AwardCardProps {
  award: Award;
}

export function AwardCard({ award }: AwardCardProps) {
  return (
    <div className="bg-card border border-border rounded-lg p-4 space-y-3">
      {/* Award Header */}
      <div className="flex items-start gap-3">
        <AwardIcon className="w-5 h-5 text-yellow-500 flex-shrink-0 mt-1" />
        <div className="flex-1">
          <h3 className="font-semibold text-foreground text-lg">
            {award.name}
          </h3>
          {award.dateAwarded && (
            <div className="flex items-center gap-1 text-sm text-muted-foreground mt-1">
              <Calendar className="w-4 h-4" />
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

      {/* Images */}
      {award.images && award.images.length > 0 && (
        <div className="flex gap-2 flex-wrap">
          {award.images.map((img, idx) => (
            <div
              key={idx}
              className="relative w-16 h-16 rounded border border-border overflow-hidden"
            >
              <Image
                src={img.url || "/placeholder.svg"}
                alt={img.alt}
                fill
                className="object-cover"
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
