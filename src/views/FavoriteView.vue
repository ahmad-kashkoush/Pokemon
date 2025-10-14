<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useFavoritesStore } from '@/stores/favorites'
import BackButton from '@/components/BackButton.vue'
import PokemonCard from '@/components/PokemonCard.vue'

const router = useRouter()
const favoritesStore = useFavoritesStore()

// Display all favorite Pokemon
const favoritesList = computed(() => favoritesStore.favoritePokemons)

const goBack = () => {
  router.go(-1)
}

// Helper functions
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
</script>

<template>
  <main class="min-h-screen bg-gradient-to-br from-teal-400 to-teal-500">
    <!-- Header -->
    <div class="px-4 py-3 pt-12 flex items-center gap-3">
      <BackButton />
      <h1 class="text-3xl font-bold text-white">Favorieten</h1>
    </div>

    <!-- Content Area -->
    <div class="px-4 pt-6 pb-6">
      <!-- Empty State -->
      <div v-if="favoritesStore.favoritesCount === 0" class="text-center py-16">
        <div class="w-24 h-24 mx-auto mb-4 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
          <svg class="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
        </div>
        <h3 class="text-lg font-semibold text-white mb-2">Geen favorieten</h3>
        <p class="text-white text-opacity-80 mb-6">Je hebt nog geen Pokémon toegevoegd aan je favorieten.</p>
        <button @click="goBack"
          class="px-6 py-3 bg-white text-teal-500 rounded-lg font-medium hover:bg-gray-100 transition-colors">
          Ontdek Pokémon
        </button>
      </div>

      <!-- Favorites List -->
      <div v-else class="space-y-3">
        <div v-for="poke in favoritesList" :key="poke.id" @click="$router.push(`/pokemons/${poke.id}`)"
          class="bg-white rounded-2xl p-4 mt-4 flex items-center gap-4 shadow-sm hover:shadow-md transition-shadow cursor-pointer">
          <!-- Pokemon Image -->
          <div class="w-16 h-16 bg-gray-100 rounded-xl flex items-center justify-center flex-shrink-0">
            <img v-if="poke.sprites?.front_default" :src="poke.sprites.front_default" :alt="poke.name"
              class="w-12 h-12 object-contain" loading="lazy" />
            <img v-else-if="poke.sprites?.other?.['official-artwork']?.front_default"
              :src="poke.sprites.other['official-artwork'].front_default" :alt="poke.name"
              class="w-12 h-12 object-contain" loading="lazy" />
            <div v-else class="text-2xl text-gray-400">?</div>
          </div>

          <!-- Pokemon Info -->
          <div class="flex-1 min-w-0">
            <h3 class="font-bold text-lg text-gray-900 capitalize">{{ poke.name }}</h3>
            <p class="text-gray-500 text-sm">Nr. {{ String(poke.id).padStart(3, '0') }}</p>
          </div>

          <!-- Pokemon Types -->
          <div class="flex gap-1.5 flex-shrink-0 items-center">
            <span v-for="type in poke.types" :key="type.type.name" :class="getTypeColor(type.type.name)"
              class="px-3 py-1 rounded-full text-xs font-medium text-white">
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
  </main>
</template>

<style scoped>
/* All styling is handled by Tailwind CSS classes */
</style>
