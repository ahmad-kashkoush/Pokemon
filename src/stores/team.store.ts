import type { Pokemon } from '@/types/pokemon.type'
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useTeamStore = defineStore('team', () => {
  // Constants
  const MAX_TEAM_SIZE = 6

  // State
  const teamPokemons = ref<Pokemon[]>([])

  // Initialize from localStorage
  const initializeTeam = () => {
    const saved = localStorage.getItem('pokemon-team')
    if (saved) {
      try {
        const parsed = JSON.parse(saved)
        // Ensure we don't exceed the max team size when loading
        teamPokemons.value = parsed.slice(0, MAX_TEAM_SIZE)
      } catch (error) {
        console.error('Error loading team from localStorage:', error)
        teamPokemons.value = []
      }
    }
  }

  // Save to localStorage
  const saveTeam = () => {
    try {
      localStorage.setItem('pokemon-team', JSON.stringify(teamPokemons.value))
    } catch (error) {
      console.error('Error saving team to localStorage:', error)
    }
  }

  // Getters
  const teamIds = computed(() => teamPokemons.value.map((p) => p.id))
  const teamCount = computed(() => teamPokemons.value.length)
  const isTeamFull = computed(() => teamPokemons.value.length >= MAX_TEAM_SIZE)
  const availableSlots = computed(() => MAX_TEAM_SIZE - teamPokemons.value.length)

  const isInTeam = (pokemonId: number) => {
    return teamIds.value.includes(pokemonId)
  }

  // Actions
  const addToTeam = (pokemon: Pokemon) => {
    if (!isInTeam(pokemon.id) && !isTeamFull.value) {
      teamPokemons.value.push(pokemon)
      saveTeam()
      return true
    }
    return false // Failed to add (already in team or team is full)
  }

  const removeFromTeam = (pokemonId: number) => {
    const index = teamPokemons.value.findIndex((p) => p.id === pokemonId)
    if (index > -1) {
      teamPokemons.value.splice(index, 1)
      saveTeam()
      return true
    }
    return false
  }

  const toggleTeamMember = (pokemon: Pokemon) => {
    if (isInTeam(pokemon.id)) {
      return removeFromTeam(pokemon.id)
    } else {
      return addToTeam(pokemon)
    }
  }

  const clearTeam = () => {
    teamPokemons.value = []
    saveTeam()
  }

  const getTeamMemberById = (pokemonId: number) => {
    return teamPokemons.value.find((p) => p.id === pokemonId)
  }

  const reorderTeam = (fromIndex: number, toIndex: number) => {
    if (
      fromIndex < 0 ||
      fromIndex >= teamPokemons.value.length ||
      toIndex < 0 ||
      toIndex >= teamPokemons.value.length
    ) {
      return false
    }

    const [pokemon] = teamPokemons.value.splice(fromIndex, 1)
    if (pokemon) {
      teamPokemons.value.splice(toIndex, 0, pokemon)
      saveTeam()
      return true
    }
    return false
  }

  const replaceTeamMember = (index: number, pokemon: Pokemon) => {
    if (index >= 0 && index < teamPokemons.value.length && !isInTeam(pokemon.id)) {
      teamPokemons.value[index] = pokemon
      saveTeam()
      return true
    }
    return false
  }

  // Initialize team on store creation
  initializeTeam()

  return {
    // Constants
    MAX_TEAM_SIZE,

    // State
    teamPokemons,

    // Getters
    teamIds,
    teamCount,
    isTeamFull,
    availableSlots,
    isInTeam,
    getTeamMemberById,

    // Actions
    addToTeam,
    removeFromTeam,
    toggleTeamMember,
    clearTeam,
    reorderTeam,
    replaceTeamMember,
    initializeTeam,
  }
})
