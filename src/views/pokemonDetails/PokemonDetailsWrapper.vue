<script setup lang="ts">
import PokemonExplorerView from '@/views/PokemonExplorerView.vue'
import PokemonDetailsView from '@/views/pokemonDetails/PokemonDetailsView.vue'
import { useScreenSize } from '@/composables/useScreenSize'

const { isWideScreen } = useScreenSize(800)
</script>

<template>
  <PokemonExplorerView v-if="isWideScreen" />
  <PokemonDetailsView v-else />
</template>
