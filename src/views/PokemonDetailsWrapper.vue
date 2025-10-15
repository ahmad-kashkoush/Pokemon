<script setup lang="ts">
import PokemonExplorerView from './PokemonExplorerView.vue'
import PokemonDetailsView from './PokemonDetailsView.vue'
import { useScreenSize } from '@/composables/useScreenSize'

const { isWideScreen } = useScreenSize(800)
</script>

<template>
  <PokemonExplorerView v-if="isWideScreen" />
  <PokemonDetailsView v-else />
</template>
