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
  paragraphs?: string[];
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
  paragraphs?: string[];
  startDate?: string;
  endDate?: string;
  commanders?: Commander[];
  campaigns?: Campaign[];
  majorBattles?: MajorBattle[];
  tactics?: Tactic[];
  strategies?: Strategy[];
  weapons?: Weapon[];
  impact?: string[];
}
export interface Campaign {
  name: string;
  sides: Side[];
  description: string;
  startDate: string;
  endDate: string;
  images?: Image[];
  majorBattles?: MajorBattle[];
  tactics?: Tactic[];
  strategies?: Strategy[];
  weapons?: Weapon[];
  impact?: string[];
}

export interface MajorBattle {
  name: string;
  description: string;
  sides?: Side[];
  startDate?: string;
  endDate?: string;
  paragraphs?: string[];
  imageUrl?: string;
  tactics?: Tactic[];
  strategies?: Strategy[];
  weapons?: Weapon[];
  impact?: string[];
}

export interface Side {
  name: string;
  aliances?: Side[];
  flag?: string;
  description?: string;
  dateJoined?: string;
  commanders?: Commander[];
  campaigns?: Campaign[];
  weapons?: Weapon[];
  strategies?: Strategy[];
  tactics?: Tactic[];
}

export interface Commander {
  name: string;
  rank: string;
  side: Side[];
  nationality: string;
  dateOfBirth: string;
  dateOfDeath?: string;
  image: string;
  flag: string;
  description: string[];
  awards?: Award[];
  majorBattle?: MajorBattle[];
}

export interface Award {
  name: string;
  description: string;
  dateAwarded?: string;
  dateStarted?: string;
  dateEnded?: string;
  images?: Image[];
}

export interface Strategy {
  name?: string;
  description?: string[];
  side?: string;
}

export interface Tactic {
  name: string;
  description?: string[];
  weapons?: Weapon[];
  side?: Side[];
}

export interface WeaponTech {
  name: string;
  type: string;
  description: string[];
  impact: string[];
  side?: string;
  image: string;
}

export interface Weapon {
  name: string;
  type?: string;
  description?: string[];
  side?: Side[];
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
  description?: string;
  alt: string;
  source: string;
}
