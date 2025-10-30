import Link from "next/link";
import { ChevronRight, ArrowLeft } from "lucide-react";

interface BreadcrumbItem {
  label: string;
  href: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export function Breadcrumb({ items }: BreadcrumbProps) {
  const parentHref = items.length > 1 ? items[items.length - 2].href : "/";

  return (
    <div className="mb-6">
      {/* Back Button */}
      <Link
        href={parentHref}
        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-4"
      >
        <ArrowLeft className="h-4 w-4" />
        Back
      </Link>

      {/* Breadcrumb Navigation */}
      <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-sm">
        <Link
          href="/"
          className="text-muted-foreground hover:text-foreground transition-colors"
        >
          Home
        </Link>
        {items.map((item, index) => (
          <div key={item.href} className="flex items-center gap-2">
            <ChevronRight className="h-4 w-4 text-muted-foreground" />
            {index === items.length - 1 ? (
              <span className="text-foreground font-medium">{item.label}</span>
            ) : (
              <Link
                href={item.href}
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                {item.label}
              </Link>
            )}
          </div>
        ))}
      </nav>
    </div>
  );
}
