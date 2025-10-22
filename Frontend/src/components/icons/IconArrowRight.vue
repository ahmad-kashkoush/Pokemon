<script setup lang="ts">
interface Props {
  class?: string
}
const props = withDefaults(defineProps<Props>(), {
  class: 'w-5 h-5'
})
</script>
<template>
  <svg :class="props.class" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m9 18 6-6-6-6" />
  </svg>
</template>
