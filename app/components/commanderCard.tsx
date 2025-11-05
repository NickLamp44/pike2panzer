import Image from "next/image";
import { Award, Shield, Swords } from "lucide-react";
import type { Commander } from "../data/types";
import { AwardCard } from "./award";
import { MajorBattleCard } from "./majorBattle";

interface CommanderCardProps {
  commander: Commander;
}

export function CommanderCard({ commander }: CommanderCardProps) {
  return (
    <div className="relative overflow-hidden rounded-lg border border-border bg-card">
      {/* Flag background with vignette overlay */}
      <div className="absolute inset-0">
        <Image
          src={commander.flag || "/placeholder.svg"}
          alt={`${commander.nationality} flag`}
          fill
          className="object-cover opacity-30"
        />
        {/* Vignette overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-background/95 via-background/80 to-background/70" />
      </div>

      {/* Content */}
      <div className="relative z-10 space-y-6">
        {/* Commander Header Section */}
        <div className="p-6 md:p-8">
          <div className="flex flex-col md:flex-row gap-6">
            {/* Commander portrait */}
            <div className="flex-shrink-0">
              <div className="relative w-32 h-40 md:w-40 md:h-48 rounded-lg overflow-hidden border-2 border-border shadow-lg">
                <Image
                  src={commander.image || "/placeholder.svg"}
                  alt={commander.name}
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            {/* Commander info */}
            <div className="flex-1 space-y-4">
              {/* Header */}
              <div>
                <h3 className="text-2xl md:text-3xl font-bold text-foreground">
                  {commander.name}
                </h3>
                <p className="text-lg text-muted-foreground mt-1">
                  {commander.rank}
                </p>
                <div className="flex flex-wrap gap-3 mt-2 text-sm text-muted-foreground">
                  <span className="font-medium">{commander.nationality}</span>
                  <span>•</span>
                  <span>
                    {commander.dateOfBirth}
                    {commander.dateOfDeath && ` - ${commander.dateOfDeath}`}
                  </span>
                </div>
              </div>

              {/* Side */}
              {commander.side && commander.side.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {commander.side.map((side, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-2 text-sm text-foreground font-medium px-3 py-1 rounded border border-border bg-muted/50"
                    >
                      <Shield className="w-4 h-4" />
                      {side.name}
                    </div>
                  ))}
                </div>
              )}

              {/* Description */}
              <div className="space-y-2">
                {Array.isArray(commander.description) ? (
                  commander.description.map((desc, idx) => (
                    <p key={idx} className="text-foreground leading-relaxed">
                      {desc}
                    </p>
                  ))
                ) : (
                  <p className="text-foreground leading-relaxed">
                    {commander.description}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>

        {(commander.awards?.length || 0) > 0 && (
          <div className="px-6 md:px-8 pb-6 md:pb-8 border-t border-border/50">
            <div className="flex items-center gap-2 mb-4">
              <Award className="w-5 h-5 text-yellow-500" />
              <h4 className="text-lg font-semibold text-foreground">
                Awards & Decorations
              </h4>
            </div>
            <div className="grid gap-3">
              {commander.awards.map((award, idx) => (
                <AwardCard key={idx} award={award} />
              ))}
            </div>
          </div>
        )}

        {(commander.majorBattle?.length || 0) > 0 && (
          <div className="px-6 md:px-8 pb-6 md:pb-8 border-t border-border/50">
            <div className="flex items-center gap-2 mb-4">
              <Swords className="w-5 h-5 text-red-500" />
              <h4 className="text-lg font-semibold text-foreground">
                Major Battles
              </h4>
            </div>
            <div className="grid gap-3">
              {commander.majorBattle.map((battle, idx) => (
                <MajorBattleCard key={idx} battle={battle} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
