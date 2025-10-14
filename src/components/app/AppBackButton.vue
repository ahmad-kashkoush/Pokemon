<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'

interface Props {
  variant?: 'light' | 'dark'
  class?: string
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'light',
  class: ''
})

const router = useRouter()

const goBack = () => {
  router.go(-1)
}

const buttonClasses = computed(() => {
  const baseClass = 'p-2 transition-colors'
  const variantClass = props.variant === 'dark'
    ? 'text-gray-600 hover:bg-gray-100 rounded-lg'
    : 'text-white rounded-lg'

  return `${baseClass} ${variantClass} ${props.class}`.trim()
})
</script>

<template>
  <button @click="goBack" :class="[buttonClasses, 'cursor-pointer']" aria-label="Go back">
    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
    </svg>
  </button>
</template>
