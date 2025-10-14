<script setup lang="ts">
import { ref } from 'vue'
import SearchBar from '@/components/SearchBar.vue'
import PokemonList from '@/components/PokemonList.vue'
import NavigationCard from '@/components/NavigationCard.vue'
import { useFavoritesStore } from '@/stores/favorite.store'
import { useTeamStore } from '@/stores/team.store'

const searchTerm = ref('')
const favoritesStore = useFavoritesStore()
const teamStore = useTeamStore()

const handleSearch = (value: string) => {
  searchTerm.value = value
}
</script>

<template>
  <main class="min-h-screen bg-gray-50">
    <!-- Header -->
    <div class="bg-white px-4 py-3 flex items-center justify-between shadow-sm">
      <h1 class="text-2xl font-bold text-gray-900">Pokédex</h1>
      <div class="flex gap-2">
        <button class="p-2 text-gray-600 hover:bg-gray-100 rounded-lg">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.707A1 1 0 013 7V4z" />
          </svg>
        </button>
        <button class="p-2 text-gray-600 hover:bg-gray-100 rounded-lg">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
          </svg>
        </button>
      </div>
    </div>

    <div class="px-4 pt-4 pb-2">
      <!-- Search Bar -->
      <SearchBar @search="handleSearch" />

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
    <PokemonList :search-term="searchTerm" />
  </main>
</template>
<style scoped></style>
