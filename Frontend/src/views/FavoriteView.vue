<script setup lang="ts">
import { computed } from 'vue'
import { useFavoritesStore } from '@/stores/favorite.store'
import BaseList from '@/components/base/BaseList.vue'

interface Props {
  onBackClick?: () => void
}

defineProps<Props>()

const favoritesStore = useFavoritesStore()

// Display all favorite Pokemon
const favoritesList = computed(() => favoritesStore.favoritePokemons)
const metaInfo = computed(() =>
  `${favoritesStore.favoritesCount} pokémons`
)
</script>

<template>
  <BaseList title="Favorieten" :pokemon="favoritesList"
    emptyMessage="Je hebt nog geen Pokémon toegevoegd aan je favorieten." heroClass="hero-teal"
    :onBackClick="onBackClick" :metaInfo="metaInfo" />
</template>
