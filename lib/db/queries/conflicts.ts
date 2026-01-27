import { supabase } from '../client';
import type { Era, Conflict, ConflictWithRelations } from '../types';

// Get all eras
export async function getEras() {
  const { data, error } = await supabase
    .from('eras')
    .select('*')
    .order('start_year', { ascending: true });

  if (error) throw error;
  return data as Era[];
}

// Get single era with all its conflicts
export async function getEraWithConflicts(eraId: string) {
  const { data: era, error: eraError } = await supabase
    .from('eras')
    .select('*')
    .eq('id', eraId)
    .single();

  if (eraError) throw eraError;

  const { data: conflicts, error: conflictsError } = await supabase
    .from('conflicts')
    .select('*')
    .eq('era_id', eraId)
    .order('start_year', { ascending: true });

  if (conflictsError) throw conflictsError;

  return { ...era, conflicts } as Era & { conflicts: Conflict[] };
}

// Get all conflicts (with era data)
export async function getAllConflicts() {
  const { data, error } = await supabase
    .from('conflicts')
    .select(
      `
      *,
      eras:era_id (
        id,
        name,
        slug
      )
      `
    )
    .order('start_year', { ascending: true });

  if (error) throw error;
  return data as ConflictWithRelations[];
}

// Get single conflict with related data
export async function getConflictById(conflictId: string) {
  const { data, error } = await supabase
    .from('conflicts')
    .select(
      `
      *,
      eras:era_id (
        id,
        name,
        slug
      ),
      sides (
        id,
        name,
        flag_url,
        color_hex
      ),
      battles (
        id,
        name,
        date,
        significance_level
      ),
      campaigns (
        id,
        name,
        start_date,
        end_date
      )
      `
    )
    .eq('id', conflictId)
    .single();

  if (error) throw error;
  return data as ConflictWithRelations;
}

// Search conflicts by name or description
export async function searchConflicts(query: string) {
  const { data, error } = await supabase
    .from('conflicts')
    .select(
      `
      *,
      eras:era_id (
        id,
        name,
        slug
      )
      `
    )
    .or(
      `name.ilike.%${query}%,description.ilike.%${query}%`
    )
    .order('start_year', { ascending: true });

  if (error) throw error;
  return data as ConflictWithRelations[];
}

// Get conflicts by year range
export async function getConflictsByYearRange(startYear: number, endYear: number) {
  const { data, error } = await supabase
    .from('conflicts')
    .select(
      `
      *,
      eras:era_id (
        id,
        name,
        slug
      )
      `
    )
    .gte('start_year', startYear)
    .lte('end_year', endYear)
    .order('start_year', { ascending: true });

  if (error) throw error;
  return data as ConflictWithRelations[];
}
