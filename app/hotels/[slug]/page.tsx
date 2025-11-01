// app/hotels/[slug]/page.tsx
import { getHotel, getHotelRooms, getHotelReviews } from '@/lib/cosmic'
import HotelDetails from '@/components/HotelDetails'
import RoomList from '@/components/RoomList'
import ReviewSection from '@/components/ReviewSection'
import BookingForm from '@/components/BookingForm'
import { notFound } from 'next/navigation'

export default async function HotelPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  
  // Fetch hotel data
  const hotel = await getHotel(slug)
  
  if (!hotel) {
    notFound()
  }

  // Fetch rooms and reviews
  const [rooms, reviews] = await Promise.all([
    getHotelRooms(hotel.id),
    getHotelReviews(hotel.id)
  ])

  return (
    <div className="container py-8">
      <HotelDetails hotel={hotel} />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
        <div className="lg:col-span-2 space-y-8">
          <RoomList rooms={rooms} />
          <ReviewSection reviews={reviews} hotelId={hotel.id} />
        </div>
        
        <div className="lg:col-span-1">
          <div className="sticky top-4">
            <BookingForm hotel={hotel} rooms={rooms} />
          </div>
        </div>
      </div>
    </div>
  )
}