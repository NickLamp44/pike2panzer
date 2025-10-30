import { notFound } from "next/navigation";
import { getConflictBySlug, getEraBySlug } from "@/app/data/content";
import { ContentCard } from "@/app/components/contentCard";
import { CardGrid } from "@/app/components/cardGrid";
import { Breadcrumb } from "@/app/components/breadcrumb";

export default async function ConflictPage({
  params,
}: {
  params: Promise<{ eraSlug: string; conflictSlug: string }>;
}) {
  const { eraSlug, conflictSlug } = await params;
  const conflict = getConflictBySlug(eraSlug, conflictSlug);
  const era = getEraBySlug(eraSlug);

  if (!conflict || !era) {
    notFound();
  }

  const breadcrumbItems = [
    { label: era.title, href: `/eras/${eraSlug}` },
    { label: conflict.title, href: `/eras/${eraSlug}/${conflictSlug}` },
  ];

  if (conflict.hasTheaters && conflict.theaters) {
    return (
      <main className="min-h-screen">
        <div className="container mx-auto px-3 pt-8">
          <Breadcrumb items={breadcrumbItems} />
        </div>
        <CardGrid title={conflict.title} description={conflict.description}>
          {conflict.theaters.map((theater) => (
            <ContentCard
              key={theater.slug}
              title={theater.title}
              imageUrl={theater.imageUrl}
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
      <h1 className="text-4xl font-bold mb-4">{conflict.title}</h1>
      <p className="text-lg text-muted-foreground mb-8">
        {conflict.description}
      </p>

      {conflict.commanders && conflict.commanders.length > 0 && (
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Key Commanders</h2>
          <div className="grid gap-4">
            {conflict.commanders.map((commander, index) => (
              <div key={index} className="border rounded-lg p-4">
                <h3 className="font-semibold">{commander.name}</h3>
                <p className="text-sm text-muted-foreground">
                  {commander.role} - {commander.side}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {conflict.weaponsTechnology && conflict.weaponsTechnology.length > 0 && (
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Weapons & Technology</h2>
          <div className="grid gap-4">
            {conflict.weaponsTechnology.map((weapon, index) => (
              <div key={index} className="border rounded-lg p-4">
                <h3 className="font-semibold">{weapon.name}</h3>
                <p className="text-sm mb-2">{weapon.description}</p>
                <p className="text-sm text-muted-foreground">
                  <strong>Significance:</strong> {weapon.significance}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {conflict.tactics && conflict.tactics.length > 0 && (
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Tactics & Overall Strategy</h2>
          <div className="grid gap-4">
            {conflict.tactics.map((tactic, index) => (
              <div key={index} className="border rounded-lg p-4">
                <h3 className="font-semibold">{tactic.side}</h3>
                <p className="text-sm mb-2">{tactic.description}</p>
                <p className="text-sm text-muted-foreground">
                  <strong>Significance:</strong> {tactic.significance}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {conflict.article && (
        <section className="prose prose-lg dark:prose-invert">
          <div className="whitespace-pre-wrap">{conflict.article}</div>
        </section>
      )}
    </main>
  );
}
