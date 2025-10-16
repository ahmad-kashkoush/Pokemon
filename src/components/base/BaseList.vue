<script setup lang="ts">
import { computed } from 'vue'
import type { Pokemon } from '@/types/pokemon.type'
import AppBackButton from '@/components/app/AppBackButton.vue'
import PokemonList from '@/components/PokemonList.vue'

interface Props {
  title: string
  pokemon: Pokemon[]
  emptyMessage: string
  showBackButton?: boolean
  heroClass?: string
  subtitle?: string
  actions?: {
    label: string
    action: () => void
    class?: string
    show: boolean
  }[]
}

const props = withDefaults(defineProps<Props>(), {
  showBackButton: false,
  heroClass: '',
  subtitle: '',
  actions: () => []
})

const hasActions = computed(() => props.actions && props.actions.length > 0)
const visibleActions = computed(() => props.actions.filter(action => action.show))
</script>

<template>
  <main :class="heroClass || 'page-layout'">
    <!-- Header -->
    <div :class="showBackButton ? 'hero-header' : 'header'">
      <AppBackButton v-if="showBackButton" />
      <div>
        <h1 :class="showBackButton ? 'text-3xl font-bold text-white' : 'text-2xl font-bold text-gray-900'">
          {{ title }}
        </h1>
      </div>
      <div v-if="subtitle && showBackButton" class="ml-auto text-white text-sm">
        {{ subtitle }}
      </div>
      <div v-if="subtitle && !showBackButton" class="text-gray-600 text-sm mt-1">
        {{ subtitle }}
      </div>
    </div>

    <div :class="showBackButton ? '' : 'container'">
      <PokemonList :pokemon="pokemon" :emptyMessage="emptyMessage" />

      <!-- Actions -->
      <div v-if="hasActions && visibleActions.length > 0" :class="showBackButton ? 'container' : 'mt-6'">
        <button v-for="action in visibleActions" :key="action.label" @click="action.action"
          :class="action.class || (showBackButton ? 'btn-danger' : 'w-full py-2 px-4 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors')">
          {{ action.label }}
        </button>
      </div>
    </div>
  </main>
</template>
