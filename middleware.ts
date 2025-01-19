import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { decryptKey } from './lib/utils';

export function middleware(req: NextRequest) {
  // Retrieve the 'auth' and 'admin' cookies
  const authCookie = req.cookies.get('auth');
  const adminAccess = req.cookies.get('accessKey')?.value;

  // Determine the current path
  const { pathname } = req.nextUrl;

  const isClientPath = pathname.startsWith('/clients');
  const isAdminPath = pathname.startsWith('/admin');

  // Handle public client routes for sign-in and sign-up
  if (pathname.startsWith('/clients/sign-in') || pathname.startsWith('/clients/sign-up')) {
    return NextResponse.next(); // Allow access to SignIn and SignUp pages
  }

  // Logic for client paths: Ensure only users with 'auth' cookie can access
  if (isClientPath) {
    if (authCookie) {
      return NextResponse.next(); // Allow clients with auth cookie to proceed
    } else {
      return NextResponse.redirect(new URL('/', req.url)); // Redirect unauthorized clients to home
    }
  }

  // Handle admin access: decrypt and validate the accessKey cookie
  if (isAdminPath) {
    if (adminAccess) {
      const decryptedKey = decryptKey(adminAccess);

      // Check if accessKey is valid
      if (decryptedKey && decryptedKey === process.env.NEXT_PUBLIC_ADMIN_PASSKEY) {
        return NextResponse.next(); // Allow admin access
      }
    }

    // Redirect to homepage if admin access is not authorized
    return NextResponse.redirect(new URL('/', req.url));
  }

  // Default case: If the path doesn't match, allow the request to proceed
  return NextResponse.next();
}

// Config to specify which paths the middleware should run on
export const config = {
  matcher: ['/clients/:path*', '/admin/:path*'], // Protect both client and admin paths
};
