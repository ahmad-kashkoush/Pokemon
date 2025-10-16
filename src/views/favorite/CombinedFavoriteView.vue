<script setup lang="ts">
import { computed } from 'vue'
import { useFavoritesStore } from '@/stores/favorite.store'
import BaseList from '@/components/base/BaseList.vue'

const favoritesStore = useFavoritesStore()

// Display all favorite Pokemon with combined view navigation
const favoritesList = computed(() => favoritesStore.favoritePokemons)
const subtitle = computed(() => `${favoritesStore.favoritesCount} Pokémon`)
</script>

<template>
  <BaseList title="Favorieten" :pokemon="favoritesList"
    emptyMessage="Je hebt nog geen Pokémon toegevoegd aan je favorieten." :subtitle="subtitle" />
</template>
