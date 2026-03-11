import { prisma } from '@/lib/db'
import Link from 'next/link'

export default async function ApplicationsPage() {
  const applications = await prisma.application.findMany({
    include: {
      pet: true,
    },
    orderBy: { createdAt: 'desc' },
  })

  return (
    <div className="max-w-3xl mx-auto px-6 py-16">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-stone-900">My Applications</h1>
        <p className="text-stone-500 text-sm mt-1">Track the status of your adoption applications.</p>
      </div>

      {applications.length === 0 ? (
        <div className="bg-white rounded-2xl border border-stone-100 shadow-sm p-12 text-center">
          <p className="text-3xl mb-4">🐾</p>
          <p className="text-stone-500 text-sm">You haven't applied to adopt any pets yet.</p>
          <Link href="/pets" className="inline-block mt-4 bg-stone-900 text-white px-6 py-2.5 rounded-full text-sm font-medium hover:bg-stone-700 transition-colors">
            Browse Pets
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {applications.map((app) => (
            <div key={app.id} className="bg-white rounded-2xl border border-stone-100 shadow-sm p-6 flex items-center justify-between">
              <div>
                <p className="font-semibold text-stone-900">{app.pet.name}</p>
                <p className="text-sm text-stone-400 mt-0.5">{app.pet.breed} · {app.pet.species}</p>
                <p className="text-xs text-stone-400 mt-1">{new Date(app.createdAt).toLocaleDateString()}</p>
              </div>
              <span className={`text-xs font-semibold px-3 py-1 rounded-full ${
                app.status === 'APPROVED' ? 'bg-green-100 text-green-700' :
                app.status === 'REJECTED' ? 'bg-red-100 text-red-700' :
                'bg-amber-100 text-amber-700'
              }`}>
                {app.status}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}