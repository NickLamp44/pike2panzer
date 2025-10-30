export interface Era {
  slug: string;
  cardImage: string;
  title: string;
  description: string;
  conflicts: Conflict[];
}

export interface Conflict {
  slug: string;
  cardImage: string;
  title: string;
  sides: Side[];
  description: string;
  hasTheaters: boolean;
  theater?: Theater[];
  paragraphs?: Paragraph[];
  startDate?: string;
  endDate?: string;
  commanders?: Commander[];
  campaigns?: Campaign[];
  majorBattles?: MajorBattle[];
  tactics?: Tactic[];
  strategies?: Strategy[];
  weapons?: Weapon[];
}

export interface Theater {
  slug: string;
  cardImage: string;
  title: string;
  description: string;
  sides: Side[];
  images?: Image[];
  paragraphs?: Paragraph[];
  startDate?: string;
  endDate?: string;
  commanders?: Commander[];
  campaigns?: Campaign[];
  majorBattles?: MajorBattle[];
  tactics?: Tactic[];
  strategies?: Strategy[];
  weapons?: Weapon[];
}
export interface Campaign {
  name: string;
  sides: Side[];
  description: string;
  images?: Image[];
  majorBattles?: MajorBattle[];
  tactics?: Tactic[];
  strategies?: Strategy[];
  weapons?: Weapon[];
  impact?: string;
}

export interface MajorBattle {
  name: string;
  description: string;
  sides?: Side[];
  paragraphs?: Paragraph[];
  imageUrl?: string;
  tactics?: Tactic[];
  strategies?: Strategy[];
  weapons?: Weapon[];
  impact?: string;
}

export interface WeaponTech {
  name: string;
  type: string;
  description: string;
  impact: string;
  side?: string;
  image: string;
}

export interface Side {
  name: string;
  flag: string;
  description?: string;
  commanders?: Commander[];
  campaigns?: Campaign[];
  weapons?: Weapon[];
  strategies?: Strategy[];
  tactics?: Tactic[];
}

export interface Commander {
  name: string;
  rank: string;
  side: Side;
  nationality: string;
  dateOfBirth: string;
  dateOfDeath?: string;
  image: string;
  flag: string;
  description: string;
}

export interface Award {
  name: string;
  description: string;
  dateAwarded?: string;
  images: Image[];
}

export interface Strategy {
  title: string;
  description: string;
  side?: string;
}

export interface Tactic {
  title: string;
  description: string;
  weapons?: Weapon[];
  side?: string;
}

export interface Weapon {
  name: string;
  type: string;
  description: string;
  side?: string;
  images: Image[];
}

export interface Paragraph {
  text: string[];
  images?: Image[];
  videos?: Video[];
}

export interface Video {
  url: string[];
}
export interface Image {
  url: string;
  description: string;
  alt: string;
  source: string;
}
