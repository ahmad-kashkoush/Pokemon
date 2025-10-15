import { computed } from 'vue'
import { usePokemonSearch } from './usePokemonSearch'
import { usePokemonSort } from './usePokemonSort'
import { usePokemonFilter } from './usePokemonFilter'

export function usePokemonExplorer() {
  const search = usePokemonSearch()
  const sort = usePokemonSort()
  const filter = usePokemonFilter()

  const displayPokemon = computed(() => {
    let pokemon = [...(search.filteredPokemon.value || [])]

    pokemon = filter.filterPokemon(pokemon)

    pokemon = sort.sortPokemon(pokemon)

    return pokemon
  })

  return {
    // Search functionality
    searchTerm: search.searchTerm,
    handleSearch: search.handleSearch,
    clearSearch: search.clearSearch,

    // Sort functionality
    isSortModalOpen: sort.isSortModalOpen,
    currentSort: sort.currentSort,
    handleSortClick: sort.handleSortClick,
    handleSortModalClose: sort.handleSortModalClose,
    handleSort: sort.handleSort,

    // Filter functionality
    isFilterModalOpen: filter.isFilterModalOpen,
    selectedTypeFilters: filter.selectedTypeFilters,
    handleFilterClick: filter.handleFilterClick,
    handleFilterModalClose: filter.handleFilterModalClose,
    handleFilter: filter.handleFilter,
    clearFilters: filter.clearFilters,

    // Data
    displayPokemon,
    isLoading: search.isLoading,
    error: search.error,
    handleRetry: search.handleRetry,
  }
}
