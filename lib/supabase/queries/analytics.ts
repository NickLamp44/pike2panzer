import { supabase } from '../client';

/**
 * Get comprehensive statistics for analytics dashboard
 */
export async function getGlobalStatistics() {
  try {
    const [eras, conflicts, battles, commanders, weapons] = await Promise.all([
      supabase.from('eras').select('id'),
      supabase.from('conflicts').select('id'),
      supabase.from('battles').select('id, estimated_casualties'),
      supabase.from('commanders').select('id'),
      supabase.from('weapons').select('id'),
    ]);

    const totalCasualties = (battles.data || []).reduce(
      (sum, b) => sum + (b.estimated_casualties || 0),
      0
    );

    return {
      totalEras: eras.data?.length || 0,
      totalConflicts: conflicts.data?.length || 0,
      totalBattles: battles.data?.length || 0,
      totalCommanders: commanders.data?.length || 0,
      totalWeapons: weapons.data?.length || 0,
      estimatedTotalCasualties: totalCasualties,
    };
  } catch (error) {
    console.error('Error fetching global statistics:', error);
    return {
      totalEras: 0,
      totalConflicts: 0,
      totalBattles: 0,
      totalCommanders: 0,
      totalWeapons: 0,
      estimatedTotalCasualties: 0,
    };
  }
}

/**
 * Get statistics for a specific era
 */
export async function getEraStatistics(eraId: string) {
  try {
    const { data: era } = await supabase
      .from('eras')
      .select('*')
      .eq('id', eraId)
      .single();

    const { data: conflicts } = await supabase
      .from('conflicts')
      .select('id')
      .eq('era_id', eraId);

    const conflictIds = conflicts?.map((c) => c.id) || [];

    let battles = [];
    let commanders = [];
    let weapons = [];

    if (conflictIds.length > 0) {
      const bRes = await supabase
        .from('battles')
        .select('id, estimated_casualties')
        .in('conflict_id', conflictIds);
      battles = bRes.data || [];

      const cRes = await supabase
        .from('commanders')
        .select('id')
        .in('conflict_id', conflictIds);
      commanders = cRes.data || [];

      const wRes = await supabase
        .from('weapons')
        .select('id')
        .in('conflict_id', conflictIds);
      weapons = wRes.data || [];
    }

    const totalCasualties = battles.reduce((sum, b) => sum + (b.estimated_casualties || 0), 0);

    return {
      era,
      statistics: {
        conflictCount: conflicts?.length || 0,
        battleCount: battles.length,
        commanderCount: commanders.length,
        weaponCount: weapons.length,
        estimatedCasualties: totalCasualties,
        timespan: era?.end_year && era?.start_year ? era.end_year - era.start_year : 0,
      },
    };
  } catch (error) {
    console.error('Error fetching era statistics:', error);
    return null;
  }
}

/**
 * Get statistics for a specific conflict
 */
export async function getConflictStatistics(conflictId: string) {
  try {
    const { data: conflict } = await supabase
      .from('conflicts')
      .select('*, eras(name, start_year, end_year)')
      .eq('id', conflictId)
      .single();

    const [{ data: battles }, { data: commanders }, { data: weapons }] = await Promise.all([
      supabase
        .from('battles')
        .select('id, estimated_casualties, date_start, date_end')
        .eq('conflict_id', conflictId),
      supabase
        .from('commanders')
        .select('id, side_id, sides(name)')
        .eq('conflict_id', conflictId),
      supabase
        .from('weapons')
        .select('id, type, year_introduced')
        .eq('conflict_id', conflictId),
    ]);

    const totalCasualties = (battles || []).reduce((sum, b) => sum + (b.estimated_casualties || 0), 0);
    const timespan = conflict?.end_year && conflict?.start_year ? conflict.end_year - conflict.start_year : 0;

    // Group commanders by side
    const commandersBySide: Record<string, number> = {};
    (commanders || []).forEach((cmd: any) => {
      const sideName = cmd.sides?.name || 'Unknown';
      commandersBySide[sideName] = (commandersBySide[sideName] || 0) + 1;
    });

    // Group weapons by type
    const weaponsByType: Record<string, number> = {};
    (weapons || []).forEach((w: any) => {
      const type = w.type || 'Other';
      weaponsByType[type] = (weaponsByType[type] || 0) + 1;
    });

    return {
      conflict,
      statistics: {
        battleCount: battles?.length || 0,
        commanderCount: commanders?.length || 0,
        weaponCount: weapons?.length || 0,
        estimatedCasualties: totalCasualties,
        timespan,
        commandersBySide,
        weaponsByType,
        dateRange: {
          start: conflict?.start_year,
          end: conflict?.end_year,
        },
      },
    };
  } catch (error) {
    console.error('Error fetching conflict statistics:', error);
    return null;
  }
}

