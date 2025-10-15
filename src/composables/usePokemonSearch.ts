import { ref, computed } from 'vue'
import { usePokemonListQuery, useFilteredPokemonList } from '@/api/pokemon.query'

export function usePokemonSearch() {
  const searchTerm = ref('')
  const searchTermRef = computed(() => searchTerm.value)

  // Data fetching with search
  const { data: pokemonList, error, isLoading, refetch } = usePokemonListQuery()
  const filteredPokemon = useFilteredPokemonList(pokemonList, searchTermRef)

  const handleSearch = (value: string) => {
    searchTerm.value = value
  }

  const clearSearch = () => {
    searchTerm.value = ''
  }

  const handleRetry = () => {
    refetch()
  }

  return {
    // State
    searchTerm: searchTermRef,

    // Data
    pokemonList,
    filteredPokemon,
    isLoading,
    error,

    // Handlers
    handleSearch,
    clearSearch,
    handleRetry,
  }
}
