import { File as Rifle } from "lucide-react";
import type { Weapon } from "../data/types";
import Image from "next/image";

interface WeaponCardProps {
  weapon: Weapon;
}

export function WeaponCard({ weapon }: WeaponCardProps) {
  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden">
      {/* Weapon Image */}
      {weapon.images && weapon.images.length > 0 && (
        <div className="relative w-full h-48 overflow-hidden">
          <Image
            src={weapon.images[0].url || "/placeholder.svg"}
            alt={weapon.images[0].alt}
            fill
            className="object-cover"
          />
        </div>
      )}

      <div className="p-4 space-y-3">
        {/* Weapon Header */}
        <div className="flex items-start gap-3">
          <Rifle className="w-5 h-5 text-slate-500 flex-shrink-0 mt-1" />
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

        {/* Additional Images */}
        {weapon.images && weapon.images.length > 1 && (
          <div className="flex gap-2 pt-2 border-t border-border">
            {weapon.images.slice(1).map((img, idx) => (
              <div
                key={idx}
                className="relative w-12 h-12 rounded overflow-hidden border border-border"
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
    </div>
  );
}
