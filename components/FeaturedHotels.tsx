import Link from 'next/link'
import { Star, MapPin } from 'lucide-react'
import { formatCurrency } from '@/lib/utils'
import type { Hotel } from '@/types'

export default function FeaturedHotels({ hotels }: { hotels: Hotel[] }) {
  if (!hotels || hotels.length === 0) {
    return null
  }

  return (
    <section className="py-12">
      <div className="container">
        <h2 className="text-3xl font-bold mb-8">Featured Hotels</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {hotels.map((hotel) => (
            <Link key={hotel.id} href={`/hotels/${hotel.slug}`}>
              <div className="card hover:shadow-lg transition-shadow duration-200">
                {/* Image */}
                <div className="relative h-48 bg-gray-200">
                  {hotel.metadata?.featured_image && (
                    <img
                      src={`${hotel.metadata.featured_image.imgix_url}?w=600&h=400&fit=crop&auto=format,compress`}
                      alt={hotel.title}
                      className="w-full h-full object-cover rounded-t-lg"
                      width={300}
                      height={200}
                    />
                  )}
                  {hotel.metadata?.featured && (
                    <span className="absolute top-2 left-2 bg-primary-600 text-white text-xs px-2 py-1 rounded">
                      Featured
                    </span>
                  )}
                </div>

                {/* Content */}
                <div className="p-4">
                  <h3 className="font-semibold text-lg mb-2">{hotel.title}</h3>
                  
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

                  {/* Price */}
                  <div className="flex justify-between items-center">
                    <div>
                      <span className="text-gray-600 text-sm">From</span>
                      <div className="font-bold text-lg">
                        {formatCurrency(hotel.metadata?.price_etb || 2000, 'ETB')}
                      </div>
                    </div>
                    <span className="text-primary-600 text-sm hover:underline">
                      View Details →
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center mt-8">
          <Link href="/hotels" className="btn-primary px-8 py-3">
            View All Hotels
          </Link>
        </div>
      </div>
    </section>
  )
}