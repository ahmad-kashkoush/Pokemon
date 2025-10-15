<script setup lang="ts">
import IconCheck from '@/components/icons/IconCheck.vue'
import IconClose from '@/components/icons/IconClose.vue'
import { ref, watch } from 'vue'

export interface FilterOption {
  label: string
  value: string
  color: string
}

interface Props {
  isOpen: boolean
  selectedFilters?: string[]
}

interface Emits {
  (e: 'close'): void
  (e: 'filter', filters: string[]): void
}

const props = withDefaults(defineProps<Props>(), {
  isOpen: false,
  selectedFilters: () => []
})

const emit = defineEmits<Emits>()

const pokemonTypes: FilterOption[] = [
  { label: 'Normal', value: 'normal', color: 'bg-gray-400' },
  { label: 'Fire', value: 'fire', color: 'bg-red-500' },
  { label: 'Water', value: 'water', color: 'bg-blue-500' },
  { label: 'Electric', value: 'electric', color: 'bg-yellow-400' },
  { label: 'Grass', value: 'grass', color: 'bg-green-500' },
  { label: 'Ice', value: 'ice', color: 'bg-blue-300' },
  { label: 'Fighting', value: 'fighting', color: 'bg-red-600' },
  { label: 'Poison', value: 'poison', color: 'bg-purple-500' },
  { label: 'Ground', value: 'ground', color: 'bg-yellow-600' },
  { label: 'Flying', value: 'flying', color: 'bg-indigo-400' },
  { label: 'Psychic', value: 'psychic', color: 'bg-pink-500' },
  { label: 'Bug', value: 'bug', color: 'bg-green-400' },
  { label: 'Rock', value: 'rock', color: 'bg-yellow-800' },
  { label: 'Ghost', value: 'ghost', color: 'bg-purple-600' },
  { label: 'Dragon', value: 'dragon', color: 'bg-indigo-600' },
  { label: 'Dark', value: 'dark', color: 'bg-gray-800' },
  { label: 'Steel', value: 'steel', color: 'bg-gray-500' },
  { label: 'Fairy', value: 'fairy', color: 'bg-pink-300' }
]

const selectedTypes = ref<string[]>([])

const handleClose = () => {
  emit('close')
}

const toggleType = (type: string) => {
  const index = selectedTypes.value.indexOf(type)
  if (index > -1) {
    selectedTypes.value.splice(index, 1)
  } else {
    selectedTypes.value.push(type)
  }
}

const clearAll = () => {
  selectedTypes.value = []
}

const handleApply = () => {
  emit('filter', selectedTypes.value)
  emit('close')
}

// Watch for prop changes
watch(() => props.selectedFilters, (newFilters) => {
  selectedTypes.value = [...(newFilters || [])]
}, { immediate: true })
</script>

<template>
  <!-- Modal -->
  <div :class="[
    'fixed bottom-0 left-0 right-0 bg-white rounded-t-3xl z-50 transform transition-transform duration-300 ease-out shadow-2xl',
    isOpen ? 'translate-y-0' : 'translate-y-full'
  ]">
    <!-- Header -->
    <div class="flex items-center justify-between p-6 pb-4">
      <h2 class="text-xl font-semibold text-gray-900">Filteren op type</h2>
      <button @click="handleClose"
        class="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition-colors text-gray-600">
        <IconClose />
      </button>
    </div>

    <!-- Filter Options -->
    <div class="px-6 pb-4 max-h-96 overflow-y-auto">
      <div class="flex justify-between items-center mb-4">
        <span class="text-sm text-gray-600">
          {{ selectedTypes.length }} van {{ pokemonTypes.length }} geselecteerd
        </span>
        <button @click="clearAll" class="text-sm text-teal-600 hover:text-teal-700 font-medium">
          Alles wissen
        </button>
      </div>

      <div class="grid grid-cols-2 gap-2">
        <button v-for="type in pokemonTypes" :key="type.value" @click="toggleType(type.value)" :class="[
          'flex items-center gap-3 p-3 rounded-xl text-left transition-all duration-200',
          selectedTypes.includes(type.value)
            ? 'bg-teal-50 border-2 border-teal-500 text-teal-700'
            : 'bg-gray-50 hover:bg-gray-100 border-2 border-transparent text-gray-700'
        ]">
          <div :class="[
            'w-4 h-4 rounded-full flex-shrink-0',
            type.color
          ]"></div>
          <span class="font-medium text-sm">{{ type.label }}</span>

          <IconCheck v-if="selectedTypes.includes(type.value)" class="text-teal-600 ml-auto" />
        </button>
      </div>
    </div>

    <!-- Apply Button -->
    <div class="px-6 pb-8">
      <button @click="handleApply" :class="[
        'w-full py-4 rounded-2xl font-medium transition-colors',
        selectedTypes.length > 0
          ? 'bg-gray-900 text-white hover:bg-gray-800'
          : 'bg-gray-200 text-gray-400 cursor-not-allowed'
      ]">
        {{ selectedTypes.length > 0 ? `Toepassen (${selectedTypes.length})` : 'Selecteer types' }}
      </button>
    </div>

    <!-- Bottom indicator -->
    <div class="flex justify-center pb-2">
      <div class="w-12 h-1 bg-gray-300 rounded-full"></div>
    </div>
  </div>
</template>
