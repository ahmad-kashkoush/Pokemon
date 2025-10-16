import { useQuery } from '@tanstack/vue-query'
import { computed, toValue, type MaybeRef } from 'vue'
import { useRoute } from 'vue-router'
import { PokemonService } from './pokemon.service'

export const usePokemonListQuery = () => {
  return useQuery({
    queryKey: ['pokemon-list'],
    queryFn: () => PokemonService.getPokemonList(),
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
export const useEvolutionChainQuery = (speciesUrl: MaybeRef<string>) => {
  return useQuery({
    queryKey: ['evolution-chain', speciesUrl],
    queryFn: () => PokemonService.getEvolutionChainWithDetails(toValue(speciesUrl)),
    enabled: computed(() => !!toValue(speciesUrl)),
  })
}
