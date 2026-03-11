export default function ContactPage() {
  return (
    <div className="max-w-2xl mx-auto px-6 py-16">
      <div className="mb-10">
        <h1 className="text-4xl font-bold text-stone-900 mb-4">Contact Us</h1>
        <p className="text-stone-500 text-lg leading-relaxed">
          Have a question about an animal, the adoption process, or PawFind in general? We'd love to hear from you.
        </p>
      </div>
      <div className="bg-white rounded-2xl border border-stone-100 shadow-sm overflow-hidden mb-10">
        <div className="px-8 py-6 border-b border-stone-100">
          <h2 className="text-xs font-semibold text-stone-400 uppercase tracking-wider">Send a Message</h2>
        </div>
        <div className="px-8 py-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-stone-700 mb-1">Name</label>
            <input type="text" placeholder="Your name" className="w-full border border-stone-200 rounded-lg px-3 py-2 text-sm text-stone-900 focus:outline-none focus:ring-2 focus:ring-amber-400" />
          </div>
          <div>
            <label className="block text-sm font-medium text-stone-700 mb-1">Email</label>
            <input type="email" placeholder="your@email.com" className="w-full border border-stone-200 rounded-lg px-3 py-2 text-sm text-stone-900 focus:outline-none focus:ring-2 focus:ring-amber-400" />
          </div>
          <div>
            <label className="block text-sm font-medium text-stone-700 mb-1">Message</label>
            <textarea rows={5} placeholder="What's on your mind?" className="w-full border border-stone-200 rounded-lg px-3 py-2 text-sm text-stone-900 focus:outline-none focus:ring-2 focus:ring-amber-400 resize-none" />
          </div>
          <button className="bg-stone-900 text-white px-6 py-2.5 rounded-full text-sm font-medium hover:bg-stone-700 transition-colors">
            Send Message
          </button>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white rounded-2xl p-6 border border-stone-100 shadow-sm">
          <p className="text-xs font-semibold text-stone-400 uppercase tracking-wider mb-2">Email</p>
          <p className="text-sm text-stone-700">hello@pawfind.com</p>
        </div>
        <div className="bg-white rounded-2xl p-6 border border-stone-100 shadow-sm">
          <p className="text-xs font-semibold text-stone-400 uppercase tracking-wider mb-2">Based In</p>
          <p className="text-sm text-stone-700">Austin, Texas</p>
        </div>
      </div>
    </div>
  )
}