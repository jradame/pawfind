import { prisma } from '@/lib/db'
import Link from 'next/link'

export default async function AdminPage() {
  const [totalPets, availablePets, totalApplications, pendingApplications] =
    await Promise.all([
      prisma.pet.count(),
      prisma.pet.count({ where: { status: 'AVAILABLE' } }),
      prisma.application.count(),
      prisma.application.count({ where: { status: 'PENDING' } }),
    ])

  const recentApplications = await prisma.application.findMany({
    take: 5,
    orderBy: { createdAt: 'desc' },
    include: { pet: true },
  })

  const stats = [
    { label: 'Total Pets', value: totalPets, icon: '🐾', href: '/admin/pets' },
    { label: 'Available', value: availablePets, icon: '✅', href: '/admin/pets' },
    { label: 'Applications', value: totalApplications, icon: '📋', href: '/admin/applications' },
    { label: 'Pending Review', value: pendingApplications, icon: '⏳', href: '/admin/applications' },
  ]

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-stone-900">Overview</h1>
        <p className="text-stone-500 text-sm mt-1">Welcome back. Here's what's going on at PawFind.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        {stats.map((stat) => (
          <Link
            key={stat.label}
            href={stat.href}
            className="bg-white rounded-2xl p-5 shadow-sm border border-stone-100 hover:shadow-md transition-shadow"
          >
            <p className="text-2xl mb-2">{stat.icon}</p>
            <p className="text-3xl font-bold text-stone-900">{stat.value}</p>
            <p className="text-stone-500 text-sm mt-1">{stat.label}</p>
          </Link>
        ))}
      </div>

      {/* Recent Applications */}
      <div className="bg-white rounded-2xl shadow-sm border border-stone-100">
        <div className="px-6 py-4 border-b border-stone-100 flex items-center justify-between">
          <h2 className="font-semibold text-stone-900">Recent Applications</h2>
          <Link
            href="/admin/applications"
            className="text-sm text-amber-600 hover:text-amber-700 font-medium"
          >
            View all →
          </Link>
        </div>

        {recentApplications.length === 0 ? (
          <div className="px-6 py-12 text-center text-stone-400">
            <p className="text-3xl mb-2">📋</p>
            <p className="text-sm">No applications yet</p>
          </div>
        ) : (
          <div className="divide-y divide-stone-100">
            {recentApplications.map((app) => (
              <div key={app.id} className="px-6 py-4 flex items-center justify-between">
                <div>
                  <p className="font-medium text-stone-900 text-sm">{app.fullName}</p>
                  <p className="text-stone-400 text-xs mt-0.5">
                    Applying for {app.pet.name} · {new Date(app.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <span className={`text-xs font-semibold px-3 py-1 rounded-full ${
                  app.status === 'PENDING'
                    ? 'bg-amber-100 text-amber-700'
                    : app.status === 'APPROVED'
                    ? 'bg-green-100 text-green-700'
                    : 'bg-red-100 text-red-700'
                }`}>
                  {app.status.charAt(0) + app.status.slice(1).toLowerCase()}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}