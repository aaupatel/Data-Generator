import { NextResponse } from 'next/server';
import { hash } from 'bcrypt';
import { connectToDatabase } from '@/lib/mongodb';
import { generateToken } from '@/lib/jwt';
import { sendVerificationEmail } from '@/lib/nodemailer';

export async function POST(request: Request) {
  try {
    const { name, email, password } = await request.json();

    if (!name || !email || !password) {
      return NextResponse.json(
        { error: 'All fields are required.' },
        { status: 400 }
      );
    }

    const { db } = await connectToDatabase();
    const existingUser = await db.collection('users').findOne({ email });

    if (existingUser) {
      return NextResponse.json(
        { error: 'Email already exists' },
        { status: 400 }
      );
    }

    const hashedPassword = await hash(password, 12);
    const verificationToken = generateToken({ email });

    await db.collection('users').insertOne({
      name,
      email,
      password: hashedPassword,
      verified: false,
      createdAt: new Date(),
      subscription: {
        plan: 'free',
        status: 'inactive',
        expiresAt: new Date(new Date().setMonth(new Date().getMonth() + 6)), // Free expires in 6 months
      },
    });

    await sendVerificationEmail(email, verificationToken);

    return NextResponse.json({ message: 'Registration successful. Please verify your email.' });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: 'Something went wrong. Please try again later.' },
      { status: 500 }
    );
  }
}