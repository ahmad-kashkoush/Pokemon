<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { usePokemonListQuery, useFilteredPokemonList } from '../api/pokemon.query'
import { useFavoritesStore } from '@/stores/favorites'
import type { Pokemon } from '@/types/pokemon.type'

interface Props {
  searchTerm: string
}

const props = defineProps<Props>()
const searchTermRef = computed(() => props.searchTerm)
const router = useRouter()
const favoritesStore = useFavoritesStore()

const { data: pokemonList, error, isLoading } = usePokemonListQuery()

const filteredPokemon = useFilteredPokemonList(pokemonList, searchTermRef)

const displayPokemon = computed(() => filteredPokemon.value)

const formatName = (name: string) => {
  return name.charAt(0).toUpperCase() + name.slice(1)
}

const formatTypeName = (type: string) => {
  return type.charAt(0).toUpperCase() + type.slice(1)
}

const getTypeColor = (type: string) => {
  const typeColors: Record<string, string> = {
    water: 'bg-blue-500',
    fire: 'bg-red-500',
    grass: 'bg-green-500',
    electric: 'bg-yellow-500',
    psychic: 'bg-pink-500',
    ice: 'bg-blue-300',
    dragon: 'bg-purple-600',
    dark: 'bg-gray-800',
    fairy: 'bg-pink-300',
    normal: 'bg-gray-400',
    fighting: 'bg-red-700',
    poison: 'bg-purple-500',
    ground: 'bg-yellow-600',
    flying: 'bg-blue-400',
    bug: 'bg-green-400',
    rock: 'bg-yellow-800',
    ghost: 'bg-purple-800',
    steel: 'bg-gray-500',
  }
  return typeColors[type] || 'bg-gray-400'
}

const navigateToPokemon = (pokemonId: number) => {
  console.log('Navigating to Pokemon ID:', pokemonId)
  console.log('Target URL:', `/pokemons/${pokemonId}`)
  try {
    router.push(`/pokemons/${pokemonId}`)
    console.log('Navigation successful')
  } catch (error) {
    console.error('Navigation error:', error)
  }
}
</script>
<template>
  <div class="px-4 pb-6">
    <div v-if="isLoading" class="text-center py-8">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
      <p class="mt-4 text-gray-600">Loading Pokémon...</p>
    </div>

    <div v-else-if="error" class="text-center py-8 text-red-500">
      Error loading Pokémon: {{ error.message }}
    </div>

    <div v-else-if="displayPokemon.length === 0" class="text-center py-8 text-gray-600">
      No Pokémon found matching your search.
    </div>

    <div v-else class="space-y-3">
      <div v-for="poke in displayPokemon" :key="poke.id" @click.prevent="navigateToPokemon(poke.id)"
        class="bg-white rounded-2xl p-4 flex items-center gap-4 shadow-sm hover:shadow-md transition-shadow min-h-[80px] cursor-pointer">
        <!-- Pokemon Image -->
        <div class="w-16 h-16 bg-gray-100 rounded-xl flex items-center justify-center flex-shrink-0">
          <img v-if="poke.sprites?.front_default" :src="poke.sprites.front_default" :alt="poke.name"
            class="w-12 h-12 object-contain" loading="lazy" />
          <div v-else class="text-2xl text-gray-400">?</div>
        </div>

        <!-- Pokemon Info -->
        <div class="flex-1 min-w-0">
          <h3 class="font-bold text-md  text-gray-900">{{ formatName(poke.name) }}</h3>
          <p class="text-gray-500 text-sm">Nr. {{ String(poke.id).padStart(3, '0') }}</p>
        </div>

        <!-- Pokemon Types -->
        <div class="flex gap-1.5 flex-shrink-0 items-center">
          <span v-for="type in poke.types" :key="type.type.name" :class="getTypeColor(type.type.name)"
            class="px-2 py-0.5 rounded-full text-xs font-medium text-white">
            {{ formatTypeName(type.type.name) }}
          </span>
        </div>

        <!-- Arrow -->
        <div class="flex-shrink-0 text-gray-400">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m9 18 6-6-6-6" />
          </svg>
        </div>
      </div>
    </div>
  </div>
</template>



<style scoped>
/* All styling is handled by Tailwind CSS classes */
</style>
