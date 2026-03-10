'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { SignInButton, SignUpButton, UserButton, Show } from '@clerk/nextjs'

export default function Navbar() {
  const pathname = usePathname()
  const [menuOpen, setMenuOpen] = useState(false)

  const links = [
    { href: '/pets', label: 'Find a Pet' },
    { href: '/donate', label: 'Donate' },
    { href: '/about', label: 'About' },
    { href: '/contact', label: 'Contact' },
  ]

  return (
    <nav className="bg-white border-b border-stone-100 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <span className="text-2xl">🐾</span>
          <span className="text-xl font-bold text-stone-900">PawFind</span>
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm font-medium transition-colors ${
                pathname === link.href
                  ? 'text-stone-900'
                  : 'text-stone-500 hover:text-stone-900'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Desktop auth */}
        <div className="hidden md:flex items-center gap-3">
          <Link
            href="/favorites"
            className="text-stone-500 hover:text-stone-900 transition-colors text-sm font-medium"
          >
            ♡ Saved
          </Link>

          <Show when="signed-out">
            <SignInButton mode="modal">
              <button className="text-stone-600 hover:text-stone-900 text-sm font-medium transition-colors">
                Sign In
              </button>
            </SignInButton>
            <SignUpButton mode="modal">
              <button className="bg-stone-900 text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-stone-700 transition-colors">
                Sign Up
              </button>
            </SignUpButton>
          </Show>

          <Show when="signed-in">
            <Link
              href="/dashboard"
              className="text-stone-600 hover:text-stone-900 text-sm font-medium transition-colors"
            >
              Dashboard
            </Link>
            <UserButton />
          </Show>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden text-stone-600 hover:text-stone-900"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? '✕' : '☰'}
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-stone-100 px-6 py-4 flex flex-col gap-4">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className={`text-sm font-medium transition-colors ${
                pathname === link.href
                  ? 'text-stone-900'
                  : 'text-stone-500 hover:text-stone-900'
              }`}
            >
              {link.label}
            </Link>
          ))}
          <Show when="signed-out">
            <SignInButton mode="modal">
              <button className="text-stone-600 text-sm font-medium">
                Sign In
              </button>
            </SignInButton>
            <SignUpButton mode="modal">
              <button className="bg-stone-900 text-white px-4 py-2 rounded-full text-sm font-medium text-center">
                Sign Up
              </button>
            </SignUpButton>
          </Show>
          <Show when="signed-in">
            <Link
              href="/dashboard"
              onClick={() => setMenuOpen(false)}
              className="text-sm font-medium text-stone-600"
            >
              Dashboard
            </Link>
            <UserButton />
          </Show>
        </div>
      )}
    </nav>
  )
}