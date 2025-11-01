import HeroSection from '@/components/HeroSection'
import FeaturedHotels from '@/components/FeaturedHotels'
import PopularDestinations from '@/components/PopularDestinations'
import SearchSection from '@/components/SearchSection'
import { getHotels, getCities } from '@/lib/cosmic'

export default async function HomePage() {
  // Fetch featured hotels and popular cities
  const [featuredHotels, cities] = await Promise.all([
    getHotels({ featured: true }),
    getCities()
  ])

  return (
    <div>
      <HeroSection />
      <SearchSection cities={cities} />
      <FeaturedHotels hotels={featuredHotels.slice(0, 6)} />
      <PopularDestinations cities={cities.slice(0, 8)} />
    </div>
  )
}