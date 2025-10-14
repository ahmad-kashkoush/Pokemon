<script setup lang="ts">
interface Props {
  statName: string
  statValue: number
  maxValue?: number
}

const props = withDefaults(defineProps<Props>(), {
  maxValue: 150
})

const formatStatName = (statName: string) => {
  const statMap: Record<string, string> = {
    'hp': 'HP',
    'attack': 'Attack',
    'defense': 'Defense',
    'special-attack': 'Sp. Atk',
    'special-defense': 'Sp. Def',
    'speed': 'Speed',
    'total': 'Total'
  }
  return statMap[statName] || statName.charAt(0).toUpperCase() + statName.slice(1)
}

const getStatBarColor = (statValue: number) => {
  if (statValue >= 60) return 'bg-green-500'
  if (statValue >= 40) return 'bg-yellow-500'
  return 'bg-red-500'
}

const getBarWidth = () => {
  return Math.min((props.statValue / props.maxValue) * 100, 100)
}
</script>

<template>
  <div class="flex items-center gap-4">
    <div class="w-16 text-sm font-medium text-gray-600">
      {{ formatStatName(statName) }}
    </div>
    <div class="w-8 text-sm font-semibold text-gray-900">
      {{ statValue }}
    </div>
    <div class="flex-1">
      <div class="w-full bg-gray-200 rounded-full h-2">
        <div :class="getStatBarColor(statValue)" class="h-2 rounded-full transition-all duration-300"
          :style="{ width: getBarWidth() + '%' }">
        </div>
      </div>
    </div>
  </div>
</template>
