import { notFound } from "next/navigation";
import { getConflictWithAllData, getEraBySlug } from "../../../data/index";
import { ContentCard } from "../../../components/contentCard";
import { CardGrid } from "../../../components/cardGrid";
import { Breadcrumb } from "../../../components/breadcrumb";
import type { Theater, Commander, WeaponTech } from "../../../data/types";

export default async function ConflictPage({
  params,
}: {
  params: Promise<{ eraSlug: string; conflictSlug: string }>;
}) {
  const { eraSlug, conflictSlug } = await params;

  const conflictData = await getConflictWithAllData(eraSlug, conflictSlug);
  const era = getEraBySlug(eraSlug);

  if (!conflictData || !era) {
    notFound();
  }

  const breadcrumbItems = [
    { label: era.title, href: `/eras/${eraSlug}` },
    { label: conflictData.title, href: `/eras/${eraSlug}/${conflictSlug}` },
  ];

  if (conflictData.theaters && conflictData.theaters.length > 0) {
    return (
      <main className="min-h-screen">
        <div className="container mx-auto px-4 pt-8">
          <Breadcrumb items={breadcrumbItems} />
        </div>
        <CardGrid
          title={conflictData.title}
          description={conflictData.description}
        >
          {conflictData.theaters.map((theater: Theater) => (
            <ContentCard
              key={theater.slug}
              title={theater.title}
              imageUrl={theater.cardImage}
              imageAlt={`${theater.title} background`}
              href={`/eras/${eraSlug}/${conflictSlug}/${theater.slug}`}
            />
          ))}
        </CardGrid>
      </main>
    );
  }

  return (
    <main className="min-h-screen p-8 max-w-4xl mx-auto">
      <Breadcrumb items={breadcrumbItems} />
      <h1 className="text-4xl font-bold mb-4">{conflictData.title}</h1>
      <p className="text-lg text-muted-foreground mb-8">
        {conflictData.description}
      </p>

      {conflictData.commanders && conflictData.commanders.length > 0 && (
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Key Commanders</h2>
          <div className="grid gap-4">
            {conflictData.commanders.map(
              (commander: Commander, index: number) => (
                <div key={index} className="border rounded-lg p-4">
                  <h3 className="font-semibold">{commander.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    {commander.rank} - {commander.side}
                  </p>
                </div>
              )
            )}
          </div>
        </section>
      )}

      {conflictData.weapons && conflictData.weapons.length > 0 && (
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Weapons & Technology</h2>
          <div className="grid gap-4">
            {conflictData.weapons.map((weapon: WeaponTech, index: number) => (
              <div key={index} className="border rounded-lg p-4">
                <h3 className="font-semibold">{weapon.name}</h3>
                <p className="text-sm mb-2">{weapon.description}</p>
              </div>
            ))}
          </div>
        </section>
      )}
    </main>
  );
}
