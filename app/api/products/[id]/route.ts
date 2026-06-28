import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Product from '@/models/Product';


export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {

  try {

    await connectDB();

    const { id } = await params;

    const product = await Product.findById(id);


    if (!product) {
      return NextResponse.json(
        { error: "Product not found" },
        { status: 404 }
      );
    }


    return NextResponse.json(product);


  } catch(error:any){

    return NextResponse.json(
      {error:error.message},
      {status:500}
    );

  }

}



export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {

  try {

    await connectDB();

    const { id } = await params;


    const product = await Product.findByIdAndDelete(id);


    if(!product){

      return NextResponse.json(
        {error:"Product not found"},
        {status:404}
      );

    }


    return NextResponse.json({
      success:true,
      message:"Product deleted successfully"
    });


  } catch(error:any){


    console.log("DELETE ERROR:", error);


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
