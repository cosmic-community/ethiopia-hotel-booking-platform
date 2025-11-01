import { Bed, Users, Square, Check } from 'lucide-react'
import { formatCurrency } from '@/lib/utils'
import type { Room } from '@/types'

export default function RoomList({ rooms }: { rooms: Room[] }) {
  if (!rooms || rooms.length === 0) {
    return (
      <div className="card p-6">
        <p className="text-gray-600">No rooms available at this time.</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold">Available Rooms</h2>
      
      {rooms.map((room) => (
        <div key={room.id} className="card p-4 hover:shadow-lg transition-shadow">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Room Image */}
            <div className="md:w-1/3">
              {room.metadata?.featured_image ? (
                <img
                  src={`${room.metadata.featured_image.imgix_url}?w=600&h=400&fit=crop&auto=format,compress`}
                  alt={room.title}
                  className="w-full h-48 object-cover rounded-lg"
                  width={200}
                  height={150}
                />
              ) : (
                <div className="w-full h-48 bg-gray-200 rounded-lg flex items-center justify-center">
                  <Bed className="w-12 h-12 text-gray-400" />
                </div>
              )}
            </div>

            {/* Room Details */}
            <div className="flex-1 space-y-3">
              <h3 className="text-lg font-semibold">{room.title}</h3>
              
              <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                <div className="flex items-center">
                  <Users className="w-4 h-4 mr-1" />
                  <span>Max {room.metadata?.max_occupancy || 2} guests</span>
                </div>
                <div className="flex items-center">
                  <Bed className="w-4 h-4 mr-1" />
                  <span>{room.metadata?.bed_type || 'Queen bed'}</span>
                </div>
                <div className="flex items-center">
                  <Square className="w-4 h-4 mr-1" />
                  <span>{room.metadata?.size_sqm || 25} sqm</span>
                </div>
              </div>

              <p className="text-gray-600 text-sm">
                {room.metadata?.description || 'Comfortable room with modern amenities.'}
              </p>

              {/* Amenities */}
              {room.metadata?.amenities && room.metadata.amenities.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {room.metadata.amenities.slice(0, 5).map((amenity, index) => (
                    <span key={index} className="flex items-center text-xs text-gray-600 bg-gray-100 px-2 py-1 rounded">
                      <Check className="w-3 h-3 mr-1" />
                      {amenity}
                    </span>
                  ))}
                </div>
              )}

              {/* Price and Availability */}
              <div className="flex justify-between items-end">
                <div>
                  <div className="text-2xl font-bold">
                    {formatCurrency(room.metadata?.price_etb || 2500, 'ETB')}
                  </div>
                  <div className="text-sm text-gray-500">
                    {formatCurrency(room.metadata?.price_usd || 45, 'USD')} / night
                  </div>
                </div>
                
                <button className={`btn ${room.metadata?.availability ? 'btn-primary' : 'btn-secondary cursor-not-allowed'} px-6 py-2`} disabled={!room.metadata?.availability}>
                  {room.metadata?.availability ? 'Select Room' : 'Not Available'}
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}