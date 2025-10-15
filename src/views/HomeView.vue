<script setup lang="ts">
import { ref } from 'vue'
import AppSearchBar from '@/components/app/AppSearchBar.vue'
import AppSortModal, { type SortOption } from '@/components/app/AppSortModal.vue'
import AppFilterModal from '@/components/app/AppFilterModal.vue'
import PokemonList from '@/components/PokemonList.vue'
import NavigationCard from '@/components/NavigationCard.vue'
import { useFavoritesStore } from '@/stores/favorite.store'
import { useTeamStore } from '@/stores/team.store'

const searchTerm = ref('')
const isSortModalOpen = ref(false)
const isFilterModalOpen = ref(false)
const selectedTypeFilters = ref<string[]>([])
const currentSort = ref<SortOption>({
  label: 'Alfabetisch oplopend',
  value: 'name-asc',
  key: 'name',
  direction: 'asc'
})

const favoritesStore = useFavoritesStore()
const teamStore = useTeamStore()

const handleSearch = (value: string) => {
  searchTerm.value = value
}

const handleSortClick = () => {
  isSortModalOpen.value = true
}

const handleSortModalClose = () => {
  isSortModalOpen.value = false
}

const handleSort = (sortOption: SortOption) => {
  currentSort.value = sortOption
}

const handleFilterClick = () => {
  isFilterModalOpen.value = true
}

const handleFilterModalClose = () => {
  isFilterModalOpen.value = false
}

const handleFilter = (filters: string[]) => {
  selectedTypeFilters.value = filters
}
</script>

<template>
  <main class="min-h-screen bg-gray-50">
    <!-- Header -->
    <div class="bg-white px-4 py-3 flex items-center justify-between shadow-sm">
      <h1 class="text-2xl font-bold text-gray-900">Pokédex</h1>
      <div class="flex gap-2">
        <button @click="handleFilterClick" class="p-2 text-gray-600 hover:bg-gray-100 rounded-lg relative">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.707A1 1 0 013 7V4z" />
          </svg>
          <span v-if="selectedTypeFilters.length > 0"
            class="absolute -top-1 -right-1 bg-teal-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
            {{ selectedTypeFilters.length }}
          </span>
        </button>
        <button @click="handleSortClick" class="p-2 text-gray-600 hover:bg-gray-100 rounded-lg">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
          </svg>
        </button>
      </div>
    </div>

    <div class="px-4 pt-4 pb-2">
      <!-- Search Bar -->
      <AppSearchBar @search="handleSearch" />

      <!-- Navigation Cards -->
      <div class="grid grid-cols-2 gap-3 mt-4 mb-6">
        <NavigationCard to="/team" title="Mijn team"
          :subtitle="`${teamStore.teamCount}/${teamStore.MAX_TEAM_SIZE} pokémons`"
          gradient="bg-gradient-to-br from-purple-500 to-purple-600" />

        <NavigationCard to="/favorites" title="Favorieten" :subtitle="`${favoritesStore.favoritesCount} pokémons`"
          gradient="bg-gradient-to-br from-teal-400 to-teal-500" />
      </div>
    </div>

    <!-- Pokemon List -->
    <PokemonList :search-term="searchTerm" :sort-option="currentSort" :type-filters="selectedTypeFilters" />

    <!-- Sort Modal -->
    <AppSortModal :is-open="isSortModalOpen" :selected-sort="currentSort" @close="handleSortModalClose"
      @sort="handleSort" />

    <!-- Filter Modal -->
    <AppFilterModal :is-open="isFilterModalOpen" :selected-filters="selectedTypeFilters" @close="handleFilterModalClose"
      @filter="handleFilter" />
  </main>
</template>
