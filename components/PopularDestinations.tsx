import Link from 'next/link'
import { MapPin } from 'lucide-react'
import type { City } from '@/types'

export default function PopularDestinations({ cities }: { cities: City[] }) {
  if (!cities || cities.length === 0) {
    return null
  }

  return (
    <section className="py-12 bg-gray-50">
      <div className="container">
        <h2 className="text-3xl font-bold mb-8">Popular Destinations</h2>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {cities.map((city) => (
            <Link key={city.id} href={`/hotels?city=${city.slug}`}>
              <div className="relative h-32 rounded-lg overflow-hidden group cursor-pointer">
                {city.metadata?.featured_image ? (
                  <img
                    src={`${city.metadata.featured_image.imgix_url}?w=400&h=250&fit=crop&auto=format,compress`}
                    alt={city.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    width={200}
                    height={125}
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-primary-400 to-primary-600"></div>
                )}
                
                <div className="absolute inset-0 bg-black bg-opacity-40 group-hover:bg-opacity-50 transition-opacity"></div>
                
                <div className="absolute inset-0 flex flex-col justify-end p-4">
                  <h3 className="text-white font-semibold">{city.title}</h3>
                  <div className="flex items-center text-white text-sm opacity-90">
                    <MapPin className="w-3 h-3 mr-1" />
                    <span>{city.metadata?.region?.title || 'Ethiopia'}</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}