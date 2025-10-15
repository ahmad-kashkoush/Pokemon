<script setup lang="ts">
import { computed } from 'vue'
import { useTeamStore } from '@/stores/team.store'
import PokemonList from '@/components/PokemonList.vue'

const teamStore = useTeamStore()

// Display all team Pokemon with combined view navigation
const teamList = computed(() => teamStore.teamPokemons)
</script>

<template>
  <main class="page-layout">
    <!-- Header -->
    <div class="header">
      <div>
        <h1 class="text-2xl font-bold text-gray-900">Mijn Team</h1>
        <div class="text-gray-600 text-sm mt-1">
          {{ teamStore.teamCount }}/{{ teamStore.MAX_TEAM_SIZE }} Pokémon
        </div>
      </div>
    </div>

    <div class="container">
      <PokemonList :pokemon="teamList"
        emptyMessage="Je hebt nog geen Pokémon toegevoegd aan je team. Je kunt maximaal 6 Pokémon selecteren." />

      <div v-if="teamStore.teamCount > 0" class="mt-6">
        <button @click="teamStore.clearTeam"
          class="w-full py-2 px-4 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
          Team Leegmaken
        </button>
      </div>
    </div>
  </main>
</template>
