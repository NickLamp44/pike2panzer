import { notFound } from "next/navigation";
import { getConflictWithAllData, getEraBySlug } from "../../../data/index";
import { ContentCard } from "../../../components/contentCard";
import { CardGrid } from "../../../components/cardGrid";
import { SideCard } from "../../../components/sideCard";
import { Breadcrumb } from "../../../components/breadcrumb";
import type { Theater, Side, } from "../../../data/types";

// a page about the various conflicts of an era
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

  // if a conflict has theaters that deserve thier own section
  if (conflictData.theaters && conflictData.theaters.length > 0) {
    return (
      <main className="min-h-screen p-8 max-w-4xl mx-auto">
        <Breadcrumb items={breadcrumbItems} />
        {/* conflict name */}
        <h1 className="text-4xl font-bold mb-4">{conflictData.title}</h1>

        {/* conflict intro/road to war paragraph */}
        <h2 className="text-2xl font-semibold mb-4">Road To War</h2>
        <div className="mb-8 space-y-4">
          {conflictData.intro.map(
            (section: { text: string[] }, sectionIndex: number) => (
              <div key={sectionIndex} className="space-y-4">
                {section.text.map(
                  (paragraph: string, paragraphIndex: number) => (
                    <p
                      key={paragraphIndex}
                      className="text-lg text-muted-foreground leading-relaxed"
                    >
                      {paragraph}
                    </p>
                  )
                )}
              </div>
            )
          )}
        </div>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Major Factions</h2>
          <div className="grid gap-6">
            <CardGrid>
              {conflictData.sides.map((side: Side, index: number) => (
                <SideCard key={side.slug || index} side={side} />
              ))}
            </CardGrid>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Major Theaters</h2>
          <div className="grid gap-6">
            <CardGrid>
              {conflictData.theaters.map((theater: Theater, index: number) => (
                <ContentCard
                  key={theater.slug || index}
                  title={theater.title}
                  cardImage={theater.cardImage}
                  imageAlt={`${theater.title} background`}
                  href={`/eras/${eraSlug}/${conflictSlug}/${theater.slug}`}
                />
              ))}
            </CardGrid>
          </div>
        </section>

        {/* lasting impact section  */}
        {/* suggest reading + source documents */}
      </main>
    );
  }
  // if the conflict as a whole is the main theater
  return (
    <main className="min-h-screen p-8 max-w-4xl mx-auto">
      <Breadcrumb items={breadcrumbItems} />
      {/* conflict name */}
      <h1 className="text-4xl font-bold mb-4">{conflictData.title}</h1>

      <h2 className="text-2xl font-semibold mb-4">Road To War!</h2>
      {/* conflict intro/road to war paragraph */}
      {conflictData.intro && conflictData.intro.length > 0 && (
        <div className="mb-8 space-y-4">
          {conflictData.intro.map(
            (section: { text: string[] }, sectionIndex: number) => (
              <div key={sectionIndex} className="space-y-4">
                {section.text.map(
                  (paragraph: string, paragraphIndex: number) => (
                    <p
                      key={paragraphIndex}
                      className="text-lg text-muted-foreground leading-relaxed"
                    >
                      {paragraph}
                    </p>
                  )
                )}
              </div>
            )
          )}
        </div>
      )}

      {/* the Main sides during the conflict. will be split into each alliance, country, faction .... it will include some info on the ruler for each side along with their flag  */}
      {conflictData.sides && conflictData.sides.length > 0 && (
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Major Factions</h2>
          <div className="grid gap-6">
            <CardGrid>
              {conflictData.side.map((side: Side, index: number) => (
                <SideCard key={side.slug || index} side={side} />
              ))}
            </CardGrid>
          </div>
        </section>
      )}

      <CardGrid
        title={conflictData.title}
        description={conflictData.cardDescription}
      >
        {conflictData.theaters.map((theater: Theater) => (
          <ContentCard
            key={theater.slug}
            title={theater.title}
            cardImage={theater.cardImage}
            imageAlt={`${theater.title} background`}
            href={`/eras/${eraSlug}/${conflictSlug}/${theater.slug}`}
          />
        ))}
      </CardGrid>
      {/* key military commanders */}

      {/* New or inovative weapon Technology that was first or widely used during this confict ... each weaponTech will have a short paragraph explaining the tech and its uses... it will then have small cards with examples of these weapon classes used by the sides invovled */}

      {/* new or inovative strategies or tactics used in the conflict  */}
      {/* major battles or campaigns fought  */}
      {/* lasting impact section  */}
      {/* suggest reading + source documents */}
    </main>
  );
}
