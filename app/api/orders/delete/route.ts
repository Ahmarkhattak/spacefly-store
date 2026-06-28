import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Order from '@/models/Order';

export async function GET() {
  try {
    await connectDB();
    const result = await Order.deleteMany({});
    return NextResponse.json({ 
      success: true,
      message: `✅ ${result.deletedCount} orders deleted successfully!` 
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}
