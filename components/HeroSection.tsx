export default function HeroSection() {
  return (
    <div 
      className="relative h-[500px] bg-cover bg-center"
      style={{
        backgroundImage: 'url(https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?w=1920&h=500&fit=crop&auto=format,compress)'
      }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>
      <div className="relative container h-full flex items-center">
        <div className="text-white max-w-2xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Discover Ethiopia's Best Hotels
          </h1>
          <p className="text-xl mb-8">
            From the highlands of Lalibela to the bustling streets of Addis Ababa, 
            find your perfect stay with local payment options and multi-language support.
          </p>
          <div className="flex space-x-4">
            <span className="bg-white bg-opacity-20 backdrop-blur-sm px-4 py-2 rounded-md">
              ✓ Local Payment Methods
            </span>
            <span className="bg-white bg-opacity-20 backdrop-blur-sm px-4 py-2 rounded-md">
              ✓ አማርኛ Support
            </span>
            <span className="bg-white bg-opacity-20 backdrop-blur-sm px-4 py-2 rounded-md">
              ✓ Best Prices
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}