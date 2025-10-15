<script lang="ts" setup>
import { useEvolutionChainQuery, usePokemonDetailsQuery } from '@/api/pokemon.query'
import AppBackButton from '@/components/app/AppBackButton.vue'
import AppError from '@/components/app/AppError.vue'
import AppLoader from '@/components/app/AppLoader.vue'
import ContentCard from '@/components/ContentCard.vue'
import IconFavoriteIndicator from '@/components/icons/IconFavoriteIndicator.vue'
import IconTeamIndicator from '@/components/icons/IconTeamIndicator.vue'
import MoveBadge from '@/components/MoveBadge.vue'
import PokemonImageViewer from '@/components/PokemonImage/PokemonImageViewer.vue'
import PokemonList from '@/components/PokemonList.vue'
import StatBar from '@/components/StatBar.vue'
import TypeBadge from '@/components/TypeBadge.vue'
import { useFavoritesStore } from '@/stores/favorite.store'
import { useTeamStore } from '@/stores/team.store'
import { useToast } from 'vue-toastification'
import { computed } from 'vue'

const favoritesStore = useFavoritesStore()
const teamStore = useTeamStore()
const toast = useToast()
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





const getTotalStats = (stats: Array<{ base_stat: number }>) => {
  return stats.reduce((total, stat) => total + stat.base_stat, 0)
}

const toggleFavorite = () => {
  if (pokemon.value) {
    favoritesStore.toggleFavorite({
      id: pokemon.value.id,
      name: pokemon.value.name,
      sprites: pokemon.value.sprites,
      types: pokemon.value.types
    })
  }
}

const toggleTeamMember = () => {
  if (pokemon.value) {
    const result = teamStore.toggleTeamMember({
      id: pokemon.value.id,
      name: pokemon.value.name,
      sprites: pokemon.value.sprites,
      types: pokemon.value.types
    })

    // Show feedback when team is full
    if (!result && !teamStore.isInTeam(pokemon.value.id) && teamStore.isTeamFull) {
      toast.error('Geen ruimte voor een ander teamlid! Je team is vol (6/6 Pokémon).')
    }
  }
}

</script>
<template>
  <!-- Loading State -->
  <AppLoader :isLoading="isLoading" />

  <!-- Error State -->
  <AppError :hasError="isError" :errorMessage="error?.message || 'Failed to load Pokemon details'"
    @retry="handleRetry" />

  <!-- Pokemon Details -->
  <div v-if="!isLoading && !isError && pokemon" :class="getPrimaryTypeColor(pokemon)" class="min-h-screen">
    <div class="pb-20">
      <!-- Navigation -->
      <div class="flex items-center justify-between p-4 text-white">
        <AppBackButton />
        <h1 class="text-lg font-semibold">Detail pokemon</h1>
        <div class="flex gap-2">
          <!-- Team Button -->
          <button @click="toggleTeamMember" class="p-2 relative"
            :class="pokemon && teamStore.isInTeam(pokemon.id) ? 'text-purple-300' : 'text-transparent'">
            <IconTeamIndicator />
            <!-- Team Full Indicator -->
            <span v-if="teamStore.isTeamFull && pokemon && !teamStore.isInTeam(pokemon.id)"
              class="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
          </button>

          <!-- Favorite Button -->
          <button @click="toggleFavorite" class="p-2"
            :class="pokemon && favoritesStore.isFavorite(pokemon.id) ? 'text-red-500' : 'text-transparent'">
            <IconFavoriteIndicator />
          </button>
        </div>
      </div>

      <!-- Pokemon Info -->
      <div class="px-4 pb-8">
        <h2 class="text-white text-3xl font-bold mb-2">{{ formatName(pokemon.name) }}</h2>

        <!-- Pokemon Image -->
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
        <!-- About Card -->
        <ContentCard title="ABOUT">
          <!-- Description -->
          <p class="text-gray-700 text-sm leading-relaxed mb-8">
            Vanaf de dag dat deze Pokémon wordt geboren, zit er een plantenzaadje op zijn rug.
            Het zaad wordt langzaam groter.
          </p>

          <!-- Pokemon Details -->
          <div class="space-y-4 mt-8">
            <!-- Type -->
            <div class="flex items-center gap-8">
              <span class="text-gray-400 text-sm w-20">Type</span>
              <div class="flex gap-2">
                <TypeBadge v-for="type in pokemon.types" :key="type.type.name" :type="type.type.name" />
              </div>
            </div>

            <!-- Number -->
            <div class="flex items-center gap-8">
              <span class="text-gray-400 text-sm w-20">Nummer</span>
              <span class="font-semibold text-gray-900">{{ String(pokemon.id).padStart(3, '0') }}</span>
            </div>

            <!-- Height -->
            <div class="flex items-center gap-8">
              <span class="text-gray-400 text-sm w-20">Hoogte</span>
              <span class="font-semibold text-gray-900">{{ (pokemon.height / 10).toFixed(1) }}m</span>
            </div>

            <!-- Weight -->
            <div class="flex items-center gap-8">
              <span class="text-gray-400 text-sm w-20">Gewicht</span>
              <span class="font-semibold text-gray-900">{{ (pokemon.weight / 10).toFixed(1) }} kg</span>
            </div>

            <!-- Category -->
            <div class="flex items-center gap-8">
              <span class="text-gray-400 text-sm w-20">Categorie</span>
              <span class="font-semibold text-gray-900">Seed</span>
            </div>

            <!-- Gender -->
            <div class="flex items-center gap-8">
              <span class="text-gray-400 text-sm w-20">Geslacht</span>
              <div class="flex gap-1 text-gray-900 font-semibold">
                <span>♂</span>
                <span>♀</span>
              </div>
            </div>

            <!-- Abilities -->
            <div class="flex items-center gap-2">
              <span class="text-gray-400 text-sm w-20">Vaardigheden</span>
              <span class="font-semibold text-gray-900">Overgroeien</span>
            </div>
          </div>
        </ContentCard>

        <!-- Statistics Section -->
        <ContentCard title="STATISTIEKEN" class="mt-6">
          <div class="space-y-4">
            <!-- Individual Stats -->
            <StatBar v-for="stat in pokemon.stats" :key="stat.stat.name" :stat-name="stat.stat.name"
              :stat-value="stat.base_stat" :max-value="150" />

            <!-- Total Stats -->
            <StatBar stat-name="total" :stat-value="getTotalStats(pokemon.stats)" :max-value="600"
              class="border-t pt-4" />
          </div>
        </ContentCard>

        <!-- Moves Section -->
        <ContentCard title="MOVESET" class="mt-6">
          <div class="grid grid-cols-2 gap-3">
            <MoveBadge :level="1" move-name="Tackle" variant="purple" />
            <MoveBadge :level="3" move-name="Vine whip" variant="teal" />
            <MoveBadge :level="1" move-name="Growl" variant="purple" />
            <MoveBadge :level="6" move-name="Growth" variant="yellow" />
          </div>
        </ContentCard>
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
