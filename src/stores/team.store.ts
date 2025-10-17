import type { Pokemon } from '@/types/pokemon.type'
import { defineStore } from 'pinia'
import { computed } from 'vue'
import { usePokemonCollection } from '@/composables/usePokemonCollection'

export const useTeamStore = defineStore(
  'team',
  () => {
    // Constants
    const MAX_TEAM_SIZE = 6

    const collection = usePokemonCollection()

    const isTeamFull = computed(() => collection.count.value >= MAX_TEAM_SIZE)
    const availableSlots = computed(() => MAX_TEAM_SIZE - collection.count.value)

    const addToTeam = (pokemon: Pokemon) => {
      if (!isTeamFull.value) {
        return collection.add(pokemon)
      }
      return false
    }

    const toggleTeamMember = (pokemon: Pokemon) => {
      if (collection.contains(pokemon.id)) {
        return collection.remove(pokemon.id)
      } else {
        return addToTeam(pokemon)
      }
    }

    return {
      // Constants
      MAX_TEAM_SIZE,

      // State
      teamPokemons: collection.pokemons,

      // Getters
      teamIds: collection.pokemonIds,
      teamCount: collection.count,
      isTeamFull,
      availableSlots,
      isInTeam: collection.contains,
      getTeamMemberById: collection.getById,

      // Actions
      addToTeam,
      removeFromTeam: collection.remove,
      toggleTeamMember,
      clearTeam: collection.clear,
    }
  },
  {
    persist: {
      key: 'pokemon-team',
      storage: localStorage,
    },
  },
)
