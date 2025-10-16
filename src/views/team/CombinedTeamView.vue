<script setup lang="ts">
import { computed } from 'vue'
import { useTeamStore } from '@/stores/team.store'
import BaseListView from '@/components/base/BaseListView.vue'

const teamStore = useTeamStore()

// Display all team Pokemon with combined view navigation
const teamList = computed(() => teamStore.teamPokemons)
const subtitle = computed(() => `${teamStore.teamCount}/${teamStore.MAX_TEAM_SIZE} Pokémon`)

const actions = computed(() => [
  {
    label: 'Team Leegmaken',
    action: () => teamStore.clearTeam(),
    show: teamStore.teamCount > 0
  }
])
</script>

<template>
  <BaseListView title="Mijn Team" :pokemon="teamList"
    emptyMessage="Je hebt nog geen Pokémon toegevoegd aan je team. Je kunt maximaal 6 Pokémon selecteren."
    :subtitle="subtitle" :actions="actions" />
</template>
