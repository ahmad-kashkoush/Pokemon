/// <reference types="vite/client" />

declare module 'fslightbox-vue' {
  import { DefineComponent } from 'vue'

  interface FsLightboxProps {
    toggler?: boolean
    sources?: string[]
    type?: string
    slide?: number
    // Pan and zoom options
    disableLocalStorage?: boolean
    slideDistance?: number
    zoomIncrement?: number
    // Touch and mouse interaction
    disableTouchZoom?: boolean
    disableTouchPan?: boolean
    disableScrollToZoom?: boolean
    // Animation and behavior
    slideChangeSpeed?: number
    slideAnimationSpeed?: number
  }

  const FsLightbox: DefineComponent<FsLightboxProps>
  export default FsLightbox
}
