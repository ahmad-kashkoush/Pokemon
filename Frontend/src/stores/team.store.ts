import type { Pokemon } from '@/types/pokemon.type'
import { defineStore } from 'pinia'
import { computed } from 'vue'
import { useTeamQuery, useTeamCountQuery } from '@/api/team/team.query'
import {
  useAddToTeamMutation,
  useRemoveFromTeamMutation,
  useToggleTeamMemberMutation,
} from '@/api/team/team.mutation'

export const useTeamStore = defineStore(
  'team',
  () => {
    // Constants
    const MAX_TEAM_SIZE = 6

    // Queries
    const teamQuery = useTeamQuery()
    const teamCountQuery = useTeamCountQuery()

    // Mutations
    const addMutation = useAddToTeamMutation()
    const removeMutation = useRemoveFromTeamMutation()
    const toggleMutation = useToggleTeamMemberMutation()

    // Reactive state
    const teamPokemons = computed(() => teamQuery.data.value ?? [])
    const teamIds = computed(() => teamPokemons.value.map((p: Pokemon) => p.id))
    const teamCount = computed(() => teamCountQuery.data.value ?? 0)
    const isTeamFull = computed(() => teamCount.value >= MAX_TEAM_SIZE)
    const availableSlots = computed(() => MAX_TEAM_SIZE - teamCount.value)

    // Actions
    const addToTeam = (pokemon: Pokemon) => {
      if (isTeamFull.value) return false
      addMutation.mutate(pokemon.id)
      return true
    }

    const removeFromTeam = (pokemonId: number) => {
      removeMutation.mutate(pokemonId)
    }

    const toggleTeamMember = (pokemon: Pokemon) => {
      toggleMutation.mutate(pokemon.id)
    }

    const isInTeam = (pokemonId: number) => teamIds.value.includes(pokemonId)

    const getTeamMemberById = (pokemonId: number) =>
      teamPokemons.value.find((p: Pokemon) => p.id === pokemonId)

    return {
      MAX_TEAM_SIZE,
      teamPokemons,
      teamIds,
      teamCount,
      isTeamFull,
      availableSlots,
      isInTeam,
      getTeamMemberById,
      addToTeam,
      removeFromTeam,
      toggleTeamMember,
    }
  },
  {
    persist: {
      key: 'pokemon-team',
      storage: localStorage,
    },
  },
)
