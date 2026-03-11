export default function DonatePage() {
  return (
    <div className="max-w-2xl mx-auto px-6 py-16">
      <div className="mb-10">
        <h1 className="text-4xl font-bold text-stone-900 mb-4">Support the Animals</h1>
        <p className="text-stone-500 text-lg leading-relaxed">
          Every dollar goes directly toward care, food, and medical treatment for animals waiting for their forever home.
        </p>
      </div>
      <div className="bg-white rounded-2xl border border-stone-100 shadow-sm overflow-hidden mb-8">
        <div className="px-8 py-6 border-b border-stone-100">
          <h2 className="text-xs font-semibold text-stone-400 uppercase tracking-wider">Choose an Amount</h2>
        </div>
        <div className="px-8 py-6">
          <div className="grid grid-cols-3 gap-3 mb-6">
            {['$10', '$25', '$50', '$100', '$250', 'Custom'].map((amount) => (
              <button key={amount} className="border border-stone-200 rounded-xl py-3 text-sm font-medium text-stone-700 hover:border-amber-400 hover:text-amber-600 transition-colors">
                {amount}
              </button>
            ))}
          </div>
          <button className="w-full bg-stone-900 text-white py-3 rounded-full text-sm font-medium hover:bg-stone-700 transition-colors">
            Donate with Stripe
          </button>
          <p className="text-xs text-stone-400 text-center mt-3">Stripe integration coming soon. Thank you for your support.</p>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-4">
        <div className="bg-white rounded-2xl p-6 border border-stone-100 shadow-sm">
          <h3 className="font-semibold text-stone-900 mb-1">Austin Animal Center</h3>
          <p className="text-sm text-stone-500 mb-3">Austin's municipal shelter and one of the largest no-kill cities in the US.</p>
          <a href="https://www.austintexas.gov/department/aac" target="_blank" rel="noopener noreferrer" className="text-sm text-amber-600 hover:text-amber-700 font-medium">Donate directly →</a>
        </div>
        <div className="bg-white rounded-2xl p-6 border border-stone-100 shadow-sm">
          <h3 className="font-semibold text-stone-900 mb-1">Austin Pets Alive!</h3>
          <p className="text-sm text-stone-500 mb-3">A nonprofit dedicated to making Austin a no-kill city for all animals.</p>
          <a href="https://www.austinpetsalive.org" target="_blank" rel="noopener noreferrer" className="text-sm text-amber-600 hover:text-amber-700 font-medium">Donate directly →</a>
        </div>
      </div>
    </div>
  )
}