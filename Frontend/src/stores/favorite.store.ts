import { defineStore } from 'pinia'
import { usePokemonCollection } from '@/composables/usePokemonCollection'

export const useFavoritesStore = defineStore(
  'favorites',
  () => {
    const collection = usePokemonCollection()

    return {
      // State
      favoritePokemons: collection.pokemons,

      // Getters
      favoriteIds: collection.pokemonIds,
      favoritesCount: collection.count,
      isFavorite: collection.contains,
      getFavoriteById: collection.getById,

      // Actions
      addToFavorites: collection.add,
      removeFromFavorites: collection.remove,
      toggleFavorite: collection.toggle,
      clearFavorites: collection.clear,
    }
  },
  {
    persist: {
      key: 'pokemon-favorites',
      storage: localStorage,
    },
  },
)
