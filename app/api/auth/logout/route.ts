import { NextResponse } from 'next/server';

export async function POST() {
  try {
    const response = NextResponse.json({ message: 'Logged out successfully' });

    response.cookies.set('auth-token', '', {
      httpOnly: true,
      path: '/',
      expires: new Date(0), 
    });

    return response;
  } catch (error) {
    console.error('Logout error:', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}