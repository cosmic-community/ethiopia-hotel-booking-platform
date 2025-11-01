# Ethiopia Hotel Booking Platform

![Ethiopia Hotel Booking Platform](https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200&h=300&fit=crop&auto=format,compress)

A comprehensive hotel booking platform tailored for the Ethiopian market, featuring multi-language support, local payment integration, and optimized performance for varying connectivity conditions.

## ✨ Features

- **Multi-Language Support**: Full support for English, Amharic, Oromo, and Tigrinya
- **Local Payment Integration**: Support for CBE, Dashen, Awash, Abyssinia banks, Telebirr, and CBE Birr
- **International Payment Support**: Visa, MasterCard, PayPal, and Stripe integration
- **Ethiopian Calendar**: Native Ethiopian calendar support with holiday integration
- **Advanced Search**: Filter by cities, regions, landmarks, and hotel categories
- **Real-Time Booking**: Live availability checking and instant booking confirmation
- **Review System**: Customer reviews with photo uploads and admin moderation
- **Dual Currency**: ETB and USD pricing with automatic conversion
- **Offline Support**: View saved bookings and hotel information offline
- **Admin Dashboard**: Complete hotel and booking management system

## Clone this Project

Want to create your own version of this project with all the content and structure? Clone this Cosmic bucket and code repository to get started instantly:

[![Clone this Project](https://img.shields.io/badge/Clone%20this%20Project-29abe2?style=for-the-badge&logo=cosmic&logoColor=white)](https://app.cosmicjs.com/projects/new?clone_bucket=6905f7dd271316ad9f4cfef3&clone_repository=6905fa50271316ad9f4cff05)

## Prompts

This application was built using the following prompts to generate the content structure and code:

### Content Model Prompt

> No content model prompt provided - app built from existing content structure

### Code Generation Prompt

> Develop a comprehensive Android application and web-based admin panel for booking hotels across Ethiopia, connecting both Ethiopian and international travelers with hotels nationwide. The platform must ensure seamless hotel discovery, booking, and payment—optimized for Ethiopia's unique infrastructure, local payment systems, multi-language needs, and connectivity challenges.

The app has been tailored to work with your existing Cosmic content structure and includes all the features requested above.

## 🚀 Technologies

- **Frontend**: Next.js 16, React 19, TypeScript
- **Styling**: Tailwind CSS
- **CMS**: Cosmic
- **Database**: Cosmic Objects API
- **Authentication**: JWT tokens
- **Payment Processing**: Stripe, PayPal (configured via environment variables)
- **Maps**: Leaflet for hotel location display
- **State Management**: React Context API
- **Form Handling**: React Hook Form
- **Date Handling**: Ethiopian calendar utilities

## 📦 Getting Started

### Prerequisites

- Node.js 18+ and Bun
- Cosmic account with bucket configured
- Payment gateway accounts (Stripe, PayPal, etc.)

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd ethiopia-hotel-booking
```

2. Install dependencies:
```bash
bun install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
```

4. Configure your environment variables:
```env
COSMIC_BUCKET_SLUG=your-bucket-slug
COSMIC_READ_KEY=your-read-key
COSMIC_WRITE_KEY=your-write-key
STRIPE_SECRET_KEY=your-stripe-key
PAYPAL_CLIENT_SECRET=your-paypal-secret
JWT_SECRET=your-jwt-secret
```

5. Run the development server:
```bash
bun run dev
```

6. Open [http://localhost:3000](http://localhost:3000)

## 📚 Cosmic SDK Examples

### Fetching Hotels
```typescript
const hotels = await cosmic.objects
  .find({ type: 'hotels' })
  .props(['title', 'slug', 'metadata'])
  .depth(1)
```

### Creating a Booking
```typescript
await cosmic.objects.insertOne({
  title: 'Booking for John Doe',
  type: 'bookings',
  metadata: {
    hotel: hotelId,
    check_in: checkInDate,
    check_out: checkOutDate,
    total_price: totalPrice
  }
})
```

## 🌐 Cosmic CMS Integration

This application leverages Cosmic as a headless CMS for:

- **Hotels**: Complete hotel information including amenities, location, and pricing
- **Rooms**: Room types, availability, and pricing structure
- **Bookings**: Booking records with customer and payment information
- **Reviews**: Customer reviews and ratings with moderation
- **Users**: Customer and admin user management
- **Cities**: Ethiopian cities and regions for location-based search
- **Translations**: Multi-language content management

## 🚀 Deployment

### Vercel (Recommended)
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

### Netlify
[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start)

### Environment Variables
Ensure all required environment variables are configured in your deployment platform:
- `COSMIC_BUCKET_SLUG`
- `COSMIC_READ_KEY`
- `COSMIC_WRITE_KEY`
- `STRIPE_SECRET_KEY`
- `PAYPAL_CLIENT_SECRET`
- `JWT_SECRET`

## 📱 Mobile App Considerations

While this implementation is a web-based solution optimized for mobile browsers, it provides:
- Progressive Web App capabilities
- Mobile-responsive design
- Touch-optimized interfaces
- Offline functionality
- Native app-like experience

For a native Android application, consider wrapping this web app using:
- Capacitor
- React Native WebView
- PWA to APK converters

## 🔐 Security

- JWT-based authentication
- Secure payment processing
- Input validation and sanitization
- HTTPS enforcement
- Rate limiting on API endpoints
- Secure session management

## 📄 License

MIT License - feel free to use this project for your own purposes.

<!-- README_END -->