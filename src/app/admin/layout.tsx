import Link from 'next/link'
import { ReactNode } from 'react'

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-stone-100 flex">
      {/* Sidebar */}
      <aside className="w-56 bg-stone-900 text-stone-300 flex flex-col fixed h-full">
        <div className="px-6 py-5 border-b border-stone-800">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-xl">🐾</span>
            <span className="text-white font-bold">PawFind</span>
          </Link>
          <p className="text-xs text-stone-500 mt-1">Admin Panel</p>
        </div>

        <nav className="flex-1 px-3 py-4 space-y-1">
          <Link
            href="/admin"
            className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm hover:bg-stone-800 hover:text-white transition-colors"
          >
            📊 Overview
          </Link>
          <Link
            href="/admin/pets"
            className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm hover:bg-stone-800 hover:text-white transition-colors"
          >
            🐾 Pets
          </Link>
          <Link
            href="/admin/applications"
            className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm hover:bg-stone-800 hover:text-white transition-colors"
          >
            📋 Applications
          </Link>
          <Link
            href="/admin/donations"
            className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm hover:bg-stone-800 hover:text-white transition-colors"
          >
            💳 Donations
          </Link>
        </nav>

        <div className="px-6 py-4 border-t border-stone-800">
          <Link
            href="/"
            className="text-xs text-stone-500 hover:text-white transition-colors"
          >
            ← Back to site
          </Link>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 ml-56 p-8">
        {children}
      </main>
    </div>
  )
}