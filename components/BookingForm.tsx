'use client'

import { useState } from 'react'
import { Calendar, Users } from 'lucide-react'
import { formatCurrency, calculateNights } from '@/lib/utils'
import type { Hotel, Room } from '@/types'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'

export default function BookingForm({ hotel, rooms }: { hotel: Hotel, rooms: Room[] }) {
  const router = useRouter()
  const [bookingData, setBookingData] = useState({
    checkIn: '',
    checkOut: '',
    guests: 1,
    roomId: ''
  })

  const selectedRoom = rooms.find(r => r.id === bookingData.roomId)
  const nights = bookingData.checkIn && bookingData.checkOut 
    ? calculateNights(bookingData.checkIn, bookingData.checkOut)
    : 0
  const totalPrice = selectedRoom && nights 
    ? (selectedRoom.metadata?.price_etb || 0) * nights
    : 0

  const handleBooking = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!selectedRoom) {
      toast.error('Please select a room')
      return
    }

    // In a real app, this would redirect to checkout
    toast.success('Redirecting to checkout...')
    // router.push('/checkout')
  }

  return (
    <form onSubmit={handleBooking} className="card p-6 space-y-4">
      <h3 className="text-xl font-semibold">Book Your Stay</h3>

      {/* Check-in */}
      <div>
        <label className="label mb-2 block">Check-in</label>
        <div className="relative">
          <Calendar className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
          <input
            type="date"
            className="input pl-10"
            value={bookingData.checkIn}
            onChange={(e) => setBookingData({ ...bookingData, checkIn: e.target.value })}
            min={new Date().toISOString().split('T')[0]}
            required
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
            value={bookingData.checkOut}
            onChange={(e) => setBookingData({ ...bookingData, checkOut: e.target.value })}
            min={bookingData.checkIn || new Date().toISOString().split('T')[0]}
            required
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
            value={bookingData.guests}
            onChange={(e) => setBookingData({ ...bookingData, guests: Number(e.target.value) })}
            required
          />
        </div>
      </div>

      {/* Room Selection */}
      <div>
        <label className="label mb-2 block">Select Room</label>
        <select
          className="input"
          value={bookingData.roomId}
          onChange={(e) => setBookingData({ ...bookingData, roomId: e.target.value })}
          required
        >
          <option value="">Choose a room</option>
          {rooms.filter(r => r.metadata?.availability).map((room) => (
            <option key={room.id} value={room.id}>
              {room.title} - {formatCurrency(room.metadata?.price_etb || 0, 'ETB')}
            </option>
          ))}
        </select>
      </div>

      {/* Price Summary */}
      {selectedRoom && nights > 0 && (
        <div className="border-t pt-4 space-y-2">
          <div className="flex justify-between text-sm">
            <span>{formatCurrency(selectedRoom.metadata?.price_etb || 0, 'ETB')} × {nights} nights</span>
            <span>{formatCurrency(totalPrice, 'ETB')}</span>
          </div>
          <div className="flex justify-between font-semibold">
            <span>Total</span>
            <div>
              <div>{formatCurrency(totalPrice, 'ETB')}</div>
              <div className="text-sm text-gray-500">
                {formatCurrency(totalPrice * 0.018, 'USD')}
              </div>
            </div>
          </div>
        </div>
      )}

      <button type="submit" className="btn-primary w-full py-3">
        Book Now
      </button>
      
      <p className="text-xs text-center text-gray-600">
        Free cancellation up to 24 hours before check-in
      </p>
    </form>
  )
}