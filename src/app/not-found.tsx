import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-stone-50">
      <div className="text-center px-6">
        <p className="text-6xl mb-6">🐾</p>
        <h1 className="text-4xl font-bold text-stone-900 mb-3">Page Not Found</h1>
        <p className="text-stone-500 mb-8 max-w-sm mx-auto">
          Looks like this page ran off. Let's get you back to finding a pet.
        </p>
        <Link
          href="/"
          className="bg-stone-900 text-white px-6 py-3 rounded-full text-sm font-medium hover:bg-stone-700 transition-colors"
        >
          Back to Home
        </Link>
      </div>
    </div>
  )
}