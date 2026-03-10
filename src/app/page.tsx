import { getFeaturedPets } from '@/lib/actions/pets'
import Image from 'next/image'
import Link from 'next/link'
import { PetSpecies } from '@prisma/client'

export default async function Home() {
  const featuredPets = await getFeaturedPets()

  return (
    <main className="min-h-screen bg-stone-50">
      {/* Hero */}
      <section className="bg-stone-900 text-white px-6 py-24 text-center">
        <p className="text-amber-400 text-sm font-semibold tracking-widest uppercase mb-4">
          Austin's No-Kill Shelter Network
        </p>
        <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
          Find Your Forever<br />Friend in Austin
        </h1>
        <p className="text-stone-300 text-lg max-w-xl mx-auto mb-10">
          Hundreds of dogs, cats, and more are waiting for a loving home.
          Browse available pets from Austin's top shelters.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/pets"
            className="bg-amber-500 hover:bg-amber-400 text-white font-semibold px-8 py-4 rounded-full transition-colors"
          >
            Browse All Pets
          </Link>
          <Link
            href="/donate"
            className="border border-stone-600 hover:border-stone-400 text-stone-300 hover:text-white font-semibold px-8 py-4 rounded-full transition-colors"
          >
            Support a Shelter
          </Link>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-white border-b border-stone-100">
        <div className="max-w-4xl mx-auto px-6 py-10 grid grid-cols-3 gap-6 text-center">
          <div>
            <p className="text-3xl font-bold text-stone-900">500+</p>
            <p className="text-stone-500 text-sm mt-1">Pets Available</p>
          </div>
          <div>
            <p className="text-3xl font-bold text-stone-900">12</p>
            <p className="text-stone-500 text-sm mt-1">Partner Shelters</p>
          </div>
          <div>
            <p className="text-3xl font-bold text-stone-900">2,400+</p>
            <p className="text-stone-500 text-sm mt-1">Happy Adoptions</p>
          </div>
        </div>
      </section>

      {/* Featured Pets */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold text-stone-900">Featured Pets</h2>
            <p className="text-stone-500 mt-1">These animals are ready to meet you today</p>
          </div>
          <Link
            href="/pets"
            className="text-amber-600 hover:text-amber-700 font-medium text-sm transition-colors"
          >
            View all →
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredPets.map((pet) => (
            <Link
              key={pet.id}
              href={`/pets/${pet.slug}`}
              className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow border border-stone-100"
            >
              <div className="relative h-56 bg-stone-100">
                {pet.images[0] ? (
                  <Image
                    src={pet.images[0].url}
                    alt={pet.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full text-5xl">🐾</div>
                )}
              </div>
              <div className="p-5">
                <div className="flex items-start justify-between mb-1">
                  <h3 className="text-xl font-bold text-stone-900">{pet.name}</h3>
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
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-white border-t border-stone-100 px-6 py-16">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-stone-900 mb-12">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div>
              <div className="text-4xl mb-4">🔍</div>
              <h3 className="font-bold text-stone-900 mb-2">Browse Pets</h3>
              <p className="text-stone-500 text-sm">Filter by species, size, age, and more to find your perfect match.</p>
            </div>
            <div>
              <div className="text-4xl mb-4">📋</div>
              <h3 className="font-bold text-stone-900 mb-2">Apply Online</h3>
              <p className="text-stone-500 text-sm">Fill out a simple adoption application directly through PawFind.</p>
            </div>
            <div>
              <div className="text-4xl mb-4">🏡</div>
              <h3 className="font-bold text-stone-900 mb-2">Welcome Home</h3>
              <p className="text-stone-500 text-sm">Get approved, meet your new pet, and bring them home.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="bg-amber-500 px-6 py-16 text-center">
        <h2 className="text-3xl font-bold text-white mb-4">
          Every Pet Deserves a Home
        </h2>
        <p className="text-amber-100 mb-8 max-w-md mx-auto">
          Austin is a no-kill city. Help us keep it that way by adopting or donating today.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/pets"
            className="bg-white text-amber-600 font-semibold px-8 py-4 rounded-full hover:bg-amber-50 transition-colors"
          >
            Find a Pet
          </Link>
          <Link
            href="/donate"
            className="border-2 border-white text-white font-semibold px-8 py-4 rounded-full hover:bg-amber-400 transition-colors"
          >
            Donate Now
          </Link>
        </div>
      </section>
    </main>
  )
}