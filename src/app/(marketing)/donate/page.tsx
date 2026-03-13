export default function DonatePage() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] max-w-3xl mx-auto px-6 py-16">
      <div className="mb-10">
        <h1 className="text-4xl font-bold text-white mb-4">Support the Animals</h1>
        <p className="text-stone-300 text-lg leading-relaxed">
          Every dollar goes directly toward care, food, and medical treatment for animals waiting for their forever home.
        </p>
      </div>
      <div className="bg-white/10 rounded-2xl border border-white/10 overflow-hidden mb-8">
        <div className="px-8 py-6 border-b border-white/10">
          <h2 className="text-xs font-semibold text-stone-400 uppercase tracking-wider">Choose an Amount</h2>
        </div>
        <div className="px-8 py-6">
          <div className="grid grid-cols-3 gap-3 mb-6">
            {['$10', '$25', '$50', '$100', '$250', 'Custom'].map((amount) => (
              <button key={amount} className="border border-white/20 rounded-xl py-3 text-sm font-medium text-stone-200 hover:border-amber-400 hover:text-amber-400 transition-colors">
                {amount}
              </button>
            ))}
          </div>
          <button className="w-full bg-amber-500 text-white py-3 rounded-full text-sm font-medium hover:bg-amber-400 transition-colors">
            Donate with Stripe
          </button>
          <p className="text-xs text-stone-500 text-center mt-3">Stripe integration coming soon. Thank you for your support.</p>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-4">
        <div className="bg-white/10 rounded-2xl p-6 border border-white/10">
          <h3 className="font-semibold text-white mb-1">Austin Animal Center</h3>
          <p className="text-sm text-stone-300 mb-3">Austin's municipal shelter and one of the largest no-kill cities in the US.</p>
          <a href="https://www.austintexas.gov/department/aac" target="_blank" rel="noopener noreferrer" className="text-sm text-amber-400 hover:text-amber-300 font-medium">Donate directly →</a>
        </div>
        <div className="bg-white/10 rounded-2xl p-6 border border-white/10">
          <h3 className="font-semibold text-white mb-1">Austin Pets Alive!</h3>
          <p className="text-sm text-stone-300 mb-3">A nonprofit dedicated to making Austin a no-kill city for all animals.</p>
          <a href="https://www.austinpetsalive.org" target="_blank" rel="noopener noreferrer" className="text-sm text-amber-400 hover:text-amber-300 font-medium">Donate directly →</a>
        </div>
      </div>
    </div>
  )
}