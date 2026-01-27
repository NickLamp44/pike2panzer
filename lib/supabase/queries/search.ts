import { supabase } from '../client';

export interface SearchResult {
  id: string;
  type: 'commander' | 'battle' | 'weapon' | 'tactic' | 'strategy' | 'conflict';
  name: string;
  description: string | null;
  context: {
    conflictName: string;
    eraName: string;
  };
  imageUrl: string | null;
}

/**
 * Global search across all entity types
 * Searches commanders, battles, weapons, tactics, strategies
 */
export async function globalSearch(query: string): Promise<SearchResult[]> {
  if (!query.trim()) return [];

  const searchTerm = `%${query}%`;
  const results: SearchResult[] = [];

  try {
    // Search commanders
    const { data: commanders } = await supabase
      .from('commanders')
      .select(`
        id, 
        name, 
        description, 
        image_url,
        conflicts(name),
        conflicts(eras(name))
      `)
      .ilike('name', searchTerm)
      .limit(5);

    if (commanders) {
      commanders.forEach((cmd: any) => {
        results.push({
          id: cmd.id,
          type: 'commander',
          name: cmd.name,
          description: cmd.description,
          context: {
            conflictName: cmd.conflicts?.name || 'Unknown',
            eraName: cmd.conflicts?.eras?.name || 'Unknown',
          },
          imageUrl: cmd.image_url,
        });
      });
    }

    // Search battles
    const { data: battles } = await supabase
      .from('battles')
      .select(`
        id,
        name,
        description,
        image_url,
        conflicts(name),
        conflicts(eras(name))
      `)
      .ilike('name', searchTerm)
      .limit(5);

    if (battles) {
      battles.forEach((battle: any) => {
        results.push({
          id: battle.id,
          type: 'battle',
          name: battle.name,
          description: battle.description,
          context: {
            conflictName: battle.conflicts?.name || 'Unknown',
            eraName: battle.conflicts?.eras?.name || 'Unknown',
          },
          imageUrl: battle.image_url,
        });
      });
    }

    // Search weapons
    const { data: weapons } = await supabase
      .from('weapons')
      .select(`
        id,
        name,
        description,
        image_url,
        conflicts(name),
        conflicts(eras(name))
      `)
      .ilike('name', searchTerm)
      .limit(5);

    if (weapons) {
      weapons.forEach((weapon: any) => {
        results.push({
          id: weapon.id,
          type: 'weapon',
          name: weapon.name,
          description: weapon.description,
          context: {
            conflictName: weapon.conflicts?.name || 'Unknown',
            eraName: weapon.conflicts?.eras?.name || 'Unknown',
          },
          imageUrl: weapon.image_url,
        });
      });
    }

    // Search tactics
    const { data: tactics } = await supabase
      .from('tactics')
      .select(`
        id,
        name,
        description,
        conflicts(name),
        conflicts(eras(name))
      `)
      .ilike('name', searchTerm)
      .limit(5);

    if (tactics) {
      tactics.forEach((tactic: any) => {
        results.push({
          id: tactic.id,
          type: 'tactic',
          name: tactic.name,
          description: tactic.description,
          context: {
            conflictName: tactic.conflicts?.name || 'Unknown',
            eraName: tactic.conflicts?.eras?.name || 'Unknown',
          },
          imageUrl: null,
        });
      });
    }

    // Search strategies
    const { data: strategies } = await supabase
      .from('strategies')
      .select(`
        id,
        name,
        description,
        conflicts(name),
        conflicts(eras(name))
      `)
      .ilike('name', searchTerm)
      .limit(5);

    if (strategies) {
      strategies.forEach((strategy: any) => {
        results.push({
          id: strategy.id,
          type: 'strategy',
          name: strategy.name,
          description: strategy.description,
          context: {
            conflictName: strategy.conflicts?.name || 'Unknown',
            eraName: strategy.conflicts?.eras?.name || 'Unknown',
          },
          imageUrl: null,
        });
      });
    }

    return results;
  } catch (error) {
    console.error('Search error:', error);
    return [];
  }
}

/**
 * Advanced search with filters
 */
export async function advancedSearch(
  query: string,
  filters: {
    type?: SearchResult['type'];
    conflictId?: string;
    eraId?: string;
  }
) {
  const searchTerm = `%${query}%`;
  let results: SearchResult[] = [];

  try {
    if (!filters.type || filters.type === 'commander') {
      const query = supabase
        .from('commanders')
        .select(
          `id, name, description, image_url, conflict_id, 
           conflicts(name), conflicts(eras(name))`
        )
        .ilike('name', searchTerm);

      if (filters.conflictId) query.eq('conflict_id', filters.conflictId);
      if (filters.eraId) query.eq('conflicts.eras.id', filters.eraId);

      const { data } = await query.limit(10);
      if (data) {
        results.push(
          ...data.map((cmd: any) => ({
            id: cmd.id,
            type: 'commander' as const,
            name: cmd.name,
            description: cmd.description,
            context: {
              conflictName: cmd.conflicts?.name,
              eraName: cmd.conflicts?.eras?.name,
            },
            imageUrl: cmd.image_url,
          }))
        );
      }
    }

    // Similar patterns for other types...
    return results;
  } catch (error) {
    console.error('Advanced search error:', error);
    return [];
  }
}

/**
 * Get all commanders for a specific conflict with relationships
 */
export async function getConflictCommanders(conflictId: string) {
  const { data, error } = await supabase
    .from('commanders')
    .select(`
      id,
      name,
      title,
      description,
      image_url,
      side_id,
      sides(name, color_code, flag_url)
    `)
    .eq('conflict_id', conflictId);

  if (error) throw error;
  return data;
}

/**
 * Get all battles for a specific conflict with relationships
 */
export async function getConflictBattles(conflictId: string) {
  const { data, error } = await supabase
    .from('battles')
    .select(`
      id,
      name,
      date_start,
      date_end,
      location,
      outcome,
      estimated_casualties,
      image_url,
      theater_id,
      theaters(name)
    `)
    .eq('conflict_id', conflictId)
    .order('date_start', { ascending: true });

  if (error) throw error;
  return data;
}

/**
 * Get battle details with all relationships
 */
export async function getBattleDetails(battleId: string) {
  const { data, error } = await supabase
    .from('battles')
    .select(`
      *,
      theaters(name, location),
      battle_commanders(
        role,
        commanders(name, side_id, sides(name, flag_url))
      ),
      battle_tactics(
        tactic_id,
        tactics(name, description)
      ),
      battle_weapons(
        weapon_id,
        weapons(name, type)
      )
    `)
    .eq('id', battleId)
    .single();

  if (error) throw error;
  return data;
}

/**
 * Get all weapons for a specific conflict
 */
export async function getConflictWeapons(conflictId: string) {
  const { data, error } = await supabase
    .from('weapons')
    .select('*')
    .eq('conflict_id', conflictId)
    .order('year_introduced', { ascending: true });

  if (error) throw error;
  return data;
}

/**
 * Get all tactics for a specific conflict
 */
export async function getConflictTactics(conflictId: string) {
  const { data, error } = await supabase
    .from('tactics')
    .select('*')
    .eq('conflict_id', conflictId);

  if (error) throw error;
  return data;
}
