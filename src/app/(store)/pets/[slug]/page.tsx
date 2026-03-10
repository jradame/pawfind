import { getPetBySlug } from '@/lib/actions/pets'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'

interface PetPageProps {
  params: Promise<{ slug: string }>
}

export default async function PetPage({ params }: PetPageProps) {
  const { slug } = await params
  const pet = await getPetBySlug(slug)

  if (!pet) notFound()

  const primaryImage = pet.images.find((img) => img.isPrimary) ?? pet.images[0]

  return (
    <main className="min-h-screen bg-stone-50">
      {/* Back button */}
      <div className="max-w-5xl mx-auto px-6 pt-8">
        <Link
          href="/pets"
          className="text-stone-500 hover:text-stone-900 text-sm flex items-center gap-1 transition-colors"
        >
          ← Back to all pets
        </Link>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-8 grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Image */}
        <div className="relative h-96 md:h-full min-h-80 rounded-2xl overflow-hidden bg-stone-100">
          {primaryImage ? (
            <Image
              src={primaryImage.url}
              alt={pet.name}
              fill
              className="object-cover"
            />
          ) : (
            <div className="flex items-center justify-center h-full text-6xl">🐾</div>
          )}
          {pet.featured && (
            <span className="absolute top-4 left-4 bg-amber-500 text-white text-xs font-semibold px-3 py-1 rounded-full">
              Featured
            </span>
          )}
        </div>

        {/* Details */}
        <div className="flex flex-col justify-center">
          <h1 className="text-4xl font-bold text-stone-900 mb-1">{pet.name}</h1>
          <p className="text-stone-500 text-lg mb-4">{pet.breed}</p>

          {/* Quick stats */}
          <div className="grid grid-cols-3 gap-3 mb-6">
            <div className="bg-white rounded-xl p-3 text-center border border-stone-100">
              <p className="text-xs text-stone-400 mb-1">Age</p>
              <p className="font-semibold text-stone-800">
                {pet.age} {pet.age === 1 ? 'yr' : 'yrs'}
              </p>
            </div>
            <div className="bg-white rounded-xl p-3 text-center border border-stone-100">
              <p className="text-xs text-stone-400 mb-1">Size</p>
              <p className="font-semibold text-stone-800 capitalize">
                {pet.size.toLowerCase()}
              </p>
            </div>
            <div className="bg-white rounded-xl p-3 text-center border border-stone-100">
              <p className="text-xs text-stone-400 mb-1">Gender</p>
              <p className="font-semibold text-stone-800 capitalize">
                {pet.gender.toLowerCase()}
              </p>
            </div>
          </div>

          {/* Description */}
          <p className="text-stone-600 leading-relaxed mb-6">{pet.description}</p>

          {/* Shelter */}
          {pet.shelter && (
            <div className="bg-white rounded-xl p-4 border border-stone-100 mb-6">
              <p className="text-xs text-stone-400 mb-1">Available at</p>
              <p className="font-semibold text-stone-800">{pet.shelter.name}</p>
              {pet.shelter.address && (
                <p className="text-stone-500 text-sm">{pet.shelter.address}</p>
              )}
              {pet.shelter.phone && (
                <p className="text-stone-500 text-sm">{pet.shelter.phone}</p>
              )}
            </div>
          )}

          {/* CTA */}
          <Link
            href={`/apply/${pet.id}`}
            className="bg-stone-900 text-white text-center py-4 rounded-full font-semibold hover:bg-stone-700 transition-colors"
          >
            Apply to Adopt {pet.name}
          </Link>
        </div>
      </div>
    </main>
  )
}