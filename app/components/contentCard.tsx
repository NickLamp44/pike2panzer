import { Menu } from "lucide-react";
import Link from "next/link";

interface ContentCardProps {
  title: string;
  imageUrl: string;
  imageAlt?: string;
  href: string;
}

export function ContentCard({
  title,
  imageUrl,
  imageAlt = "Background image",
  href,
}: ContentCardProps) {
  return (
    <Link href={href}>
      <div className="relative w-full h-64 rounded-lg overflow-hidden group cursor-pointer">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center transition-transform duration-300 group-hover:scale-105"
          style={{ backgroundImage: `url(${imageUrl})` }}
          role="img"
          aria-label={imageAlt}
        />

        {/* Grey Overlay */}
        <div className="absolute inset-0 bg-black/50 transition-opacity duration-300 group-hover:bg-black/40" />

        {/* Content */}
        <div className="relative h-full flex items-center justify-center px-8">
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
        </div>
      </div>
    </Link>
  );
}
