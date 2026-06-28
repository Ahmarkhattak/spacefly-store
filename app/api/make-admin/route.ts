import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import User from '@/models/User';

export async function GET() {
  try {
    await connectDB();
    
    // Find user by email and update to admin
    const user = await User.findOneAndUpdate(
      { email: 'admin@spacefly.com' },
      { role: 'admin' },
      { new: true }
    );
    
    if (!user) {
      return NextResponse.json(
        { error: 'User not found. Please register first at /register' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({
      success: true,
      message: `✅ User ${user.email} is now an ADMIN!`,
      user: {
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}
