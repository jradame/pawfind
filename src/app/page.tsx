import Link from 'next/link'

export default function Home() {
  return (
    <main className="min-h-screen bg-stone-50 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-5xl font-bold text-stone-900 mb-4">🐾 PawFind</h1>
        <p className="text-stone-500 mb-8">Find your perfect rescue pet in Austin</p>
        <Link href="/pets" className="bg-stone-900 text-white px-6 py-3 rounded-full hover:bg-stone-700 transition-colors">
          Browse Pets
        </Link>
      </div>
    </main>
  )
}