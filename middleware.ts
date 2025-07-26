import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(request: NextRequest) {
  const authtoken = await getToken({ req: request });

  const token = request.cookies.get('auth-token');
  // console.log(token);
  const trialData = request.cookies.get('data_generator_trial');

  // Get trial usage
  const trials = trialData ? JSON.parse(trialData.value) : { usedTrials: 0 };
  const trialsExhausted = trials.usedTrials >= 3;

  // Paths that always require authentication
  const protectedPaths = ['/profile', '/settings', '/settings/subscription'];

  // Public paths that don't need authentication
  const publicPaths = [
    '/auth/login',
    '/auth/register',
    '/auth/forgot-password',
    '/auth/reset-password',
    '/verify',
    '/about',
    '/privacy',
    '/help'
  ];

  const isPublicPath = publicPaths.some(path =>
    request.nextUrl.pathname.startsWith(path)
  );

  const isProtectedPath = protectedPaths.some(path =>
    request.nextUrl.pathname.startsWith(path)
  );

  // If it's a public path, allow access
  if (isPublicPath) {
    return NextResponse.next();
  }

  // Check authentication for protected paths or when trials are exhausted
  if (isProtectedPath || (trialsExhausted && request.nextUrl.pathname === '/')) {
    if (!token) {
      return NextResponse.redirect(new URL('/auth/login', request.url));
    }
  }

  return NextResponse.next();
}