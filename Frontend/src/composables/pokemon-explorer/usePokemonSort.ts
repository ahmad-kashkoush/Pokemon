import { ref } from 'vue'
import type { SortOption } from '@/components/app/AppSortModal.vue'
import type { Pokemon } from '@/types/pokemon.type'

export function usePokemonSort() {
  const isSortModalOpen = ref(false)
  const currentSort = ref<SortOption>({
    label: 'Alfabetisch oplopend',
    value: 'name-asc',
    key: 'name',
    direction: 'asc',
  })

  const handleSortClick = () => {
    isSortModalOpen.value = true
  }

  const handleSortModalClose = () => {
    isSortModalOpen.value = false
  }

  const handleSort = (sortOption: SortOption) => {
    currentSort.value = sortOption
  }

  const sortPokemon = (pokemon: Pokemon[]) => {
    const sorted = [...pokemon]

    if (currentSort.value.key === 'name') {
      sorted.sort((a, b) => {
        const comparison = a.name.localeCompare(b.name)
        return currentSort.value.direction === 'asc' ? comparison : -comparison
      })
    } else if (currentSort.value.key === 'id') {
      sorted.sort((a, b) => {
        const comparison = a.id - b.id
        return currentSort.value.direction === 'asc' ? comparison : -comparison
      })
    }

    return sorted
  }

  return {
    // State
    isSortModalOpen,
    currentSort,

    // Handlers
    handleSortClick,
    handleSortModalClose,
    handleSort,

    // Sort function
    sortPokemon,
  }
}
