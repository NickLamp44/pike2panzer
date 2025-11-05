import { notFound } from "next/navigation";
import { getEraBySlug, getEraWithConflicts } from "../../data/index";
import { ContentCard } from "../../components/contentCard";
import { CardGrid } from "../../components/cardGrid";
import { Breadcrumb } from "../../components/breadcrumb";

export default async function EraPage({
  params,
}: {
  params: Promise<{ eraSlug: string }>;
}) {
  const { eraSlug } = await params;
  const era = getEraBySlug(eraSlug);

  const eraData = await getEraWithConflicts(eraSlug);

  if (!era || !eraData) {
    notFound();
  }

  return (
    <main className="min-h-screen">
      <div className="container mx-auto px-4 pt-8">
        <Breadcrumb items={[{ label: era.title, href: `/eras/${eraSlug}` }]} />
      </div>
      <CardGrid title={era.title} description={era.description}>
        {eraData.conflicts?.map((conflict) => (
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
