export const TYPE_COLORS: Record<string, string> = {
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

export const getTypeColor = (type: string): string => {
  return TYPE_COLORS[type] || 'bg-gray-400'
}
export const getPrimaryTypeColor = (types?: Array<{ type: { name: string } }>): string => {
  if (!types?.length) return 'bg-gray-400'
  const primaryType = types[0]?.type.name || ''
  return getTypeColor(primaryType)
}
