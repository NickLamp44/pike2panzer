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
    <div className="flex  items-center gap-4 p-3 rounded-lg bg-black/40 border border-white/20 backdrop-blur-sm shadow-md">
      {/* Portrait */}
      <div className="relative w-20 h-20 overflow-hidden rounded-md border border-white/30 shadow">
        <Image src={image} alt={commander.name} fill className="object-cover" />
      </div>

      {/* Text */}
      <div className="flex-col flex-1 grow text-left space-y-0.5">
        <h4 className="text-sm font-bold text-white leading-tight">
          {commander.name}
        </h4>
        <p className=" text-xs italic text-gray-200">{commander.rank}</p>
        {commander.dateOfBirth && (
          <p className="m-2 text-xs text-gray-300">
            Born: {commander.dateOfBirth || "?"}
          </p>
        )}
        {commander.dateOfDeath && (
          <p className="m-2 text-xs text-gray-300">
            Died: {commander.dateOfDeath || "Present"}
          </p>
        )}
      </div>
    </div>
  );
}
