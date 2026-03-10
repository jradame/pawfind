import { createPet } from '@/lib/actions/admin'
import Link from 'next/link'

export default function NewPetPage() {
  return (
    <div className="max-w-2xl">
      <div className="mb-8">
        <Link href="/admin/pets" className="text-stone-400 hover:text-stone-900 transition-colors text-sm">
          ← Back to Pets
        </Link>
      </div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-stone-900">Add a Pet</h1>
        <p className="text-stone-500 text-sm mt-1">Fill out the details below to add a new pet.</p>
      </div>
      <form action={createPet} className="bg-white rounded-2xl shadow-sm border border-stone-100 overflow-hidden">
        <div className="px-6 py-5 border-b border-stone-100">
          <h2 className="text-xs font-semibold text-stone-400 uppercase tracking-wider mb-4">Basic Info</h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2">
              <label className="block text-sm font-medium text-stone-700 mb-1">Name</label>
              <input name="name" required placeholder="Brisket" className="w-full border border-stone-200 rounded-lg px-3 py-2 text-sm text-stone-900 focus:outline-none focus:ring-2 focus:ring-amber-400" />
            </div>
            <div>
              <label className="block text-sm font-medium text-stone-700 mb-1">Species</label>
              <select name="species" required className="w-full border border-stone-200 rounded-lg px-3 py-2 text-sm text-stone-900 focus:outline-none focus:ring-2 focus:ring-amber-400">
                <option value="">Select...</option>
                <option value="DOG">Dog</option>
                <option value="CAT">Cat</option>
                <option value="OTHER">Other</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-stone-700 mb-1">Breed</label>
              <input name="breed" required placeholder="Mixed Breed" className="w-full border border-stone-200 rounded-lg px-3 py-2 text-sm text-stone-900 focus:outline-none focus:ring-2 focus:ring-amber-400" />
            </div>
            <div>
              <label className="block text-sm font-medium text-stone-700 mb-1">Age (years)</label>
              <input name="age" type="number" required min="0" max="25" placeholder="2" className="w-full border border-stone-200 rounded-lg px-3 py-2 text-sm text-stone-900 focus:outline-none focus:ring-2 focus:ring-amber-400" />
            </div>
            <div>
              <label className="block text-sm font-medium text-stone-700 mb-1">Size</label>
              <select name="size" required className="w-full border border-stone-200 rounded-lg px-3 py-2 text-sm text-stone-900 focus:outline-none focus:ring-2 focus:ring-amber-400">
                <option value="">Select...</option>
                <option value="SMALL">Small</option>
                <option value="MEDIUM">Medium</option>
                <option value="LARGE">Large</option>
                <option value="XLARGE">X-Large</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-stone-700 mb-1">Gender</label>
              <select name="gender" required className="w-full border border-stone-200 rounded-lg px-3 py-2 text-sm text-stone-900 focus:outline-none focus:ring-2 focus:ring-amber-400">
                <option value="">Select...</option>
                <option value="MALE">Male</option>
                <option value="FEMALE">Female</option>
              </select>
            </div>
            <div className="col-span-2">
              <label className="block text-sm font-medium text-stone-700 mb-1">Description</label>
              <textarea name="description" required rows={4} placeholder="Tell potential adopters about this pet..." className="w-full border border-stone-200 rounded-lg px-3 py-2 text-sm text-stone-900 focus:outline-none focus:ring-2 focus:ring-amber-400 resize-none" />
            </div>
          </div>
        </div>
        <div className="px-6 py-5 border-b border-stone-100">
          <h2 className="text-xs font-semibold text-stone-400 uppercase tracking-wider mb-4">Photo</h2>
          <label className="block text-sm font-medium text-stone-700 mb-1">Image URL</label>
          <input name="imageUrl" type="url" placeholder="https://images.unsplash.com/..." className="w-full border border-stone-200 rounded-lg px-3 py-2 text-sm text-stone-900 focus:outline-none focus:ring-2 focus:ring-amber-400" />
          <p className="text-xs text-stone-400 mt-1">Paste an Unsplash URL for now. Cloudinary upload coming soon.</p>
        </div>
        <div className="px-6 py-5 border-b border-stone-100">
          <h2 className="text-xs font-semibold text-stone-400 uppercase tracking-wider mb-4">Options</h2>
          <label className="flex items-center gap-3 cursor-pointer">
            <input name="featured" type="checkbox" className="w-4 h-4 accent-amber-500" />
            <span className="text-sm text-stone-700">Feature this pet on the homepage</span>
          </label>
        </div>
        <div className="px-6 py-5 flex items-center justify-between">
          <Link href="/admin/pets" className="text-sm text-stone-400 hover:text-stone-700 transition-colors">
            Cancel
          </Link>
          <button type="submit" className="bg-stone-900 text-white px-6 py-2.5 rounded-full text-sm font-medium hover:bg-stone-700 transition-colors">
            Add Pet
          </button>
        </div>
      </form>
    </div>
  )
}