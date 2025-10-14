import { computed } from 'vue'

export interface ImageSource {
  src: string
  alt: string
  category: string
  subcategory?: string
}

interface PokemonSprites {
  front_default?: string | null
  back_default?: string | null
  front_shiny?: string | null
  back_shiny?: string | null
  front_female?: string | null
  back_female?: string | null
  front_shiny_female?: string | null
  back_shiny_female?: string | null
  other?: {
    'official-artwork'?: {
      front_default?: string | null
      front_shiny?: string | null
    }
    dream_world?: {
      front_default?: string | null
      front_female?: string | null
    }
    home?: {
      front_default?: string | null
      front_shiny?: string | null
      front_female?: string | null
      front_shiny_female?: string | null
    }
  }
}

export function useImageExtraction(
  sprites: PokemonSprites | null | undefined,
  pokemonName: string = 'Pokemon',
) {
  const extractedImages = computed<ImageSource[]>(() => {
    if (!sprites) return []

    const images: ImageSource[] = []

    // Official artwork (highest quality)
    if (sprites?.other?.['official-artwork']?.front_default) {
      images.push({
        src: sprites.other['official-artwork'].front_default,
        alt: `${pokemonName} Official Artwork`,
        category: 'Official Artwork',
        subcategory: 'Front',
      })
    }

    if (sprites?.other?.['official-artwork']?.front_shiny) {
      images.push({
        src: sprites.other['official-artwork'].front_shiny,
        alt: `${pokemonName} Official Artwork (Shiny)`,
        category: 'Official Artwork',
        subcategory: 'Front Shiny',
      })
    }

    // Dream World sprites
    if (sprites?.other?.dream_world?.front_default) {
      images.push({
        src: sprites.other.dream_world.front_default,
        alt: `${pokemonName} Dream World`,
        category: 'Dream World',
        subcategory: 'Front',
      })
    }

    if (sprites?.other?.dream_world?.front_female) {
      images.push({
        src: sprites.other.dream_world.front_female,
        alt: `${pokemonName} Dream World (Female)`,
        category: 'Dream World',
        subcategory: 'Front Female',
      })
    }

    // Home sprites
    if (sprites?.other?.home?.front_default) {
      images.push({
        src: sprites.other.home.front_default,
        alt: `${pokemonName} Home`,
        category: 'Home',
        subcategory: 'Front',
      })
    }

    if (sprites?.other?.home?.front_shiny) {
      images.push({
        src: sprites.other.home.front_shiny,
        alt: `${pokemonName} Home (Shiny)`,
        category: 'Home',
        subcategory: 'Front Shiny',
      })
    }

    if (sprites?.other?.home?.front_female) {
      images.push({
        src: sprites.other.home.front_female,
        alt: `${pokemonName} Home (Female)`,
        category: 'Home',
        subcategory: 'Front Female',
      })
    }

    if (sprites?.other?.home?.front_shiny_female) {
      images.push({
        src: sprites.other.home.front_shiny_female,
        alt: `${pokemonName} Home (Shiny Female)`,
        category: 'Home',
        subcategory: 'Front Shiny Female',
      })
    }

    // Default sprites
    if (sprites?.front_default) {
      images.push({
        src: sprites.front_default,
        alt: `${pokemonName} Default`,
        category: 'Default',
        subcategory: 'Front',
      })
    }

    if (sprites?.back_default) {
      images.push({
        src: sprites.back_default,
        alt: `${pokemonName} Default (Back)`,
        category: 'Default',
        subcategory: 'Back',
      })
    }

    if (sprites?.front_shiny) {
      images.push({
        src: sprites.front_shiny,
        alt: `${pokemonName} Default (Shiny)`,
        category: 'Default',
        subcategory: 'Front Shiny',
      })
    }

    if (sprites?.back_shiny) {
      images.push({
        src: sprites.back_shiny,
        alt: `${pokemonName} Default (Back Shiny)`,
        category: 'Default',
        subcategory: 'Back Shiny',
      })
    }

    if (sprites?.front_female) {
      images.push({
        src: sprites.front_female,
        alt: `${pokemonName} Default (Female)`,
        category: 'Default',
        subcategory: 'Front Female',
      })
    }

    if (sprites?.back_female) {
      images.push({
        src: sprites.back_female,
        alt: `${pokemonName} Default (Back Female)`,
        category: 'Default',
        subcategory: 'Back Female',
      })
    }

    if (sprites?.front_shiny_female) {
      images.push({
        src: sprites.front_shiny_female,
        alt: `${pokemonName} Default (Shiny Female)`,
        category: 'Default',
        subcategory: 'Front Shiny Female',
      })
    }

    if (sprites?.back_shiny_female) {
      images.push({
        src: sprites.back_shiny_female,
        alt: `${pokemonName} Default (Back Shiny Female)`,
        category: 'Default',
        subcategory: 'Back Shiny Female',
      })
    }

    // Filter out any images with null or empty src
    return images.filter((img) => img.src && img.src.trim() !== '')
  })

  // Get the primary image (official artwork or first available)
  const primaryImage = computed<ImageSource | null>(() => {
    const images = extractedImages.value
    if (images.length === 0) return null

    // Prefer official artwork
    const officialArtwork = images.find((img) => img.category === 'Official Artwork')
    if (officialArtwork) return officialArtwork

    // Otherwise return first available
    return images[0] || null
  })

  // Group images by category for organized display
  const imagesByCategory = computed(() => {
    const grouped: Record<string, ImageSource[]> = {}

    extractedImages.value.forEach((image) => {
      if (!grouped[image.category]) {
        grouped[image.category] = []
      }
      grouped[image.category]!.push(image)
    })

    return grouped
  })

  return {
    extractedImages,
    primaryImage,
    imagesByCategory,
    hasImages: computed(() => extractedImages.value.length > 0),
  }
}