/**
 * Get timeline data for all battles across conflicts
 */
export async function getTimelineData(eraId?: string) {
  try {
    let query = supabase
      .from('battles')
      .select(
        `
        id,
        name,
        date_start,
        date_end,
        location,
        outcome,
        image_url,
        conflict_id,
        conflicts(
          name,
          era_id,
          eras(name)
        )
      `
      )
      .order('date_start', { ascending: true });

    if (eraId) {
      query = query.eq('conflicts.era_id', eraId);
    }

    const { data, error } = await query;

    if (error) throw error;

    return (data || []).map((battle: any) => ({
      id: battle.id,
      name: battle.name,
      date: battle.date_start,
      dateEnd: battle.date_end,
      location: battle.location,
      outcome: battle.outcome,
      conflictName: battle.conflicts?.name,
      eraName: battle.conflicts?.eras?.name,
      imageUrl: battle.image_url,
    }));
  } catch (error) {
    console.error('Error fetching timeline data:', error);
    return [];
  }
}

/**
 * Get network/relationship data for visualization
 * Shows relationships between commanders, battles, weapons, tactics
 */
export async function getNetworkData(conflictId: string) {
  try {
    const [commandersRes, battlesRes, weaponsRes, tacticsRes, commanderBattlesRes] =
      await Promise.all([
        supabase
          .from('commanders')
          .select('id, name')
          .eq('conflict_id', conflictId),
        supabase
          .from('battles')
          .select('id, name')
          .eq('conflict_id', conflictId),
        supabase
          .from('weapons')
          .select('id, name')
          .eq('conflict_id', conflictId),
        supabase
          .from('tactics')
          .select('id, name')
          .eq('conflict_id', conflictId),
        supabase
          .from('battle_commanders')
          .select(
            `
            battle_id,
            commander_id,
            battles(name),
            commanders(name)
          `
          ),
      ]);

    // Build nodes
    const nodes = [
      ...(commandersRes.data || []).map((c: any) => ({
        id: `commander-${c.id}`,
        label: c.name,
        type: 'commander',
      })),
      ...(battlesRes.data || []).map((b: any) => ({
        id: `battle-${b.id}`,
        label: b.name,
        type: 'battle',
      })),
      ...(weaponsRes.data || []).map((w: any) => ({
        id: `weapon-${w.id}`,
        label: w.name,
        type: 'weapon',
      })),
      ...(tacticsRes.data || []).map((t: any) => ({
        id: `tactic-${t.id}`,
        label: t.name,
        type: 'tactic',
      })),
    ];

    // Build edges (relationships)
    const edges = (commanderBattlesRes.data || []).map((rel: any) => ({
      source: `commander-${rel.commander_id}`,
      target: `battle-${rel.battle_id}`,
      type: 'participated',
    }));

    return { nodes, edges };
  } catch (error) {
    console.error('Error fetching network data:', error);
    return { nodes: [], edges: [] };
  }
}

/**
 * Get warfare evolution data - weapons and technology over time
 */
export async function getWarfareEvolution(conflictId: string) {
  try {
    const { data: weapons } = await supabase
      .from('weapons')
      .select('*')
      .eq('conflict_id', conflictId)
      .order('year_introduced', { ascending: true });

    const { data: tactics } = await supabase
      .from('tactics')
      .select('*')
      .eq('conflict_id', conflictId);

    return {
      weapons: weapons || [],
      tactics: tactics || [],
      weaponsByYear: (weapons || []).reduce(
        (acc, w) => {
          const year = w.year_introduced || 'Unknown';
          if (!acc[year]) acc[year] = [];
          acc[year].push(w);
          return acc;
        },
        {} as Record<string, typeof weapons>
      ),
    };
  } catch (error) {
    console.error('Error fetching warfare evolution:', error);
    return { weapons: [], tactics: [], weaponsByYear: {} };
  }
}
