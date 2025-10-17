<script setup lang="ts">
import ContentCard from '@/components/ContentCard.vue'
import TypeBadge from '@/components/TypeBadge.vue'
import type { PokemonDetails } from '@/types/pokemon.type'
import { formatName, formatPokemonId } from '@/utils/formatters'

interface Props {
  pokemon: PokemonDetails
}

defineProps<Props>()

// Helper functions encapsulated within this component
const formatHeight = (height?: number) => {
  if (!height) return 'N/A'
  return `${(height / 10).toFixed(1)}m`
}

const formatWeight = (weight?: number) => {
  if (!weight) return 'N/A'
  return `${(weight / 10).toFixed(1)} kg`
}

</script>

<template>
  <ContentCard title="ABOUT">
    <!-- Description -->
    <p class="text-gray-700 text-sm leading-relaxed mb-8">
      {{ `${formatName(pokemon.name)} is a fascinating Pokemon with unique characteristics.` }}
    </p>

    <!-- Pokemon Details -->
    <div class="space-y-4 mt-8">
      <!-- Type -->
      <div class="flex items-center gap-8">
        <span class="text-gray-400 text-sm w-20">Type</span>
        <div class="flex gap-2">
          <TypeBadge v-for="type in pokemon.types" :key="type.type.name" :type="type.type.name" />
        </div>
      </div>

      <!-- Number -->
      <div class="flex items-center gap-8">
        <span class="text-gray-400 text-sm w-20">Nummer</span>
        <span class="font-semibold text-gray-900">{{ formatPokemonId(pokemon.id) }}</span>
      </div>

      <!-- Height -->
      <div class="flex items-center gap-8">
        <span class="text-gray-400 text-sm w-20">Hoogte</span>
        <span class="font-semibold text-gray-900">{{ formatHeight(pokemon.height) }}</span>
      </div>

      <!-- Weight -->
      <div class="flex items-center gap-8">
        <span class="text-gray-400 text-sm w-20">Gewicht</span>
        <span class="font-semibold text-gray-900">{{ formatWeight(pokemon.weight) }}</span>
      </div>

      <!-- Category -->
      <div class="flex items-center gap-8">
        <span class="text-gray-400 text-sm w-20">Categorie</span>
        <span class="font-semibold text-gray-900">{{ pokemon.types?.[0]?.type?.name ?
          formatName(pokemon.types[0].type.name) : 'Unknown' }}</span>
      </div>

      <!-- Gender -->
      <div class="flex items-center gap-8">
        <span class="text-gray-400 text-sm w-20">Geslacht</span>
        <div class="flex gap-1 text-gray-900 font-semibold">
          <span>♂</span>
          <span>♀</span>
        </div>
      </div>

      <!-- Abilities -->
      <div class="flex items-center gap-2">
        <span class="text-gray-400 text-sm w-20">Vaardigheden</span>
        <span class="font-semibold text-gray-900">
          {{pokemon.abilities?.length ? pokemon.abilities.map(a => formatName(a.ability.name)).join(', ') : 'Unknown'}}
        </span>
      </div>
    </div>
  </ContentCard>
</template>
