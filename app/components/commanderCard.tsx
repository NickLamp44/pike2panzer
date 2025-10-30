import Image from "next/image";
import { Award, Calendar, Shield, Swords } from "lucide-react";

interface CommanderCardProps {
  name: string;
  rank: string;
  side: string;
  imageUrl: string;
  dateOfBirth: string;
  dateOfDeath?: string;
  bio: string;
  awards: string[];
  majorBattles: string[];
}

export function CommanderCard({
  name,
  rank,
  side,
  imageUrl,
  dateOfBirth,
  dateOfDeath,
  bio,
  awards,
  majorBattles,
}: CommanderCardProps) {
  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden">
      
      <div className="flex flex-col md:flex-row gap-6 p-6">
        {/* Commander Image */}
        <div className="flex-shrink-0">
          <div className="relative w-48 h-64 rounded-lg overflow-hidden border-2 border-border">
            <Image
              src={imageUrl || "/placeholder.svg"}
              alt={name}
              fill
              className="object-cover"
            />
          </div>
        </div>

        <div className="flex-1 space-y-4">
          <div>
            <h3 className="text-2xl md:text-3xl font-bold text-foreground">
              {name}
            </h3>
            <p className="text-lg text-muted-foreground mt-1">{rank}</p>
          </div>

          {/* Side */}
          <div className="flex items-center gap-2 text-foreground">
            <Shield className="w-5 h-5" />
            <span className="font-semibold">{side}</span>
          </div>

          {/* Dates */}
          <div className="flex items-center gap-2 text-muted-foreground">
            <Calendar className="w-5 h-5" />
            <span>
              {dateOfBirth} - {dateOfDeath || "Present"}
            </span>
          </div>

          {/* Description */}
          <p className="text-foreground leading-relaxed">{description}</p>
        </div>
      </div>

      {/* Awards and Battles sections */}
      <div className="grid md:grid-cols-2 gap-6 p-6 pt-0">
        {/* Awards */}
        {awards.length > 0 && (
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-foreground font-semibold">
              <Award className="w-5 h-5" />
              <h4 className="text-lg">Awards & Honors</h4>
            </div>
            <ul className="space-y-2">
              {awards.map((award, index) => (
                <li
                  key={index}
                  className="text-sm text-muted-foreground pl-4 border-l-2 border-border"
                >
                  {award}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Major Battles */}
        {majorBattles.length > 0 && (
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-foreground font-semibold">
              <Swords className="w-5 h-5" />
              <h4 className="text-lg">Major Battles</h4>
            </div>
            <ul className="space-y-2">
              {majorBattles.map((battle, index) => (
                <li
                  key={index}
                  className="text-sm text-muted-foreground pl-4 border-l-2 border-border"
                >
                  {battle}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
