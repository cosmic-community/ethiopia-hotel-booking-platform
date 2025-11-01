import { getHotels, getCities, getRegions } from '@/lib/cosmic'
import HotelGrid from '@/components/HotelGrid'
import HotelFilters from '@/components/HotelFilters'
import type { SearchFilters } from '@/types'

export default async function HotelsPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const params = await searchParams
  
  // Parse filters from search params
  const filters: SearchFilters = {
    city: params.city as string,
    region: params.region as string,
    category: params.category as string,
    priceRange: params.priceRange as string,
    rating: params.rating ? Number(params.rating) : undefined,
    checkIn: params.checkIn as string,
    checkOut: params.checkOut as string,
    guests: params.guests ? Number(params.guests) : undefined,
  }

  // Fetch data
  const [hotels, cities, regions] = await Promise.all([
    getHotels(filters),
    getCities(),
    getRegions()
  ])

  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold mb-8">Hotels in Ethiopia</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-1">
          <HotelFilters cities={cities} regions={regions} currentFilters={filters} />
        </div>
        
        <div className="lg:col-span-3">
          <div className="mb-4 text-sm text-gray-600">
            Found {hotels.length} hotels
          </div>
          <HotelGrid hotels={hotels} />
        </div>
      </div>
    </div>
  )
}