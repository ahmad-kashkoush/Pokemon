<script setup lang="ts">
import IconArrowLeft from '@/components/icons/IconArrowLeft.vue';
import { computed } from 'vue'
import { useRouter } from 'vue-router'

interface Props {
  variant?: 'light' | 'dark'
  class?: string
  onClick?: () => void
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'light',
  class: '',
})

const router = useRouter()

const handleClick = () => {
  if (props.onClick) {
    props.onClick()
  } else {
    router.go(-1)
  }
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
  <button @click="handleClick" :class="[buttonClasses, 'cursor-pointer']" aria-label="Go back">
    <IconArrowLeft />
  </button>
</template>
