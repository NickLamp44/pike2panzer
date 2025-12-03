import Image from "next/image";
import type { Commander } from "../data/types";

interface CommanderCardSmallProps {
  commander: Commander;
}

export function CommanderCardSmall({ commander }: CommanderCardSmallProps) {
  const image =
    commander.image ||
    `/placeholder.svg?height=200&width=160&query=${encodeURIComponent(
      commander.name
    )}`;

  return (
    <div className="flex flex-col items-center gap-2 p-3 rounded-lg border border-border bg-card/50 backdrop-blur-sm hover:bg-card/80 transition-colors">
      {/* Commander portrait */}
      <div className="relative w-20 h-24 rounded-md overflow-hidden border border-border shadow-md">
        <Image
          src={image || "/placeholder.svg"}
          alt={commander.name}
          fill
          className="object-cover"
        />
      </div>

      {/* Commander info */}
      <div className="text-center space-y-1">
        <h4 className="text-sm font-semibold text-foreground leading-tight line-clamp-2">
          {commander.name}
        </h4>
        <p className="text-xs text-muted-foreground line-clamp-1">
          {commander.rank}
        </p>
        {(commander.dateOfBirth || commander.dateOfDeath) && (
          <p className="text-xs text-muted-foreground">
            {commander.dateOfBirth || "?"} -{" "}
            {commander.dateOfDeath || "Present"}
          </p>
        )}
      </div>
    </div>
  );
}
