import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  const refresh_token = request.cookies.get('refresh_token')?.value;
  const isLoggedIn = Boolean(refresh_token);

  const protectedPaths = ['/profile'];
  const authPages = ['/login'];

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
  matcher: ['/profile', '/login'],
};
