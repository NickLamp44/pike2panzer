import type { ReactNode } from "react";

interface CardGridProps {
  children: ReactNode;
  title?: string;
  description?: string;
}

export function CardGrid({ children, title, description }: CardGridProps) {
  return (
    <section className="w-full py-12 px-2 md:px-6">
      {title && (
        <div className="max-w-7xl mx-auto mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-balance mb-2">
            {title}
          </h2>
          {description && (
            <p className="text-lg text-muted-foreground text-pretty">
              {description}
            </p>
          )}
        </div>
      )}
      <div className="mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 max-w-[1800px]">
        {children}
      </div>
    </section>
  );
}
