<script setup lang="ts">
import { computed } from 'vue'
import { useFavoritesStore } from '@/stores/favorite.store'
import PokemonList from '@/components/PokemonList.vue'

const favoritesStore = useFavoritesStore()

// Display all favorite Pokemon with combined view navigation
const favoritesList = computed(() => favoritesStore.favoritePokemons)
</script>

<template>
  <main class="page-layout">
    <!-- Header -->
    <div class="header">
      <div>
        <h1 class="text-2xl font-bold text-gray-900">Favorieten</h1>
        <div class="text-gray-600 text-sm mt-1">
          {{ favoritesStore.favoritesCount }} Pokémon
        </div>
      </div>
    </div>

    <div class="container">
      <PokemonList :pokemon="favoritesList" emptyMessage="Je hebt nog geen Pokémon toegevoegd aan je favorieten." />
    </div>
  </main>
</template>
