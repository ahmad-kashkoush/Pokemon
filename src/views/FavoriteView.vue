<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useFavoritesStore } from '@/stores/favorite.store'
import AppBackButton from '@/components/app/AppBackButton.vue'
import PokemonCard from '@/components/PokemonCard.vue'

const router = useRouter()
const favoritesStore = useFavoritesStore()

// Display all favorite Pokemon
const favoritesList = computed(() => favoritesStore.favoritePokemons)

const handlePokemonClick = (pokemon: { id: number }) => {
  router.push(`/pokemons/${pokemon.id}`)
}
</script>

<template>
  <main class="min-h-screen bg-gradient-to-br from-teal-400 to-teal-500">
    <!-- Header -->
    <div class="px-4 py-3 pt-12 flex items-center gap-3">
      <AppBackButton />
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
        <button @click="$router.go(-1)"
          class="px-6 py-3 bg-white text-teal-500 rounded-lg font-medium hover:bg-gray-100 transition-colors">
          Ontdek Pokémon
        </button>
      </div>

      <!-- Favorites List -->
      <div v-else class="space-y-3">
        <PokemonCard v-for="poke in favoritesList" :showIndicators="false" :key="poke.id" :pokemon="poke"
          @click="handlePokemonClick" />
      </div>
    </div>
  </main>
</template>
