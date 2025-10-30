import { notFound } from "next/navigation";
import {
  getTheaterBySlug,
  getEraBySlug,
  getConflictBySlug,
} from "@/app/data/content";
import { Breadcrumb } from "@/app/components/breadcrumb";

export default async function TheaterPage({
  params,
}: {
  params: Promise<{
    eraSlug: string;
    conflictSlug: string;
    theaterSlug: string;
  }>;
}) {
  const { eraSlug, conflictSlug, theaterSlug } = await params;
  const theater = getTheaterBySlug(eraSlug, conflictSlug, theaterSlug);
  const era = getEraBySlug(eraSlug);
  const conflict = getConflictBySlug(eraSlug, conflictSlug);

  if (!theater || !era || !conflict) {
    notFound();
  }

  return (
    <main className="min-h-screen p-8 max-w-4xl mx-auto">
      <Breadcrumb
        items={[
          { label: era.title, href: `/eras/${eraSlug}` },
          { label: conflict.title, href: `/eras/${eraSlug}/${conflictSlug}` },
          {
            label: theater.title,
            href: `/eras/${eraSlug}/${conflictSlug}/${theaterSlug}`,
          },
        ]}
      />
      <h1 className="text-4xl font-bold mb-4">{theater.title}</h1>
      <p className="text-lg text-muted-foreground mb-8">
        {theater.description}
      </p>

      {theater.commanders && theater.commanders.length > 0 && (
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Key Commanders</h2>
          <div className="grid gap-4">
            {theater.commanders.map((commander, index) => (
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

      {theater.weaponsTechnology && theater.weaponsTechnology.length > 0 && (
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Weapons & Technology</h2>
          <div className="grid gap-4">
            {theater.weaponsTechnology.map((weapon, index) => (
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

      {theater.article && (
        <section className="prose prose-lg dark:prose-invert max-w-none">
          <div className="whitespace-pre-wrap">{theater.article}</div>
        </section>
      )}
    </main>
  );
}
