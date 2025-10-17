<script setup lang="ts">
import { formatName } from '@/utils/formatters';
import { getTypeColor } from '@/utils/pokemon-color-types'

interface Props {
  type: string
  class?: string
}

const props = withDefaults(defineProps<Props>(), {
  class: ''
})
</script>

<template>
  <span :class="`${getTypeColor(type)} px-3 py-1 rounded-full text-xs font-medium text-white ${props.class}`">
    {{ formatName(type) }}
  </span>
</template>
