import { ref, computed, type Ref } from 'vue'
import type { Pokemon } from '@/types/pokemon.type'
import { usePokemonListQuery } from '@/api/pokemon/pokemon.query'

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
// Helper composable
function useFilteredPokemonList(pokemonList: Ref<Pokemon[] | undefined>, searchTerm: Ref<string>) {
  return computed(() => {
    if (!pokemonList.value?.length) return []

    if (!searchTerm.value) return pokemonList.value

    const search = searchTerm.value.toLowerCase()

    return pokemonList.value.filter((pokemon) => {
      return (
        pokemon.name.toLowerCase().includes(search) ||
        pokemon.id.toString().includes(search) ||
        pokemon.types.some((type) => type.type.name.toLowerCase().includes(search))
      )
    })
  })
}
