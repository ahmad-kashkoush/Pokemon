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
  <main class="hero-purple">
    <!-- Header -->
    <div class="hero-header">
      <AppBackButton />
      <h1 class="text-3xl font-bold text-white">Mijn Team</h1>
      <div class="ml-auto text-white text-sm">
        {{ teamStore.teamCount }}/{{ teamStore.MAX_TEAM_SIZE }}
      </div>
    </div>

    <PokemonList :pokemon="teamList"
      emptyMessage="Je hebt nog geen Pokémon toegevoegd aan je team. Je kunt maximaal 6 Pokémon selecteren." />

    <div v-if="teamStore.teamCount > 0" class="container">
      <button @click="teamStore.clearTeam" class="btn-danger">
        Team Leegmaken
      </button>
    </div>
  </main>
</template>
