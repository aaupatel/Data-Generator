import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import { generateToken } from '@/lib/jwt';
import { sendPasswordResetEmail } from '@/lib/nodemailer';

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    if (!email) {
      return new NextResponse('Email is required', { status: 400 });
    }

    const { db } = await connectToDatabase();
    const user = await db.collection('users').findOne({ email });

    if (!user) {
      return new NextResponse('User not found', { status: 404 });
    }

    const resetToken = generateToken({ email });
    await sendPasswordResetEmail(email, resetToken);

    return NextResponse.json({ message: 'Password reset email sent' });
  } catch (error) {
    console.error(error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}