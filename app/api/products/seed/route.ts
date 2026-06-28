import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Product from '@/models/Product';

export async function GET() {
  try {
    await connectDB();
    
    // Check if products exist
    const count = await Product.countDocuments();
    if (count > 0) {
      return NextResponse.json({ 
        message: `✅ Already have ${count} products. Use /api/products/delete to delete first.` 
      });
    }

    // Sample products with REAL images
    const sampleProducts = [
      {
        name: 'iPhone 15 Pro',
        description: 'Latest Apple smartphone with titanium body',
        price: 299999,
        category: 'Electronics',
        stock: 10,
        image: 'https://images.unsplash.com/photo-1696446701796-da61225697cc?w=300&h=200&fit=crop',
        isActive: true,
      },
      {
        name: 'Samsung Galaxy S24',
        description: 'Premium Android smartphone with AI features',
        price: 249999,
        category: 'Electronics',
        stock: 8,
        image: 'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=300&h=200&fit=crop',
        isActive: true,
      },
      {
        name: "Men's Casual Shirt",
        description: 'Comfortable cotton shirt for everyday wear',
        price: 1499,
        category: 'Clothing',
        stock: 20,
        image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=300&h=200&fit=crop',
        isActive: true,
      },
      {
        name: "Women's Handbag",
        description: 'Elegant leather handbag for special occasions',
        price: 2999,
        category: 'Clothing',
        stock: 15,
        image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=300&h=200&fit=crop',
        isActive: true,
      },
      {
        name: 'Wireless Headphones',
        description: 'Noise-cancelling Bluetooth headphones',
        price: 8999,
        category: 'Electronics',
        stock: 12,
        image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=200&fit=crop',
        isActive: true,
      },
      {
        name: 'Home Decor Lamp',
        description: 'Modern LED lamp for home decoration',
        price: 2499,
        category: 'Home',
        stock: 7,
        image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=300&h=200&fit=crop',
        isActive: true,
      },
    ];

    const result = await Product.insertMany(sampleProducts);
    
    return NextResponse.json({ 
      success: true,
      message: `✅ ${result.length} sample products added successfully!`,
      products: result.map((p: any) => ({ 
        name: p.name, 
        category: p.category,
        image: p.image 
      }))
    });
    
  } catch (error: any) {
    console.error('❌ Seed error:', error.message);
    return NextResponse.json(
      { 
        success: false,
        error: error.message,
        stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
      },
      { status: 500 }
    );
  }
}
