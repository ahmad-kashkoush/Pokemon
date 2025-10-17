<script setup lang="ts">
import { computed } from 'vue'
import { useTeamStore } from '@/stores/team.store'
import BaseList from '@/components/base/BaseList.vue'

interface Props {
  onBackClick?: () => void
}

defineProps<Props>()

const teamStore = useTeamStore()

// Display all team Pokemon
const teamList = computed(() => teamStore.teamPokemons)
const subtitle = computed(() => `${teamStore.teamCount}/${teamStore.MAX_TEAM_SIZE}`)
</script>

<template>
  <BaseList title="Mijn Team" :pokemon="teamList"
    emptyMessage="Je hebt nog geen Pokémon toegevoegd aan je team. Je kunt maximaal 6 Pokémon selecteren."
    heroClass="hero-purple" :subtitle="subtitle" :onBackClick="onBackClick" />
</template>
