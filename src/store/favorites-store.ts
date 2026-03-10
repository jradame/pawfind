import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface FavoritesStore {
  favorites: string[]
  addFavorite: (petId: string) => void
  removeFavorite: (petId: string) => void
  isFavorite: (petId: string) => boolean
}

export const useFavoritesStore = create<FavoritesStore>()(
  persist(
    (set, get) => ({
      favorites: [],

      addFavorite: (petId) =>
        set((state) => ({
          favorites: [...state.favorites, petId],
        })),

      removeFavorite: (petId) =>
        set((state) => ({
          favorites: state.favorites.filter((id) => id !== petId),
        })),

      isFavorite: (petId) => get().favorites.includes(petId),
    }),
    {
      name: 'pawfind-favorites',
    }
  )
)