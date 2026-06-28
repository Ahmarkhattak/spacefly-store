import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import User from "@/models/User";

export async function POST(request: Request) {
  try {
    await connectDB();

    const { email, oldPassword, newPassword } = await request.json();

    if (!email || !oldPassword || !newPassword) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
    }

    if (user.role !== "admin") {
      return NextResponse.json(
        { error: "Only admin can change password" },
        { status: 403 }
      );
    }

    const isMatch = await user.comparePassword(oldPassword);

    if (!isMatch) {
      return NextResponse.json(
        { error: "Old password incorrect" },
        { status: 401 }
      );
    }

    user.password = newPassword;
    await user.save();

    return NextResponse.json({
      success: true,
      message: "Password changed successfully"
    });

  } catch (error:any) {

    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );

  }
}
