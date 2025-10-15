<script setup lang="ts">
import AppSearchBar from '@/components/app/AppSearchBar.vue'
import AppSortModal from '@/components/app/AppSortModal.vue'
import AppFilterModal from '@/components/app/AppFilterModal.vue'
import PokemonList from '@/components/PokemonList.vue'
import NavigationCard from '@/components/NavigationCard.vue'
import { useFavoritesStore } from '@/stores/favorite.store'
import { useTeamStore } from '@/stores/team.store'
import { usePokemonExplorer } from '@/composables/usePokemonExplorer'

const favoritesStore = useFavoritesStore()
const teamStore = useTeamStore()


const pokemonExplorer = usePokemonExplorer();
</script>

<template>
  <main class="page-layout">
    <!-- Header -->
    <div class="header">
      <h1 class="text-2xl font-bold text-gray-900">Pokédex</h1>
      <div class="flex gap-2">
        <button @click="pokemonExplorer.handleFilterClick" class="btn-icon relative">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.707A1 1 0 013 7V4z" />
          </svg>
          <span v-if="pokemonExplorer.selectedTypeFilters.value.length > 0"
            class="absolute -top-1 -right-1 bg-teal-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
            {{ pokemonExplorer.selectedTypeFilters.value.length }}
          </span>
        </button>
        <button @click="pokemonExplorer.handleSortClick" class="btn-icon">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
          </svg>
        </button>
      </div>
    </div>

    <div class="container">
      <!-- Search Bar -->
      <AppSearchBar @search="pokemonExplorer.handleSearch" />

      <!-- Navigation Cards -->
      <div class="grid grid-cols-2 gap-3 mt-4 mb-6">
        <NavigationCard to="/team" title="Mijn team"
          :subtitle="`${teamStore.teamCount}/${teamStore.MAX_TEAM_SIZE} pokémons`"
          gradient="bg-gradient-to-br from-purple-500 to-purple-600" />

        <NavigationCard to="/favorites" title="Favorieten" :subtitle="`${favoritesStore.favoritesCount} pokémons`"
          gradient="bg-gradient-to-br from-teal-400 to-teal-500" />
      </div>
    </div>

    <PokemonList :pokemon="pokemonExplorer.displayPokemon.value" :isLoading="pokemonExplorer.isLoading.value"
      :error="pokemonExplorer.error.value" :onRetry="pokemonExplorer.handleRetry" />

    <AppSortModal :is-open="pokemonExplorer.isSortModalOpen.value" :selectedSort="pokemonExplorer.currentSort.value"
      @close="pokemonExplorer.handleSortModalClose" @sort="pokemonExplorer.handleSort" />

    <AppFilterModal :is-open="pokemonExplorer.isFilterModalOpen.value"
      :selectedFilters="pokemonExplorer.selectedTypeFilters.value" @close="pokemonExplorer.handleFilterModalClose"
      @filter="pokemonExplorer.handleFilter" />
  </main>
</template>
