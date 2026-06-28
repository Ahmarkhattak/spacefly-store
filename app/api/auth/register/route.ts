import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import User from '@/models/User';

export async function POST(request: Request) {
  try {
    await connectDB();
    const body = await request.json();

    // Validate
    if (!body.name || !body.email || !body.password) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }

    // Check if user exists
    const existingUser = await User.findOne({ email: body.email });
    if (existingUser) {
      return NextResponse.json(
        { error: 'User already exists' },
        { status: 400 }
      );
    }

    // Create user
    const user = await User.create({
      name: body.name,
      email: body.email,
      password: body.password,
      phone: body.phone || '',
      address: body.address || '',
    });

    // Remove password from response
    const userResponse = {
      id: user._id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      address: user.address,
      role: user.role,
    };

    return NextResponse.json(
      { 
        success: true, 
        message: 'User registered successfully!',
        user: userResponse 
      },
      { status: 201 }
    );

  } catch (error: any) {
    console.error('❌ Register error:', error.message);
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}
