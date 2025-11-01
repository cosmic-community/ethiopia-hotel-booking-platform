'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Menu, X, Globe, User, Heart } from 'lucide-react'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [language, setLanguage] = useState('en')

  const languages = [
    { code: 'en', name: 'English' },
    { code: 'am', name: 'አማርኛ' },
    { code: 'om', name: 'Oromoo' },
    { code: 'ti', name: 'ትግርኛ' },
  ]

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
      <div className="container">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="flex">
              <div className="w-2 h-8 ethiopia-green"></div>
              <div className="w-2 h-8 ethiopia-yellow"></div>
              <div className="w-2 h-8 ethiopia-red"></div>
            </div>
            <span className="text-xl font-bold text-gray-900">Ethiopia Hotels</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/hotels" className="text-gray-700 hover:text-primary-600">
              Hotels
            </Link>
            <Link href="/destinations" className="text-gray-700 hover:text-primary-600">
              Destinations
            </Link>
            <Link href="/my-bookings" className="text-gray-700 hover:text-primary-600">
              My Bookings
            </Link>
          </nav>

          {/* Right Section */}
          <div className="flex items-center space-x-4">
            {/* Language Selector */}
            <div className="relative group">
              <button className="flex items-center space-x-1 text-gray-700 hover:text-primary-600">
                <Globe className="w-5 h-5" />
                <span className="text-sm">{language.toUpperCase()}</span>
              </button>
              <div className="absolute right-0 mt-2 w-32 bg-white rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => setLanguage(lang.code)}
                    className="block w-full px-4 py-2 text-sm text-left hover:bg-gray-100"
                  >
                    {lang.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Favorites */}
            <button className="text-gray-700 hover:text-primary-600">
              <Heart className="w-5 h-5" />
            </button>

            {/* User Menu */}
            <button className="flex items-center space-x-1 text-gray-700 hover:text-primary-600">
              <User className="w-5 h-5" />
              <span className="text-sm hidden md:inline">Account</span>
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden text-gray-700"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200">
            <nav className="flex flex-col space-y-3">
              <Link href="/hotels" className="text-gray-700 hover:text-primary-600">
                Hotels
              </Link>
              <Link href="/destinations" className="text-gray-700 hover:text-primary-600">
                Destinations
              </Link>
              <Link href="/my-bookings" className="text-gray-700 hover:text-primary-600">
                My Bookings
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}