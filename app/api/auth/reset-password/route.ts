import { NextResponse } from 'next/server';
import { hash } from 'bcrypt';
import { connectToDatabase } from '@/lib/mongodb';
import { verifyToken } from '@/lib/jwt';

export async function POST(request: Request) {
  try {
    const { token, password } = await request.json();

    if (!token || !password) {
      return new NextResponse('Missing required fields', { status: 400 });
    }

    const payload = verifyToken(token);

    if (!payload) {
      return new NextResponse('Invalid or expired token', { status: 400 });
    }

    const hashedPassword = await hash(password, 12);
    const { db } = await connectToDatabase();

    await db.collection('users').updateOne(
      { email: (payload as any).email },
      { $set: { password: hashedPassword } }
    );

    return NextResponse.json({ message: 'Password updated successfully' });
  } catch (error) {
    console.error(error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}