<script setup lang="ts">
import IconCheck from '@/components/icons/IconCheck.vue'
import IconClose from '@/components/icons/IconClose.vue'
import IconSortAlphabetical from '@/components/icons/IconSortAlphabetical.vue'
import IconSortNumerical from '@/components/icons/IconSortNumerical.vue'
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
        class="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition-colors text-gray-600">
        <IconClose />
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
            <div :class="[
              option.direction === 'asc' ? 'rotate-0' : 'rotate-180'
            ]">
              <IconSortAlphabetical v-if="option.key === 'name'" />
              <IconSortNumerical v-else />
            </div>
            <span class="font-medium">{{ option.label }}</span>
          </div>

          <IconCheck v-if="selectedOption.value === option.value" class="w-6 h-6 text-teal-600" />
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
