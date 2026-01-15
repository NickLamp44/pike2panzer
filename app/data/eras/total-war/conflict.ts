// Explicit imports for all conflicts in the Total War era
import { secondWorldWar } from "./second-world-war/second-world-war";

export const conflicts = {
  "second-world-war": secondWorldWar,
  // Add first-world-war when available
  // 'first-world-war': firstWorldWar,
};

export type ConflictSlug = keyof typeof conflicts;
