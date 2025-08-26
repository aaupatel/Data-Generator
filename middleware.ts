import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(request: NextRequest) {
  const sessionToken = await getToken({ req: request });
  // 2. Console log the user's session data
  // if (sessionToken) {
  //   console.log("User Session Data:", sessionToken);
  // } else {
  //   console.log("No active user session.");
  // }
  const customToken = request.cookies.get('auth-token');
  const isAuthenticated = !!sessionToken || !!customToken;

  // 2. Define public and protected paths
  const pathname = request.nextUrl.pathname;
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

  const protectedPaths = ['/profile', '/settings'];

  // 3. Check trial usage for the homepage
  const trialData = request.cookies.get('data_generator_trial');
  const trials = trialData ? JSON.parse(trialData.value) : { usedTrials: 0 };
  const trialsExhausted = trials.usedTrials >= 3;

  // 4. Implement redirection logic
  const isPublic = publicPaths.some(path => pathname.startsWith(path));
  const isProtected = protectedPaths.some(path => pathname.startsWith(path));

  // If user is not authenticated and is trying to access a protected path
  if (isProtected && !isAuthenticated) {
    return NextResponse.redirect(new URL('/auth/login', request.url));
  }

  // If user has exhausted trials and is not authenticated on the homepage
  if (pathname === '/' && trialsExhausted && !isAuthenticated) {
    return NextResponse.redirect(new URL('/auth/login', request.url));
  }
  
  // If the user is authenticated and tries to access login/register, redirect them to the homepage
  if (isAuthenticated && (pathname.startsWith('/auth/login') || pathname.startsWith('/auth/register'))) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  // Otherwise, allow the request to proceed
  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}