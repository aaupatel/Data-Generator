import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { verifyToken } from '@/lib/jwt';
import { connectToDatabase } from '@/lib/mongodb';
import { ObjectId } from 'mongodb';

export async function GET() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('auth-token');

    if (!token) {
      return new NextResponse('Token not found, unauthorized', { status: 401 });
    }

    const payload = verifyToken(token.value);

    if (!payload || !(payload as any).id) {
      return new NextResponse('Invalid or expired token', { status: 401 });
    }

    const { db } = await connectToDatabase();
    const user = await db.collection('users').findOne(
      { _id: new ObjectId((payload as any).id) },
      { projection: { password: 0, } }
    );

    if (!user) {
      return new NextResponse('User not found', { status: 404 });
    }

    return NextResponse.json({ user });
  } catch (error) {
    console.error('Error fetching user:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
