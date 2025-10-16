<script setup lang="ts">
import AppFilterModal from '@/components/app/AppFilterModal.vue'
import AppSearchBar from '@/components/app/AppSearchBar.vue'
import AppSortModal from '@/components/app/AppSortModal.vue'
import CombinedFavoriteView from '@/views/favorite/CombinedFavoriteView.vue'
import CombinedTeamView from '@/views/team/CombinedTeamView.vue'
import CombinedViewBackButton from '@/components/app/CombinedViewBackButton.vue'
import ExplorerHeader from '@/components/pokemon-explorer/ExplorerHeader.vue'
import NavigationCard from '@/components/NavigationCard.vue'
import PokemonList from '@/components/PokemonList.vue'
import { usePokemonExplorer } from '@/composables/pokemon-explorer/usePokemonExplorer'
import { useScreenSize } from '@/composables/useScreenSize'
import { useFavoritesStore } from '@/stores/favorite.store'
import { useTeamStore } from '@/stores/team.store'
import { computed, ref } from 'vue'
import { useRoute } from 'vue-router'
import PokemonDetailsView from '@/views/pokemon-details/PokemonDetailsView.vue'

const route = useRoute()
const favoritesStore = useFavoritesStore()
const teamStore = useTeamStore()
const pokemonExplorer = usePokemonExplorer()
const { isWideScreen } = useScreenSize(800)

// Track which view is active in left panel (wide screen only)
const leftPanelView = ref<'explorer' | 'team' | 'favorites'>('explorer')

// Get Pokemon ID from route
const pokemonId = computed(() => {
  const match = route.path.match(/^\/pokemons\/(\d+)$/)
  return match ? match[1] : null
})

// Handle navigation clicks
const handleNavigationClick = (view: 'team' | 'favorites') => {
  if (isWideScreen.value) {
    leftPanelView.value = view
  } else {
    window.location.href = `/${view}`
  }
}

const showExplorerView = () => {
  leftPanelView.value = 'explorer'
}
</script>

<template>
  <div v-if="isWideScreen" class="flex h-screen">
    <!-- Left Panel -->
    <div class="flex-1 border-r border-gray-200 overflow-auto">
      <main v-if="leftPanelView === 'explorer'" class="page-layout">
        <ExplorerHeader :pokemonExplorer="pokemonExplorer" />
        <div class="container">
          <AppSearchBar @search="pokemonExplorer.handleSearch" />
          <div class="grid grid-cols-2 gap-3 mt-4 mb-6">
            <div @click="handleNavigationClick('team')">
              <NavigationCard to="/team" title="Mijn team"
                :subtitle="`${teamStore.teamCount}/${teamStore.MAX_TEAM_SIZE} pokémons`"
                gradient="bg-gradient-to-br from-purple-500 to-purple-600" :clickable="true" />
            </div>
            <div @click="handleNavigationClick('favorites')">
              <NavigationCard to="/favorites" title="Favorieten" :subtitle="`${favoritesStore.favoritesCount} pokémons`"
                gradient="bg-gradient-to-br from-teal-400 to-teal-500" :clickable="true" />
            </div>
          </div>
        </div>
        <PokemonList :pokemon="pokemonExplorer.displayPokemon.value" :isLoading="pokemonExplorer.isLoading.value"
          :error="pokemonExplorer.error.value" :onRetry="pokemonExplorer.handleRetry" />
      </main>

      <div v-else-if="leftPanelView === 'team'">
        <CombinedTeamView />
        <CombinedViewBackButton title="Explorer" :onClick="showExplorerView" />
      </div>

      <div v-else-if="leftPanelView === 'favorites'">
        <CombinedFavoriteView />
        <CombinedViewBackButton title="Explorer" :onClick="showExplorerView" />
      </div>
    </div>

    <!-- Right Panel -->
    <div class="flex-1 overflow-auto">
      <PokemonDetailsView v-if="pokemonId" />
      <div v-else class="flex items-center justify-center h-full text-gray-500">
        <div class="text-center">
          <svg class="w-16 h-16 mx-auto mb-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd"
              d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
              clip-rule="evenodd" />
          </svg>
          <h2 class="text-xl font-semibold mb-2">Select a Pokémon</h2>
          <p>Choose a Pokémon from {{ leftPanelView }} to view details</p>
        </div>
      </div>
    </div>
  </div>

  <!-- Narrow Screen -->
  <main v-else class="page-layout">
    <ExplorerHeader :pokemonExplorer="pokemonExplorer" />
    <div class="container">
      <AppSearchBar @search="pokemonExplorer.handleSearch" />
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
  </main>

  <!-- Shared Modals -->
  <AppSortModal :is-open="pokemonExplorer.isSortModalOpen.value" :selectedSort="pokemonExplorer.currentSort.value"
    @close="pokemonExplorer.handleSortModalClose" @sort="pokemonExplorer.handleSort" />
  <AppFilterModal :is-open="pokemonExplorer.isFilterModalOpen.value"
    :selectedFilters="pokemonExplorer.selectedTypeFilters.value" @close="pokemonExplorer.handleFilterModalClose"
    @filter="pokemonExplorer.handleFilter" />
</template>
