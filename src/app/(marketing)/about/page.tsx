export default function AboutPage() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-16">
      <div className="mb-12">
        <h1 className="text-4xl font-bold text-stone-900 mb-4">About PawFind</h1>
        <p className="text-stone-500 text-lg leading-relaxed">
          PawFind is an Austin-based pet adoption platform built to connect animals in need with loving homes. We partner with local shelters to make the adoption process simple, transparent, and fast.
        </p>
      </div>
      <div className="grid grid-cols-1 gap-8 mb-16">
        <div className="bg-white rounded-2xl p-8 border border-stone-100 shadow-sm">
          <h2 className="text-xl font-bold text-stone-900 mb-3">Our Mission</h2>
          <p className="text-stone-500 leading-relaxed">
            Every animal deserves a second chance. We built PawFind to reduce the friction between shelter animals and the people who want to adopt them — better search, faster applications, and real-time availability.
          </p>
        </div>
        <div className="bg-white rounded-2xl p-8 border border-stone-100 shadow-sm">
          <h2 className="text-xl font-bold text-stone-900 mb-3">Our Partners</h2>
          <p className="text-stone-500 leading-relaxed">
            We work closely with Austin Animal Center and Austin Pets Alive! — two of the most respected no-kill shelters in the country. All pets listed on PawFind are real animals available for adoption right now.
          </p>
        </div>
        <div className="bg-white rounded-2xl p-8 border border-stone-100 shadow-sm">
          <h2 className="text-xl font-bold text-stone-900 mb-3">Built in Austin</h2>
          <p className="text-stone-500 leading-relaxed">
            PawFind was designed and built in Austin, Texas. We love this city and we love its animals. If you have questions or want to get involved, reach out — we'd love to hear from you.
          </p>
        </div>
      </div>
    </div>
  )
}