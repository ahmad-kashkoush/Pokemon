<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { usePokemonListQuery, useFilteredPokemonList } from '../api/pokemon.query'
import PokemonCard from './PokemonCard.vue'
import AppLoader from '@/components/app/AppLoader.vue'
import AppError from '@/components/app/AppError.vue'
import { useToast } from 'vue-toastification'
import type { SortOption } from '@/components/app/AppSortModal.vue'

interface Props {
  searchTerm: string
  sortOption: SortOption
  typeFilters: string[]
}

const props = defineProps<Props>()
const searchTermRef = computed(() => props.searchTerm)
const router = useRouter()
const toast = useToast();
const { data: pokemonList, error, isLoading, refetch } = usePokemonListQuery()

const filteredPokemon = useFilteredPokemonList(pokemonList, searchTermRef)

const displayPokemon = computed(() => {
  let pokemon = [...(filteredPokemon.value || [])]

  // Filter by types if any are selected
  if (props.typeFilters.length > 0) {
    pokemon = pokemon.filter(p =>
      p.types.some(typeObj =>
        props.typeFilters.includes(typeObj.type.name.toLowerCase())
      )
    )
  }

  // Sort based on the selected option
  if (props.sortOption.key === 'name') {
    pokemon.sort((a, b) => {
      const comparison = a.name.localeCompare(b.name)
      return props.sortOption.direction === 'asc' ? comparison : -comparison
    })
  } else if (props.sortOption.key === 'id') {
    pokemon.sort((a, b) => {
      const comparison = a.id - b.id
      return props.sortOption.direction === 'asc' ? comparison : -comparison
    })
  }

  return pokemon
})

const handleRetry = () => {
  refetch()
}

const handlePokemonClick = (pokemon: { id: number }) => {
  try {
    router.push(`/${pokemon.id}`)
  } catch (error) {
    toast.error(`Navigation error: ${error}`)
  }
}
</script>
<template>
  <div class="px-4 pb-6">
    <AppLoader :isLoading="isLoading" />
    <AppError :hasError="!!error" :errorMessage="error?.message" @retry="handleRetry" />

    <div v-if="!isLoading && !error && displayPokemon.length === 0" class="text-center py-8 text-gray-600">
      No Pokémon found matching your search.
    </div>

    <div v-if="!isLoading && !error && displayPokemon.length > 0" class="space-y-3">
      <PokemonCard v-for="poke in displayPokemon" :key="poke.id" :pokemon="poke" @click="handlePokemonClick" />
    </div>
  </div>
</template>
