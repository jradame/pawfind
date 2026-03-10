import { prisma } from '@/lib/db'
import { PetSpecies, PetSize, PetStatus } from '@prisma/client'
import Image from 'next/image'
import Link from 'next/link'
import FavoriteButton from '@/components/pets/FavoriteButton'

interface PetsPageProps {
  searchParams: Promise<{
    species?: string
    size?: string
  }>
}

export default async function PetsPage({ searchParams }: PetsPageProps) {
  const { species, size } = await searchParams

  const pets = await prisma.pet.findMany({
    where: {
      status: PetStatus.AVAILABLE,
      ...(species && { species: species as PetSpecies }),
      ...(size && { size: size as PetSize }),
    },
    include: {
      images: {
        where: { isPrimary: true },
        take: 1,
      },
      shelter: true,
    },
    orderBy: [
      { featured: 'desc' },
      { createdAt: 'desc' },
    ],
  })

  const activeSpecies = species ?? null
  const activeSize = size ?? null

  const filterLink = (params: Record<string, string | null>) => {
    const current: Record<string, string> = {}
    if (activeSpecies) current.species = activeSpecies
    if (activeSize) current.size = activeSize
    const merged = { ...current, ...params }
    const clean = Object.fromEntries(
      Object.entries(merged).filter(([, v]) => v !== null)
    ) as Record<string, string>
    const qs = new URLSearchParams(clean).toString()
    return qs ? `/pets?${qs}` : '/pets'
  }

  return (
    <main className="min-h-screen bg-stone-50">
      {/* Header */}
      <div className="bg-stone-900 text-white py-16 px-6 text-center">
        <h1 className="text-4xl font-bold mb-3">Find Your Perfect Match</h1>
        <p className="text-stone-300 text-lg">
          {pets.length} animal{pets.length !== 1 ? 's' : ''} looking for their forever home in Austin
        </p>
      </div>

      {/* Filter Bar */}
      <div className="max-w-6xl mx-auto px-6 py-6 flex gap-3 flex-wrap items-center">
        {/* Species filters */}
        <Link
          href="/pets"
          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
            !activeSpecies && !activeSize
              ? 'bg-stone-900 text-white'
              : 'border border-stone-300 text-stone-600 hover:border-stone-900'
          }`}
        >
          All Pets
        </Link>
        <Link
          href={filterLink({ species: activeSpecies === 'DOG' ? null : 'DOG' })}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
            activeSpecies === 'DOG'
              ? 'bg-stone-900 text-white'
              : 'border border-stone-300 text-stone-600 hover:border-stone-900'
          }`}
        >
          🐶 Dogs
        </Link>
        <Link
          href={filterLink({ species: activeSpecies === 'CAT' ? null : 'CAT' })}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
            activeSpecies === 'CAT'
              ? 'bg-stone-900 text-white'
              : 'border border-stone-300 text-stone-600 hover:border-stone-900'
          }`}
        >
          🐱 Cats
        </Link>

        {/* Divider */}
        <span className="text-stone-300 hidden sm:block">|</span>

        {/* Size filters */}
        {(['SMALL', 'MEDIUM', 'LARGE'] as const).map((s) => (
          <Link
            key={s}
            href={filterLink({ size: activeSize === s ? null : s })}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              activeSize === s
                ? 'bg-amber-500 text-white'
                : 'border border-stone-300 text-stone-600 hover:border-stone-900'
            }`}
          >
            {s.charAt(0) + s.slice(1).toLowerCase()}
          </Link>
        ))}

        {/* Clear filters */}
        {(activeSpecies || activeSize) && (
          <Link
            href="/pets"
            className="px-4 py-2 rounded-full text-sm font-medium text-red-400 hover:text-red-600 transition-colors ml-auto"
          >
            ✕ Clear filters
          </Link>
        )}
      </div>

      {/* Active filter tags */}
      {(activeSpecies || activeSize) && (
        <div className="max-w-6xl mx-auto px-6 pb-2 flex gap-2 flex-wrap">
          {activeSpecies && (
            <span className="bg-stone-900 text-white text-xs px-3 py-1 rounded-full">
              {activeSpecies === 'DOG' ? '🐶 Dogs' : '🐱 Cats'}
            </span>
          )}
          {activeSize && (
            <span className="bg-amber-500 text-white text-xs px-3 py-1 rounded-full">
              {activeSize.charAt(0) + activeSize.slice(1).toLowerCase()}
            </span>
          )}
        </div>
      )}

      {/* Pet Grid */}
      <div className="max-w-6xl mx-auto px-6 pb-16 pt-4">
        {pets.length === 0 ? (
          <div className="text-center py-24 text-stone-400">
            <p className="text-5xl mb-4">🐾</p>
            <p className="text-xl font-medium text-stone-600 mb-2">No pets found</p>
            <p className="text-sm mb-6">Try adjusting your filters</p>
            <Link
              href="/pets"
              className="bg-stone-900 text-white px-6 py-3 rounded-full text-sm hover:bg-stone-700 transition-colors"
            >
              Clear Filters
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {pets.map((pet) => (
              <div
                key={pet.id}
                className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow border border-stone-100"
              >
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