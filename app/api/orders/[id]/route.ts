import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Order from '@/models/Order';

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {

    await connectDB();

    const { id } = await params;

    const body = await request.json();


    const order = await Order.findByIdAndUpdate(
      id,
      {
        orderStatus: body.orderStatus,
        updatedAt: new Date(),
      },
      {
        new: true
      }
    );


    if (!order) {
      return NextResponse.json(
        { error: "Order not found" },
        { status: 404 }
      );
    }


    return NextResponse.json({
      success:true,
      message:"Status updated",
      order
    });


  } catch(error:any){

    console.log(error);

    return NextResponse.json(
      {
        error:error.message
      },
      {
        status:500
      }
    );

  }
}
