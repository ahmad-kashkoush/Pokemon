<script setup lang="ts">
import { usePokemonExplorer } from '@/composables/pokemon-explorer/usePokemonExplorer'

interface Props {
  pokemonExplorer?: ReturnType<typeof usePokemonExplorer>
}

const props = defineProps<Props>()
const pokemonExplorer = props.pokemonExplorer
</script>

<template>
  <div class="header">
    <h1 class="text-2xl font-bold text-gray-900">Pokédex</h1>
    <div class="flex gap-2" v-if="pokemonExplorer">
      <button @click="pokemonExplorer.handleFilterClick" class="btn-icon relative">
        <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd"
            d="M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z"
            clip-rule="evenodd" />
        </svg>
        <span v-if="pokemonExplorer.selectedTypeFilters.value.length"
          class="absolute -top-1 -right-1 bg-teal-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
          {{ pokemonExplorer.selectedTypeFilters.value.length }}
        </span>
      </button>
      <button @click="pokemonExplorer.handleSortClick" class="btn-icon">
        <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path
            d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 8a1 1 0 011-1h6a1 1 0 110 2H4a1 1 0 01-1-1zM3 12a1 1 0 011-1h4a1 1 0 110 2H4a1 1 0 01-1-1z" />
        </svg>
      </button>
    </div>
  </div>
</template>
