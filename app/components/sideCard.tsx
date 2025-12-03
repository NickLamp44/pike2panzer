import Image from "next/image";
import { CommanderCardSmall } from "./commanderCardSmall";
import type { Side, Commander } from "../data/types";

interface SideCardProps {
  side: Side;
  commanders?: Commander[]; 
}

export function SideCard({ side, commanders = [] }: SideCardProps) {
  const flagUrl =
    side.flag ||
    `/placeholder.svg?height=400&width=600&query=${encodeURIComponent(
      side.name + " flag"
    )}`;

  const isValidFlagUrl =
    flagUrl && (flagUrl.startsWith("/") || flagUrl.startsWith("http"));

  return (
    <div className="flex relative overflow-hidden rounded-lg border border-border bg-card shadow-lg">
      {/* Flag background with vignette overlay */}
      {isValidFlagUrl && (
        <div className="absolute inset-0">
          <Image
            src={flagUrl || "/placeholder.svg"}
            alt={`${side.name} flag`}
            fill
            className="object-cover"
          />
          
          <div className="absolute inset-0 bg-gradient-to-br from-background/85 via-background/75 to-background/60" />
        </div>
      )}

      {/* Content */}
      <div className="relative z-10 p-6 space-y-4">
        {/* Faction Name */}
        <div className="border-b border-border pb-3">
          <h3 className="text-2xl font-bold text-foreground">{side.name}</h3>
          {side.dateJoined && (
            <p className="text-sm text-muted-foreground mt-1">
              Joined: {side.dateJoined}
            </p>
          )}
        </div>

        {/* Description */}
        {/* {side.description && (
          <p className="text-sm text-muted-foreground leading-relaxed">
            {side.description}
          </p>
        )} */}

        {/* Key Commanders */}
        {commanders && commanders.length > 0 && (
          <div className="">
            <h4 className="text-lg font-semibold text-foreground">
              Key Commanders
            </h4>
            <div className="flex grow grid-row-1 md:grid-row-3 lg:grid-row-4 ">
              {commanders.map((commander: Commander) => (
                <CommanderCardSmall
                  key={commander.slug}
                  commander={commander}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
