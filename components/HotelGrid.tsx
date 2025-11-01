import Link from 'next/link'
import { Star, MapPin, Wifi, Car, Coffee } from 'lucide-react'
import { formatCurrency } from '@/lib/utils'
import type { Hotel } from '@/types'

export default function HotelGrid({ hotels }: { hotels: Hotel[] }) {
  if (!hotels || hotels.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600">No hotels found matching your criteria.</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {hotels.map((hotel) => (
        <Link key={hotel.id} href={`/hotels/${hotel.slug}`}>
          <div className="card flex flex-col md:flex-row hover:shadow-lg transition-shadow duration-200">
            {/* Image */}
            <div className="md:w-1/3 h-48 md:h-auto bg-gray-200">
              {hotel.metadata?.featured_image && (
                <img
                  src={`${hotel.metadata.featured_image.imgix_url}?w=600&h=400&fit=crop&auto=format,compress`}
                  alt={hotel.title}
                  className="w-full h-full object-cover rounded-l-lg"
                  width={200}
                  height={150}
                />
              )}
            </div>

            {/* Content */}
            <div className="flex-1 p-4">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-semibold text-lg">{hotel.title}</h3>
                <span className="bg-primary-100 text-primary-700 text-xs px-2 py-1 rounded">
                  {hotel.metadata?.category || 'Hotel'}
                </span>
              </div>

              {/* Location */}
              <div className="flex items-center text-gray-600 text-sm mb-2">
                <MapPin className="w-4 h-4 mr-1" />
                <span>{hotel.metadata?.city?.title || 'Ethiopia'}</span>
              </div>

              {/* Rating */}
              <div className="flex items-center mb-3">
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < (hotel.metadata?.rating || 0)
                          ? 'fill-current'
                          : 'fill-none'
                      }`}
                    />
                  ))}
                </div>
                <span className="ml-2 text-sm text-gray-600">
                  ({hotel.metadata?.rating || 0})
                </span>
              </div>

              {/* Amenities */}
              <div className="flex space-x-3 mb-4">
                <Wifi className="w-4 h-4 text-gray-400" />
                <Car className="w-4 h-4 text-gray-400" />
                <Coffee className="w-4 h-4 text-gray-400" />
              </div>

              {/* Price */}
              <div className="flex justify-between items-center">
                <div>
                  <span className="text-gray-600 text-sm">From</span>
                  <div className="font-bold text-lg">
                    {formatCurrency(hotel.metadata?.price_etb || 2000, 'ETB')}
                  </div>
                  <span className="text-gray-500 text-xs">
                    {formatCurrency(hotel.metadata?.price_usd || 36, 'USD')}
                  </span>
                </div>
                <span className="text-primary-600 hover:underline">
                  View Details →
                </span>
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  )
}