<script setup lang="ts">
interface Props {
  type: string
  class?: string
}

const props = withDefaults(defineProps<Props>(), {
  class: ''
})

const formatTypeName = (type: string) => {
  return type.charAt(0).toUpperCase() + type.slice(1)
}

const getTypeColor = (type: string) => {
  const typeColors: Record<string, string> = {
    water: 'bg-blue-500',
    fire: 'bg-red-500',
    grass: 'bg-green-500',
    electric: 'bg-yellow-500',
    psychic: 'bg-pink-500',
    ice: 'bg-blue-300',
    dragon: 'bg-purple-600',
    dark: 'bg-gray-800',
    fairy: 'bg-pink-300',
    normal: 'bg-gray-400',
    fighting: 'bg-red-700',
    poison: 'bg-purple-500',
    ground: 'bg-yellow-600',
    flying: 'bg-blue-400',
    bug: 'bg-green-400',
    rock: 'bg-yellow-800',
    ghost: 'bg-purple-800',
    steel: 'bg-gray-500',
  }
  return typeColors[type] || 'bg-gray-400'
}
</script>

<template>
  <span :class="`${getTypeColor(type)} px-3 py-1 rounded-full text-xs font-medium text-white ${props.class}`">
    {{ formatTypeName(type) }}
  </span>
</template>
