<script setup lang="ts">
interface Props {
  level: number | string
  moveName: string
  variant?: 'purple' | 'teal' | 'yellow' | 'blue' | 'green' | 'red'
}

withDefaults(defineProps<Props>(), {
  variant: 'purple'
})

const getVariantColors = (variant: string) => {
  const variants: Record<string, string> = {
    purple: 'bg-purple-100 text-purple-700',
    teal: 'bg-teal-100 text-teal-700',
    yellow: 'bg-yellow-100 text-yellow-700',
    blue: 'bg-blue-100 text-blue-700',
    green: 'bg-green-100 text-green-700',
    red: 'bg-red-100 text-red-700'
  }
  return variants[variant] || variants.purple
}

const formatLevel = (level: number | string) => {
  if (typeof level === 'string') return level
  return `Level ${level}`
}
</script>

<template>
  <div class="flex items-center gap-2">
    <span :class="getVariantColors(variant)" class="px-2 py-1 rounded-full text-xs font-medium">
      {{ formatLevel(level) }}
    </span>
    <span class="text-sm font-medium text-gray-900">{{ moveName }}</span>
  </div>
</template>
