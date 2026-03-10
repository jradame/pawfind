export default function DashboardPage() {
  return (
    <main className="min-h-screen bg-stone-50">
      <div className="bg-stone-900 text-white py-16 px-6 text-center">
        <h1 className="text-4xl font-bold mb-3">My Dashboard</h1>
        <p className="text-stone-300">Manage your applications and saved pets</p>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl p-6 border border-stone-100 shadow-sm">
          <div className="text-3xl mb-3">📋</div>
          <h2 className="text-xl font-bold text-stone-900 mb-2">My Applications</h2>
          <p className="text-stone-500 text-sm mb-4">Track the status of your adoption applications.</p>
          <span className="text-xs bg-stone-100 text-stone-500 px-3 py-1 rounded-full">Coming soon</span>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-stone-100 shadow-sm">
          <div className="text-3xl mb-3">♥</div>
          <h2 className="text-xl font-bold text-stone-900 mb-2">Saved Pets</h2>
          <p className="text-stone-500 text-sm mb-4">View all the pets you've saved to your favorites.</p>
          
            <a href="/favorites"
            className="text-amber-600 hover:text-amber-700 text-sm font-medium transition-colors"
          >
            View Favorites →
          </a>
        </div>
      </div>
    </main>
  )
}