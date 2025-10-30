import { notFound } from "next/navigation";
import { getEraBySlug } from "@/app/data/content";
import { ContentCard } from "@/app/components/contentCard";
import { CardGrid } from "@/app/components/cardGrid";
import { Breadcrumb } from "@/app/components/breadcrumb";

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
      <div className="container mx-auto px-4 pt-8">
        <Breadcrumb items={[{ label: era.title, href: `/eras/${eraSlug}` }]} />
      </div>
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
