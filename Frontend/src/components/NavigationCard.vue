<script setup lang="ts">
import { RouterLink } from 'vue-router'

interface Props {
  to: string
  title: string
  subtitle: string
  gradient: string
  clickable?: boolean
}

withDefaults(defineProps<Props>(), {
  clickable: false
})
</script>

<template>
  <component :is="clickable ? 'div' : RouterLink" :to="clickable ? undefined : to" class="block">
    <div :class="`${gradient} p-4 rounded-2xl text-white shadow-lg cursor-pointer`">
      <h3 class="font-semibold text-lg">{{ title }}</h3>
      <p class="text-opacity-80 text-white text-sm mt-1">{{ subtitle }}</p>
    </div>
  </component>
</template>
