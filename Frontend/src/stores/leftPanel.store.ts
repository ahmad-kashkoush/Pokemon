import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useLeftPanelStore = defineStore(
  'leftPanel',
  () => {
    const leftPanelView = ref<'explorer' | 'team' | 'favorites'>('explorer')

    const showExplorerView = () => {
      leftPanelView.value = 'explorer'
    }
    const setLeftPanelView = (view: 'explorer' | 'team' | 'favorites') => {
      leftPanelView.value = view
    }

    return {
      leftPanelView,
      setLeftPanelView,
      showExplorerView,
    }
  },
  {
    persist: {
      key: 'left-panel-view',
      storage: localStorage,
    },
  },
)
