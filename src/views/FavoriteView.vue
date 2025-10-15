<script setup lang="ts">
import { computed } from 'vue'
import { useFavoritesStore } from '@/stores/favorite.store'
import AppBackButton from '@/components/app/AppBackButton.vue'
import PokemonList from '@/components/PokemonList.vue'

const favoritesStore = useFavoritesStore()

// Display all favorite Pokemon
const favoritesList = computed(() => favoritesStore.favoritePokemons)
</script>

<template>
  <main class="min-h-screen bg-gradient-to-br from-teal-400 to-teal-500">
    <!-- Header -->
    <div class="px-4 py-3 pt-12 flex items-center gap-3">
      <AppBackButton />
      <h1 class="text-3xl font-bold text-white">Favorieten</h1>
    </div>
    <!-- todo: add component slot instead of emptyMessage -->
    <PokemonList :pokemon="favoritesList" emptyMessage="Je hebt nog geen Pokémon toegevoegd aan je favorieten." />
  </main>
</template>
