<script setup lang="ts">
import { computed } from 'vue'
import { useTeamStore } from '@/stores/team.store'
import AppBackButton from '@/components/app/AppBackButton.vue'
import PokemonList from '@/components/PokemonList.vue'

const teamStore = useTeamStore()

// Display all team Pokemon
const teamList = computed(() => teamStore.teamPokemons)
</script>

<template>
  <main class="min-h-screen bg-gradient-to-br from-purple-400 to-purple-500">
    <!-- Header -->
    <div class="px-4 py-3 pt-12 flex items-center gap-3">
      <AppBackButton />
      <h1 class="text-3xl font-bold text-white">Mijn Team</h1>
      <div class="ml-auto text-white text-sm">
        {{ teamStore.teamCount }}/{{ teamStore.MAX_TEAM_SIZE }}
      </div>
    </div>

    <PokemonList :pokemon="teamList"
      emptyMessage="Je hebt nog geen Pokémon toegevoegd aan je team. Je kunt maximaal 6 Pokémon selecteren." />

    <div v-if="teamStore.teamCount > 0" class="px-4 pt-2 pb-6">
      <button @click="teamStore.clearTeam"
        class="w-full px-6 py-3 bg-red-500 text-white rounded-lg font-medium hover:bg-red-600 transition-colors">
        Team Leegmaken
      </button>
    </div>
  </main>
</template>
