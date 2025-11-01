// Base Cosmic object interface
export interface CosmicObject {
  id: string;
  slug: string;
  title: string;
  content?: string;
  metadata: Record<string, any>;
  type: string;
  created_at: string;
  modified_at: string;
}

// Hotel type
export interface Hotel extends CosmicObject {
  type: 'hotels';
  metadata: {
    description?: string;
    featured_image?: {
      url: string;
      imgix_url: string;
    };
    gallery?: Array<{
      url: string;
      imgix_url: string;
    }>;
    city?: City;
    region?: Region;
    category?: 'business' | 'resort' | 'lodge' | 'traditional';
    amenities?: string[];
    rating?: number;
    price_range?: 'budget' | 'mid-range' | 'luxury';
    address?: string;
    phone?: string;
    email?: string;
    website?: string;
    latitude?: number;
    longitude?: number;
    check_in_time?: string;
    check_out_time?: string;
    policies?: string;
    featured?: boolean;
    status?: 'active' | 'inactive';
  };
}

// Room type
export interface Room extends CosmicObject {
  type: 'rooms';
  metadata: {
    hotel?: Hotel;
    room_type?: string;
    description?: string;
    max_occupancy?: number;
    bed_type?: string;
    size_sqm?: number;
    price_etb?: number;
    price_usd?: number;
    amenities?: string[];
    featured_image?: {
      url: string;
      imgix_url: string;
    };
    availability?: boolean;
    status?: 'available' | 'occupied' | 'maintenance';
  };
}

// Booking type
export interface Booking extends CosmicObject {
  type: 'bookings';
  metadata: {
    booking_id?: string;
    user?: User;
    hotel?: Hotel;
    room?: Room;
    check_in?: string;
    check_out?: string;
    guests?: number;
    total_price_etb?: number;
    total_price_usd?: number;
    payment_method?: string;
    payment_status?: 'pending' | 'completed' | 'failed' | 'refunded';
    booking_status?: 'confirmed' | 'pending' | 'cancelled';
    special_requests?: string;
    guest_info?: {
      first_name: string;
      last_name: string;
      email: string;
      phone: string;
      nationality: string;
    };
    created_at?: string;
  };
}

// Review type
export interface Review extends CosmicObject {
  type: 'reviews';
  metadata: {
    hotel?: Hotel;
    user?: User;
    rating?: number;
    title?: string;
    comment?: string;
    photos?: Array<{
      url: string;
      imgix_url: string;
    }>;
    status?: 'pending' | 'approved' | 'rejected';
    helpful_count?: number;
    created_at?: string;
  };
}

// User type
export interface User extends CosmicObject {
  type: 'users';
  metadata: {
    email?: string;
    password?: string;
    first_name?: string;
    last_name?: string;
    phone?: string;
    profile_photo?: {
      url: string;
      imgix_url: string;
    };
    nationality?: string;
    preferred_language?: 'en' | 'am' | 'om' | 'ti';
    preferred_currency?: 'ETB' | 'USD';
    role?: 'customer' | 'admin';
    verified?: boolean;
    favorites?: Hotel[];
    created_at?: string;
  };
}

// City type
export interface City extends CosmicObject {
  type: 'cities';
  metadata: {
    region?: Region;
    population?: number;
    description?: string;
    featured_image?: {
      url: string;
      imgix_url: string;
    };
    attractions?: string[];
    airport_code?: string;
    latitude?: number;
    longitude?: number;
  };
}

// Region type
export interface Region extends CosmicObject {
  type: 'regions';
  metadata: {
    description?: string;
    capital?: string;
    area_sqkm?: number;
    population?: number;
  };
}

// Translation type
export interface Translation extends CosmicObject {
  type: 'translations';
  metadata: {
    key?: string;
    en?: string;
    am?: string;
    om?: string;
    ti?: string;
  };
}

// API response types
export interface CosmicResponse<T> {
  objects: T[];
  total: number;
  limit: number;
  skip: number;
}

// Form types
export interface SearchFilters {
  city?: string;
  region?: string;
  category?: string;
  priceRange?: string;
  rating?: number;
  checkIn?: string;
  checkOut?: string;
  guests?: number;
}

export interface BookingFormData {
  hotelId: string;
  roomId: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  nationality: string;
  specialRequests?: string;
  paymentMethod: string;
}

// Helper type for Ethiopian calendar
export interface EthiopianDate {
  year: number;
  month: number;
  day: number;
  monthName: string;
}

// Type guards
export function isHotel(obj: CosmicObject): obj is Hotel {
  return obj.type === 'hotels';
}

export function isBooking(obj: CosmicObject): obj is Booking {
  return obj.type === 'bookings';
}

export function isUser(obj: CosmicObject): obj is User {
  return obj.type === 'users';
}

// Simple error helper for Cosmic SDK
export function hasStatus(error: unknown): error is { status: number } {
  return typeof error === 'object' && error !== null && 'status' in error;
}