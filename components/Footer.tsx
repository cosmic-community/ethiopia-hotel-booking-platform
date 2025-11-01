import Link from 'next/link'
import { Phone, Mail, MapPin, Facebook, Twitter, Instagram } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Ethiopia Hotels</h3>
            <p className="text-gray-400 text-sm mb-4">
              Your gateway to discovering and booking hotels across Ethiopia. 
              From historic Lalibela to modern Addis Ababa.
            </p>
            <div className="flex space-x-4">
              <Facebook className="w-5 h-5 text-gray-400 hover:text-white cursor-pointer" />
              <Twitter className="w-5 h-5 text-gray-400 hover:text-white cursor-pointer" />
              <Instagram className="w-5 h-5 text-gray-400 hover:text-white cursor-pointer" />
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/hotels" className="text-gray-400 hover:text-white">All Hotels</Link></li>
              <li><Link href="/destinations" className="text-gray-400 hover:text-white">Destinations</Link></li>
              <li><Link href="/about" className="text-gray-400 hover:text-white">About Us</Link></li>
              <li><Link href="/contact" className="text-gray-400 hover:text-white">Contact</Link></li>
            </ul>
          </div>

          {/* Popular Cities */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Popular Cities</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/hotels?city=addis-ababa" className="text-gray-400 hover:text-white">Addis Ababa</Link></li>
              <li><Link href="/hotels?city=bahir-dar" className="text-gray-400 hover:text-white">Bahir Dar</Link></li>
              <li><Link href="/hotels?city=gondar" className="text-gray-400 hover:text-white">Gondar</Link></li>
              <li><Link href="/hotels?city=lalibela" className="text-gray-400 hover:text-white">Lalibela</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
            <div className="space-y-3 text-sm text-gray-400">
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4" />
                <span>+251 11 123 4567</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4" />
                <span>info@ethiopiahotels.com</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="w-4 h-4" />
                <span>Addis Ababa, Ethiopia</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
          <p>&copy; {new Date().getFullYear()} Ethiopia Hotels. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}