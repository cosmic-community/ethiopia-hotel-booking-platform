'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Search, Calendar, Users, MapPin } from 'lucide-react'
import { buildQueryString } from '@/lib/utils'
import type { City } from '@/types'

export default function SearchSection({ cities }: { cities: City[] }) {
  const router = useRouter()
  const [searchData, setSearchData] = useState({
    city: '',
    checkIn: '',
    checkOut: '',
    guests: 1
  })

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    const queryString = buildQueryString(searchData)
    router.push(`/hotels?${queryString}`)
  }

  return (
    <div className="bg-gray-50 py-8">
      <div className="container">
        <form onSubmit={handleSearch} className="bg-white rounded-lg shadow-md p-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* City */}
            <div>
              <label className="label mb-2 block">Where are you going?</label>
              <div className="relative">
                <MapPin className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                <select
                  className="input pl-10"
                  value={searchData.city}
                  onChange={(e) => setSearchData({ ...searchData, city: e.target.value })}
                >
                  <option value="">All Cities</option>
                  {cities.map((city) => (
                    <option key={city.id} value={city.slug}>
                      {city.title}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Check-in */}
            <div>
              <label className="label mb-2 block">Check-in</label>
              <div className="relative">
                <Calendar className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                <input
                  type="date"
                  className="input pl-10"
                  value={searchData.checkIn}
                  onChange={(e) => setSearchData({ ...searchData, checkIn: e.target.value })}
                />
              </div>
            </div>

            {/* Check-out */}
            <div>
              <label className="label mb-2 block">Check-out</label>
              <div className="relative">
                <Calendar className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                <input
                  type="date"
                  className="input pl-10"
                  value={searchData.checkOut}
                  onChange={(e) => setSearchData({ ...searchData, checkOut: e.target.value })}
                />
              </div>
            </div>

            {/* Guests */}
            <div>
              <label className="label mb-2 block">Guests</label>
              <div className="relative">
                <Users className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                <input
                  type="number"
                  min="1"
                  max="10"
                  className="input pl-10"
                  value={searchData.guests}
                  onChange={(e) => setSearchData({ ...searchData, guests: Number(e.target.value) })}
                />
              </div>
            </div>
          </div>

          <button type="submit" className="btn-primary w-full mt-4 py-3">
            <Search className="w-5 h-5 mr-2" />
            Search Hotels
          </button>
        </form>
      </div>
    </div>
  )
}