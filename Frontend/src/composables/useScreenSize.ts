import { ref, onMounted, onUnmounted } from 'vue'

export function useScreenSize(breakpoint = 800) {
  const isWideScreen = ref(false)

  const updateScreenWidth = () => {
    isWideScreen.value = window.innerWidth >= breakpoint
  }

  onMounted(() => {
    updateScreenWidth()
    window.addEventListener('resize', updateScreenWidth)
  })

  onUnmounted(() => {
    window.removeEventListener('resize', updateScreenWidth)
  })

  return {
    isWideScreen,
    updateScreenWidth,
  }
}
