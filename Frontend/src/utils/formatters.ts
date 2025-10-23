export const formatName = (text: string): string => {
  return text?.charAt(0).toUpperCase() + text?.slice(1)
}

export const padNumber = (num: number, length: number = 3): string => {
  return String(num).padStart(length, '0')
}
export const formatPokemonId = (id: number): string => {
  return padNumber(id, 3)
}
