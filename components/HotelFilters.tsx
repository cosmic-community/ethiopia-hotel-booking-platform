'use client'

import { useRouter } from 'next/navigation'
import { buildQueryString } from '@/lib/utils'
import type { City, Region, SearchFilters } from '@/types'

interface HotelFiltersProps {
  cities: City[]
  regions: Region[]
  currentFilters: SearchFilters
}

export default function HotelFilters({ cities, regions, currentFilters }: HotelFiltersProps) {
  const router = useRouter()

  const updateFilters = (newFilters: Partial<SearchFilters>) => {
    const updatedFilters = { ...currentFilters, ...newFilters }
    const queryString = buildQueryString(updatedFilters)
    router.push(`/hotels?${queryString}`)
  }

  return (
    <div className="card p-4 space-y-6">
      <h3 className="font-semibold text-lg">Filters</h3>

      {/* City */}
      <div>
        <label className="label mb-2 block">City</label>
        <select
          className="input"
          value={currentFilters.city || ''}
          onChange={(e) => updateFilters({ city: e.target.value })}
        >
          <option value="">All Cities</option>
          {cities.map((city) => (
            <option key={city.id} value={city.slug}>
              {city.title}
            </option>
          ))}
        </select>
      </div>

      {/* Region */}
      <div>
        <label className="label mb-2 block">Region</label>
        <select
          className="input"
          value={currentFilters.region || ''}
          onChange={(e) => updateFilters({ region: e.target.value })}
        >
          <option value="">All Regions</option>
          {regions.map((region) => (
            <option key={region.id} value={region.slug}>
              {region.title}
            </option>
          ))}
        </select>
      </div>

      {/* Category */}
      <div>
        <label className="label mb-2 block">Category</label>
        <select
          className="input"
          value={currentFilters.category || ''}
          onChange={(e) => updateFilters({ category: e.target.value })}
        >
          <option value="">All Categories</option>
          <option value="business">Business Hotels</option>
          <option value="resort">Resorts</option>
          <option value="lodge">Lodges</option>
          <option value="traditional">Traditional</option>
        </select>
      </div>

      {/* Price Range */}
      <div>
        <label className="label mb-2 block">Price Range</label>
        <select
          className="input"
          value={currentFilters.priceRange || ''}
          onChange={(e) => updateFilters({ priceRange: e.target.value })}
        >
          <option value="">Any Price</option>
          <option value="budget">Budget (Under 2000 ETB)</option>
          <option value="mid-range">Mid-Range (2000-5000 ETB)</option>
          <option value="luxury">Luxury (5000+ ETB)</option>
        </select>
      </div>

      {/* Rating */}
      <div>
        <label className="label mb-2 block">Minimum Rating</label>
        <select
          className="input"
          value={currentFilters.rating || ''}
          onChange={(e) => updateFilters({ rating: Number(e.target.value) })}
        >
          <option value="">Any Rating</option>
          <option value="3">3+ Stars</option>
          <option value="4">4+ Stars</option>
          <option value="5">5 Stars</option>
        </select>
      </div>

      {/* Clear Filters */}
      <button
        onClick={() => router.push('/hotels')}
        className="btn-secondary w-full py-2"
      >
        Clear All Filters
      </button>
    </div>
  )
}