<script lang="ts" setup>
import ContentCard from '@/components/ContentCard.vue'
import MoveBadge from '@/components/MoveBadge.vue'
import type { PokemonDetails } from '@/types/pokemon.type'

interface Props {
  pokemon: PokemonDetails
}

defineProps<Props>()

// For now, we'll use some sample moves based on Pokemon type
// In a real app, you'd fetch this from the Pokemon moves API endpoint
const getMovesByType = (pokemon: PokemonDetails) => {
  const primaryType = pokemon.types?.[0]?.type?.name

  type MoveVariant = 'purple' | 'teal' | 'yellow' | 'blue' | 'green' | 'red'

  const movesByType: Record<string, Array<{ level: number, name: string, variant: MoveVariant }>> = {
    grass: [
      { level: 1, name: 'Tackle', variant: 'purple' },
      { level: 3, name: 'Vine Whip', variant: 'green' },
      { level: 1, name: 'Growl', variant: 'purple' },
      { level: 6, name: 'Growth', variant: 'yellow' }
    ],
    fire: [
      { level: 1, name: 'Scratch', variant: 'purple' },
      { level: 7, name: 'Ember', variant: 'red' },
      { level: 1, name: 'Growl', variant: 'purple' },
      { level: 10, name: 'Flame Wheel', variant: 'red' }
    ],
    water: [
      { level: 1, name: 'Tackle', variant: 'purple' },
      { level: 8, name: 'Water Gun', variant: 'blue' },
      { level: 1, name: 'Tail Whip', variant: 'purple' },
      { level: 12, name: 'Bubble Beam', variant: 'teal' }
    ],
    electric: [
      { level: 1, name: 'Thunder Shock', variant: 'yellow' },
      { level: 5, name: 'Tail Whip', variant: 'purple' },
      { level: 1, name: 'Growl', variant: 'purple' },
      { level: 9, name: 'Quick Attack', variant: 'blue' }
    ]
  }

  return movesByType[primaryType || 'normal'] || [
    { level: 1, name: 'Tackle', variant: 'purple' },
    { level: 1, name: 'Growl', variant: 'purple' },
    { level: 5, name: 'Quick Attack', variant: 'blue' },
    { level: 8, name: 'Bite', variant: 'red' }
  ]
}
</script>

<template>
  <ContentCard title="MOVESET" class="mt-6">
    <div class="grid grid-cols-2 gap-3">
      <MoveBadge v-for="move in getMovesByType(pokemon)" :key="`${move.level}-${move.name}`" :level="move.level"
        :move-name="move.name" :variant="move.variant" />
    </div>
  </ContentCard>
</template>
