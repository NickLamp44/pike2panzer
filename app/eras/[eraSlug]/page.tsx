import { notFound } from "next/navigation";
import { getEraBySlug } from "@/app/data/content";
import { ContentCard } from "@/app/components/contentCard";
import { CardGrid } from "@/app/components/cardGrid";

export default async function EraPage({
  params,
}: {
  params: Promise<{ eraSlug: string }>;
}) {
  const { eraSlug } = await params;
  const era = getEraBySlug(eraSlug);

  if (!era) {
    notFound();
  }

  return (
    <main className="min-h-screen">
      <CardGrid title={era.title} description={era.description}>
        {era.conflicts.map((conflict) => (
          <ContentCard
            key={conflict.slug}
            title={conflict.title}
            imageUrl={conflict.imageUrl}
            imageAlt={`${conflict.title} background`}
            href={`/eras/${eraSlug}/${conflict.slug}`}
          />
        ))}
      </CardGrid>
    </main>
  );
}
