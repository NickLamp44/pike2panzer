import { eras } from "@/app/data/content";
import { ContentCard } from "@/app/components/contentCard";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8">
      <div className="max-w-4xl w-full space-y-8">
        <h1 className="text-4xl font-bold tracking-tight text-center">
          Era Cardss
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {eras.map((era) => (
            <ContentCard
              key={era.slug}
              title={era.title}
              imageUrl={era.imageUrl}
              imageAlt={`${era.title} background`}
              href={`/eras/${era.slug}`}
            />
          ))}
        </div>
      </div>
    </main>
  );
}
