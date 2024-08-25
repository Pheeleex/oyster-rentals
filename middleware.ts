import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  // Retrieve the 'auth' cookie
  const authCookie = req.cookies.get('auth');

  // If the authCookie exists, allow the user to proceed
  if (authCookie) {
    console.log("Auth Cookie Value:", authCookie);
    return NextResponse.next();
  }

  // If the user is not authenticated, redirect to the homepage
  return NextResponse.redirect(new URL('/', req.url));
}

// Config to specify which paths the middleware should run on
export const config = {
  matcher: ['/clients/:path*'], // Middleware will run on /clients and any sub-paths
};
