import { useQuery } from '@tanstack/vue-query'
import { computed, type Ref } from 'vue'
import { useRoute } from 'vue-router'
import { PokemonService } from './pokemon.service'

export interface Pokemon {
  id: number
  name: string
  sprites: {
    front_default: string
  }
  types: Array<{
    slot: number
    type: {
      name: string
    }
  }>
}

export const usePokemonListQuery = () => {
  return useQuery({
    queryKey: ['pokemon-list'],
    queryFn: () => PokemonService.getPokemonList(),
  })
}

export const useFilteredPokemonList = (
  pokemonList: Ref<Pokemon[] | undefined>,
  searchTerm: Ref<string>,
) => {
  return computed(() => {
    if (!pokemonList.value?.length) return []

    if (!searchTerm.value) return pokemonList.value

    const search = searchTerm.value.toLowerCase()

    return pokemonList.value.filter((pokemon) => {
      return pokemon.name.toLowerCase().includes(search) || pokemon.id.toString().includes(search)
    })
  })
}

export const usePokemonDetailsQuery = () => {
  const route = useRoute()
  const pokemonId = computed(() => route.params.id as string)
  return useQuery({
    queryKey: ['pokemon-details', pokemonId],
    queryFn: () => PokemonService.getPokemonDetails(pokemonId.value),
    enabled: computed(() => !!pokemonId.value),
  })
}
