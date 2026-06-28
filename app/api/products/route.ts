import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Product from '@/models/Product';


// GET ALL PRODUCTS
export async function GET() {
  try {
    await connectDB();

    const products = await Product.find({
      isActive: true
    }).sort({
      createdAt: -1
    });

    return NextResponse.json(products);

  } catch (error: any) {

    return NextResponse.json(
      {
        error: error.message
      },
      {
        status: 500
      }
    );
  }
}


// ADD NEW PRODUCT
export async function POST(request: Request) {

  try {

    await connectDB();

    const body = await request.json();


    const product = await Product.create({

      name: body.name,

      description: body.description,

      price: Number(body.price),

      category: body.category,

      stock: Number(body.stock),

      image: body.image || 
      "https://via.placeholder.com/300x200?text=Product",

      isActive: true

    });


    return NextResponse.json(
      product,
      {
        status: 201
      }
    );


  } catch (error: any) {

    return NextResponse.json(
      {
        error: error.message
      },
      {
        status: 500
      }
    );

  }

}
