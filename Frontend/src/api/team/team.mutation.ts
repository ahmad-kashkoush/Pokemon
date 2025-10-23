import { TeamService } from '@/api/team/team.service'
import { useMutation, useQueryClient } from '@tanstack/vue-query'
import type { Pokemon } from '@/types/pokemon.type'

export function useAddToTeamMutation() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (pokemonId: number) => TeamService.addToTeam(pokemonId),
    onMutate: async (pokemonId) => {
      // Cancel any outgoing refetches to avoid overwriting optimistic updates
      await queryClient.cancelQueries({ queryKey: ['team'] })
      await queryClient.cancelQueries({ queryKey: ['teamCount'] })

      // Snapshot previous state
      const previousTeam = queryClient.getQueryData<Pokemon[]>(['team']) ?? []
      const previousCount = queryClient.getQueryData<number>(['teamCount']) ?? 0

      // Optimistically update team and count
      queryClient.setQueryData(['team'], [...previousTeam, { id: pokemonId } as Pokemon])
      queryClient.setQueryData(['teamCount'], previousCount + 1)

      // Return context for rollback
      return { previousTeam, previousCount }
    },
    onError: (err, pokemonId, context) => {
      // Rollback on error
      if (context) {
        queryClient.setQueryData(['team'], context.previousTeam)
        queryClient.setQueryData(['teamCount'], context.previousCount)
      }
    },
    onSettled: () => {
      // Invalidate queries to sync with server
      queryClient.invalidateQueries({ queryKey: ['team'] })
      queryClient.invalidateQueries({ queryKey: ['teamCount'] })
    },
  })
}

export function useRemoveFromTeamMutation() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (pokemonId: number) => TeamService.removeFromTeam(pokemonId),
    onMutate: async (pokemonId) => {
      // Cancel any outgoing refetches
      await queryClient.cancelQueries({ queryKey: ['team'] })
      await queryClient.cancelQueries({ queryKey: ['teamCount'] })

      // Snapshot previous state
      const previousTeam = queryClient.getQueryData<Pokemon[]>(['team']) ?? []
      const previousCount = queryClient.getQueryData<number>(['teamCount']) ?? 0

      // Optimistically update team and count
      queryClient.setQueryData(
        ['team'],
        previousTeam.filter((p) => p.id !== pokemonId),
      )
      queryClient.setQueryData(['teamCount'], previousCount - 1)

      // Return context for rollback
      return { previousTeam, previousCount }
    },
    onError: (err, pokemonId, context) => {
      // Rollback on error
      if (context) {
        queryClient.setQueryData(['team'], context.previousTeam)
        queryClient.setQueryData(['teamCount'], context.previousCount)
      }
    },
    onSettled: () => {
      // Invalidate queries to sync with server
      queryClient.invalidateQueries({ queryKey: ['team'] })
      queryClient.invalidateQueries({ queryKey: ['teamCount'] })
    },
  })
}

export function useToggleTeamMemberMutation() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (pokemonId: number) => TeamService.toggleTeamMember(pokemonId),
    onMutate: async (pokemonId) => {
      // Cancel any outgoing refetches
      await queryClient.cancelQueries({ queryKey: ['team'] })
      await queryClient.cancelQueries({ queryKey: ['teamCount'] })

      // Snapshot previous state
      const previousTeam = queryClient.getQueryData<Pokemon[]>(['team']) ?? []
      const previousCount = queryClient.getQueryData<number>(['teamCount']) ?? 0

      // Optimistically update based on current team state
      const isCurrentlyInTeam = previousTeam.some((p) => p.id === pokemonId)
      let newTeam: Pokemon[]
      let newCount: number

      if (isCurrentlyInTeam) {
        newTeam = previousTeam.filter((p) => p.id !== pokemonId)
        newCount = previousCount - 1
      } else {
        newTeam = [...previousTeam, { id: pokemonId } as Pokemon]
        newCount = previousCount + 1
      }

      queryClient.setQueryData(['team'], newTeam)
      queryClient.setQueryData(['teamCount'], newCount)

      // Return context for rollback
      return { previousTeam, previousCount }
    },
    onError: (err, pokemonId, context) => {
      // Rollback on error
      if (context) {
        queryClient.setQueryData(['team'], context.previousTeam)
        queryClient.setQueryData(['teamCount'], context.previousCount)
      }
    },
    onSettled: () => {
      // Invalidate queries to sync with server
      queryClient.invalidateQueries({ queryKey: ['team'] })
      queryClient.invalidateQueries({ queryKey: ['teamCount'] })
    },
  })
}
