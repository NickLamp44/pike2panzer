import { Calendar, Swords } from "lucide-react";
import type { MajorBattle, Campaign } from "@/app/data/types";
import Image from "next/image";
import Link from "next/link";

interface MajorActionCardProps {
  action?: MajorBattle | Campaign;
  title?: string;
  cardImage?: string;
  imageAlt?: string;
  startDate?: string;
  endDate?: string;
  href?: string;
}

export function MajorActionCard({
  action,
  title: propTitle,
  cardImage: propImage,
  imageAlt,
  startDate: propStartDate,
  endDate: propEndDate,
  href,
}: MajorActionCardProps) {
  // Support both action object and individual props
  const title = propTitle || action?.title;
  const cardImage = propImage || action?.cardImage;
  const startDate = propStartDate || action?.startDate;
  const endDate = propEndDate || action?.endDate;

  const cardContent = (
    <div className="bg-card border border-border rounded-lg overflow-hidden h-full hover:shadow-lg transition-shadow duration-200">
      {/* Action Image */}
      {cardImage && (
        <div className="relative w-full h-48 overflow-hidden">
          <Image
            src={cardImage || "/placeholder.svg"}
            alt={imageAlt || title || "Action image"}
            fill
            className="object-cover hover:scale-105 transition-transform duration-200"
          />
        </div>
      )}

      <div className="p-6 space-y-4">
        {/* Action Header */}
        <div>
          <div className="flex items-center gap-2">
            <Swords className="w-5 h-5 text-red-500 flex-shrink-0" />
            <h3 className="text-2xl font-bold text-foreground text-balance">
              {title}
            </h3>
          </div>
        </div>

        {/* Dates */}
        {(startDate || endDate) && (
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Calendar className="w-4 h-4 flex-shrink-0" />
            <span>
              {startDate} {endDate && `- ${endDate}`}
            </span>
          </div>
        )}
      </div>
    </div>
  );

  if (href) {
    return <Link href={href}>{cardContent}</Link>;
  }

  return cardContent;
}
