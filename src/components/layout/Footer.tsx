import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-stone-900 text-stone-400 mt-auto">
      <div className="max-w-6xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Brand */}
        <div className="md:col-span-1">
          <Link href="/" className="flex items-center gap-2 mb-3">
            <span className="text-2xl">🐾</span>
            <span className="text-xl font-bold text-white">PawFind</span>
          </Link>
          <p className="text-sm leading-relaxed">
            Connecting Austin pets with loving homes. Every animal deserves a second chance.
          </p>
        </div>

        {/* Adopt */}
        <div>
          <h3 className="text-white font-semibold mb-3 text-sm uppercase tracking-wider">Adopt</h3>
          <ul className="space-y-2 text-sm">
            <li><Link href="/pets" className="hover:text-white transition-colors">Browse Pets</Link></li>
            <li><Link href="/pets?species=DOG" className="hover:text-white transition-colors">Dogs</Link></li>
            <li><Link href="/pets?species=CAT" className="hover:text-white transition-colors">Cats</Link></li>
            <li><Link href="/favorites" className="hover:text-white transition-colors">Saved Pets</Link></li>
          </ul>
        </div>

        {/* About */}
        <div>
          <h3 className="text-white font-semibold mb-3 text-sm uppercase tracking-wider">About</h3>
          <ul className="space-y-2 text-sm">
            <li><Link href="/about" className="hover:text-white transition-colors">Our Mission</Link></li>
            <li><Link href="/donate" className="hover:text-white transition-colors">Donate</Link></li>
            <li><Link href="/contact" className="hover:text-white transition-colors">Contact</Link></li>
          </ul>
        </div>

        {/* Austin */}
        <div>
          <h3 className="text-white font-semibold mb-3 text-sm uppercase tracking-wider">Austin</h3>
          <ul className="space-y-2 text-sm">
            <li>
              
                <a href="https://www.austintexas.gov/department/animal-services"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors"
              >
                Austin Animal Center
              </a>
            </li>
            <li>
              
                <a href="https://www.austinpetsalive.org"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors"
              >
                Austin Pets Alive!
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-stone-800">
        <div className="max-w-6xl mx-auto px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-stone-500">
          <p>© 2026 PawFind. Built by Justin Radame in Austin, TX.</p>
          <p>Austin is a no-kill city. Help us keep it that way.</p>
        </div>
      </div>
    </footer>
  )
}