// Major Types

//Eras of War (late-medieval, early-gunpowder, revolutionary-imperial, dawn-industrial-warfare, total-war, post-war)
export interface Era {
  slug: string;
  cardImage: string;
  title: string;
  cardDescription: string; // short paragraph for when a user hovers over a card
  description: string; // more indepth description once a user selects an era
  period: string; // timeframe
  conflicts?: string[]; // reference to the conflicts that take place during that time frame
}

// conflict will ref slugs to the relevant categoires & objects
export interface Conflict {
  slug: string;
  title: string;
  startDate?: string;
  endDate?: string;
  cardImage: string;
  cardDescription: string; // short paragraph for when a user hovers over a card

  sides: string[]; // slug array for alliances/countries/factions involved in the conflict

  intro?: Paragraph[]; //  array for paragraphs regarding the lead up to war and the global/social/economic factors at play

  section?: Section[];

  tactics?: string[]; // slug array for new tactics developed or used in the conflict

  strategies?: string[]; // slug array to new strategies developed or used in the conflict

  weaponTech?: string[]; // slug array for revolutionary weapons & technology that changed how conflict was fought

  weapons?: string[]; // slug array for specific weapons widely used during the conflict

  hasTheaters: boolean;
  theaters?: string[]; // slug array for Theaters involved in the conflict

  commanders?: string[]; // slug array for Major leaders involved in the conflict

  campaigns?: string[]; // slug array for Major campaigns involved in the conflict

  majorBattles?: string[]; // slug array of Major battles that occurred during the conflict

  impact?: string[]; // slug array for paragraphs regarding the conflict
}

export interface Theater {
  slug: string;
  title: string;
  startDate?: string;
  endDate?: string;
  cardImage: string;
  cardDescription: string; // short paragraph for when a user hovers over a card

  sides: string[]; // slug array for alliances/countries/factions involved in the theater

  impact?: string[]; // slug array for paragraphs regarding the theater

  commanders?: string[]; // slug array for Major leaders involved in the theater

  campaigns?: string[]; // slug array for Major campaigns involved in the theater

  majorBattles?: string[]; // slug array of Major battles that occurred during the theater

  tactics?: string[]; // slug array for new tactics developed or used in the theater

  strategies?: string[]; // slug array to new strategies developed or used in the theater

  weaponTech?: string[]; // slug array for revolutionary weapons & technology that changed how conflict/theater was fought

  weapons?: string[]; // slug array for specific weapons widely used during the theater
}

export interface Campaign {
  title: string;
  slug: string;
  startDate: string;
  endDate: string;
  cardImage: string;
  cardDescription: string; // short paragraph for when a user hovers over a card
  sides: string[]; // slug array for alliances/countries/factions involved in the campaign

  impact?: string[]; // slug array for paragraphs regarding the campaign

  commanders?: string[]; // slug array for Major leaders involved in the campaign

  majorBattles?: string[]; // slug array of Major battles that occurred during the campaign

  tactics?: string[]; // slug array for new tactics developed or used in the campaign

  strategies?: string[]; // slug array to new strategies developed or used in the campaign

  weaponTech?: string[]; // slug array for revolutionary weapons & technology that changed how conflict/theater/campaign was fought

  weapons?: string[]; // slug array for specific weapons widely used during the campaign
}

export interface MajorBattle {
  title: string;
  cardImage: string;
  slug?: string;
  startDate?: string;
  endDate?: string;
  cardDescription?: string; // short paragraph for when a user hovers over a card

  description?: string;

  impact?: string[]; // slug array for paragraphs regarding the Battle

  sides?: string[]; // slug array for alliances/countries/factions involved in the Battle

  commanders?: string[]; // slug array for Major leaders involved in the Battle

  tactics?: string[]; // slug array for new tactics developed or used in the Battle

  strategies?: string[]; // slug array to new strategies developed or used in the Battle

  weaponTech?: string[]; // slug array for revolutionary weapons & technology that changed how conflict/theater/campaign/battle was fought

  weapons?: string[]; // slug array for specific weapons widely used during the Battle
}

export interface Side {
  name: string;
  color: string;
  slug?: string;
  flag?: string;
  description?: string;
  dateJoined?: string;
  commanders?: string[];
}

export interface Commander {
  slug: string;
  name: string;

  rank: string;
  faction?: string[];
  nationality: string; // if known their place of birth
  dateOfBirth?: string;
  dateOfDeath?: string;
  image?: string;
  flag: string;
  description: string[];
  awards?: Award[];
  campaigns?: string[]; // slug array for Major campaigns the commander was involved

  majorBattle?: MajorBattle[]; // slug array of Major battles that the commander was involved
}

export interface Award {
  name: string;
  description?: string;
  dateAwarded?: string;
  dateStarted?: string;
  dateEnded?: string;
  images?: Image[];
}

export interface Strategy {
  name: string;
  description?: string[];
  faction?: string;
  tactics?: Tactic[];
}

export interface Tactic {
  name: string;
  description?: string[];
  weapons?: Weapon[];
  usedBy?: Side[];
}

export interface WeaponTech {
  name: string;
  slug: string;
  type: string;
  description: string[];
  impact: string[];
  side?: string;
  image: string;
}

export interface Weapon {
  slug: string;
  name: string;
  cardImage: string;
  cardDescription: string; // short paragraph for when a user hovers over a card
  type?: string;
  description?: string[];
  usedBy?: Side[];
  images: Image[];
}

export interface Paragraph {
  heading?: string;
  subHeading?: string;
  section?: Paragraph[];
  text?: string[];
  images?: Image[];
  videos?: Video[];
}

export interface Section {
  heading?: string;
  subHeading?: string;
  text?: Paragraph[];
  section?: Section[];
  images?: Image[];
  videos?: Video[];
}

export interface Video {
  url: string[];
}

export interface Image {
  url: string;
  description?: string;
  alt: string;
  source: string;
}
