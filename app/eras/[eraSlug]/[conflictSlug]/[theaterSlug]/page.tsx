import { notFound } from "next/navigation";
import { getTheaterWithAllData, getEraBySlug } from "../../../../data/index";
import { Breadcrumb } from "../../../../components/breadcrumb";

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

  const theaterData = await getTheaterWithAllData(
    eraSlug,
    conflictSlug,
    theaterSlug
  );
  const era = getEraBySlug(eraSlug);

  if (!theaterData || !era) {
    notFound();
  }

  return (
    <main className="min-h-screen p-8 max-w-4xl mx-auto">
      <Breadcrumb
        items={[
          { label: era.title, href: `/eras/${eraSlug}` },
          {
            label: theaterData.title,
            href: `/eras/${eraSlug}/${conflictSlug}`,
          },
          {
            label: theaterData.title,
            href: `/eras/${eraSlug}/${conflictSlug}/${theaterSlug}`,
          },
        ]}
      />
      <h1 className="text-4xl font-bold mb-4">{theaterData.title}</h1>
      <p className="text-lg text-muted-foreground mb-8">
        {theaterData.description}
      </p>

      {theaterData.commanders && theaterData.commanders.length > 0 && (
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Key Commanders</h2>
          <div className="grid gap-4">
            {theaterData.commanders.map((commander: any, index: number) => (
              <div key={index} className="border rounded-lg p-4">
                <h3 className="font-semibold">{commander.name}</h3>
                <p className="text-sm text-muted-foreground">
                  {commander.rank} - {commander.side}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {theaterData.weapons && theaterData.weapons.length > 0 && (
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Weapons & Technology</h2>
          <div className="grid gap-4">
            {theaterData.weapons.map((weapon: any, index: number) => (
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
