<script setup lang="ts">
import { computed } from 'vue'
import { useToast } from 'vue-toastification'
import AppBackButton from '@/components/app/AppBackButton.vue'
import IconFavoriteIndicator from '@/components/icons/IconFavoriteIndicator.vue'
import IconTeamIndicator from '@/components/icons/IconTeamIndicator.vue'
import { useFavoritesStore } from '@/stores/favorite.store'
import { useTeamStore } from '@/stores/team.store'
import type { Pokemon } from '@/types/pokemon.type'

interface Props {
  pokemon?: Pokemon
}

const props = defineProps<Props>()

const favoritesStore = useFavoritesStore()
const teamStore = useTeamStore()
const toast = useToast()

// Computed properties
const isFavorite = computed(() => props.pokemon ? favoritesStore.isFavorite(props.pokemon.id) : false)
const isInTeam = computed(() => props.pokemon ? teamStore.isInTeam(props.pokemon.id) : false)
const isTeamFull = computed(() => teamStore.isTeamFull)

// Actions
const toggleFavorite = () => {
  if (props.pokemon) {
    favoritesStore.toggleFavorite({
      id: props.pokemon.id,
      name: props.pokemon.name,
      sprites: props.pokemon.sprites,
      types: props.pokemon.types
    })
  }
}

const toggleTeamMember = () => {
  if (props.pokemon) {
    const result = teamStore.toggleTeamMember({
      id: props.pokemon.id,
      name: props.pokemon.name,
      sprites: props.pokemon.sprites,
      types: props.pokemon.types
    })

    // Show feedback when team is full
    if (!result && !teamStore.isInTeam(props.pokemon.id) && teamStore.isTeamFull) {
      toast.error('Geen ruimte voor een ander teamlid! Je team is vol (6/6 Pokémon).')
    }
  }
}
</script>

<template>
  <div class="flex items-center justify-between p-4 text-white">
    <AppBackButton />
    <h1 class="text-lg font-semibold">Detail pokemon</h1>
    <div class="flex gap-2">
      <button @click="toggleTeamMember" class="p-2 relative"
        :class="pokemon && isInTeam ? 'text-purple-300' : 'text-transparent'">
        <IconTeamIndicator />
        <span v-if="isTeamFull && pokemon && !isInTeam"
          class="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full" />
      </button>

      <button @click="toggleFavorite" class="p-2" :class="pokemon && isFavorite ? 'text-red-500' : 'text-transparent'">
        <IconFavoriteIndicator />
      </button>
    </div>
  </div>
</template>
