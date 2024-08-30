import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  // Retrieve the 'auth' and 'admin' cookies
  const authCookie = req.cookies.get('auth');
  const adminCookie = req.cookies.get('admin');

  // Determine the current path
  const { pathname } = req.nextUrl;

  const isClientPath = pathname.startsWith('/clients');
  const isAdminPath = pathname.startsWith('/Admin');

  if (pathname.startsWith('/Admin/signIn') || pathname.startsWith('/Admin/signUp')) {
    return NextResponse.next(); // Allow access to SignIn and SignUp pages
  }

  if (pathname.startsWith('/clients/sign-in') || pathname.startsWith('/clients/sign-up')) {
    return NextResponse.next(); // Allow access to SignIn and SignUp pages
  }

  // Logic for client paths: Ensure only users with 'auth' cookie can access
  if (isClientPath && authCookie) {
    return NextResponse.next(); // Allow clients with auth cookie to proceed
  }

  // Logic for admin paths: Ensure only users with 'admin' cookie can access
  if (isAdminPath && adminCookie) {
    return NextResponse.next(); // Allow admins with admin cookie to proceed
  }

  // If the user is trying to access an Admin path without the 'admin' cookie, redirect to /Admin/signIn
  if (isAdminPath && !adminCookie) {
    return NextResponse.redirect(new URL('/Admin/signIn', req.url));
  }

  // If the user is trying to access a Client path without the 'auth' cookie, redirect to the homepage
  if (isClientPath && !authCookie) {
    return NextResponse.redirect(new URL('/', req.url));
  }

  // Default case: If the path doesn't match, allow the request to proceed
  return NextResponse.next();
}

// Config to specify which paths the middleware should run on
export const config = {
  matcher: ['/clients/:path*', '/Admin/:path*'],
};
