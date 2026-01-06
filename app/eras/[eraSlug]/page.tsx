import { notFound } from "next/navigation";
import { getEraBySlug, getEraWithConflicts } from "../../data/index";
import { ContentCard } from "../../components/contentCard";
import { CardGrid } from "../../components/cardGrid";
import { Breadcrumb } from "../../components/breadcrumb";
import type { Conflict } from "../../data/types";

// Era page showing the conflicts that took place during a specific time frame
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
        {eraData.conflicts?.map((conflict: Conflict) => (
          <ContentCard
            key={conflict.slug}
            title={conflict.title}
            cardImage={conflict.cardImage}
            startDate={conflict.startDate}
            endDate = {conflict.endDate}
            imageAlt={`${conflict.title} background`}
            href={`/eras/${eraSlug}/${conflict.slug}`}
          />
        ))}
      </CardGrid>
    </main>
  );
}
