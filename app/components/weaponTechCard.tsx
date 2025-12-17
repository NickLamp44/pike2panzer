
import type { WeaponTech } from "../data/types";
import Image from "next/image";

interface WeaponTechCardProps {
  weapon: WeaponTech;
}

export function WeaponTechCard({ weapon }: WeaponTechCardProps) {
  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden">
      {/* Weapon Image */}
      {weapon.image && (
        <div className="relative w-full h-48 overflow-hidden">
          <Image
            src={weapon.image || "/placeholder.svg"}
            alt={weapon.name}
            fill
            className="object-cover"
          />
        </div>
      )}

      <div className="p-4 space-y-3">
        {/* WeaponTechHeader */}
        <div className="flex items-start gap-3">
          
          <div className="flex-1">
            <h3 className="font-semibold text-foreground text-lg">
              {weapon.name}
            </h3>
            {weapon.type && (
              <p className="text-xs text-muted-foreground mt-1">
                {weapon.type}
              </p>
            )}
          </div>
        </div>

        {/* Description */}
        {weapon.description && weapon.description.length > 0 && (
          <div className="space-y-2 text-sm text-muted-foreground">
            {weapon.description.map((desc, idx) => (
              <p key={idx} className="leading-relaxed">
                {desc}
              </p>
            ))}
          </div>
        )}

     
      </div>
    </div>
  );
}
