import { notFound } from "next/navigation";
import { getConflictWithAllData, getEraBySlug } from "../../../data/index";
import { ContentCard } from "../../../components/contentCard";
import { CardGrid } from "../../../components/cardGrid";
import { SideCard } from "../../../components/sideCard";
import { WeaponTechCard } from "../../../components/weaponTechCard";
import { Breadcrumb } from "../../../components/breadcrumb";
import type { Theater, Side, Campaign, WeaponTech } from "../../../data/types";

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

  // if a conflict has theaters that deserve their own section
  if (conflictData.theaters && conflictData.theaters.length > 0) {
    return (
      <main className="min-h-screen p-1 max-w-4xl mx-auto">
        <Breadcrumb items={breadcrumbItems} />
        <h1 className="text-4xl font-bold mb-4">{conflictData.title}</h1>

        <h2 className="text-2xl font-semibold mb-4">Road To War</h2>
        <div className="mb-5 space-y-4">
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

        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-4">Factions at War</h2>
          <div className="grid gap-6">
            <CardGrid>
              {conflictData.sides.map((side: Side, index: number) => (
                <SideCard
                  key={side.slug || index}
                  side={side}
                  commanders={side.commanders}
                />
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

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">
            Key Campaigns & Battles
          </h2>
          <div className="grid gap-6">
            <CardGrid>
              {conflictData.campaigns.map(
                (campaign: Campaign, index: number) => (
                  <ContentCard
                    key={campaign.slug || index}
                    title={campaign.title}
                    cardImage={campaign.cardImage}
                    imageAlt={`${campaign.title} background`}
                    href={`/eras/${eraSlug}/${conflictSlug}/${campaign.slug}`}
                  />
                )
              )}
            </CardGrid>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Important Weapon Tech</h2>
          <div className="grid gap-6">
            <CardGrid>
              {conflictData.weaponTech.map(
                (weaponTech: WeaponTech, index: number) => (
                  <WeaponTechCard
                    key={weaponTech.slug || index}
                    weapon={weaponTech}
                  />
                )
              )}
            </CardGrid>
          </div>
        </section>
      </main>
    );
  }

  // if the conflict as a whole is the main theater
  return (
    <main className="min-h-screen p-8 max-w-4xl mx-auto">
      <Breadcrumb items={breadcrumbItems} />
      <h1 className="text-4xl font-bold mb-4">{conflictData.title}</h1>

      <h2 className="text-2xl font-semibold mb-4">Road To War</h2>
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

      {conflictData.sides && conflictData.sides.length > 0 && (
        <section className="flex mb-8">
          <h2 className="text-2xl font-semibold mb-4">Major Factions</h2>
          <div className="flex grow grid gap-6">
            <CardGrid>
              {conflictData.sides.map((side: Side, index: number) => (
                <SideCard
                  key={side.slug || index}
                  side={side}
                  commanders={side.commanders}
                />
              ))}
            </CardGrid>
          </div>
        </section>
      )}

      {conflictData.weaponTech && conflictData.weaponTech.length > 0 && (
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Important Weapon Tech</h2>
          <div className="grid gap-6">
            <CardGrid>
              {conflictData.weaponTech.map(
                (weaponTech: WeaponTech, index: number) => (
                  <WeaponTechCard
                    key={weaponTech.slug || index}
                    weapon={weaponTech}
                  />
                )
              )}
            </CardGrid>
          </div>
        </section>
      )}
    </main>
  );
}
