import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  const refreshToken = request.cookies.get('refreshToken')?.value;

  console.log('[Middleware] refreshToken:', refreshToken);
  const isLoggedIn = Boolean(refreshToken);

  const protectedPaths = [
    '/profile',
    '/messages',
    '/requests',
    '/skills/request',
  ];
  const authPages = ['/login', '/signup', '/auth'];

  const { pathname } = request.nextUrl;

  if (pathname === '/') {
    return NextResponse.redirect(new URL('/skills', request.url));
  }

  if (
    isLoggedIn &&
    authPages.some((path) => request.nextUrl.pathname.startsWith(path))
  ) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  if (
    !isLoggedIn &&
    protectedPaths.some((path) => request.nextUrl.pathname.startsWith(path))
  ) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/profile/:path*',
    '/messages/:path*',
    '/requests/:path*',
    '/skills/request',
    '/auth',
    '/login',
    '/signup',
    '/',
  ],
};
