import Image from "next/image"
import { CommanderCardSmall } from "./commanderCardSmall"
import type { Side, Commander } from "../data/types"

interface SideCardProps {
  side: Side
  commanders?: Commander[]
}

export function SideCard({ side, commanders = [] }: SideCardProps) {
  if (!side) return null

  const flagUrl =
    side.flag ||
    `/placeholder.svg?height=400&width=600&query=${encodeURIComponent(
      side.name + " flag"
    )}`

  return (
    <div className="relative rounded-xl border border-border bg-card shadow-xl overflow-hidden max-w-2xl w-full">
      {/* Background flag */}
      <div className="absolute inset-0">
        <Image
          src={flagUrl}
          alt={`${side.name} flag`}
          fill
          className="object-cover object-center opacity-60"
        />
        {/* Soft vignette to help text readability */}
        <div className="absolute inset-0 bg-black/40 backdrop-blur-[1px]" />
      </div>

      {/* Foreground Content */}
      <div className="relative z-10 p-6 space-y-6">
        {/* Faction Header */}
        <div className="text-center space-y-1 pb-3 border-b border-white/20">
          <h3 className="text-3xl font-extrabold drop-shadow-lg text-white">
            {side.name}
          </h3>
          {side.dateJoined && (
            <p className="text-sm text-gray-200 drop-shadow">
              Joined: {side.dateJoined}
            </p>
          )}
        </div>

        {/* Commanders List (vertical) */}
        {commanders.length > 0 && (
          <div className="space-y-3">
            <h4 className="text-center text-xl font-semibold text-white drop-shadow">
              Key Commanders
            </h4>

            {/* Vertical stack */}
            <div className="flex flex-col gap-3">
              {commanders.map((commander) => (
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
  )
}
