import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { Toaster } from 'react-hot-toast'
import CosmicBadge from '@/components/CosmicBadge'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Ethiopia Hotel Booking - Find & Book Hotels Across Ethiopia',
  description: 'Discover and book hotels across Ethiopia. From Addis Ababa to Lalibela, find the perfect accommodation with local payment options and multi-language support.',
  keywords: 'Ethiopia hotels, hotel booking, Addis Ababa hotels, Ethiopian accommodation, travel Ethiopia',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const bucketSlug = process.env.COSMIC_BUCKET_SLUG as string

  return (
    <html lang="en">
      <head>
        <script src="/dashboard-console-capture.js"></script>
      </head>
      <body className={inter.className}>
        <div className="min-h-screen flex flex-col">
          <Header />
          <main className="flex-1">
            {children}
          </main>
          <Footer />
        </div>
        <Toaster position="top-right" />
        <CosmicBadge bucketSlug={bucketSlug} />
      </body>
    </html>
  )
}