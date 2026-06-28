import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Order, { generateOrderNumber } from '@/models/Order';

export async function POST(request: Request) {
  try {
    console.log('📦 Creating order...');
    await connectDB();
    
    const body = await request.json();
    console.log('📦 Order data received:', body);

    // Validate required fields
    if (!body.customerName || !body.customerPhone || !body.customerAddress) {
      return NextResponse.json(
        { error: 'Missing required fields: customerName, customerPhone, customerAddress' },
        { status: 400 }
      );
    }

    if (!body.products || body.products.length === 0) {
      return NextResponse.json(
        { error: 'Cart is empty' },
        { status: 400 }
      );
    }

    // Calculate total
    const total = body.products.reduce((sum: number, item: any) => {
      return sum + (item.price * item.quantity);
    }, 0);

    // Generate order number using function
    const orderNumber = generateOrderNumber();

    // Create order data
    const orderData = {
      orderNumber: orderNumber,
      customerName: body.customerName.trim(),
      customerPhone: body.customerPhone.trim(),
      customerAddress: body.customerAddress.trim(),
      customerEmail: body.customerEmail?.trim() || '',
      products: body.products.map((item: any) => ({
        productId: item.id || item.productId,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
      })),
      totalAmount: total,
      paymentMethod: body.paymentMethod || 'COD',
      paymentStatus: 'Pending',
      orderStatus: 'Pending',
      notes: body.notes?.trim() || '',
    };

    console.log('📦 Saving order:', orderData);

    // Create order without pre-save hooks
    const order = new Order(orderData);
    await order.save();
    
    console.log('✅ Order created:', order.orderNumber);

    return NextResponse.json(
      { 
        success: true, 
        orderNumber: order.orderNumber,
        message: 'Order placed successfully!' 
      },
      { status: 201 }
    );

  } catch (error: any) {
    console.error('❌ Order creation error:', error.message);
    console.error('❌ Stack:', error.stack);
    
    return NextResponse.json(
      { 
        error: error.message || 'Failed to create order',
        details: process.env.NODE_ENV === 'development' ? error.stack : undefined
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    await connectDB();
    const orders = await Order.find().sort({ createdAt: -1 });
    return NextResponse.json(orders);
  } catch (error: any) {
    console.error('❌ Fetch orders error:', error.message);
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}
