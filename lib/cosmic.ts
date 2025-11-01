import { createBucketClient } from '@cosmicjs/sdk'
import type { Hotel, Room, Booking, Review, User, City, Region, Translation, hasStatus } from '@/types'

export const cosmic = createBucketClient({
  bucketSlug: process.env.COSMIC_BUCKET_SLUG as string,
  readKey: process.env.COSMIC_READ_KEY as string,
  writeKey: process.env.COSMIC_WRITE_KEY as string,
})

// Hotel functions
export async function getHotels(filters?: Record<string, any>): Promise<Hotel[]> {
  try {
    const query: Record<string, any> = { type: 'hotels' }
    
    if (filters) {
      if (filters.city) query['metadata.city'] = filters.city
      if (filters.region) query['metadata.region'] = filters.region
      if (filters.category) query['metadata.category'] = filters.category
      if (filters.featured) query['metadata.featured'] = true
    }
    
    const response = await cosmic.objects
      .find(query)
      .props(['id', 'slug', 'title', 'metadata'])
      .depth(2)
    
    return response.objects as Hotel[]
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return []
    }
    throw new Error('Failed to fetch hotels')
  }
}

export async function getHotel(slug: string): Promise<Hotel | null> {
  try {
    const response = await cosmic.objects.findOne({
      type: 'hotels',
      slug
    }).depth(2)
    
    return response.object as Hotel
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return null
    }
    throw new Error('Failed to fetch hotel')
  }
}

// Room functions
export async function getHotelRooms(hotelId: string): Promise<Room[]> {
  try {
    const response = await cosmic.objects
      .find({ 
        type: 'rooms',
        'metadata.hotel': hotelId
      })
      .props(['id', 'slug', 'title', 'metadata'])
      .depth(1)
    
    return response.objects as Room[]
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return []
    }
    throw new Error('Failed to fetch rooms')
  }
}

// Booking functions
export async function createBooking(bookingData: Record<string, any>): Promise<Booking> {
  try {
    const bookingId = `BK${Date.now()}`
    
    const response = await cosmic.objects.insertOne({
      title: `Booking ${bookingId}`,
      type: 'bookings',
      metadata: {
        booking_id: bookingId,
        ...bookingData,
        created_at: new Date().toISOString()
      }
    })
    
    return response.object as Booking
  } catch (error) {
    console.error('Error creating booking:', error)
    throw new Error('Failed to create booking')
  }
}

export async function getUserBookings(userId: string): Promise<Booking[]> {
  try {
    const response = await cosmic.objects
      .find({
        type: 'bookings',
        'metadata.user': userId
      })
      .props(['id', 'slug', 'title', 'metadata'])
      .depth(2)
    
    // Sort by created_at manually since SDK v1.5+ doesn't support .sort()
    const bookings = response.objects as Booking[]
    return bookings.sort((a, b) => {
      const dateA = new Date(a.metadata?.created_at || '').getTime()
      const dateB = new Date(b.metadata?.created_at || '').getTime()
      return dateB - dateA
    })
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return []
    }
    throw new Error('Failed to fetch bookings')
  }
}

// Review functions
export async function getHotelReviews(hotelId: string): Promise<Review[]> {
  try {
    const response = await cosmic.objects
      .find({
        type: 'reviews',
        'metadata.hotel': hotelId,
        'metadata.status': 'approved'
      })
      .props(['id', 'slug', 'title', 'metadata'])
      .depth(1)
    
    // Sort by created_at manually
    const reviews = response.objects as Review[]
    return reviews.sort((a, b) => {
      const dateA = new Date(a.metadata?.created_at || '').getTime()
      const dateB = new Date(b.metadata?.created_at || '').getTime()
      return dateB - dateA
    })
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return []
    }
    throw new Error('Failed to fetch reviews')
  }
}

export async function createReview(reviewData: Record<string, any>): Promise<Review> {
  try {
    const response = await cosmic.objects.insertOne({
      title: `Review for ${reviewData.hotel_title}`,
      type: 'reviews',
      metadata: {
        ...reviewData,
        status: 'pending',
        helpful_count: 0,
        created_at: new Date().toISOString()
      }
    })
    
    return response.object as Review
  } catch (error) {
    console.error('Error creating review:', error)
    throw new Error('Failed to create review')
  }
}

// City and Region functions
export async function getCities(): Promise<City[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'cities' })
      .props(['id', 'slug', 'title', 'metadata'])
      .depth(1)
    
    return response.objects as City[]
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return []
    }
    throw new Error('Failed to fetch cities')
  }
}

export async function getRegions(): Promise<Region[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'regions' })
      .props(['id', 'slug', 'title', 'metadata'])
      .depth(1)
    
    return response.objects as Region[]
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return []
    }
    throw new Error('Failed to fetch regions')
  }
}

// Translation functions
export async function getTranslations(language: string = 'en'): Promise<Record<string, string>> {
  try {
    const response = await cosmic.objects
      .find({ type: 'translations' })
      .props(['metadata'])
      .depth(1)
    
    const translations: Record<string, string> = {}
    response.objects.forEach((t: any) => {
      if (t.metadata?.key && t.metadata?.[language]) {
        translations[t.metadata.key] = t.metadata[language]
      }
    })
    
    return translations
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return {}
    }
    throw new Error('Failed to fetch translations')
  }
}

// User functions
export async function getUserByEmail(email: string): Promise<User | null> {
  try {
    const response = await cosmic.objects.findOne({
      type: 'users',
      'metadata.email': email
    }).depth(1)
    
    return response.object as User
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return null
    }
    throw new Error('Failed to fetch user')
  }
}

export async function createUser(userData: Record<string, any>): Promise<User> {
  try {
    const response = await cosmic.objects.insertOne({
      title: `${userData.first_name} ${userData.last_name}`,
      type: 'users',
      metadata: {
        ...userData,
        role: 'customer',
        verified: false,
        favorites: [],
        created_at: new Date().toISOString()
      }
    })
    
    return response.object as User
  } catch (error) {
    console.error('Error creating user:', error)
    throw new Error('Failed to create user')
  }
}

export async function updateUser(userId: string, updates: Record<string, any>): Promise<User> {
  try {
    const response = await cosmic.objects.updateOne(userId, {
      metadata: updates
    })
    
    return response.object as User
  } catch (error) {
    console.error('Error updating user:', error)
    throw new Error('Failed to update user')
  }
}