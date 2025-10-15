<script setup lang="ts">
import IconArrowRight from '@/components/icons/IconArrowRight.vue'
import TypeBadge from './TypeBadge.vue'

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
}

const props = withDefaults(defineProps<Props>(), {
  clickable: true,
})

const emit = defineEmits<{
  click: [pokemon: Pokemon]
}>()


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
      <IconArrowRight />
    </div>
  </div>
</template>
<style scoped>
.card {
  margin-top: 10px;
}
</style>
