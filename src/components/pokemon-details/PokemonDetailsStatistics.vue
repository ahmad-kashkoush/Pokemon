<script setup lang="ts">
import ContentCard from '@/components/ContentCard.vue'
import StatBar from '@/components/StatBar.vue'
import type { PokemonDetails } from '@/types/pokemon.type'

interface Props {
  pokemon: PokemonDetails
}

defineProps<Props>()

// Constants encapsulated within this component
const MAX_INDIVIDUAL_STAT = 150
const MAX_TOTAL_STAT = 600
</script>

<template>
  <ContentCard title="STATISTIEKEN" class="mt-6">
    <div class="space-y-4">
      <!-- Individual Stats -->
      <StatBar v-for="stat in pokemon.stats" :key="stat.stat.name" :stat-name="stat.stat.name"
        :stat-value="stat.base_stat" :max-value="MAX_INDIVIDUAL_STAT" />

      <!-- Total Stats -->
      <StatBar stat-name="total" :all-stats="pokemon.stats" :max-value="MAX_TOTAL_STAT" class="border-t pt-4" />
    </div>
  </ContentCard>
</template>
