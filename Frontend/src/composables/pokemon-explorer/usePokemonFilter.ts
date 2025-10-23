import { ref } from 'vue'
import type { Pokemon } from '@/types/pokemon.type'

export function usePokemonFilter() {
  const isFilterModalOpen = ref(false)
  const selectedTypeFilters = ref<string[]>([])

  const handleFilterClick = () => {
    isFilterModalOpen.value = true
  }

  const handleFilterModalClose = () => {
    isFilterModalOpen.value = false
  }

  const handleFilter = (filters: string[]) => {
    selectedTypeFilters.value = filters
  }

  const clearFilters = () => {
    selectedTypeFilters.value = []
  }

  const filterPokemon = (pokemon: Pokemon[]) => {
    if (selectedTypeFilters.value.length === 0) {
      return pokemon
    }

    return pokemon.filter((p) =>
      p.types.some((typeObj) =>
        selectedTypeFilters.value.includes(typeObj.type.name.toLowerCase())
      )
    )
  }

  return {
    // State
    isFilterModalOpen,
    selectedTypeFilters,
    
    // Handlers
    handleFilterClick,
    handleFilterModalClose,
    handleFilter,
    clearFilters,
    
    // Filter function
    filterPokemon
  }
}
