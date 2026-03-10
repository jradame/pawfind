import { prisma } from '@/lib/db'
import { notFound } from 'next/navigation'
import ApplicationForm from '@/components/forms/ApplicationForm'
import Image from 'next/image'

interface ApplyPageProps {
  params: Promise<{ petId: string }>
}

export default async function ApplyPage({ params }: ApplyPageProps) {
  const { petId } = await params

  const pet = await prisma.pet.findUnique({
    where: { id: petId },
    include: {
      images: {
        where: { isPrimary: true },
        take: 1,
      },
      shelter: true,
    },
  })

  if (!pet) notFound()

  const primaryImage = pet.images[0]

  return (
    <main className="min-h-screen bg-stone-50">
      {/* Header */}
      <div className="bg-stone-900 text-white py-12 px-6 text-center">
        <h1 className="text-4xl font-bold mb-2">Adoption Application</h1>
        <p className="text-stone-300">Complete the form below to apply to adopt {pet.name}</p>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Pet Summary Card */}
        <div className="md:col-span-1">
          <div className="bg-white rounded-2xl overflow-hidden border border-stone-100 shadow-sm sticky top-24">
            <div className="relative h-48 bg-stone-100">
              {primaryImage ? (
                <Image
                  src={primaryImage.url}
                  alt={pet.name}
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="flex items-center justify-center h-full text-5xl">🐾</div>
              )}
            </div>
            <div className="p-4">
              <h2 className="text-xl font-bold text-stone-900">{pet.name}</h2>
              <p className="text-stone-500 text-sm">{pet.breed}</p>
              <p className="text-stone-400 text-xs mt-1">
                {pet.age} {pet.age === 1 ? 'year' : 'years'} old · {pet.size.toLowerCase()} · {pet.gender.toLowerCase()}
              </p>
              {pet.shelter && (
                <div className="mt-3 pt-3 border-t border-stone-100">
                  <p className="text-xs text-stone-400">Available at</p>
                  <p className="text-sm font-medium text-stone-700">{pet.shelter.name}</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Application Form */}
        <div className="md:col-span-2">
          <ApplicationForm petId={pet.id} petName={pet.name} />
        </div>
      </div>
    </main>
  )
}
