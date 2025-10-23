import { TeamService } from '@/api/team/team.service'
import { useQuery } from '@tanstack/vue-query'
import type { Pokemon } from '@/types/pokemon.type'

export function useTeamQuery() {
  return useQuery<Pokemon[]>({
    queryKey: ['team'],
    queryFn: async () => {
      try {
        const response = await TeamService.getTeam()
        return response.map((item) => item.pokemon) ?? []
      } catch (error) {
        console.error('Failed to fetch team:', error)
        return [] // Return empty array on error to avoid breaking the UI
      }
    },
    staleTime: 5 * 60 * 1000, // Data is fresh for 5 minutes
  })
}

export function useTeamCountQuery() {
  return useQuery<number>({
    queryKey: ['teamCount'],
    queryFn: async () => {
      try {
        return (await TeamService.teamCount()) ?? 0
      } catch (error) {
        console.error('Failed to fetch team count:', error)
        return 0 // Return 0 on error to avoid breaking the UI
      }
    },
    staleTime: 5 * 60 * 1000, // Data is fresh for 5 minutes
  })
}

export function useIsInTeamQuery(pokemonId: number) {
  return useQuery<boolean>({
    queryKey: ['isInTeam', pokemonId],
    queryFn: async () => {
      try {
        return (await TeamService.isInTeam(pokemonId)) ?? false
      } catch (error) {
        console.error(`Failed to check if Pokemon ${pokemonId} is in team:`, error)
        return false // Return false on error
      }
    },
    enabled: !!pokemonId, // Only run if pokemonId is truthy
    staleTime: 5 * 60 * 1000, // Data is fresh for 5 minutes
  })
}
