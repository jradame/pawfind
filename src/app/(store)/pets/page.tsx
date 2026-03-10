import { getPets } from '@/lib/actions/pets'
import { PetSpecies } from '@prisma/client'
import Image from 'next/image'
import Link from 'next/link'
import FavoriteButton from '@/components/pets/FavoriteButton'

export default async function PetsPage() {
  const pets = await getPets()

  return (
    <main className="min-h-screen bg-stone-50">
      {/* Header */}
      <div className="bg-stone-900 text-white py-16 px-6 text-center">
        <h1 className="text-4xl font-bold mb-3">Find Your Perfect Match</h1>
        <p className="text-stone-300 text-lg">
          {pets.length} animals looking for their forever home in Austin
        </p>
      </div>

      {/* Filter Bar */}
      <div className="max-w-6xl mx-auto px-6 py-8 flex gap-3 flex-wrap">
        <span className="px-4 py-2 rounded-full bg-stone-900 text-white text-sm font-medium">
          All Pets
        </span>
        <span className="px-4 py-2 rounded-full border border-stone-300 text-stone-600 text-sm font-medium cursor-pointer hover:border-stone-900 transition-colors">
          Dogs
        </span>
        <span className="px-4 py-2 rounded-full border border-stone-300 text-stone-600 text-sm font-medium cursor-pointer hover:border-stone-900 transition-colors">
          Cats
        </span>
        <span className="px-4 py-2 rounded-full border border-stone-300 text-stone-600 text-sm font-medium cursor-pointer hover:border-stone-900 transition-colors">
          Small
        </span>
        <span className="px-4 py-2 rounded-full border border-stone-300 text-stone-600 text-sm font-medium cursor-pointer hover:border-stone-900 transition-colors">
          Large
        </span>
      </div>

      {/* Pet Grid */}
      <div className="max-w-6xl mx-auto px-6 pb-16">
        {pets.length === 0 ? (
          <div className="text-center py-24 text-stone-400">
            <p className="text-xl">No pets available right now.</p>
            <p className="text-sm mt-2">Check back soon!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {pets.map((pet) => (
              <div
                key={pet.id}
                className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow border border-stone-100"
              >
                {/* Pet Image */}
                <div className="relative h-56 bg-stone-100">
                  <Link href={`/pets/${pet.slug}`}>
                    {pet.images[0] ? (
                      <Image
                        src={pet.images[0].url}
                        alt={pet.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <div className="flex items-center justify-center h-full text-stone-300 text-5xl">
                        🐾
                      </div>
                    )}
                  </Link>
                  {pet.featured && (
                    <span className="absolute top-3 left-3 bg-amber-500 text-white text-xs font-semibold px-2 py-1 rounded-full">
                      Featured
                    </span>
                  )}
                  <FavoriteButton petId={pet.id} />
                </div>

                {/* Pet Info */}
                <Link href={`/pets/${pet.slug}`}>
                  <div className="p-5">
                    <div className="flex items-start justify-between mb-1">
                      <h2 className="text-xl font-bold text-stone-900">{pet.name}</h2>
                      <span className="text-stone-400 text-sm mt-1">
                        {pet.species === PetSpecies.DOG ? '🐶' : pet.species === PetSpecies.CAT ? '🐱' : '🐾'}
                      </span>
                    </div>
                    <p className="text-stone-500 text-sm mb-1">{pet.breed}</p>
                    <p className="text-stone-400 text-xs mb-3">
                      {pet.age} {pet.age === 1 ? 'year' : 'years'} old · {pet.size.toLowerCase()} · {pet.gender.toLowerCase()}
                    </p>
                    <p className="text-stone-600 text-sm line-clamp-2">{pet.description}</p>
                    <div className="mt-4 text-amber-600 text-sm font-medium group-hover:text-amber-700">
                      Meet {pet.name} →
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  )
}