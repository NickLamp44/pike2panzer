import { notFound } from "next/navigation";
import { getConflictBySlug } from "@/app/data/content";
import { ContentCard } from "@/app/components/contentCard";
import { CardGrid } from "@/app/components/cardGrid";

export default async function ConflictPage({
  params,
}: {
  params: Promise<{ eraSlug: string; conflictSlug: string }>;
}) {
  const { eraSlug, conflictSlug } = await params;
  const conflict = getConflictBySlug(eraSlug, conflictSlug);

  if (!conflict) {
    notFound();
  }

  // If conflict has theaters, display them as cards
  if (conflict.hasTheaters && conflict.theaters) {
    return (
      <main className="min-h-screen">
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

  // If no theaters, display the article content
  return (
    <main className="min-h-screen p-8 max-w-4xl mx-auto">
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

      {conflict.article && (
        <section className="prose prose-lg dark:prose-invert">
          <div className="whitespace-pre-wrap">{conflict.article}</div>
        </section>
      )}
    </main>
  );
}
