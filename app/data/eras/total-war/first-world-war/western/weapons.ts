import type { Weapon } from "../../../../types";

export const weapons: Weapon[] = [
  // LEE-ENFIELD
  {
    slug: "lee-enfield",
    name: "Lee-Enfield",
    type: "Bolt Action Rifle",
    cardImage: "/",
    cardDescription:
      "Standard-issue rifle for the British and Commonwealth forces during World War I.",
    description: [
      "The Lee-Enfield was the standard-issue rifle for the British and Commonwealth forces during World War I. Renowned for its accuracy, reliability, and fast rate of fire, it featured a 10-round magazine—double that of most other rifles of the era.",
      "The rifle’s smooth bolt-action and sturdy design made it ideal for the harsh conditions of trench warfare. Well-trained British soldiers could fire up to 20–30 aimed shots per minute, a tactic known as the ‘Mad Minute,’ giving them a significant advantage in defensive engagements.",
    ],
    side: [
      {
        name: "Commonwealth Forces",
        aliances: [
          { name: "United Kingdom", flag: "/" },
          { name: "India", flag: "/" },
          { name: "ANZAC", flag: "/" },
        ],
      },
    ],
    images: [
      {
        url: " ",
        description: "British soldiers with Lee-Enfield rifles in trenches",
        alt: "Lee-Enfield rifle WWI",
        source: " ",
      },
    ],
  },

  // GEWEHR 98
  {
    slug: "",
    name: "Gewehr 98",
    type: "Bolt Action Rifle",
    cardImage: "/",
    cardDescription: "",
    description: [
      "The Gewehr 98 was the primary service rifle of the German Empire during World War I. Designed by Mauser, it was known for exceptional accuracy and long-range performance.",
      "Its five-round internal magazine and strong bolt system influenced countless rifle designs throughout the 20th century. Though slightly cumbersome in trench combat due to its length, it was reliable and deadly in the hands of trained marksmen.",
    ],
    side: [{ name: "German Empire" }],
    images: [
      {
        url: " ",
        description: "German infantryman with Gewehr 98 rifle",
        alt: "Gewehr 98 rifle",
        source: " ",
      },
    ],
  },

  // SPRINGFIELD
  {
    slug: "",
    name: "M1903 Springfield",
    type: "Bolt Action Rifle",
    cardImage: "/",
    cardDescription: "",
    description: [
      "The M1903 Springfield was the standard U.S. Army service rifle during World War I, prized for its accuracy and craftsmanship. Derived partly from the Mauser design, it combined robust engineering with excellent sighting systems.",
      "American snipers and infantrymen valued its precision, and it remained in service well beyond the war. Though production was limited early on, it set the standard for American bolt-action rifles for decades.",
    ],
    side: [{ name: "United States" }],
    images: [
      {
        url: " ",
        description: "U.S. soldier with M1903 Springfield rifle",
        alt: "M1903 Springfield",
        source: " ",
      },
    ],
  },

  // TRENCH GUN
  {
    slug: "",
    name: "Winchester M1897 Trench Gun",
    type: "Pump Action Shotgun",
    cardImage: "/",
    cardDescription: "",
    description: [
      "The Winchester M1897 Trench Gun was a pump-action shotgun adapted for close-quarters combat in the trenches. It featured a 5-round tubular magazine and could be rapidly fired by holding the trigger while cycling the pump—known as ‘slam fire.’",
      "Its devastating short-range firepower made it ideal for clearing enemy trenches, earning a fearsome reputation among German troops. Many M1897s were fitted with bayonets and heat shields for military use.",
    ],
    side: [{ name: "United States" }],
    images: [
      {
        url: " ",
        description: "U.S. soldier armed with Winchester 1897 trench gun",
        alt: "Winchester 1897 Trench Gun",
        source: " ",
      },
    ],
  },

  // LEBEL
  {
    slug: "",
    name: "Lebel Model 1886 M93",
    type: "Bolt Action Rifle",
    cardImage: "/",
    cardDescription: "",
    description: [
      "The Lebel Model 1886 M93 was the standard rifle of the French Army during World War I and the first military rifle to use smokeless powder cartridges. Its revolutionary 8mm ammunition gave French soldiers a ballistic advantage early in the war.",
      "Although reliable and accurate, its tubular magazine and long length made it slow to reload and awkward in close combat. Nevertheless, it remained in widespread use throughout the conflict.",
    ],
    side: [{ name: "France" }],
    images: [
      {
        url: " ",
        description: "French soldier with Lebel M93 rifle",
        alt: "Lebel Model 1886 M93",
        source: " ",
      },
    ],
  },

  // BERTHIER
  {
    slug: "",
    name: "Berthier Mle 1907/15 & Mle 1916",
    type: "Bolt Action Rifle",
    cardImage: "/",
    cardDescription: "",
    description: [
      "The Berthier rifle series was introduced to supplement and later replace the Lebel in French service. It was lighter, simpler to load, and used a three-round (later five-round) clip-fed magazine, making it better suited for rapid trench combat.",
      "The Mle 1907/15 and 1916 versions became the backbone of the French infantry by late 1916, praised for their reliability and improved handling over the older Lebel.",
    ],
    side: [{ name: "France" }],
    images: [
      {
        url: " ",
        description: "Berthier rifle used by French soldiers",
        alt: "Berthier Mle 1916",
        source: " ",
      },
    ],
  },

  // SIDEARMS
  {
    slug: "",
    name: "Webley Revolver",
    type: "Revolver",
    cardImage: "/",
    cardDescription: "",
    description: [
      "The Webley Revolver was the standard-issue sidearm of British and Commonwealth officers during World War I. The most common model, the Webley Mk VI, fired a powerful .455 cartridge and was known for its durability and stopping power.",
      "Its top-break design allowed for quick reloading with automatic extraction of spent shells, a valuable feature in trench combat. While somewhat heavy, it was extremely reliable under harsh battlefield conditions.",
    ],
    side: [{ name: "United Kingdom" }],
    images: [
      {
        url: " ",
        description: "Webley Mk VI revolver",
        alt: "Webley Revolver",
        source: " ",
      },
    ],
  },

  {
    slug: "",

    name: "Luger P08",
    type: "Semi Automatic Pistol",
    cardImage: "/",
    cardDescription: "",
    description: [
      "The Luger P08 was the standard German sidearm during World War I, instantly recognizable for its distinctive toggle-lock action. Chambered in 9mm Parabellum, it was prized for its accuracy and fine craftsmanship.",
      "Although expensive and complex to produce, it became a symbol of the German officer class. The Luger’s balance and ergonomics made it one of the most iconic handguns in history.",
    ],
    side: [{ name: "German Empire" }],
    images: [
      {
        url: " ",
        description: "German Luger P08 pistol",
        alt: "Luger P08",
        source: " ",
      },
    ],
  },

  {
    slug: "",
    name: "M1911",
    type: "Semi Automatic Pistol",
    cardImage: "/",
    cardDescription: "",
    description: [
      "The Colt M1911 was the standard U.S. military sidearm during World War I. Designed by John Browning, it fired the powerful .45 ACP cartridge and featured a simple, rugged design ideal for trench warfare.",
      "It was praised for its reliability, stopping power, and ease of maintenance, becoming one of the most influential handguns in history and serving in various forms for over a century.",
    ],
    side: [{ name: "United States" }],
    images: [
      { url: " ", description: "Colt M1911 pistol", alt: "M1911", source: " " },
    ],
  },

  {
    slug: "",
    name: "Lebel Revolver Mle 1892",
    type: "Revolver",
    cardImage: "/",
    cardDescription: "",
    description: [
      "The Lebel Revolver Mle 1892 was the standard French military sidearm during World War I. Chambered in 8mm Lebel, it was a well-crafted, double-action revolver used by officers and support troops.",
      "Though underpowered compared to contemporary pistols, it was highly reliable and easy to maintain in battlefield conditions.",
    ],
    side: [{ name: "France" }],
    images: [
      {
        url: " ",
        description: "Lebel Model 1892 revolver",
        alt: "Lebel M1892 Revolver",
        source: " ",
      },
    ],
  },

  // MACHINE GUNS
  {
    slug: "",
    name: "Vickers .303 Machine Gun",
    type: "Water-Cooled Heavy Machine Gun",
    cardImage: "/",
    cardDescription: "",
    description: [
      "The Vickers .303 was the primary British heavy machine gun of World War I. Based on the Maxim design, it was exceptionally reliable, capable of firing 450–600 rounds per minute with water cooling to prevent overheating.",
      "Its dependability made it a mainstay of the British Army, providing sustained fire in both defensive and offensive operations throughout the Western Front.",
    ],
    side: [{ name: "United Kingdom" }],
    images: [
      {
        url: " ",
        description: "British crew operating a Vickers machine gun",
        alt: "Vickers .303 Machine Gun",
        source: " ",
      },
    ],
  },

  {
    slug: "",
    name: "Lewis Gun",
    type: "Light Machine Gun",
    cardImage: "/",
    cardDescription: "",
    description: [
      "The Lewis Gun was a portable air-cooled light machine gun widely used by British, Commonwealth, and later American forces. Recognizable by its distinctive top-mounted pan magazine and barrel shroud, it could fire up to 600 rounds per minute.",
      "It provided crucial mobile firepower for advancing infantry and was also adapted for aircraft use, becoming one of the most versatile weapons of the war.",
    ],
    side: [{ name: "United Kingdom" }],
    images: [
      {
        url: " ",
        description: "British soldier firing a Lewis Gun",
        alt: "Lewis Machine Gun",
        source: " ",
      },
    ],
  },

  {
    slug: "",
    name: "Hotchkiss M1914",
    type: "Heavy Machine Gun",
    cardImage: "/",
    cardDescription: "",
    description: [
      "The Hotchkiss M1914 was a robust and dependable French heavy machine gun chambered in 8mm Lebel. It used metal feed strips instead of belts, which simplified ammunition handling.",
      "Despite its weight, the Hotchkiss served effectively on the front lines and was later adopted by U.S. forces when they joined the war in 1917.",
    ],
    side: [
      {
        name: "Allied Forces",
        aliances: [
          { name: "France", flag: "/" },
          { name: "United States", flag: "/" },
        ],
      },
    ],
    images: [
      {
        url: " ",
        description: "Hotchkiss M1914 crew in action",
        alt: "Hotchkiss M1914",
        source: " ",
      },
    ],
  },

  {
    slug: "",
    name: "Chauchat M1915",
    type: "Light Machine Gun",
    cardImage: "/",
    cardDescription: "",
    description: [
      "The Chauchat M1915 was France’s standard squad automatic weapon during World War I. Lightweight and capable of automatic fire, it allowed infantry to provide suppressive fire while advancing.",
      "However, its open-sided magazine and poor manufacturing quality made it notoriously unreliable, especially in muddy trench conditions.",
    ],
    side: [
      {
        name: "Allied Forces",
        aliances: [
          { name: "France", flag: "/" },
          { name: "United States", flag: "/" },
        ],
      },
    ],
    images: [
      {
        url: " ",
        description: "French soldier with Chauchat machine gun",
        alt: "Chauchat M1915",
        source: " ",
      },
    ],
  },

  {
    slug: "",
    name: "MG 08",
    type: "Heavy Machine Gun",
    cardImage: "/",
    cardDescription: "",
    description: [
      "The MG 08 was the standard German heavy machine gun during World War I, based on Hiram Maxim’s original design. It was water-cooled and capable of sustained fire at around 500 rounds per minute.",
      "Though heavy, it was deadly when deployed in defensive positions, earning a fearsome reputation along the Western Front.",
    ],
    side: [{ name: "German Empire" }],
    images: [
      {
        url: " ",
        description: "German MG 08 machine gun crew",
        alt: "MG 08",
        source: " ",
      },
    ],
  },

  {
    slug: "",
    name: "Browning M1917",
    type: "Water-Cooled Heavy Machine Gun",
    cardImage: "/",
    cardDescription: "",
    description: [
      "The Browning M1917 was an American heavy machine gun that entered service late in World War I. It was water-cooled, highly reliable, and capable of sustained automatic fire with minimal maintenance.",
      "It became one of the most respected U.S. weapons of the war, continuing service well into the next global conflict.",
    ],
    side: [{ name: "United States" }],
    images: [
      {
        url: " ",
        description: "American soldiers operating a Browning M1917",
        alt: "Browning M1917",
        source: " ",
      },
    ],
  },

  {
    slug: "",
    name: "Browning Automatic Rifle (BAR) M1918",
    type: "Automatic Rifle",
    cardImage: "/",
    cardDescription: "",
    description: [
      "The Browning Automatic Rifle, or BAR, was introduced by the United States near the end of World War I. Designed by John Browning, it provided mobile automatic fire for advancing infantry units.",
      "Light enough to be carried by a single soldier, it bridged the gap between rifles and machine guns and remained in service for decades.",
    ],
    side: [{ name: "United States" }],
    images: [
      {
        url: " ",
        description: "U.S. soldier carrying a BAR M1918",
        alt: "Browning Automatic Rifle M1918",
        source: " ",
      },
    ],
  },

  // INFANTRY SUPPORT WEAPONS
  {
    slug: "",
    name: "Stokes Mortar",
    type: "Infantry Support Weapon",
    cardImage: "/",
    cardDescription: "",
    description: [
      "The Stokes Mortar was a revolutionary British trench mortar introduced in 1915. It was lightweight, simple, and capable of firing high-explosive shells in rapid succession at steep angles—perfect for trench warfare.",
      "Its design became the foundation for modern mortar systems used throughout the 20th century.",
    ],
    side: [{ name: "United Kingdom" }],
    images: [
      {
        url: " ",
        description: "British crew firing a Stokes mortar",
        alt: "Stokes Mortar",
        source: " ",
      },
    ],
  },

  {
    slug: "",
    name: "Quick Firing 18-pounder Field Gun Mk I",
    type: "Field Gun",
    cardImage: "/",
    cardDescription: "",
    description: [
      "The QF 18-pounder was the main British field artillery piece of World War I. Known for its accuracy and rate of fire, it was used for both bombardment and defensive fire throughout the conflict.",
      "It was a reliable and effective gun, remaining in service into World War II with later upgrades.",
    ],
    side: [{ name: "United Kingdom" }],
    images: [
      {
        url: " ",
        description: "British 18-pounder gun crew in action",
        alt: "QF 18-pounder Field Gun",
        source: " ",
      },
    ],
  },

  {
    slug: "",
    name: "7.7cm FK 96 n.A. Feldkanone",
    type: "Field Gun",
    cardImage: "/",
    cardDescription: "",
    description: [
      "The 7.7 cm Feldkanone 96 neuer Art was the standard German field gun during the early years of World War I. It was accurate and quick-firing but lacked range compared to Allied artillery.",
      "Despite being gradually replaced by heavier guns, it remained in widespread use until the war’s end.",
    ],
    side: [{ name: "German Empire" }],
    images: [
      {
        url: " ",
        description: "German 7.7cm FK 96 field gun",
        alt: "Feldkanone 96 n.A.",
        source: " ",
      },
    ],
  },

  {
    slug: "",
    name: "75mm M1897 (French Canon de 75 modèle 1897)",
    type: "Field Gun",
    cardImage: "/",
    cardDescription: "",
    description: [
      "The U.S. Army adopted the French 75mm modèle 1897 late in the war. Its rapid-fire recoil system and precision made it one of the most effective and revolutionary field guns ever built.",
      "American forces used it extensively during the Meuse-Argonne Offensive of 1918.",
    ],
    side: [{ name: "United States" }],
    images: [
      {
        url: " ",
        description: "U.S. gun crew with French 75 field gun",
        alt: "75mm M1897 Field Gun",
        source: " ",
      },
    ],
  },

  {
    slug: "",
    name: "Canon de 75 modèle 1897 (“French 75”)",
    type: "Field Gun",
    cardImage: "/",
    cardDescription: "",
    description: [
      "The French 75 was a revolutionary quick-firing field gun introduced before World War I. It used a hydro-pneumatic recoil system that allowed rapid, accurate fire without re-aiming.",
      "It became the backbone of French artillery and was praised for its reliability, speed, and accuracy throughout the war.",
    ],
    side: [{ name: "France" }],
    images: [
      {
        url: " ",
        description: "French 75 field gun in action",
        alt: "Canon de 75 modèle 1897",
        source: " ",
      },
    ],
  },

  // TANKS
  {
    slug: "",
    name: "Mark V",
    type: "Heavy Tank",
    cardImage: "/",
    cardDescription: "",
    description: [
      "The British Mark V was one of the most advanced tanks of World War I. It featured improved steering and transmission over earlier models and played a major role in the 1918 offensives.",
      "Armed with either machine guns or 6-pounder cannons, it proved effective at breaking through enemy defenses and barbed wire.",
    ],
    side: [{ name: "United Kingdom" }],
    images: [
      {
        url: " ",
        description: "British Mark V tank advancing",
        alt: "Mark V tank",
        source: " ",
      },
    ],
  },

  {
    slug: "",
    name: "A7V",
    type: "Heavy Tank",
    cardImage: "/",
    cardDescription: "",
    description: [
      "The A7V was Germany’s only operational tank design during World War I, with only about 20 produced. It was heavily armored and armed with a 57mm cannon and multiple machine guns.",
      "Though limited in number, the A7V marked Germany’s entry into armored warfare and took part in the first tank-versus-tank battle in history.",
    ],
    side: [{ name: "German Empire" }],
    images: [
      {
        url: " ",
        description: "German A7V tank in 1918",
        alt: "A7V tank",
        source: " ",
      },
    ],
  },

  {
    slug: "",
    name: "Renault FT",
    type: "Light Tank",
    cardImage: "/",
    cardDescription: "",
    description: [
      "The Renault FT was a revolutionary French tank design that introduced the modern layout of a rotating turret, rear engine, and front crew compartment.",
      "Highly maneuverable and mass-produced, it influenced tank design worldwide and saw widespread use by French and U.S. forces in 1918.",
    ],
    side: [
      {
        name: "Allied Forces",
        aliances: [
          { name: "France", flag: "/" },
          { name: "United States", flag: "/" },
        ],
      },
    ],
    images: [
      {
        url: " ",
        description: "Renault FT light tank",
        alt: "Renault FT",
        source: " ",
      },
    ],
  },

  // AIRCRAFT
  {
    slug: "",
    name: "Fokker E.III (Eindecker)",
    type: "Fighter",
    cardImage: "/",
    cardDescription: "",
    description: [
      "The Fokker E.III was the first true fighter aircraft, equipped with synchronized machine guns that fired through the propeller arc. It gave Germany temporary air superiority in 1915–1916, known as the ‘Fokker Scourge.’",
    ],
    side: [{ name: "German Empire" }],
    images: [
      {
        url: " ",
        description: "Fokker Eindecker fighter aircraft",
        alt: "Fokker E.III",
        source: " ",
      },
    ],
  },

  {
    slug: "",
    name: "Fokker Dr.I",
    type: "Triplane Fighter",
    cardImage: "/",
    cardDescription: "",
    description: [
      "The Fokker Dr.I Triplane became one of the most iconic aircraft of World War I, famously flown by Manfred von Richthofen—the ‘Red Baron.’",
      "Its excellent maneuverability made it deadly in dogfights despite its relatively low speed.",
    ],
    side: [{ name: "German Empire" }],
    images: [
      {
        url: " ",
        description: "Fokker Dr.I triplane of the Red Baron",
        alt: "Fokker Dr.I",
        source: " ",
      },
    ],
  },

  {
    slug: "",
    name: "Gotha G.IV",
    type: "Heavy Bomber",
    cardImage: "/",
    cardDescription: "",
    description: [
      "The Gotha G.IV was a twin-engine heavy bomber used by Germany for strategic bombing raids over London and Paris. It could carry up to 500 kg of bombs and represented one of the earliest long-range bombers.",
    ],
    side: [{ name: "German Empire" }],
    images: [
      {
        url: " ",
        description: "Gotha G.IV bomber in flight",
        alt: "Gotha G.IV",
        source: " ",
      },
    ],
  },

  {
    slug: "",
    name: "Zeppelin-Staaken R.VI",
    type: "Strategic Bomber (Riesenflugzeug)",
    cardImage: "/",
    cardDescription: "",
    description: [
      "The Zeppelin-Staaken R.VI was one of the largest aircraft of the war, capable of carrying a 2,000 kg bomb load. It conducted night raids on Allied cities, demonstrating early strategic bombing concepts.",
    ],
    side: [{ name: "German Empire" }],
    images: [
      {
        url: " ",
        description: "Zeppelin-Staaken R.VI giant bomber",
        alt: "R.VI Bomber",
        source: " ",
      },
    ],
  },

  {
    slug: "",
    name: "Nieuport 11 (Bébé)",
    type: "Fighter",
    cardImage: "/",
    cardDescription: "",
    description: [
      "The Nieuport 11 was a nimble French biplane that helped end the ‘Fokker Scourge.’ Armed with a single synchronized machine gun, it was widely used by French, British, and Italian pilots in 1916.",
    ],
    side: [{ name: "France" }],
    images: [
      {
        url: " ",
        description: "French Nieuport 11 fighter",
        alt: "Nieuport 11",
        source: " ",
      },
    ],
  },

  {
    slug: "",
    name: "SPAD VII / SPAD XIII",
    type: "Fighter",
    cardImage: "/",
    cardDescription: "",
    description: [
      "The SPAD VII and later SPAD XIII were among the finest Allied fighters of World War I. Fast, rugged, and heavily armed, they were flown by many top aces, including France’s René Fonck and America’s Eddie Rickenbacker.",
    ],
    side: [{ name: "Allied Forces" }],
    images: [
      {
        url: " ",
        description: "SPAD XIII fighter aircraft",
        alt: "SPAD XIII",
        source: " ",
      },
    ],
  },

  {
    slug: "",
    name: "Voisin III",
    type: "Bomber / Reconnaissance Aircraft",
    cardImage: "/",
    cardDescription: "",
    description: [
      "The Voisin III was an early French bomber and reconnaissance aircraft used from 1914. It was among the first planes to conduct bombing missions, though slow and outdated by mid-war.",
    ],
    side: [{ name: "France" }],
    images: [
      {
        url: " ",
        description: "Voisin III bomber aircraft",
        alt: "Voisin III",
        source: " ",
      },
    ],
  },

  {
    slug: "",
    name: "Breguet 14 B2",
    type: "Light Bomber / Reconnaissance",
    cardImage: "/",
    cardDescription: "",
    description: [
      "The Breguet 14 B2 was a highly advanced French two-seat bomber and reconnaissance aircraft made of metal and wood. Fast, durable, and widely used, it became one of the Allies’ most successful aircraft of the war.",
    ],
    side: [{ name: "France" }],
    images: [
      {
        url: " ",
        description: "Breguet 14 bomber in flight",
        alt: "Breguet 14 B2",
        source: " ",
      },
    ],
  },

  {
    slug: "",
    name: "Sopwith Camel",
    type: "Fighter",
    cardImage: "/",
    cardDescription: "",
    description: [
      "The Sopwith Camel was the most famous British fighter of World War I, credited with shooting down more enemy aircraft than any other Allied plane. It was agile but challenging to fly due to engine torque.",
    ],
    side: [{ name: "United Kingdom" }],
    images: [
      {
        url: " ",
        description: "Sopwith Camel fighter aircraft",
        alt: "Sopwith Camel",
        source: " ",
      },
    ],
  },

  {
    slug: "",
    name: "Royal Aircraft Factory S.E.5a",
    type: "Fighter",
    cardImage: "/",
    cardDescription: "",
    description: [
      "The S.E.5a was one of the best-balanced fighters of World War I, combining speed, stability, and firepower. Flown by British aces like Edward Mannock and James McCudden, it was a favorite among experienced pilots.",
    ],
    side: [{ name: "United Kingdom" }],
    images: [
      {
        url: " ",
        description: "Royal Aircraft Factory S.E.5a fighter",
        alt: "S.E.5a",
        source: " ",
      },
    ],
  },

  {
    slug: "",
    name: "Handley Page O/400",
    type: "Heavy Bomber",
    cardImage: "/",
    cardDescription: "",
    description: [
      "The Handley Page O/400 was the Royal Flying Corps’ principal heavy bomber by 1918. It could carry over 900 kg of bombs and performed long-range raids on German industrial targets and rail lines.",
    ],
    side: [{ name: "United Kingdom" }],
    images: [
      {
        url: " ",
        description: "Handley Page O/400 bomber aircraft",
        alt: "Handley Page O/400",
        source: " ",
      },
    ],
  },
];
