'use client'

import { useFavoritesStore } from '@/store/favorites-store'

interface FavoriteButtonProps {
  petId: string
}

export default function FavoriteButton({ petId }: FavoriteButtonProps) {
  const { isFavorite, addFavorite, removeFavorite } = useFavoritesStore()
  const favorited = isFavorite(petId)

  return (
    <button
      onClick={(e) => {
        e.preventDefault()
        favorited ? removeFavorite(petId) : addFavorite(petId)
      }}
      className={`absolute top-3 right-3 w-9 h-9 rounded-full flex items-center justify-center shadow transition-all duration-200 hover:scale-110 ${
        favorited
          ? 'bg-red-500 text-white'
          : 'bg-white text-stone-400 hover:text-red-400'
      }`}
    >
      {favorited ? '♥' : '♡'}
    </button>
  )
}