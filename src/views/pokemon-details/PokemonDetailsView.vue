<script lang="ts" setup>
import { useEvolutionChainQuery, usePokemonDetailsQuery } from '@/api/pokemon.query'
import AppError from '@/components/app/AppError.vue'
import AppLoader from '@/components/app/AppLoader.vue'

import PokemonDetailsHeader from '@/components/pokemon-details/PokemonDetailsHeader.vue'
import PokemonDetailsAbout from '@/components/pokemon-details/PokemonDetailsAbout.vue'
import PokemonDetailsStatistics from '@/components/pokemon-details/PokemonDetailsStatistics.vue'
import PokemonDetailsMoveset from '@/components/pokemon-details/PokemonDetailsMoveset.vue'
import PokemonImageViewer from '@/components/PokemonImage/PokemonImageViewer.vue'
import PokemonList from '@/components/PokemonList.vue'
import { computed } from 'vue'

const { data: pokemon, isLoading, isError, error, refetch } = usePokemonDetailsQuery()

const evolutionChainUrl = computed(() => pokemon.value?.species?.url || '')
const { data: evolutionChainPokemons, isLoading: isEvolutionLoading, isError: isEvolutionError } = useEvolutionChainQuery(evolutionChainUrl)



const handleRetry = () => {
  refetch()
}

// Helper functions
const formatName = (name: string) => {
  return name.charAt(0).toUpperCase() + name.slice(1)
}





const getPrimaryTypeColor = (pokemonData: typeof pokemon.value) => {
  if (!pokemonData?.types?.length) return 'bg-gray-400'
  const primaryType = pokemonData.types[0].type.name

  const typeColors: Record<string, string> = {
    water: 'bg-blue-500',
    fire: 'bg-red-500',
    grass: 'bg-green-500',
    electric: 'bg-yellow-500',
    psychic: 'bg-pink-500',
    ice: 'bg-blue-300',
    dragon: 'bg-purple-600',
    dark: 'bg-gray-800',
    fairy: 'bg-pink-300',
    normal: 'bg-gray-400',
    fighting: 'bg-red-700',
    poison: 'bg-purple-500',
    ground: 'bg-yellow-600',
    flying: 'bg-blue-400',
    bug: 'bg-green-400',
    rock: 'bg-yellow-800',
    ghost: 'bg-purple-800',
    steel: 'bg-gray-500',
  }
  return typeColors[primaryType] || 'bg-gray-400'
}



</script>
<template>
  <AppLoader :isLoading="isLoading" />

  <AppError :hasError="isError" :errorMessage="error?.message || 'Failed to load Pokemon details'"
    @retry="handleRetry" />

  <div v-if="!isLoading && !isError && pokemon" :class="getPrimaryTypeColor(pokemon)" class="min-h-screen">
    <div class="pb-20">
      <PokemonDetailsHeader :pokemon="pokemon" />

      <!-- Pokemon Info -->
      <div class="px-4 pb-8">
        <h2 class="text-white text-3xl font-bold mb-2">{{ formatName(pokemon.name) }}</h2>

        <div class="flex justify-center">
          <PokemonImageViewer :sprites="pokemon.sprites" :pokemon-name="formatName(pokemon.name)" :alt="pokemon.name"
            class="w-48 h-48 object-contain" :show-thumbnails="true" />
        </div>

        <div class="text-center mt-4">
          <p class="text-white text-xl font-bold">#{{ String(pokemon.id).padStart(3, '0') }}</p>
        </div>
      </div>

      <!-- Content Area -->
      <div class="px-4 pt-6">
        <PokemonDetailsAbout :pokemon="pokemon" />
        <PokemonDetailsStatistics :pokemon="pokemon" />
        <PokemonDetailsMoveset :pokemon="pokemon" />
      </div>
      <div class=" pt-6">
        <h3 class="text-white text-xl font-bold text-gray-900 px-4">Evolutie</h3>
        <PokemonList v-if="!isEvolutionError && !isEvolutionLoading" :pokemon="evolutionChainPokemons || []" />
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Container and layout spacing */
.min-h-screen {
  padding: 0;
  margin: 0;
}

/* Navigation area */
.flex.items-center.justify-between {
  padding: 1rem 1.5rem;
  margin-bottom: 0.5rem;
}

/* Pokemon info section */
.px-4.pb-8 {
  padding-left: 1.5rem;
  padding-right: 1.5rem;
  padding-bottom: 2rem;
  margin-bottom: 1rem;
}

/* Pokemon name */
h2.text-white {
  margin-bottom: .5rem;
  margin-top: 0.5rem;
}

/* Image container */
.flex.justify-center {
  margin: .5rem 0;
  padding: 1rem 0;
}

/* Pokemon ID */
.text-center.mt-4 {
  margin-top: 1.5rem;
  margin-bottom: 1rem;
}

/* Content area */
.px-4.pt-6 {
  padding-left: 1.5rem;
  padding-right: 1.5rem;
  padding-top: 1.5rem;
  margin-bottom: 2rem;
}

/* Content cards spacing */
.ContentCard {
  margin-bottom: 1.5rem;
}

.ContentCard.mt-6 {
  margin-top: 2rem;
}

/* About section details */
.space-y-4 {
  margin-top: 1rem;
}

/* Individual stat and detail rows */
.flex.items-center.gap-8,
.flex.items-center.gap-2 {
  /* padding: 0.75rem 0; */
  margin: 0.5rem 0;
}

/* Evolution section */
.pt-6 h3 {
  padding: 1.5rem 1.5rem 1rem 1.5rem;
  margin-bottom: 1rem;
}

/* Move badges grid */
.grid.grid-cols-2.gap-3 {
  padding: 0.5rem 0;
  margin-top: 1rem;
}

/* Statistics section */
.space-y-4 .StatBar {
  margin: 1rem 0;
  padding: 0.5rem 0;
}

/* Navigation buttons */
button.p-2 {
  padding: 0.75rem;
  margin: 0 0.25rem;
}

/* Type badges container */
.flex.gap-2 {
  margin: 0.25rem 0;
}

/* Bottom padding for scrolling */
.pb-20 {
  padding-bottom: 5rem;
}

/* Responsive adjustments */
@media (max-width: 640px) {
  .px-4 {
    padding-left: 1rem;
    padding-right: 1rem;
  }

  .flex.items-center.justify-between {
    padding: 0.75rem 1rem;
  }

  .px-4.pb-8 {
    padding-left: 1rem;
    padding-right: 1rem;
  }
}
</style>
