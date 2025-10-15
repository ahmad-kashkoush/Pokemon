<script setup lang="ts">
import TypeBadge from './TypeBadge.vue'
import { useFavoritesStore } from '@/stores/favorite.store'
import { useTeamStore } from '@/stores/team.store'

interface Pokemon {
  id: number
  name: string
  sprites?: {
    front_default?: string
    other?: {
      'official-artwork'?: {
        front_default?: string
      }
    }
  }
  types: Array<{
    type: {
      name: string
    }
  }>
}

interface Props {
  pokemon: Pokemon
  clickable?: boolean
  showIndicators?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  clickable: true,
  showIndicators: false
})

const emit = defineEmits<{
  click: [pokemon: Pokemon]
}>()

const favoritesStore = useFavoritesStore()
const teamStore = useTeamStore()

const handleClick = () => {
  if (props.clickable) {
    emit('click', props.pokemon)
  }
}

const formatName = (name: string) => {
  return name.charAt(0).toUpperCase() + name.slice(1)
}
</script>

<template>
  <div @click="handleClick" :class="[
    'card bg-white rounded-2xl p-2 flex items-center gap-2 shadow-sm relative',
    clickable ? 'hover:shadow-md transition-shadow cursor-pointer' : ''
  ]">
    <!-- Status Indicators -->
    <div v-if="showIndicators" class="absolute -top-2 -right-2 flex gap-1 z-10">
      <!-- Team Indicator -->
      <div v-if="teamStore.isInTeam(pokemon.id)"
        class="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center shadow-lg">
        <svg class="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 24 24">
          <path
            d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      </div>

      <!-- Favorite Indicator -->
      <div v-if="favoritesStore.isFavorite(pokemon.id)"
        class="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center shadow-lg">
        <svg class="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 24 24">
          <path
            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      </div>
    </div>

    <!-- Pokemon Image -->
    <div class=" w-16 h-16 rounded-xl flex items-center justify-center flex-shrink-0">
      <img v-if="pokemon.sprites?.front_default" :src="pokemon.sprites.front_default" :alt="pokemon.name"
        class="w-full h-full object-cover" loading="lazy" />
      <img v-else-if="pokemon.sprites?.other?.['official-artwork']?.front_default"
        :src="pokemon.sprites.other['official-artwork'].front_default" :alt="pokemon.name"
        class="w-full h-full object-cover" loading="lazy" />
      <div v-else class="text-2xl text-gray-400">?</div>
    </div>

    <!-- Pokemon Info -->
    <div class="flex-1 min-w-0">
      <h3 class="font-bold text-lg text-gray-900 capitalize">{{ formatName(pokemon.name) }}</h3>
      <p class="text-gray-500 text-sm">Nr. {{ String(pokemon.id).padStart(3, '0') }}</p>
    </div>

    <!-- Pokemon Types -->
    <div class="flex gap-1.5 flex-shrink-0 items-center">
      <TypeBadge v-for="type in pokemon.types" :key="type.type.name" :type="type.type.name" />
    </div>

    <!-- Arrow -->
    <div v-if="clickable" class="flex-shrink-0 text-gray-400">
      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m9 18 6-6-6-6" />
      </svg>
    </div>
  </div>
</template>
<style scoped>
.card {
  margin-top: 10px;
}
</style>
