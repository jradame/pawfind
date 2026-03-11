import { prisma } from '@/lib/db'
import { updatePet, } from '@/lib/actions/admin'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import DeletePetButton from '@/components/admin/DeletePetButton'

export default async function EditPetPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const pet = await prisma.pet.findUnique({
    where: { id },
    include: { images: { where: { isPrimary: true }, take: 1 } },
  })

  if (!pet) notFound()

  return (
    <div className="max-w-2xl">
      <div className="mb-8">
        <Link href="/admin/pets" className="text-stone-400 hover:text-stone-900 transition-colors text-sm">
          ← Back to Pets
        </Link>
      </div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-stone-900">Edit {pet.name}</h1>
        <p className="text-stone-500 text-sm mt-1">Update this pet's details.</p>
      </div>
      <form action={updatePet} className="bg-white rounded-2xl shadow-sm border border-stone-100 overflow-hidden">
        <input type="hidden" name="id" value={pet.id} />
        <div className="px-6 py-5 border-b border-stone-100">
          <h2 className="text-xs font-semibold text-stone-400 uppercase tracking-wider mb-4">Basic Info</h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2">
              <label className="block text-sm font-medium text-stone-700 mb-1">Name</label>
              <input name="name" required defaultValue={pet.name} className="w-full border border-stone-200 rounded-lg px-3 py-2 text-sm text-stone-900 focus:outline-none focus:ring-2 focus:ring-amber-400" />
            </div>
            <div>
              <label className="block text-sm font-medium text-stone-700 mb-1">Species</label>
              <select name="species" required defaultValue={pet.species} className="w-full border border-stone-200 rounded-lg px-3 py-2 text-sm text-stone-900 focus:outline-none focus:ring-2 focus:ring-amber-400">
                <option value="DOG">Dog</option>
                <option value="CAT">Cat</option>
                <option value="OTHER">Other</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-stone-700 mb-1">Breed</label>
              <input name="breed" required defaultValue={pet.breed} className="w-full border border-stone-200 rounded-lg px-3 py-2 text-sm text-stone-900 focus:outline-none focus:ring-2 focus:ring-amber-400" />
            </div>
            <div>
              <label className="block text-sm font-medium text-stone-700 mb-1">Age (years)</label>
              <input name="age" type="number" required min="0" max="25" defaultValue={pet.age} className="w-full border border-stone-200 rounded-lg px-3 py-2 text-sm text-stone-900 focus:outline-none focus:ring-2 focus:ring-amber-400" />
            </div>
            <div>
              <label className="block text-sm font-medium text-stone-700 mb-1">Size</label>
              <select name="size" required defaultValue={pet.size} className="w-full border border-stone-200 rounded-lg px-3 py-2 text-sm text-stone-900 focus:outline-none focus:ring-2 focus:ring-amber-400">
                <option value="SMALL">Small</option>
                <option value="MEDIUM">Medium</option>
                <option value="LARGE">Large</option>
                <option value="XLARGE">X-Large</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-stone-700 mb-1">Gender</label>
              <select name="gender" required defaultValue={pet.gender} className="w-full border border-stone-200 rounded-lg px-3 py-2 text-sm text-stone-900 focus:outline-none focus:ring-2 focus:ring-amber-400">
                <option value="MALE">Male</option>
                <option value="FEMALE">Female</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-stone-700 mb-1">Status</label>
              <select name="status" required defaultValue={pet.status} className="w-full border border-stone-200 rounded-lg px-3 py-2 text-sm text-stone-900 focus:outline-none focus:ring-2 focus:ring-amber-400">
                <option value="AVAILABLE">Available</option>
                <option value="PENDING">Pending</option>
                <option value="ADOPTED">Adopted</option>
              </select>
            </div>
            <div className="col-span-2">
              <label className="block text-sm font-medium text-stone-700 mb-1">Description</label>
              <textarea name="description" required rows={4} defaultValue={pet.description} className="w-full border border-stone-200 rounded-lg px-3 py-2 text-sm text-stone-900 focus:outline-none focus:ring-2 focus:ring-amber-400 resize-none" />
            </div>
          </div>
        </div>
        <div className="px-6 py-5 border-b border-stone-100">
          <h2 className="text-xs font-semibold text-stone-400 uppercase tracking-wider mb-4">Photo</h2>
          <label className="block text-sm font-medium text-stone-700 mb-1">Image URL</label>
          <input name="imageUrl" type="url" defaultValue={pet.images[0]?.url ?? ''} className="w-full border border-stone-200 rounded-lg px-3 py-2 text-sm text-stone-900 focus:outline-none focus:ring-2 focus:ring-amber-400" />
          <p className="text-xs text-stone-400 mt-1">Paste an Unsplash URL for now. Cloudinary upload coming soon.</p>
        </div>
        <div className="px-6 py-5 border-b border-stone-100">
          <h2 className="text-xs font-semibold text-stone-400 uppercase tracking-wider mb-4">Options</h2>
          <label className="flex items-center gap-3 cursor-pointer">
            <input name="featured" type="checkbox" defaultChecked={pet.featured} className="w-4 h-4 accent-amber-500" />
            <span className="text-sm text-stone-700">Feature this pet on the homepage</span>
          </label>
        </div>
        <div className="px-6 py-5 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/admin/pets" className="text-sm text-stone-400 hover:text-stone-700 transition-colors">
              Cancel
            </Link>
            <DeletePetButton petId={pet.id} petName={pet.name} />
          </div>
          <button type="submit" className="bg-stone-900 text-white px-6 py-2.5 rounded-full text-sm font-medium hover:bg-stone-700 transition-colors">
            Save Changes
          </button>
        </div>
      </form>
    </div>
  )
}