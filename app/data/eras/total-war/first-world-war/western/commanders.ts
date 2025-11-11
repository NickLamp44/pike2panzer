import type { Commander } from "../../../../types";

export const commanders: Commander[] = [
  //John J Pershing
  {
    slug: "john-j-pershing",
    name: "John J. Pershing",
    rank: "General of the Armies",
    side: [{ name: "Allied Powers" }],
    nationality: "United States of America",
    dateOfBirth: "September 13, 1860",
    dateOfDeath: "July 15, 1948",
    image:
      "/eras/total-war/first-world-war/western-front/commanders/john_j_pershing.png",
    flag: "/flags/usa.png",
    description: [
      "John Joseph 'Black Jack' Pershing was the commander of the American Expeditionary Forces (AEF) during World War I. A disciplined and deliberate leader, Pershing was tasked with building an army of millions from scratch and integrating them into the Allied war effort while maintaining American independence of command.",
      "Pershing emphasized training, discipline, and aggressive offensive tactics. He resisted calls to amalgamate U.S. troops under British and French command, instead insisting that American forces fight as a unified army. Under his leadership, the AEF played decisive roles in halting the German offensives of 1918 and spearheading the Allied counteroffensive that ended the war.",
      "After the Armistice, Pershing was celebrated as a national hero and became the only American ever promoted to the unique rank of General of the Armies in his lifetime—a title later held posthumously by George Washington.",
    ],
    awards: [
      {
        name: "General of the Armies of the United States",
        description:
          "The highest rank ever held in the U.S. Army, bestowed upon Pershing in recognition of his leadership and service during World War I.",
        dateStarted: "September 3, 1919",
        dateEnded: "July 15, 1948",
      },
      {
        name: "Distinguished Service Cross",
        description:
          "Awarded for extraordinary heroism in combat during World War I, recognizing Pershing's leadership and bravery under fire during the early campaigns of 1918.",
        dateAwarded: "1919",
      },
      {
        name: "Army Distinguished Service Medal",
        description:
          "Granted for exceptionally meritorious service to the government in a duty of great responsibility during World War I.",
        dateAwarded: "1919",
      },
    ],
    majorBattle: [
      {
        name: "Battle of Cantigny",
        description:
          "The first major American offensive of World War I. Under Pershing’s oversight, the 1st U.S. Division captured Cantigny on May 28, 1918, demonstrating American capability and boosting Allied morale.",
        startDate: "May 28, 1918",
        endDate: "May 31, 1918",
      },
      {
        name: "Battle of Château-Thierry",
        description:
          "Pershing's troops helped halt the German advance toward Paris, fighting alongside French forces to reclaim key territory along the Marne River in June 1918.",
        startDate: "June 3, 1918",
        endDate: "June 26, 1918",
      },
      {
        name: "Battle of Saint-Mihiel",
        description:
          "The first major operation conducted entirely by the American Expeditionary Forces under Pershing’s independent command. The offensive successfully reduced the German salient at Saint-Mihiel, proving the effectiveness of the new U.S. Army.",
        startDate: "September 12, 1918",
        endDate: "September 16, 1918",
      },
      {
        name: "Meuse-Argonne Offensive",
        description:
          "The largest and bloodiest operation in U.S. military history, involving over 1.2 million American soldiers. Pershing coordinated a massive assault that ultimately broke through German lines, leading to the Armistice of November 11, 1918.",
        startDate: "September 26, 1918",
        endDate: "November 11, 1918",
      },
    ],
  },

  // Joseph Joffre
  {
    slug: "joseph-joffre",
    name: "Joseph Joffre",
    rank: "Commander-in-Chief of the French Army",
    side: [{ name: "Allied Powers" }],
    nationality: "French",
    dateOfBirth: "1852-01-12",
    dateOfDeath: "1931-01-03",
    image: "",
    flag: "/flags/france.png",
    description: [
      "Joseph Joffre was a French general best known for serving as Commander-in-Chief of the French Army during the early years of World War I. Calm, methodical, and highly organized, Joffre earned the affectionate nickname 'Papa Joffre' for his reassuring leadership and composure under pressure.",

      "At the outbreak of war in 1914, Joffre directed France’s initial offensives along the German border during the Battle of the Frontiers. Despite suffering setbacks, he maintained control, reorganized his forces, and launched a decisive counterattack at the Battle of the Marne that halted the German advance toward Paris.",

      "As the war settled into trench warfare, Joffre oversaw several major offensives in 1915 aimed at breaking the stalemate, though with limited success. The immense casualties of Verdun and the Somme in 1916 ultimately weakened his position, leading to his replacement by General Robert Nivelle later that year.",

      "For his service and leadership during France’s most critical moments, Joffre was promoted to Marshal of France in 1916, the nation’s highest military distinction, and remained a revered figure until his death in 1931.",
    ],
    awards: [
      {
        name: "Marshal of France",
        description:
          "Highest military distinction awarded for his leadership during the early years of the Great War, especially at the Battle of the Marne.",
        dateStarted: "1916",
        dateEnded: "1916",
      },
      {
        name: "Commander-in-Chief of the French Army",
        description:
          "Overall commander of French forces on the Western Front during the opening years of World War I.",
        dateStarted: "1914",
        dateEnded: "1916",
      },
    ],
    majorBattle: [
      {
        name: "Battle of the Frontiers",
        description:
          "In August 1914, Joffre ordered a series of offensives along the French-German border, hoping to recapture Alsace-Lorraine. The plan failed as German forces outflanked the French armies, but Joffre’s calm leadership and strategic withdrawals prevented total collapse and allowed him to regroup for the counterattack at the Marne.",
        startDate: "1914-08-07",
        endDate: "1914-09-13",
      },
      {
        name: "Battle of the Marne",
        description:
          "In September 1914, Joffre directed a masterful counteroffensive that stopped the German advance toward Paris. Exploiting a gap between German armies and coordinating with the British Expeditionary Force, his forces forced the Germans to retreat to the Aisne, saving France from defeat and earning him national hero status.",
        startDate: "1914-09-06",
        endDate: "1914-09-12",
      },
      {
        name: "Second Battle of Artois",
        description:
          "Part of Joffre’s 1915 campaign to break the trench deadlock, French forces temporarily captured parts of Vimy Ridge but were driven back after suffering heavy casualties. The battle exposed the challenges of attacking entrenched German positions without overwhelming artillery support.",
        startDate: "1915-05-09",
        endDate: "1915-06-18",
      },
      {
        name: "Second Battle of Champagne",
        description:
          "In autumn 1915, Joffre launched another major offensive in Champagne to pierce the German front. Despite initial progress, the advance stalled under heavy machine-gun and artillery fire, leading to another costly stalemate.",
        startDate: "1915-09-25",
        endDate: "1915-10-06",
      },
      {
        name: "Battle of Verdun",
        description:
          "When the Germans attacked Verdun in February 1916, Joffre initially underestimated the threat but quickly placed General Philippe Pétain in charge of the defense. Joffre ensured reinforcements and logistics to sustain the fortress city, though the prolonged bloodshed damaged his reputation.",
        startDate: "1916-02-21",
        endDate: "1916-12-18",
      },
      {
        name: "Battle of the Somme",
        description:
          "Planned as a joint Franco-British offensive, the Somme was intended to relieve pressure on Verdun and break the German line. Although Joffre oversaw the initial planning, the British assumed a leading role. The immense casualties and limited territorial gains further eroded confidence in Joffre’s leadership.",
        startDate: "1916-07-01",
        endDate: "1916-11-18",
      },
    ],
  },
  // Philippe Pétain
  {
    slug: "philippe-petain",
    name: "Philippe Pétain",
    rank: "General of the French Army",
    side: [{ name: "Allied Powers" }],
    nationality: "French",
    dateOfBirth: "1856-04-24",
    dateOfDeath: "1951-07-23",
    image:
      "/eras/total-war/first-world-war/western-front/commanders/petain.jpg",
    flag: "/flags/france.png",
    description: [
      "Philippe Pétain was a French general who rose to prominence during World War I for his exceptional leadership and mastery of defensive warfare. Known as the 'Lion of Verdun,' he gained national fame for organizing and sustaining the French defense during one of the war’s bloodiest battles.",

      "Pétain’s calm demeanor, tactical innovation, and attention to troop welfare made him a respected figure among soldiers. He emphasized artillery coordination, rotating units to avoid exhaustion, and ensuring adequate supplies—methods that proved vital to holding Verdun against relentless German assaults.",

      "Later in the war, Pétain was appointed Commander-in-Chief of the French Army in 1917 following the disastrous Nivelle Offensive and subsequent army mutinies. He restored morale through reforms, discipline tempered with understanding, and a defensive strategy that stabilized the French front until the final Allied offensives of 1918.",

      "By war’s end, Pétain was celebrated as one of France’s greatest military leaders and was later promoted to Marshal of France in recognition of his service and his critical role in securing victory on the Western Front.",
    ],
    awards: [
      {
        name: "Marshal of France",
        description:
          "Highest military distinction in France, awarded for his leadership at Verdun and throughout 1917–1918.",
        dateStarted: "1918",
        dateEnded: "1918",
      },
      {
        name: "Commander-in-Chief of the French Army",
        description:
          "Assumed command after the Nivelle Offensive to restore order and morale among the troops.",
        dateStarted: "1917",
        dateEnded: "1918",
      },
    ],
    majorBattle: [
      {
        name: "Battle of Verdun",
        description:
          "Pétain took command of the French defense in February 1916 during the German assault on Verdun. He reorganized the defenses, ensured efficient artillery use, and introduced the 'Voie Sacrée' supply line to keep the fortress supplied. His leadership and morale-boosting tactics turned Verdun into a symbol of French resilience.",
        startDate: "1916-02-21",
        endDate: "1916-12-18",
      },
      {
        name: "Battle of the Somme",
        description:
          "During the Somme Offensive, Pétain commanded the French Second Army on the right flank. His forces supported British operations while maintaining pressure on German positions, demonstrating effective coordination between Allied armies.",
        startDate: "1916-07-01",
        endDate: "1916-11-18",
      },
      {
        name: "Second Battle of the Aisne (Nivelle Offensive)",
        description:
          "Although not the architect of the offensive, Pétain opposed General Nivelle’s overambitious plan. After its failure and widespread mutinies, Pétain was appointed Commander-in-Chief. He restored stability through reforms, improving conditions for soldiers and refusing to waste lives on futile attacks.",
        startDate: "1917-04-16",
        endDate: "1917-05-09",
      },
      {
        name: "Battle of Malmaison",
        description:
          "Under Pétain’s command, French forces achieved a significant victory at Malmaison in October 1917. The carefully planned assault combined artillery precision and infantry coordination, proving his emphasis on preparation and limited objectives effective.",
        startDate: "1917-10-23",
        endDate: "1917-10-27",
      },
      {
        name: "German Spring Offensive",
        description:
          "In 1918, Pétain commanded French forces during Germany’s massive spring attacks. He managed reserves carefully and held key positions until Allied counteroffensives turned the tide, demonstrating disciplined and strategic leadership.",
        startDate: "1918-03-21",
        endDate: "1918-07-18",
      },
      {
        name: "Hundred Days Offensive",
        description:
          "During the final phase of the war, Pétain coordinated French operations alongside Foch’s overall Allied command. His forces advanced steadily as German resistance collapsed, leading to the Armistice of November 1918.",
        startDate: "1918-08-08",
        endDate: "1918-11-11",
      },
    ],
  },

  // Ferdinand Foch
  {
    slug: "ferdinand-foch",
    name: "Ferdinand Foch",
    rank: "Supreme Allied Commander",
    side: [{ name: "Allied Powers" }],
    nationality: "French",
    dateOfBirth: "1851-10-02",
    dateOfDeath: "1929-03-20",
    image: "/eras/total-war/first-world-war/western-front/commanders/foch.jpg",
    flag: "/flags/france.png",
    description: [
      "Ferdinand Foch was a French general and military theorist who rose to become Supreme Commander of the Allied Armies during the final phase of World War I. A firm believer in offensive action and unity of command, Foch’s strategic coordination was instrumental in turning the tide of the war in 1918.",

      "At the outbreak of the war, Foch commanded the French XX Corps at the Battle of the Frontiers and later the Ninth Army at the Marne, where his leadership and resolve helped stop the German advance. Throughout 1915–1916, he directed major operations at Artois and the Somme, earning a reputation for determination and tactical skill.",

      "In 1918, as the German Spring Offensive threatened to break the Allied lines, Foch was appointed Supreme Allied Commander, tasked with unifying French, British, and later American forces under a single coordinated strategy. His calm yet assertive leadership stabilized the front and set the stage for a series of decisive counteroffensives.",

      "Under his direction, the Allies launched the Hundred Days Offensive, breaking through German defenses and forcing an armistice in November 1918. For his achievements, Foch was elevated to Marshal of France, as well as Marshal of Great Britain and Poland, becoming one of the most celebrated Allied leaders of the Great War.",
    ],
    awards: [
      {
        name: "Marshal of France",
        description:
          "Highest French military rank, awarded for his leadership as Supreme Allied Commander during the final campaigns of World War I.",
        dateStarted: "1918",
        dateEnded: "1918",
      },
      {
        name: "Supreme Allied Commander",
        description:
          "Unified commander of all Allied forces on the Western Front, coordinating French, British, and American armies during the final year of the war.",
        dateStarted: "1918",
        dateEnded: "1918",
      },
    ],
    majorBattle: [
      {
        name: "Battle of the Frontiers",
        description:
          "At the start of World War I, Foch commanded the French XX Corps in Lorraine. His forces fought stubbornly during the early engagements, helping to slow the German advance despite suffering heavy casualties.",
        startDate: "1914-08-07",
        endDate: "1914-09-13",
      },
      {
        name: "Battle of the Marne",
        description:
          "As commander of the French Ninth Army, Foch played a decisive role in the Allied counterattack at the Marne. His steadfast defense and timely counterassaults helped halt the German advance toward Paris, contributing to one of the war’s most important Allied victories.",
        startDate: "1914-09-06",
        endDate: "1914-09-12",
      },
      {
        name: "Second Battle of Artois",
        description:
          "In 1915, Foch commanded Army Group North during the French offensive in Artois. The attack aimed to break the German line near Arras but achieved limited success due to strong defenses and coordination issues.",
        startDate: "1915-05-09",
        endDate: "1915-06-18",
      },
      {
        name: "Battle of the Somme",
        description:
          "In 1916, Foch led the French Tenth Army during the joint Franco-British offensive on the Somme. His coordination with British forces showcased the growing cooperation between the Allies and helped divert German resources from Verdun.",
        startDate: "1916-07-01",
        endDate: "1916-11-18",
      },
      {
        name: "German Spring Offensive",
        description:
          "During Germany’s massive 1918 assault, Foch was appointed Supreme Allied Commander to unify the response. His skillful management of reserves and insistence on coordinated defense prevented a German breakthrough and restored Allied momentum.",
        startDate: "1918-03-21",
        endDate: "1918-07-18",
      },
      {
        name: "Hundred Days Offensive",
        description:
          "Foch masterminded the final Allied offensives from August to November 1918. Coordinating multinational forces, he oversaw a series of decisive victories that broke the German army’s resistance and forced the Armistice that ended the war.",
        startDate: "1918-08-08",
        endDate: "1918-11-11",
      },
    ],
  },

  // Douglas Haig
  {
    slug: "douglas-haig",
    name: "Douglas Haig",
    rank: "Field Marshal, Commander-in-Chief of the British Expeditionary Force",
    side: [{ name: "United Kingdom" }],
    nationality: "British",
    dateOfBirth: "1861-06-19",
    dateOfDeath: "1928-01-29",
    image: "/eras/total-war/first-world-war/western-front/commanders/haig.jpg",
    flag: "/flags/united-kingdom.png",
    description: [
      "Field Marshal Douglas Haig was a British Army officer who served as Commander-in-Chief of the British Expeditionary Force (BEF) from late 1915 until the end of World War I. He played a central role in directing Britain’s major offensives on the Western Front and was one of the most influential Allied leaders of the war.",

      "Haig’s leadership during battles such as the Somme (1916) and Passchendaele (1917) made him a controversial figure. Critics condemned the enormous casualties, but others credit him with adapting to the realities of industrialized warfare and developing the coordinated tactics that would later secure victory.",

      "In 1918, Haig’s command was instrumental in resisting the German Spring Offensive and in leading the Allied counteroffensive known as the Hundred Days Offensive, which ultimately broke the German Army’s resistance and brought the war to an end.",

      "After the war, Haig was promoted to Field Marshal and dedicated his later years to supporting veterans through organizations such as the Royal British Legion. His legacy remains debated but undeniably central to Britain’s experience of the Great War.",
    ],
    awards: [
      {
        name: "Field Marshal",
        description:
          "Britain’s highest military rank, awarded for his leadership of the British Expeditionary Force during the Great War.",
        dateStarted: "1917",
        dateEnded: "1917",
      },
      {
        name: "Commander-in-Chief of the British Expeditionary Force",
        description:
          "Supreme commander of British and later Dominion forces on the Western Front from 1915 to 1918.",
        dateStarted: "1915",
        dateEnded: "1918",
      },
    ],
    majorBattle: [
      {
        name: "Battle of Loos",
        description:
          "Haig commanded the British First Army during the Battle of Loos in September 1915. Although initially successful, the offensive failed to achieve a breakthrough due to poor coordination and the limitations of early gas warfare. Despite the setback, Haig’s handling of the battle led to his promotion to Commander-in-Chief later that year.",
        startDate: "1915-09-25",
        endDate: "1915-10-08",
      },
      {
        name: "Battle of the Somme",
        description:
          "In 1916, Haig launched the Somme Offensive to relieve pressure on Verdun and weaken the German Army. The battle became infamous for massive casualties on both sides, particularly on the first day. While strategically indecisive, it marked a turning point in the British Army’s growth in experience, tactics, and industrial capability.",
        startDate: "1916-07-01",
        endDate: "1916-11-18",
      },
      {
        name: "Battle of Arras",
        description:
          "In April 1917, Haig’s forces attacked near Arras to support the French Nivelle Offensive. British troops captured Vimy Ridge and advanced significantly, though gains could not be fully exploited. The battle demonstrated improvements in planning, artillery coordination, and combined arms tactics under Haig’s command.",
        startDate: "1917-04-09",
        endDate: "1917-05-16",
      },
      {
        name: "Battle of Passchendaele (Third Battle of Ypres)",
        description:
          "Haig launched the Passchendaele Offensive in mid-1917 to break through Flanders and capture vital German submarine bases. The offensive achieved limited ground at immense cost due to relentless rain and mud. Despite its controversy, it drained German reserves before the decisive campaigns of 1918.",
        startDate: "1917-07-31",
        endDate: "1917-11-10",
      },
      {
        name: "German Spring Offensive",
        description:
          "In 1918, Haig faced Germany’s massive spring attacks aimed at ending the war before American forces arrived in full strength. His calm leadership, coordination with French General Pétain, and strategic defense prevented a German breakthrough, buying time for the Allies to regroup.",
        startDate: "1918-03-21",
        endDate: "1918-07-18",
      },
      {
        name: "Hundred Days Offensive",
        description:
          "Haig’s forces spearheaded the Allied counteroffensive beginning at Amiens in August 1918. Combining tanks, aircraft, and infantry in coordinated assaults, the BEF advanced steadily, liberating occupied territory and breaking German resistance, leading to the Armistice on November 11, 1918.",
        startDate: "1918-08-08",
        endDate: "1918-11-11",
      },
    ],
  },

  // Helmth von Moltke the Younger
  {
    slug: "helmth-von-moltke",
    name: "Helmuth von Moltke the Younger",
    rank: "Generaloberst (Colonel General)",
    side: [{ name: "Central Powers" }],
    nationality: "German Empire",
    dateOfBirth: "May 25, 1848",
    dateOfDeath: "June 18, 1916",
    image:
      "/eras/total-war/first-world-war/western-front/commanders/helmuth_von_moltke.png",
    flag: "/flags/german_empire.png",
    description: [
      "Helmuth Johannes Ludwig von Moltke, known as Moltke the Younger, was the Chief of the German General Staff at the outbreak of World War I. A nephew of the famed Field Marshal Helmuth von Moltke the Elder, he inherited the vast responsibility of executing Germany’s war plans in 1914.",
      "Moltke oversaw the implementation of the Schlieffen Plan — Germany’s strategy to rapidly defeat France before turning east to confront Russia. However, his cautious modifications to the plan, including weakening the crucial right wing and diverting forces to the Eastern Front, are often cited as contributing factors to Germany’s failure to achieve a swift victory in the West.",
      "Under immense pressure and health strain following the German retreat at the Marne, Moltke was relieved of his command in September 1914. He later served in a lesser advisory capacity until his death in 1916, haunted by the burden of Germany’s early strategic failures.",
    ],
    awards: [
      {
        name: "Order of the Red Eagle, 1st Class with Oak Leaves and Swords",
        description:
          "Awarded for distinguished military service to the German Empire, recognizing Moltke’s career in the Prussian General Staff and his early leadership in World War I.",
        dateAwarded: "1914",
      },
      {
        name: "Iron Cross, 1st Class",
        description:
          "Granted for his role in commanding and organizing the initial German offensives during the opening months of World War I.",
        dateAwarded: "1914",
      },
    ],
    majorBattle: [
      {
        name: "Battle of the Frontiers",
        description:
          "Moltke directed the overall German invasion of France and Belgium as part of the Schlieffen Plan. While initial advances were successful, the campaign began to lose coordination due to the rapid pace of operations and Moltke’s increasingly decentralized command.",
        startDate: "August 7, 1914",
        endDate: "September 6, 1914",
      },
      {
        name: "Siege of Liège",
        description:
          "Moltke ordered the capture of Liège to secure Germany’s invasion route through Belgium. The siege marked the first battle of the war and showcased Germany’s heavy artillery, including the 'Big Bertha' guns, which demolished the city’s ring fortresses.",
        startDate: "August 5, 1914",
        endDate: "August 16, 1914",
      },
      {
        name: "Battle of Mons",
        description:
          "The first engagement between German and British forces. Moltke’s armies successfully pushed back the British Expeditionary Force, though the resistance delayed the German advance toward Paris.",
        startDate: "August 23, 1914",
        endDate: "August 24, 1914",
      },
      {
        name: "First Battle of the Marne",
        description:
          "Moltke’s overstretched armies failed to encircle Paris as planned. French and British counterattacks halted the German advance, forcing a retreat to the Aisne and ending hopes for a quick victory. The setback marked the beginning of trench warfare on the Western Front.",
        startDate: "September 6, 1914",
        endDate: "September 12, 1914",
      },
    ],
  },

  // Eric von Falkenhayn
  {
    slug: "erich-von-flakenhayn",
    name: "Erich von Falkenhayn",
    rank: "General of the Infantry",
    side: [{ name: "Central Powers" }],
    nationality: "German Empire",
    dateOfBirth: "September 11, 1861",
    dateOfDeath: "April 8, 1922",
    image:
      "/eras/total-war/first-world-war/western-front/commanders/erich_von_falkenhayn.png",
    flag: "/flags/german_empire.png",
    description: [
      "Erich von Falkenhayn was a senior German general and strategist who served as Chief of the German General Staff from September 1914 to August 1916, succeeding Helmuth von Moltke the Younger. Pragmatic and politically shrewd, Falkenhayn sought to achieve a decisive victory on the Western Front through attrition and calculated offensives rather than sweeping maneuvers.",
      "He is best remembered for his role in planning and directing the Battle of Verdun in 1916, where his aim was to 'bleed France white' by inflicting massive casualties. Though the campaign inflicted heavy losses on both sides, it failed to break French morale and ultimately became a costly stalemate.",
      "After Verdun and the setbacks on both the Eastern Front and in Romania, Falkenhayn was replaced by Paul von Hindenburg and Erich Ludendorff. He later commanded German and Austro-Hungarian forces in Romania and Palestine with competence, but his reputation never fully recovered from Verdun’s human cost.",
    ],
    awards: [
      {
        name: "Pour le Mérite",
        description:
          "Germany’s highest military order, awarded to Falkenhayn in recognition of his leadership as Chief of the General Staff and his command of operations in Romania and the Eastern Front.",
        dateAwarded: "1915",
      },
      {
        name: "Order of the Red Eagle, 1st Class with Oak Leaves and Swords",
        description:
          "Awarded for distinguished service to the German Empire during his tenure as Minister of War and Chief of Staff.",
        dateAwarded: "1914",
      },
    ],
    majorBattle: [
      {
        name: "First Battle of Ypres",
        description:
          "Falkenhayn directed the final phase of the 1914 campaign in Flanders, attempting to break Allied lines and capture Channel ports. Despite fierce fighting, both sides entrenched, marking the end of mobile warfare on the Western Front.",
        startDate: "October 19, 1914",
        endDate: "November 22, 1914",
      },
      {
        name: "Second Battle of Ypres",
        description:
          "Under Falkenhayn’s overall strategic direction, German forces launched the first large-scale poison gas attack on the Western Front. The assault caused heavy Allied losses but failed to achieve a decisive breakthrough.",
        startDate: "April 22, 1915",
        endDate: "May 25, 1915",
      },
      {
        name: "Battle of Verdun",
        description:
          "Falkenhayn’s most infamous campaign. Conceived as a battle of attrition to exhaust French manpower and morale, Verdun became one of the bloodiest battles of the war. The French defense under General Pétain turned it into a symbol of resilience, and the campaign ultimately failed to achieve Falkenhayn’s objectives.",
        startDate: "February 21, 1916",
        endDate: "December 18, 1916",
      },
      {
        name: "Battle of the Somme",
        description:
          "While Verdun raged, Falkenhayn’s defensive forces also faced a massive Anglo-French offensive on the Somme. The German Army suffered enormous casualties and ceded ground, further undermining Falkenhayn’s position as Chief of Staff.",
        startDate: "July 1, 1916",
        endDate: "November 18, 1916",
      },
      {
        name: "Romanian Campaign",
        description:
          "After being replaced by Hindenburg and Ludendorff, Falkenhayn was assigned command of the Ninth Army in Transylvania. He led successful operations against Romanian forces, capturing key positions such as Sibiu and contributing to the eventual Central Powers’ conquest of Romania.",
        startDate: "September 1916",
        endDate: "January 1917",
      },
    ],
  },

  //Paul von Hindenburg
  {
    slug: "paul-von-hindenburg",
    name: "Paul von Hindenburg",
    rank: "Generalfeldmarschall (Field Marshal)",
    side: [{ name: "Central Powers" }],
    nationality: "German Empire",
    dateOfBirth: "October 2, 1847",
    dateOfDeath: "August 2, 1934",
    image:
      "/eras/total-war/first-world-war/western-front/commanders/paul_von_hindenburg.png",
    flag: "/flags/german_empire.png",
    description: [
      "Paul von Hindenburg was a German Field Marshal and one of the most celebrated military leaders of the First World War. Known for his stoic demeanor and unshakeable composure, Hindenburg became a national hero after his victory at the Battle of Tannenberg in 1914, where he and his chief of staff, Erich Ludendorff, destroyed a Russian army in East Prussia.",
      "Following his early successes on the Eastern Front, Hindenburg rose to become Chief of the German General Staff in 1916, replacing Erich von Falkenhayn. Alongside Ludendorff, he oversaw Germany’s military strategy for the remainder of the war, directing campaigns on multiple fronts and implementing the 'Hindenburg Program' to mobilize the entire German economy for total war.",
      "Despite his reputation as a national savior, Hindenburg’s leadership during the final phase of the war could not prevent Germany’s collapse in 1918. After the war, he entered politics, serving as President of Germany from 1925 to 1934, where his decisions—most notably appointing Adolf Hitler as Chancellor—had profound consequences for world history.",
    ],
    awards: [
      {
        name: "Pour le Mérite (Blue Max)",
        description:
          "Germany’s highest military order, awarded for his decisive victories on the Eastern Front, including Tannenberg and the Masurian Lakes.",
        dateAwarded: "1914",
      },
      {
        name: "Order of the Black Eagle",
        description:
          "The highest Prussian order of chivalry, bestowed upon Hindenburg for his extraordinary military service and command achievements.",
        dateAwarded: "1915",
      },
      {
        name: "Field Marshal of the German Empire",
        description:
          "Promoted to Field Marshal following his victories in the East, the highest rank in the Imperial German Army.",
        dateAwarded: "1914",
      },
    ],
    majorBattle: [
      {
        name: "Battle of Tannenberg",
        description:
          "Hindenburg, alongside Ludendorff and aided by intelligence from Max Hoffmann, orchestrated one of Germany’s most famous victories. The encirclement and destruction of the Russian Second Army under General Samsonov in East Prussia resulted in over 90,000 Russian prisoners and made Hindenburg a national hero.",
        startDate: "August 26, 1914",
        endDate: "August 30, 1914",
      },
      {
        name: "First Battle of the Masurian Lakes",
        description:
          "Capitalizing on momentum from Tannenberg, Hindenburg launched another offensive against the Russian First Army. The Germans forced a retreat from East Prussia, solidifying Hindenburg’s reputation as the master of the Eastern Front.",
        startDate: "September 9, 1914",
        endDate: "September 14, 1914",
      },
      {
        name: "Second Battle of the Masurian Lakes",
        description:
          "Hindenburg’s winter offensive in early 1915 aimed to encircle Russian forces in East Prussia. Despite severe weather and limited success, the operation drove the Russians from German territory and inflicted heavy casualties.",
        startDate: "February 7, 1915",
        endDate: "February 22, 1915",
      },
      {
        name: "Gorlice–Tarnów Offensive",
        description:
          "As Chief of the General Staff, Hindenburg coordinated with Austro-Hungarian forces under Mackensen in the 1915 offensive that shattered the Russian lines in Galicia, forcing a massive retreat and capturing Poland.",
        startDate: "May 2, 1915",
        endDate: "June 22, 1915",
      },
      {
        name: "Battle of Verdun (Oversight Role)",
        description:
          "After assuming command from Falkenhayn in 1916, Hindenburg inherited the ongoing Verdun campaign. Though he did not initiate it, he managed its conclusion, withdrawing forces to stabilize the front and conserve manpower.",
        startDate: "February 21, 1916",
        endDate: "December 18, 1916",
      },
      {
        name: "Battle of the Somme (Oversight Role)",
        description:
          "Taking control during the final stages of the Somme, Hindenburg reorganized Germany’s Western Front defenses, ordering the construction of the Hindenburg Line to shorten positions and prepare for future Allied offensives.",
        startDate: "July 1, 1916",
        endDate: "November 18, 1916",
      },
      {
        name: "German Spring Offensive (Kaiserschlacht)",
        description:
          "Hindenburg and Ludendorff launched Germany’s final major offensive in 1918, attempting to break the stalemate before American forces arrived in full strength. Initial breakthroughs gave way to exhaustion and counterattacks, marking the beginning of Germany’s final collapse.",
        startDate: "March 21, 1918",
        endDate: "July 18, 1918",
      },
    ],
  },

  //Erich Ludendorff
  {
    slug: "erich-ludendorff",
    name: "Erich Ludendorff",
    rank: "General of the Infantry",
    side: [{ name: "Central Powers" }],
    nationality: "German Empire",
    dateOfBirth: "April 9, 1865",
    dateOfDeath: "December 20, 1937",
    image:
      "/eras/total-war/first-world-war/western-front/commanders/erich_ludendorff.png",
    flag: "/flags/german_empire.png",
    description: [
      "Erich Ludendorff was a German general and strategist whose influence over Germany’s war effort rivaled that of any political leader during World War I. Known for his organizational brilliance, ambition, and iron will, Ludendorff first gained fame as the architect of Germany’s victory at the Battle of Tannenberg in 1914, where his coordination with General Paul von Hindenburg led to the destruction of a Russian army in East Prussia.",
      "Following his early success, Ludendorff became the driving force behind German military operations on both the Eastern and Western Fronts. As First Quartermaster General under Hindenburg from 1916 to 1918, he effectively became Germany’s de facto military ruler, directing strategy, production, and manpower in what became known as the 'Hindenburg–Ludendorff Dictatorship.'",
      "In 1918, Ludendorff launched the German Spring Offensive (Kaiserschlacht), a final gamble to win the war before American forces arrived in full strength. Although initially successful, the offensive stalled and ultimately failed, leading to Germany’s collapse. After the war, Ludendorff became involved in right-wing nationalist politics and participated in the failed Beer Hall Putsch with Adolf Hitler in 1923. His later years were marked by bitterness and disillusionment with both the army and the Weimar Republic.",
    ],
    awards: [
      {
        name: "Pour le Mérite (Blue Max)",
        description:
          "Awarded for his decisive role in the victory at the Battle of Tannenberg and his contributions to German military operations on the Eastern Front.",
        dateAwarded: "1914",
      },
      {
        name: "Order of the Black Eagle",
        description:
          "Conferred for his leadership and service as First Quartermaster General during the height of Germany’s wartime mobilization.",
        dateAwarded: "1917",
      },
    ],
    majorBattle: [
      {
        name: "Battle of Liège",
        description:
          "As a staff officer under General von Emmich, Ludendorff personally led troops in capturing key forts at Liège during the opening days of the war. His bold leadership and quick thinking earned him national recognition and promotion.",
        startDate: "August 5, 1914",
        endDate: "August 16, 1914",
      },
      {
        name: "Battle of Tannenberg",
        description:
          "Ludendorff, serving as Hindenburg’s Chief of Staff, masterminded the encirclement and annihilation of Russia’s Second Army under General Samsonov. The victory resulted in over 90,000 prisoners and transformed Hindenburg and Ludendorff into national heroes.",
        startDate: "August 26, 1914",
        endDate: "August 30, 1914",
      },
      {
        name: "First Battle of the Masurian Lakes",
        description:
          "Following Tannenberg, Ludendorff and Hindenburg launched another offensive that forced the Russian First Army to retreat from East Prussia, further stabilizing Germany’s Eastern Front.",
        startDate: "September 9, 1914",
        endDate: "September 14, 1914",
      },
      {
        name: "Gorlice–Tarnów Offensive",
        description:
          "Ludendorff played a key strategic role in coordinating German and Austro-Hungarian forces in the breakthrough that forced Russian withdrawal from Poland and the Eastern Front’s temporary stabilization.",
        startDate: "May 2, 1915",
        endDate: "June 22, 1915",
      },
      {
        name: "Battle of Verdun (Oversight Role)",
        description:
          "After replacing Falkenhayn with Hindenburg as Chief of Staff, Ludendorff oversaw the final stages of the Verdun campaign, shifting Germany’s focus toward consolidation and defensive fortification.",
        startDate: "February 21, 1916",
        endDate: "December 18, 1916",
      },
      {
        name: "Battle of the Somme (Oversight Role)",
        description:
          "In late 1916, Ludendorff helped reorganize German defensive strategy following the Somme, implementing the construction of the Hindenburg Line to shorten and strengthen Germany’s front.",
        startDate: "July 1, 1916",
        endDate: "November 18, 1916",
      },
      {
        name: "German Spring Offensive (Kaiserschlacht)",
        description:
          "Ludendorff’s final and most ambitious campaign, launched in 1918 to break the Allied front before American reinforcements arrived. Initial German gains were dramatic but unsustainable, and the offensive’s failure exhausted Germany’s army, paving the way for its eventual surrender.",
        startDate: "March 21, 1918",
        endDate: "July 18, 1918",
      },
    ],
  },
];
