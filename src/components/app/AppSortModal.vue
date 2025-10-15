<script setup lang="ts">
import { ref, watch } from 'vue'

export interface SortOption {
  label: string
  value: string
  key: 'name' | 'id'
  direction: 'asc' | 'desc'
}

interface Props {
  isOpen: boolean
  selectedSort?: SortOption
}

interface Emits {
  (e: 'close'): void
  (e: 'sort', option: SortOption): void
}

const props = withDefaults(defineProps<Props>(), {
  isOpen: false
})

const emit = defineEmits<Emits>()

const sortOptions: SortOption[] = [
  {
    label: 'Alfabetisch oplopend',
    value: 'name-asc',
    key: 'name',
    direction: 'asc'
  },
  {
    label: 'Alfabetisch aflopend',
    value: 'name-desc',
    key: 'name',
    direction: 'desc'
  },
  {
    label: 'Numeriek oplopend',
    value: 'id-asc',
    key: 'id',
    direction: 'asc'
  },
  {
    label: 'Numeriek aflopend',
    value: 'id-desc',
    key: 'id',
    direction: 'desc'
  }
]

const defaultSort: SortOption = {
  label: 'Alfabetisch oplopend',
  value: 'name-asc',
  key: 'name',
  direction: 'asc'
}

const selectedOption = ref<SortOption>(props.selectedSort || defaultSort)

const handleClose = () => {
  emit('close')
}

const handleOptionSelect = (option: SortOption) => {
  selectedOption.value = option
}

const handleApply = () => {
  emit('sort', selectedOption.value)
  emit('close')
}

// Watch for prop changes
watch(() => props.selectedSort, (newSort) => {
  if (newSort) {
    selectedOption.value = newSort
  }
})
</script>

<template>
  <!-- Modal -->
  <div :class="[
    'fixed bottom-0 left-0 right-0 bg-white rounded-t-3xl z-50 transform transition-transform duration-300 ease-out shadow-2xl',
    isOpen ? 'translate-y-0' : 'translate-y-full'
  ]">
    <!-- Header -->
    <div class="flex items-center justify-between p-6 pb-4">
      <h2 class="text-xl font-semibold text-gray-900">Sorteren op</h2>
      <button @click="handleClose"
        class="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition-colors">
        <svg class="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>

    <!-- Options -->
    <div class="px-6 pb-4">
      <div class="space-y-1">
        <button v-for="option in sortOptions" :key="option.value" @click="handleOptionSelect(option)" :class="[
          'w-full flex items-center justify-between px-4 py-4 rounded-xl text-left transition-colors',
          selectedOption.value === option.value
            ? 'bg-teal-50 text-teal-700'
            : 'hover:bg-gray-50 text-gray-900'
        ]">
          <div class="flex items-center gap-3">
            <svg :class="[
              'w-5 h-5',
              option.direction === 'asc' ? 'rotate-0' : 'rotate-180'
            ]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="option.key === 'name'
                ? 'M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4'
                : 'M7 11l5-5m0 0l5 5m-5-5v12'" />
            </svg>
            <span class="font-medium">{{ option.label }}</span>
          </div>

          <svg v-if="selectedOption.value === option.value" class="w-6 h-6 text-teal-600" fill="currentColor"
            viewBox="0 0 20 20">
            <path fill-rule="evenodd"
              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
              clip-rule="evenodd" />
          </svg>
        </button>
      </div>
    </div>

    <!-- Apply Button -->
    <div class="px-6 pb-8">
      <button @click="handleApply"
        class="w-full bg-gray-900 text-white py-4 rounded-2xl font-medium hover:bg-gray-800 transition-colors">
        Toepassen
      </button>
    </div>

    <!-- Bottom indicator -->
    <div class="flex justify-center pb-2">
      <div class="w-12 h-1 bg-gray-300 rounded-full"></div>
    </div>
  </div>
</template>
