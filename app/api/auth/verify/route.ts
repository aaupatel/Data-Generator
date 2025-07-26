import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import { verifyToken } from '@/lib/jwt';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const token = searchParams.get('token');

    if (!token) {
      return new NextResponse('Missing token', { status: 400 });
    }

    const payload = verifyToken(token);

    if (!payload) {
      return new NextResponse('Invalid or expired token', { status: 400 });
    }

    const { db } = await connectToDatabase();

    const result = await db.collection('users').updateOne(
      { email: (payload as any).email },
      {
        $set: {
          verified: true,
          'subscription.status': 'active',
        },
      }
    );

    if (result.matchedCount === 0) {
      return new NextResponse('User not found', { status: 404 });
    }

    return NextResponse.json({ message: 'Email verified successfully' });
  } catch (error) {
    console.error(error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}