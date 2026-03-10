'use client'

import { useFavoritesStore } from '@/store/favorites-store'
import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

interface Pet {
  id: string
  name: string
  slug: string
  breed: string
  age: number
  size: string
  gender: string
  description: string
  species: string
  images: { url: string; isPrimary: boolean }[]
}

export default function FavoritesPage() {
  const { favorites, removeFavorite } = useFavoritesStore()
  const [pets, setPets] = useState<Pet[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchFavorites() {
      if (favorites.length === 0) {
        setPets([])
        setLoading(false)
        return
      }

      const res = await fetch(`/api/pets?ids=${favorites.join(',')}`)
      const data = await res.json()
      setPets(data)
      setLoading(false)
    }

    fetchFavorites()
  }, [favorites])

  if (loading) {
    return (
      <main className="min-h-screen bg-stone-50 flex items-center justify-center">
        <p className="text-stone-400">Loading your saved pets...</p>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-stone-50">
      <div className="bg-stone-900 text-white py-16 px-6 text-center">
        <h1 className="text-4xl font-bold mb-3">Saved Pets</h1>
        <p className="text-stone-300">
          {favorites.length === 0
           ? "You haven't saved any pets yet"
            : `${favorites.length} pet${favorites.length === 1 ? '' : 's'} saved`}
        </p>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-16">
        {favorites.length === 0 ? (
          <div className="text-center py-24">
            <p className="text-6xl mb-6">🐾</p>
            <h2 className="text-2xl font-bold text-stone-900 mb-3">No saved pets yet</h2>
            <p className="text-stone-500 mb-8">
              Browse available pets and hit the heart button to save your favorites.
            </p>
            <Link
              href="/pets"
              className="bg-stone-900 text-white px-6 py-3 rounded-full hover:bg-stone-700 transition-colors"
            >
              Browse Pets
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {pets.map((pet) => (
              <div
                key={pet.id}
                className="bg-white rounded-2xl overflow-hidden shadow-sm border border-stone-100"
              >
                <div className="relative h-56 bg-stone-100">
                  {pet.images[0] ? (
                    <Image
                      src={pet.images[0].url}
                      alt={pet.name}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full text-5xl">🐾</div>
                  )}
                  <button
                    onClick={() => removeFavorite(pet.id)}
                    className="absolute top-3 right-3 bg-white rounded-full w-9 h-9 flex items-center justify-center shadow hover:scale-110 transition-transform"
                  >
                    ♥
                  </button>
                </div>
                <div className="p-5">
                  <h2 className="text-xl font-bold text-stone-900 mb-1">{pet.name}</h2>
                  <p className="text-stone-500 text-sm mb-1">{pet.breed}</p>
                  <p className="text-stone-400 text-xs mb-4">
                    {pet.age} {pet.age === 1 ? 'year' : 'years'} old · {pet.size.toLowerCase()} · {pet.gender.toLowerCase()}
                  </p>
                  <div className="flex gap-2">
                    <Link
                      href={`/pets/${pet.slug}`}
                      className="flex-1 bg-stone-900 text-white text-center py-2 rounded-full text-sm font-medium hover:bg-stone-700 transition-colors"
                    >
                      View Profile
                    </Link>
                    <button
                      onClick={() => removeFavorite(pet.id)}
                      className="border border-stone-200 text-stone-500 px-3 py-2 rounded-full text-sm hover:border-red-300 hover:text-red-400 transition-colors"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  )
}