<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  title: string
  variant?: 'light' | 'dark'
  class?: string
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'light',
  class: ''
})

const titleClasses = computed(() => {
  const baseClass = 'font-bold text-lg py-2'
  const variantClass = props.variant === 'dark'
    ? 'text-gray-900'
    : 'text-white'

  return `${baseClass} ${variantClass} ${props.class}`.trim()
})
</script>

<template>
  <div>
    <h3 :class="titleClasses">{{ title }}</h3>
    <div class="card p-6">
      <slot />
    </div>
  </div>
</template>
