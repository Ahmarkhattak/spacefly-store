import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Order from '@/models/Order';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ orderNumber: string }> }
) {
  try {
    await connectDB();

    const { orderNumber } = await params;

    const order = await Order.findOne({
      orderNumber: orderNumber,
    });

    if (!order) {
      return NextResponse.json(
        { error: 'Order not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(order);

  } catch (error: any) {
    console.error('Track order error:', error);

    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}
