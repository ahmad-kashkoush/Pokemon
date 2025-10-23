<script setup lang="ts">
import AppFilterModal from '@/components/app/AppFilterModal.vue'
import AppSortModal from '@/components/app/AppSortModal.vue'
import FavoriteView from '@/views/FavoriteView.vue'
import TeamView from '@/views/TeamView.vue'
import ExplorerContent from '@/components/pokemon-explorer/ExplorerContent.vue'
import EmptyStateView from '@/components/pokemon-explorer/EmptyStateView.vue'
import PokemonDetailsView from '@/views/PokemonDetailsView.vue'
import { usePokemonExplorer } from '@/composables/pokemon-explorer/usePokemonExplorer'
import { useScreenSize } from '@/composables/useScreenSize'
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useLeftPanelStore } from '@/stores/leftPanel.store'

const route = useRoute()
const pokemonExplorer = usePokemonExplorer()
const { isWideScreen } = useScreenSize(800)

const leftPanel = useLeftPanelStore()

const pokemonId = computed(() => {
  const id = route.params.id
  return id ? String(id) : null
})

// Determine if we should show details view (mobile with ID in route)
const showMobileDetailsView = computed(() => !isWideScreen.value && pokemonId.value !== null)
// Handle navigation clicks
const handleNavigationClick = (view: 'team' | 'favorites') => {
  if (isWideScreen.value) {
    leftPanel.setLeftPanelView(view);
  } else {
    window.location.href = `/${view}`
  }
}

</script>

<template>
  <!-- Wide Screen: Split View -->
  <div v-if="isWideScreen" class="flex h-screen">
    <!-- Left Panel -->
    <div class="flex-1 border-r border-gray-200 overflow-auto">
      <ExplorerContent v-if="leftPanel.leftPanelView === 'explorer'" :pokemonExplorer="pokemonExplorer"
        :onTeamClick="() => handleNavigationClick('team')"
        :onFavoritesClick="() => handleNavigationClick('favorites')" />

      <TeamView v-else-if="leftPanel.leftPanelView === 'team'" :onBackClick="leftPanel.showExplorerView" />

      <FavoriteView v-else-if="leftPanel.leftPanelView === 'favorites'" :onBackClick="leftPanel.showExplorerView" />
    </div>

    <!-- Right Panel -->
    <div class="flex-1 overflow-auto">
      <PokemonDetailsView v-if="pokemonId" />
      <EmptyStateView v-else :context="leftPanel.leftPanelView" />
    </div>
  </div>

  <!-- Mobile: Details View -->
  <PokemonDetailsView v-else-if="showMobileDetailsView" />

  <!-- Mobile: Explorer View -->
  <ExplorerContent v-else :pokemonExplorer="pokemonExplorer" />

  <!-- Shared Modals -->
  <AppSortModal :is-open="pokemonExplorer.isSortModalOpen.value" :selectedSort="pokemonExplorer.currentSort.value"
    @close="pokemonExplorer.handleSortModalClose" @sort="pokemonExplorer.handleSort" />
  <AppFilterModal :is-open="pokemonExplorer.isFilterModalOpen.value"
    :selectedFilters="pokemonExplorer.selectedTypeFilters.value" @close="pokemonExplorer.handleFilterModalClose"
    @filter="pokemonExplorer.handleFilter" />
</template>
