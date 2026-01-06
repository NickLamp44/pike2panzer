import { Menu } from "lucide-react";
import Link from "next/link";

interface ContentCardProps {
  title: string;
  cardImage: string;
  startDate?: string;
  endDate?: string;
  imageAlt?: string;
  href: string;
}

// Basic content card that can be used to showcase eras, conflicts, theaters & battles
export function ContentCard({
  title,
  cardImage,
  startDate,
  endDate,
  imageAlt = "Background image",
  href,
}: ContentCardProps) {
  return (
    <Link href={href}>
      <div className="relative w-full h-64 rounded-lg overflow-hidden group cursor-pointer">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center transition-transform duration-300 group-hover:scale-105"
          style={{ backgroundImage: `url(${cardImage})` }}
          role="img"
          aria-label={imageAlt}
        />

        {/* Grey Overlay */}
        <div className="absolute inset-0 bg-black/50 transition-opacity duration-300 group-hover:bg-black/40" />

        {/* Content */}
        <div className="relative h-full flex items-center justify-center px-8">
          <div className="flex flex-col items-center gap-3">
            <div className="flex items-center gap-4">
              {/* Left Bar Icon */}
              <Menu className="w-6 h-6 text-white" />

              {/* Title */}
              <h3 className="text-2xl md:text-3xl font-bold text-white text-center">
                {title}
              </h3>

              {/* Right Bar Icon */}
              <Menu className="w-6 h-6 text-white" />
            </div>

            <div className="flex items-center gap-2">
              {/* Start Date */}
              <h5 className="text-lg md:text-xl text-white text-center italic">
                {startDate}
              </h5>
              <span className="text-white">-</span>
              {/* End Date */}
              <h5 className="text-lg md:text-xl text-white text-center italic">
                {endDate}
              </h5>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
