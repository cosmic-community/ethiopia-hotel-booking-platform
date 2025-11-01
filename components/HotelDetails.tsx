import { MapPin, Phone, Mail, Globe, Star, Wifi, Car, Coffee, Utensils } from 'lucide-react'
import { formatCurrency } from '@/lib/utils'
import type { Hotel } from '@/types'

export default function HotelDetails({ hotel }: { hotel: Hotel }) {
  const amenityIcons: Record<string, any> = {
    'wifi': Wifi,
    'parking': Car,
    'restaurant': Utensils,
    'coffee': Coffee,
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <div className="flex justify-between items-start mb-2">
          <h1 className="text-3xl font-bold">{hotel.title}</h1>
          <span className="bg-primary-100 text-primary-700 px-3 py-1 rounded">
            {hotel.metadata?.category || 'Hotel'}
          </span>
        </div>
        
        <div className="flex items-center text-gray-600 mb-2">
          <MapPin className="w-5 h-5 mr-2" />
          <span>{hotel.metadata?.address || hotel.metadata?.city?.title || 'Ethiopia'}</span>
        </div>

        <div className="flex items-center">
          <div className="flex text-yellow-400 mr-2">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-5 h-5 ${
                  i < (hotel.metadata?.rating || 0) ? 'fill-current' : 'fill-none'
                }`}
              />
            ))}
          </div>
          <span className="text-gray-600">({hotel.metadata?.rating || 0} stars)</span>
        </div>
      </div>

      {/* Gallery */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {hotel.metadata?.featured_image && (
          <div className="md:col-span-2 h-96">
            <img
              src={`${hotel.metadata.featured_image.imgix_url}?w=1600&h=800&fit=crop&auto=format,compress`}
              alt={hotel.title}
              className="w-full h-full object-cover rounded-lg"
              width={800}
              height={400}
            />
          </div>
        )}
        
        {hotel.metadata?.gallery && hotel.metadata.gallery.length > 0 && (
          <div className="grid grid-cols-1 gap-4">
            {hotel.metadata.gallery.slice(0, 2).map((image, index) => (
              <div key={index} className="h-44">
                <img
                  src={`${image.imgix_url}?w=600&h=400&fit=crop&auto=format,compress`}
                  alt={`${hotel.title} ${index + 1}`}
                  className="w-full h-full object-cover rounded-lg"
                  width={300}
                  height={200}
                />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Description */}
      <div className="card p-6">
        <h2 className="text-xl font-semibold mb-4">About {hotel.title}</h2>
        <p className="text-gray-600 leading-relaxed">
          {hotel.metadata?.description || 'Experience comfortable accommodation and excellent service at our hotel.'}
        </p>
      </div>

      {/* Amenities */}
      <div className="card p-6">
        <h2 className="text-xl font-semibold mb-4">Amenities</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {hotel.metadata?.amenities?.map((amenity, index) => {
            const Icon = amenityIcons[amenity.toLowerCase()] || Coffee
            return (
              <div key={index} className="flex items-center text-gray-600">
                <Icon className="w-5 h-5 mr-2" />
                <span className="capitalize">{amenity}</span>
              </div>
            )
          })}
        </div>
      </div>

      {/* Hotel Policies */}
      <div className="card p-6">
        <h2 className="text-xl font-semibold mb-4">Hotel Policies</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
          <div>
            <strong>Check-in:</strong> {hotel.metadata?.check_in_time || '2:00 PM'}
          </div>
          <div>
            <strong>Check-out:</strong> {hotel.metadata?.check_out_time || '12:00 PM'}
          </div>
        </div>
        {hotel.metadata?.policies && (
          <p className="mt-4 text-sm text-gray-600">{hotel.metadata.policies}</p>
        )}
      </div>

      {/* Contact Information */}
      <div className="card p-6">
        <h2 className="text-xl font-semibold mb-4">Contact Information</h2>
        <div className="space-y-2 text-gray-600">
          {hotel.metadata?.phone && (
            <div className="flex items-center">
              <Phone className="w-5 h-5 mr-2" />
              <span>{hotel.metadata.phone}</span>
            </div>
          )}
          {hotel.metadata?.email && (
            <div className="flex items-center">
              <Mail className="w-5 h-5 mr-2" />
              <span>{hotel.metadata.email}</span>
            </div>
          )}
          {hotel.metadata?.website && (
            <div className="flex items-center">
              <Globe className="w-5 h-5 mr-2" />
              <a href={hotel.metadata.website} target="_blank" rel="noopener noreferrer" className="text-primary-600 hover:underline">
                {hotel.metadata.website}
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}