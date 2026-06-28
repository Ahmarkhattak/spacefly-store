import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import User from '@/models/User';
import bcrypt from 'bcryptjs';

export async function GET() {
  try {
    console.log('🚀 Seeding admin user...');
    await connectDB();
    
    // Check if admin already exists
    let admin = await User.findOne({ email: 'admin@spacefly.com' });
    
    if (admin) {
      // Update to admin role
      admin.role = 'admin';
      admin.isActive = true;
      await admin.save();
      
      console.log('✅ Admin user updated!');
      return NextResponse.json({
        success: true,
        message: '✅ Admin user updated successfully!',
        user: {
          id: admin._id,
          name: admin.name,
          email: admin.email,
          role: admin.role
        }
      });
    }

    // Create new admin
    const hashedPassword = await bcrypt.hash('admin123', 10);
    
    admin = await User.create({
      name: 'Admin',
      email: 'admin@spacefly.com',
      password: hashedPassword,
      phone: '0312-1234567',
      address: 'SpaceFly HQ',
      role: 'admin',
      isActive: true,
    });

    console.log('✅ Admin user created!');
    return NextResponse.json({
      success: true,
      message: '✅ Admin user created successfully!',
      user: {
        id: admin._id,
        name: admin.name,
        email: admin.email,
        role: admin.role
      }
    });
    
  } catch (error: any) {
    console.error('❌ Error:', error.message);
    return NextResponse.json(
      { 
        success: false,
        error: error.message 
      },
      { status: 500 }
    );
  }
}
