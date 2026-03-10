import { prisma } from '@/lib/db'
import Link from 'next/link'

export default async function AdminApplicationsPage() {
  const applications = await prisma.application.findMany({
    orderBy: { createdAt: 'desc' },
    include: { pet: true },
  })

  const counts = {
    all: applications.length,
    pending: applications.filter((a) => a.status === 'PENDING').length,
    approved: applications.filter((a) => a.status === 'APPROVED').length,
    rejected: applications.filter((a) => a.status === 'REJECTED').length,
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-stone-900">Applications</h1>
        <p className="text-stone-500 text-sm mt-1">{counts.all} total applications</p>
      </div>

      {/* Status summary */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        <div className="bg-amber-50 border border-amber-100 rounded-2xl p-4 text-center">
          <p className="text-3xl font-bold text-amber-700">{counts.pending}</p>
          <p className="text-amber-600 text-sm mt-1">Pending</p>
        </div>
        <div className="bg-green-50 border border-green-100 rounded-2xl p-4 text-center">
          <p className="text-3xl font-bold text-green-700">{counts.approved}</p>
          <p className="text-green-600 text-sm mt-1">Approved</p>
        </div>
        <div className="bg-red-50 border border-red-100 rounded-2xl p-4 text-center">
          <p className="text-3xl font-bold text-red-700">{counts.rejected}</p>
          <p className="text-red-600 text-sm mt-1">Rejected</p>
        </div>
      </div>

      {/* Applications table */}
      <div className="bg-white rounded-2xl shadow-sm border border-stone-100 overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-stone-100 text-left">
              <th className="px-6 py-4 text-xs font-semibold text-stone-400 uppercase tracking-wider">Applicant</th>
              <th className="px-6 py-4 text-xs font-semibold text-stone-400 uppercase tracking-wider">Pet</th>
              <th className="px-6 py-4 text-xs font-semibold text-stone-400 uppercase tracking-wider">Housing</th>
              <th className="px-6 py-4 text-xs font-semibold text-stone-400 uppercase tracking-wider">Date</th>
              <th className="px-6 py-4 text-xs font-semibold text-stone-400 uppercase tracking-wider">Status</th>
              <th className="px-6 py-4 text-xs font-semibold text-stone-400 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-stone-100">
            {applications.map((app) => (
              <tr key={app.id} className="hover:bg-stone-50 transition-colors">
                <td className="px-6 py-4">
                  <p className="font-medium text-stone-900 text-sm">{app.fullName}</p>
                  <p className="text-stone-400 text-xs mt-0.5">{app.email}</p>
                </td>
                <td className="px-6 py-4 text-sm text-stone-600">
                  {app.pet.name}
                </td>
                <td className="px-6 py-4 text-sm text-stone-600 capitalize">
                  {app.housingType.toLowerCase().replace('_', ' ')}
                </td>
                <td className="px-6 py-4 text-sm text-stone-400">
                  {new Date(app.createdAt).toLocaleDateString()}
                </td>
                <td className="px-6 py-4">
                  <span className={`text-xs font-semibold px-3 py-1 rounded-full ${
                    app.status === 'PENDING'
                      ? 'bg-amber-100 text-amber-700'
                      : app.status === 'APPROVED'
                      ? 'bg-green-100 text-green-700'
                      : 'bg-red-100 text-red-700'
                  }`}>
                    {app.status.charAt(0) + app.status.slice(1).toLowerCase()}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <Link
                    href={`/admin/applications/${app.id}`}
                    className="text-xs text-amber-600 hover:text-amber-700 font-medium transition-colors"
                  >
                    Review →
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {applications.length === 0 && (
          <div className="px-6 py-16 text-center text-stone-400">
            <p className="text-4xl mb-3">📋</p>
            <p className="text-sm">No applications yet.</p>
          </div>
        )}
      </div>
    </div>
  )
}