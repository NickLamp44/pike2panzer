import { supabase } from '../client';
import type { Battle, BattleWithRelations } from '../types';

// Get all battles for a conflict
export async function getBattlesByConflict(conflictId: string) {
  const { data, error } = await supabase
    .from('battles')
    .select(
      `
      *,
      theaters:theater_id (
        id,
        name,
        region
      )
      `
    )
    .eq('conflict_id', conflictId)
    .order('date', { ascending: true, nullsFirst: false });

  if (error) throw error;
  return data as BattleWithRelations[];
}

// Get battle with all relations
export async function getBattleById(battleId: string) {
  const { data, error } = await supabase
    .from('battles')
    .select(
      `
      *,
      conflicts:conflict_id (
        id,
        name,
        slug
      ),
      theaters:theater_id (
        id,
        name,
        region
      ),
      battle_weapons (
        weapons:weapon_id (
          id,
          name,
          weapon_type,
          effectiveness
        )
      ),
      battle_commanders (
        commanders:commander_id (
          id,
          name,
          title
        ),
        sides:side_id (
          id,
          name,
          flag_url
        ),
        role
      )
      `
    )
    .eq('id', battleId)
    .single();

  if (error) throw error;
  return data as BattleWithRelations;
}

// Search battles by name or location
export async function searchBattles(query: string) {
  const { data, error } = await supabase
    .from('battles')
    .select(
      `
      *,
      conflicts:conflict_id (
        id,
        name,
        slug
      ),
      theaters:theater_id (
        id,
        name
      )
      `
    )
    .or(
      `name.ilike.%${query}%,description.ilike.%${query}%,location.ilike.%${query}%`
    )
    .order('date', { ascending: true, nullsFirst: false });

  if (error) throw error;
  return data as BattleWithRelations[];
}

// Get battles by theater
export async function getBattlesByTheater(theaterId: string) {
  const { data, error } = await supabase
    .from('battles')
    .select(
      `
      *,
      conflicts:conflict_id (
        id,
        name
      )
      `
    )
    .eq('theater_id', theaterId)
    .order('date', { ascending: true, nullsFirst: false });

  if (error) throw error;
  return data as BattleWithRelations[];
}

// Get battles with highest significance
export async function getSignificantBattles(limit: number = 10) {
  const { data, error } = await supabase
    .from('battles')
    .select(
      `
      *,
      conflicts:conflict_id (
        id,
        name,
        slug
      ),
      theaters:theater_id (
        id,
        name
      )
      `
    )
    .order('significance_level', { ascending: false })
    .limit(limit);

  if (error) throw error;
  return data as BattleWithRelations[];
}

// Get battles in a year range (for timeline)
export async function getBattlesByYearRange(startYear: number, endYear: number) {
  const { data, error } = await supabase
    .from('battles')
    .select(
      `
      *,
      conflicts:conflict_id (
        id,
        name,
        slug
      ),
      theaters:theater_id (
        id,
        name
      )
      `
    )
    .gte('start_year', startYear)
    .lte('end_year', endYear)
    .order('start_year', { ascending: true });

  if (error) throw error;
  return data as BattleWithRelations[];
}
