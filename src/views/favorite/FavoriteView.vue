<script setup lang="ts">
import { computed } from 'vue'
import { useFavoritesStore } from '@/stores/favorite.store'
import BaseList from '@/components/base/BaseList.vue'

interface Props {
  onBackClick?: () => void
  showSubtitle?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  showSubtitle: false
})

const favoritesStore = useFavoritesStore()

// Display all favorite Pokemon
const favoritesList = computed(() => favoritesStore.favoritePokemons)
const subtitle = computed(() => props.showSubtitle ? `${favoritesStore.favoritesCount} Pokémon` : undefined)
</script>

<template>
  <BaseList title="Favorieten" :pokemon="favoritesList"
    emptyMessage="Je hebt nog geen Pokémon toegevoegd aan je favorieten." heroClass="hero-teal" :subtitle="subtitle"
    :onBackClick="onBackClick" />
</template>
