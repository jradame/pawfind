import { prisma } from '@/lib/db'
import Link from 'next/link'
import Image from 'next/image'

export default async function AdminPetsPage() {
  const pets = await prisma.pet.findMany({
    include: {
      images: { where: { isPrimary: true }, take: 1 },
      shelter: true,
      _count: { select: { applications: true } },
    },
    orderBy: { createdAt: 'desc' },
  })

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-stone-900">Pets</h1>
          <p className="text-stone-500 text-sm mt-1">{pets.length} animals in the system</p>
        </div>
        <Link href="/admin/pets/new" className="bg-stone-900 text-white px-5 py-2.5 rounded-full text-sm font-medium hover:bg-stone-700 transition-colors">
          + Add Pet
        </Link>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-stone-100 overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-stone-100 text-left">
              <th className="px-6 py-4 text-xs font-semibold text-stone-400 uppercase tracking-wider">Pet</th>
              <th className="px-6 py-4 text-xs font-semibold text-stone-400 uppercase tracking-wider">Species</th>
              <th className="px-6 py-4 text-xs font-semibold text-stone-400 uppercase tracking-wider">Status</th>
              <th className="px-6 py-4 text-xs font-semibold text-stone-400 uppercase tracking-wider">Applications</th>
              <th className="px-6 py-4 text-xs font-semibold text-stone-400 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-stone-100">
            {pets.map((pet) => (
              <tr key={pet.id} className="hover:bg-stone-50 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="relative w-10 h-10 rounded-full overflow-hidden bg-stone-100 shrink-0">
                      {pet.images[0] ? (
                        <Image src={pet.images[0].url} alt={pet.name} fill className="object-cover" />
                      ) : (
                        <div className="flex items-center justify-center h-full text-lg">🐾</div>
                      )}
                    </div>
                    <div>
                      <p className="font-medium text-stone-900 text-sm">{pet.name}</p>
                      <p className="text-stone-400 text-xs">{pet.breed}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-stone-600">
                  {pet.species === 'DOG' ? '🐶 Dog' : pet.species === 'CAT' ? '🐱 Cat' : '🐾 Other'}
                </td>
                <td className="px-6 py-4">
                  <span className={`text-xs font-semibold px-3 py-1 rounded-full ${
                    pet.status === 'AVAILABLE' ? 'bg-green-100 text-green-700' :
                    pet.status === 'ADOPTED' ? 'bg-blue-100 text-blue-700' :
                    'bg-stone-100 text-stone-600'
                  }`}>
                    {pet.status.charAt(0) + pet.status.slice(1).toLowerCase()}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-stone-600">{pet._count.applications}</td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <Link href={`/pets/${pet.slug}`} className="text-xs text-stone-400 hover:text-stone-900 transition-colors" target="_blank">
                      View
                    </Link>
                    <Link href={`/admin/pets/${pet.id}/edit`} className="text-xs text-amber-600 hover:text-amber-700 font-medium transition-colors">
                      Edit
                    </Link>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {pets.length === 0 && (
          <div className="px-6 py-16 text-center text-stone-400">
            <p className="text-4xl mb-3">🐾</p>
            <p className="text-sm">No pets yet. Add your first one!</p>
          </div>
        )}
      </div>
    </div>
  )
}