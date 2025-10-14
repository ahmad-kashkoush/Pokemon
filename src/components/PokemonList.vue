<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { usePokemonListQuery, useFilteredPokemonList } from '../api/pokemon.query'
import PokemonCard from './PokemonCard.vue'
import AppLoader from '@/components/app/appLoader.vue'

interface Props {
  searchTerm: string
}

const props = defineProps<Props>()
const searchTermRef = computed(() => props.searchTerm)
const router = useRouter()

const { data: pokemonList, error, isLoading } = usePokemonListQuery()

const filteredPokemon = useFilteredPokemonList(pokemonList, searchTermRef)

const displayPokemon = computed(() => filteredPokemon.value)

const handlePokemonClick = (pokemon: { id: number }) => {
  console.log('Navigating to Pokemon ID:', pokemon.id)
  console.log('Target URL:', `/pokemons/${pokemon.id}`)
  try {
    router.push(`/pokemons/${pokemon.id}`)
    console.log('Navigation successful')
  } catch (error) {
    console.error('Navigation error:', error)
  }
}
</script>
<template>
  <div class="px-4 pb-6">
    <AppLoader :isLoading="isLoading" />
    <div v-if="error" class="text-center py-8 text-red-500">
      Error loading Pokémon: {{ error.message }}
    </div>

    <div v-else-if="displayPokemon.length === 0" class="text-center py-8 text-gray-600">
      No Pokémon found matching your search.
    </div>

    <div v-else class="space-y-3">
      <PokemonCard v-for="poke in displayPokemon" :key="poke.id" :pokemon="poke" @click="handlePokemonClick" />
    </div>
  </div>
</template>



<style scoped>
/* All styling is handled by Tailwind CSS classes */
</style>
