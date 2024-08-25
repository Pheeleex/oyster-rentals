import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  // Retrieve the 'auth' cookie
  const authCookie = req.cookies.get('auth');
  const adminCookie = req.cookies.get('admin');

  // Determine the current path
  const { pathname } = req.nextUrl;

  const isClientPath = pathname.startsWith('/clients');
  const isAdminPath = pathname.startsWith('/Admin');

  if(pathname.startsWith('/Admin/SignIn') || pathname.startsWith('/Admin/SignUp')) {
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

  // If the user is not authenticated or trying to access a restricted path, redirect to the homepage
  return NextResponse.redirect(new URL('/', req.url));
}

// Config to specify which paths the middleware should run on
export const config = {
  matcher: ['/clients/:path*', '/Admin/:path*'],
};
