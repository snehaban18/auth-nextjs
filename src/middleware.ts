import { NextResponse, NextRequest } from 'next/server'
 
export function middleware(request: NextRequest) {
    const path = request.nextUrl.pathname;
    const token = request.cookies.get("token")?.value || '';
    const isPublicPath = path === '/login' || path === '/signup' || path === '/verifyemail';

    console.log(`MW: ${path}, ${token}, ${isPublicPath}`);

    // authenticated
    if (token && isPublicPath)
        return NextResponse.redirect(new URL('/profile', request.nextUrl));

    // not authenticated
    if (!token && !isPublicPath)
        return NextResponse.redirect(new URL('/login', request.nextUrl));

    // rest of the paths, no redirect
}
 
// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    '/',
    '/profile',
    '/profile/:id*',
    '/login',
    '/signup',
    '/verifyemail'
  ],
}