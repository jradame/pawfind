export default function ContactPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] max-w-3xl mx-auto px-6 py-16">
      <div className="mb-10">
        <h1 className="text-4xl font-bold text-white mb-4">Contact Us</h1>
        <p className="text-stone-300 text-lg leading-relaxed">
          Have a question about an animal, the adoption process, or PawFind in general? We'd love to hear from you.
        </p>
      </div>
      <div className="bg-white/10 rounded-2xl border border-white/10 overflow-hidden mb-10">
        <div className="px-8 py-6 border-b border-white/10">
          <h2 className="text-xs font-semibold text-stone-400 uppercase tracking-wider">Send a Message</h2>
        </div>
        <div className="px-8 py-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-stone-200 mb-1">Name</label>
            <input type="text" placeholder="Your name" className="w-full border border-white/20 bg-white/10 rounded-lg px-3 py-2 text-sm text-white placeholder-stone-500 focus:outline-none focus:ring-2 focus:ring-amber-400" />
          </div>
          <div>
            <label className="block text-sm font-medium text-stone-200 mb-1">Email</label>
            <input type="email" placeholder="your@email.com" className="w-full border border-white/20 bg-white/10 rounded-lg px-3 py-2 text-sm text-white placeholder-stone-500 focus:outline-none focus:ring-2 focus:ring-amber-400" />
          </div>
          <div>
            <label className="block text-sm font-medium text-stone-200 mb-1">Message</label>
            <textarea rows={5} placeholder="What's on your mind?" className="w-full border border-white/20 bg-white/10 rounded-lg px-3 py-2 text-sm text-white placeholder-stone-500 focus:outline-none focus:ring-2 focus:ring-amber-400 resize-none" />
          </div>
          <button className="bg-amber-500 text-white px-6 py-2.5 rounded-full text-sm font-medium hover:bg-amber-400 transition-colors">
            Send Message
          </button>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white/10 rounded-2xl p-6 border border-white/10">
          <p className="text-xs font-semibold text-stone-400 uppercase tracking-wider mb-2">Email</p>
          <p className="text-sm text-stone-200">hello@pawfind.com</p>
        </div>
        <div className="bg-white/10 rounded-2xl p-6 border border-white/10">
          <p className="text-xs font-semibold text-stone-400 uppercase tracking-wider mb-2">Based In</p>
          <p className="text-sm text-stone-200">Austin, Texas</p>
        </div>
      </div>
    </div>
  )
}