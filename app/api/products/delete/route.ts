import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Product from '@/models/Product';

export async function GET() {
  try {
    await connectDB();
    const result = await Product.deleteMany({});
    return NextResponse.json({ 
      success: true,
      message: `✅ ${result.deletedCount} products deleted successfully!` 
    });
  } catch (error: any) {
    console.error('❌ Delete error:', error.message);
    return NextResponse.json(
      { 
        success: false,
        error: error.message 
      },
      { status: 500 }
    );
  }
}
