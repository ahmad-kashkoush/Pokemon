<script setup lang="ts">
import AppSearchBar from '@/components/app/AppSearchBar.vue'
import ExplorerHeader from '@/components/pokemon-explorer/ExplorerHeader.vue'
import NavigationCard from '@/components/NavigationCard.vue'
import PokemonList from '@/components/PokemonList.vue'
import { useFavoritesStore } from '@/stores/favorite.store'
import { useTeamStore } from '@/stores/team.store'
import type { usePokemonExplorer } from '@/composables/pokemon-explorer/usePokemonExplorer'

interface Props {
  pokemonExplorer: ReturnType<typeof usePokemonExplorer>
  onTeamClick?: () => void
  onFavoritesClick?: () => void
}

defineProps<Props>()

const favoritesStore = useFavoritesStore()
const teamStore = useTeamStore()
</script>

<template>
  <main class="page-layout">
    <ExplorerHeader :pokemonExplorer="pokemonExplorer" />
    <div class="container">
      <AppSearchBar @search="pokemonExplorer.handleSearch" />
      <div class="grid grid-cols-2 gap-3 mt-4 mb-6">
        <!-- Team Card -->
        <div v-if="onTeamClick" @click="onTeamClick">
          <NavigationCard to="/team" title="Mijn team"
            :subtitle="`${teamStore.teamCount}/${teamStore.MAX_TEAM_SIZE} pokémons`"
            gradient="bg-gradient-to-br from-purple-500 to-purple-600" :clickable="true" />
        </div>
        <NavigationCard v-else to="/team" title="Mijn team"
          :subtitle="`${teamStore.teamCount}/${teamStore.MAX_TEAM_SIZE} pokémons`"
          gradient="bg-gradient-to-br from-purple-500 to-purple-600" />

        <!-- Favorites Card -->
        <div v-if="onFavoritesClick" @click="onFavoritesClick">
          <NavigationCard to="/favorites" title="Favorieten" :subtitle="`${favoritesStore.favoritesCount} pokémons`"
            gradient="bg-gradient-to-br from-teal-400 to-teal-500" :clickable="true" />
        </div>
        <NavigationCard v-else to="/favorites" title="Favorieten"
          :subtitle="`${favoritesStore.favoritesCount} pokémons`"
          gradient="bg-gradient-to-br from-teal-400 to-teal-500" />
      </div>
    </div>
    <PokemonList :pokemon="pokemonExplorer.displayPokemon.value" :isLoading="pokemonExplorer.isLoading.value"
      :error="pokemonExplorer.error.value" :onRetry="pokemonExplorer.handleRetry" />
  </main>
</template>
