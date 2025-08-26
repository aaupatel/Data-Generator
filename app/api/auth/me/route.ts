import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { getToken } from 'next-auth/jwt';
import { verifyToken } from '@/lib/jwt';
import { connectToDatabase } from '@/lib/mongodb';
import { ObjectId } from 'mongodb';

export async function GET(request: NextRequest) {
  try {
    const sessionToken = await getToken({ req: request });

    if (sessionToken && sessionToken.id) {
      const { db } = await connectToDatabase();
      const user = await db.collection('users').findOne(
        { _id: new ObjectId(sessionToken.id) },
        { projection: { password: 0 } }
      );

      if (!user) {
        return new NextResponse('User not found', { status: 404 });
      }
      
      return NextResponse.json({ user });
    }

    const cookieStore = await cookies();
    const customToken = cookieStore.get('auth-token');

    if (!customToken) {
      return new NextResponse('No session or token found, unauthorized', { status: 401 });
    }

    const payload = verifyToken(customToken.value);

    if (!payload || !(payload as any).id) {
      return new NextResponse('Invalid or expired token', { status: 401 });
    }

    const { db } = await connectToDatabase();
    const user = await db.collection('users').findOne(
      { _id: new ObjectId((payload as any).id) },
      { projection: { password: 0 } }
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
