import type { WeaponTech } from "../../../types";

export const weaponTech: WeaponTech[] = [
  // Machine Gun
  // {
  //   name: "Machine Gun",
  //   slug: "machine-gun",
  //   image: "/eras/total-war/ww1/western-front/World-War-I-Machine-guns.jpg",
  //   type: "Infantry Weapon",
  //   description: [
  //     "The machine gun was one of the most defining and devastating weapons of the First World War. Capable of firing hundreds of rounds per minute, it transformed the battlefield from one of mobility to one of attrition. Originally viewed as a defensive weapon, the machine gun quickly became the cornerstone of trench warfare, where small crews could halt entire waves of advancing infantry with sustained, automatic fire. Both the Allied and Central Powers deployed machine guns on every front—from the muddy trenches of the Western Front to the deserts of the Middle East and the frozen plains of the Eastern Front. These weapons made frontal assaults nearly suicidal and led to the development of new tactics, such as creeping barrages, tank assaults, and infiltration warfare.",
  //   ],

  //   impact: [
  //     "Machine guns dominated no-man’s-land and turned mass infantry charges into slaughter. Their use forced armies to dig in, sparking the creation of extensive trench systems stretching from the North Sea to Switzerland. The stalemate they created pushed innovation in artillery, tanks, and aircraft to overcome their lethal firepower. By war’s end, the machine gun had cemented itself as the king of the battlefield—forever changing military tactics and marking the dawn of modern warfare.",
  //   ],
  // },
  // Tank
  {
    name: "Tank",
    slug: "tank",
    image: "/eras/total-war/ww1/western-front/mk-v-tank.jpg",
    type: "Armored Vehicle",
    description: [
      "The tank emerged during the First World War as a revolutionary answer to the deadlock of trench warfare. Designed to cross barbed wire, crush obstacles, and resist small-arms fire, tanks were conceived to restore mobility to the battlefield—something the machine gun and artillery had all but destroyed. Though crude and unreliable in their earliest forms, tanks represented the dawn of mechanized warfare and a glimpse into the future of combat. First deployed by the British during the Battle of the Somme in 1916, tanks astonished friend and foe alike. Their slow, rumbling advance across no-man’s-land, impervious to rifle fire, had an immense psychological impact on German troops. Early tanks often broke down or became stuck in mud, but their potential was undeniable. By 1917–1918, improved designs and coordinated “tank-infantry-artillery” tactics began to yield real results, particularly during the Battle of Cambrai—the first large-scale and successful tank offensive in history.",
    ],
    impact: [
      "Though primitive, tanks reintroduced movement to the battlefield and shattered the notion that the defense would always dominate. Their success in 1918, particularly in Allied offensives on the Western Front, demonstrated their potential as both a physical and psychological weapon. By the war’s end, military strategists worldwide recognized the tank’s transformative power—ushering in the mechanized warfare that would define the 20th century. The tank was not just a weapon—it was a symbol of innovation born from desperation. In a war defined by stagnation, it embodied humanity’s drive to overcome even the deadliest technological barriers.",
    ],
  },
  //  poison gas
  {
    name: "Poison Gas",
    slug: "poison-gas",
    image: "/eras/total-war/ww1/gas-attack.jpg",
    type: "Chemical Weapon",
    description: [
      "Poison gas was one of the most feared and horrific innovations of the First World War. First used on a large scale by Germany at Ypres in 1915, chemical weapons introduced a new level of psychological and physical terror to the battlefield. Invisible, indiscriminate, and often lingering for hours, gas attacks could devastate entire units, forcing soldiers to live in constant fear of the wind’s direction. Initially, poison gas was viewed as a way to break the stalemate of trench warfare—able to flush defenders out of their trenches and create opportunities for infantry advances. However, its unpredictable nature and reliance on weather conditions meant it was as dangerous to the attacker as to the enemy. By the war’s end, both sides had developed a wide range of gases, delivery systems, and countermeasures, turning chemical warfare into a grim science.",
    ],
    impact: [
      "Though poison gas caused less than 5% of total battlefield deaths, its psychological and physical effects were far greater. Gas warfare eroded morale, inflicted lifelong injuries, and symbolized the industrial cruelty of modern war. Survivors often suffered blindness, lung scarring, and chronic illnesses for decades after the Armistice. The horrors of gas warfare led directly to the 1925 Geneva Protocol, banning the use of chemical weapons in international conflict. Despite this, the Great War’s legacy of chemical warfare remained a haunting reminder of how rapidly human ingenuity could turn toward destruction.",
    ],
  },

  // Submarine
  {
    name: "Submarine",
    slug: "submarine",
    image: "/eras/total-war/ww1/german-u-boat-1916.jpg",
    type: "Submersible Naval Vessal",
    description: [
      "The submarine, or U-boat (from the German Unterseeboot), was one of the most transformative and controversial weapons of the First World War. While surface fleets still represented national pride and naval tradition, submarines introduced a new, unseen form of warfare—one waged beneath the waves, where stealth, endurance, and surprise were the decisive factors. Germany, with its powerful and innovative U-boat fleet, used submarines to challenge Britain’s naval blockade and to cut off vital supply routes across the Atlantic. What began as a tactical tool quickly evolved into a strategic weapon capable of influencing global politics and bringing nations into the war—most notably, the United States in 1917.",
    ],
    impact: [
      "Submarines changed naval warfare forever. They proved that small, stealthy vessels could counter even the mightiest surface fleets, signaling the end of traditional line-of-battle engagements. The U-boat campaign was both a tactical success and a strategic failure—while it inflicted enormous damage, it also provoked the United States to join the war, tipping the balance decisively in favor of the Allies. By war’s end, submarines had sunk over 5,000 ships, at the cost of many of their own crews. The bravery and isolation of submarine service made it one of the most perilous forms of warfare. The Great War established the submarine as a permanent and essential weapon of naval power—its silent menace reshaping the seas for the century to come.",
    ],
  },
  // Forms of Aircraft
  {
    name: "Areal Recon, Bombers, & Fighter Planes",
    slug: "air-craft",
    image: "/eras/total-war/ww1/Sopwith_Pup.jpg",
    type: "Air Craft",
    description: [
      "The First World War marked the birth of military aviation. What began in 1914 as a handful of fragile, wood-and-canvas observation planes quickly evolved into an entire new dimension of warfare—one fought in the skies. Airplanes, once dismissed as novelties, became vital for reconnaissance, artillery spotting, bombing, and combat. By the end of the war, the air had become as fiercely contested as the trenches below. Aviation developed at a breathtaking pace. In just four years, aircraft transformed from unarmed scouts to fast, heavily armed fighters and long-range bombers. The men who flew them—known as “aces”—became legends and symbols of bravery, their duels in the sky offering a rare glimpse of heroism amidst the industrial slaughter on the ground.",
    ],
    impact: [
      "By the Armistice, aircraft had evolved from experimental curiosities into essential weapons of war. Their roles expanded to include air reconnaissance, interception, ground attack, and long-range bombing—all concepts that would define 20th-century warfare. Aviation also transformed the image of the soldier: the lone pilot, dueling high above the battlefield, symbolized a new kind of warfare—technological, modern, and personal. The “Knights of the Air,” such as Manfred von Richthofen, Eddie Rickenbacker, and Albert Ball, became icons of courage and innovation. The Great War proved that control of the air could determine the course of battles on the ground. From fragile biplanes to armored bombers, the conflict laid the foundations for modern air power—forever changing the way wars would be fought.",
    ],
  },
  // Artillery
  {
    name: "Artillery",
    slug: "artillery",
    image: "/eras/total-war/ww1/artillery.jpg",
    type: "Infantry Support Weapon",
    description: [
      "Artillery was the dominant weapon of the First World War—the true destroyer of men, machines, and landscapes. More than any other arm, it defined the character and brutality of the conflict. From the opening bombardments of 1914 to the creeping barrages of 1918, artillery reshaped battlefields into desolate moonscapes and accounted for nearly 70% of all casualties throughout the war. In an age of industrial warfare, artillery became the most powerful expression of technological might. Armies on all fronts relied on vast barrages to soften enemy defenses, cover infantry assaults, and counter opposing batteries. The thunder of guns was constant; their psychological and physical effects on soldiers were immense, often leading to the condition known as “shell shock.”",
    ],
    impact: [
      " Artillery shaped both the strategy and psychology of the Great War. Entire battles were planned around bombardments—such as the week-long barrage before the Battle of the Somme (1916), which fired over 1.5 million shells in seven days. Yet, many shells failed to explode or destroy deep trenches, leaving attacking infantry exposed to machine-gun fire once the barrage lifted. For soldiers, the experience of artillery was constant and terrifying. The earth-shaking blasts, flying shrapnel, and days-long bombardments caused “shell shock”—a term coined to describe the psychological trauma induced by relentless explosions and concussive pressure.",
    ],
  },
  // Dreadnoughts
  {
    name: "Dreadnoughts",
    slug: "dreadnoughts",
    image: "/eras/total-war/ww1/HMS_Dreadnought_1906.jpg",
    type: "Armoured Surface Naval Vessal ",
    description: [
      "The dreadnought was the ultimate symbol of naval power in the early 20th century—a floating fortress of steel that embodied national pride, industrial might, and global influence. When HMS Dreadnought was launched by Britain in 1906, it revolutionized naval warfare overnight, rendering every existing battleship obsolete. Her combination of “all-big-gun” armament, steam turbine propulsion, and heavy armor set a new standard for maritime dominance, igniting an arms race that would help fuel the tensions leading to the First World War. During the Great War, dreadnoughts represented the pinnacle of naval technology. They were the deterrents, the guardians of trade routes, and the prestige weapons of the world’s great powers. Yet despite their massive power, most spent the war in cautious stalemate—too valuable to risk in battle, yet too important to leave idle.",
    ],
    impact: [
      "The dreadnought was both a triumph and a paradox. It embodied industrial and technological progress but was largely neutralized by caution and evolving threats such as submarines and aircraft. Despite their limited combat action, dreadnoughts served as the backbone of naval deterrence, ensuring sea control and influencing global strategy. When the war ended, the cost of maintaining vast fleets and the changing nature of naval warfare led to disarmament efforts like the Washington Naval Treaty of 1922, which sought to limit battleship construction. Yet the dreadnought’s legacy endured. It represented the height of early 20th-century naval engineering and the idea that national power could be measured in steel, tonnage, and guns. In the Great War, the dreadnought reigned supreme—not through battles won, but through the oceans it kept silent.",
    ],
  },
];
