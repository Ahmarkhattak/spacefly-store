import Link from 'next/link';
import ProductCard from '@/components/ProductCard';

async function getProducts() {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';
    const res = await fetch(`${baseUrl}/api/products`, {
      cache: 'no-store',
    });
    
    if (!res.ok) {
      return [];
    }
    
    return await res.json();
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
}

export default async function Home() {
  const products = await getProducts();
  
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section - SpaceFly Theme */}
      <section className="relative bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white py-20 overflow-hidden">
        {/* Background Animation */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 text-8xl animate-bounce">🚀</div>
          <div className="absolute bottom-10 right-10 text-8xl animate-bounce delay-100">🌟</div>
          <div className="absolute top-1/2 left-1/2 text-9xl animate-pulse">✨</div>
        </div>
        
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="flex justify-center mb-6">
            <span className="text-7xl animate-pulse">🚀</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-4">
            Welcome to <span className="bg-gradient-to-r from-yellow-400 to-pink-400 bg-clip-text text-transparent">SpaceFly</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-gray-200">
            Your premium destination for out-of-this-world products! 🌟
          </p>
          <Link 
            href="/products" 
            className="inline-block bg-white text-purple-600 px-8 py-4 rounded-full font-semibold hover:bg-gray-100 transition transform hover:scale-105 shadow-xl"
          >
            🛍️ Explore Collection
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-5xl mb-4">🚚</div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Free Delivery</h3>
              <p className="text-gray-600">On orders above Rs. 1000</p>
            </div>
            <div className="text-center">
              <div className="text-5xl mb-4">🔄</div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Easy Returns</h3>
              <p className="text-gray-600">30-day return policy</p>
            </div>
            <div className="text-center">
              <div className="text-5xl mb-4">💎</div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Premium Quality</h3>
              <p className="text-gray-600">Curated products just for you</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="container mx-auto px-4 py-16">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-800">🌟 Featured Products</h2>
            <p className="text-gray-500">Handpicked just for you</p>
          </div>
          <Link 
            href="/products" 
            className="text-purple-600 hover:text-purple-700 font-semibold flex items-center gap-2"
          >
            View All →
          </Link>
        </div>
        
        {products.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No products found.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.slice(0, 4).map((product: any) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
