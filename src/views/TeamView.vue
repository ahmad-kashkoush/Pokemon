<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useTeamStore } from '@/stores/team.store'
import AppBackButton from '@/components/app/AppBackButton.vue'
import PokemonList from '@/components/PokemonList.vue'

const router = useRouter()
const teamStore = useTeamStore()

// Display all team Pokemon
const teamList = computed(() => teamStore.teamPokemons)

const handlePokemonClick = (pokemon: { id: number }) => {
  router.push(`/${pokemon.id}`)
}
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

    <!-- Content Area -->
    <div class="px-4 pt-6 pb-6">
      <!-- Empty State -->
      <div v-if="teamStore.teamCount === 0" class="text-center py-16">
        <div class="w-24 h-24 mx-auto mb-4 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
          <svg class="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
        </div>
        <h3 class="text-lg font-semibold text-white mb-2">Geen teamleden</h3>
        <p class="text-white text-opacity-80 mb-6">Je hebt nog geen Pokémon toegevoegd aan je team. Je kunt
          maximaal {{ teamStore.MAX_TEAM_SIZE }} Pokémon selecteren.</p>
        <button @click="$router.go(-1)"
          class="px-6 py-3 bg-white text-purple-500 rounded-lg font-medium hover:bg-gray-100 transition-colors">
          Ontdek Pokémon
        </button>
      </div>

    <!-- Team List -->
    <div v-else>
      <PokemonList :pokemon="teamList" emptyMessage="Geen teamleden gevonden" />

        <!-- Clear Team Button -->
        <div class="pt-6">
          <button @click="teamStore.clearTeam"
            class="w-full px-6 py-3 bg-red-500 text-white rounded-lg font-medium hover:bg-red-600 transition-colors">
            Team Leegmaken
          </button>
        </div>
      </div>
    </div>
  </main>
</template>
