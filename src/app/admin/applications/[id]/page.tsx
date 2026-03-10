import { prisma } from '@/lib/db'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { updateApplicationStatus } from '@/lib/actions/applications'

interface Props {
  params: Promise<{ id: string }>
}

export default async function ApplicationDetailPage({ params }: Props) {
  const { id } = await params

  const app = await prisma.application.findUnique({
    where: { id },
    include: { pet: true },
  })

  if (!app) notFound()

  return (
    <div className="max-w-2xl">
      <div className="mb-8 flex items-center gap-4">
        <Link
          href="/admin/applications"
          className="text-stone-400 hover:text-stone-900 transition-colors text-sm"
        >
          ← Back to Applications
        </Link>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-stone-100 overflow-hidden mb-6">
        {/* Header */}
        <div className="px-6 py-5 border-b border-stone-100 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-stone-900">{app.fullName}</h1>
            <p className="text-stone-400 text-sm mt-0.5">
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

        {/* Contact */}
        <div className="px-6 py-5 border-b border-stone-100">
          <h2 className="text-xs font-semibold text-stone-400 uppercase tracking-wider mb-3">Contact Info</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-xs text-stone-400">Email</p>
              <p className="text-sm text-stone-900 mt-0.5">{app.email}</p>
            </div>
            <div>
              <p className="text-xs text-stone-400">Phone</p>
              <p className="text-sm text-stone-900 mt-0.5">{app.phone}</p>
            </div>
            {app.address && (
              <div className="col-span-2">
                <p className="text-xs text-stone-400">Address</p>
                <p className="text-sm text-stone-900 mt-0.5">{app.address}</p>
              </div>
            )}
          </div>
        </div>

        {/* Housing */}
        <div className="px-6 py-5 border-b border-stone-100">
          <h2 className="text-xs font-semibold text-stone-400 uppercase tracking-wider mb-3">Housing</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-xs text-stone-400">Housing Type</p>
              <p className="text-sm text-stone-900 mt-0.5 capitalize">
                {app.housingType.toLowerCase().replace('_', ' ')}
              </p>
            </div>
            <div>
              <p className="text-xs text-stone-400">Has Yard</p>
              <p className="text-sm text-stone-900 mt-0.5">{app.hasYard ? 'Yes' : 'No'}</p>
            </div>
            <div>
              <p className="text-xs text-stone-400">Renting</p>
              <p className="text-sm text-stone-900 mt-0.5">{app.isRenting ? 'Yes' : 'No'}</p>
            </div>
            <div>
              <p className="text-xs text-stone-400">Hours Alone / Day</p>
              <p className="text-sm text-stone-900 mt-0.5">{app.hoursAlonePerDay}h</p>
            </div>
          </div>
        </div>

        {/* Lifestyle */}
        <div className="px-6 py-5 border-b border-stone-100">
          <h2 className="text-xs font-semibold text-stone-400 uppercase tracking-wider mb-3">Lifestyle</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-xs text-stone-400">Other Pets</p>
              <p className="text-sm text-stone-900 mt-0.5">{app.hasOtherPets ? 'Yes' : 'No'}</p>
            </div>
            {app.otherPetsDescription && (
              <div className="col-span-2">
                <p className="text-xs text-stone-400">Other Pets Description</p>
                <p className="text-sm text-stone-900 mt-0.5">{app.otherPetsDescription}</p>
              </div>
            )}
            {app.activityLevel && (
              <div>
                <p className="text-xs text-stone-400">Activity Level</p>
                <p className="text-sm text-stone-900 mt-0.5 capitalize">{app.activityLevel.toLowerCase()}</p>
              </div>
            )}
            {app.experience && (
              <div className="col-span-2">
                <p className="text-xs text-stone-400">Experience with Pets</p>
                <p className="text-sm text-stone-900 mt-0.5">{app.experience}</p>
              </div>
            )}
          </div>
        </div>

        {/* Notes */}
        {app.notes && (
          <div className="px-6 py-5 border-b border-stone-100">
            <h2 className="text-xs font-semibold text-stone-400 uppercase tracking-wider mb-3">Additional Notes</h2>
            <p className="text-sm text-stone-700 leading-relaxed">{app.notes}</p>
          </div>
        )}

        {/* Actions */}
        {app.status === 'PENDING' && (
          <div className="px-6 py-5 flex gap-3">
            <form action={async () => {
              'use server'
              await updateApplicationStatus(app.id, 'APPROVED')
            }}>
              <button
                type="submit"
                className="bg-green-600 text-white px-6 py-2.5 rounded-full text-sm font-medium hover:bg-green-700 transition-colors"
              >
                Approve Application
              </button>
            </form>
            <form action={async () => {
              'use server'
              await updateApplicationStatus(app.id, 'REJECTED')
            }}>
              <button
                type="submit"
                className="bg-red-500 text-white px-6 py-2.5 rounded-full text-sm font-medium hover:bg-red-600 transition-colors"
              >
                Reject Application
              </button>
            </form>
          </div>
        )}

        {app.status !== 'PENDING' && (
          <div className="px-6 py-5">
            <p className="text-sm text-stone-400 italic">
              This application has already been {app.status.toLowerCase()}.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
