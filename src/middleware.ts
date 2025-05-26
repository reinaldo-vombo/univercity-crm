import { getToken } from 'next-auth/jwt';
import { NextResponse, NextRequest } from 'next/server';

const ROUTE_ROLE_MAP: Record<string, string[]> = {
  '/crm/admin': ['admin', 'super_admin'],
  '/crm/teacher': ['teacher'],
};
export async function middleware(req: NextRequest) {
  const pathname = req.nextUrl.pathname;

  // Match based on prefix and role
  const matchedPrefix = Object.keys(ROUTE_ROLE_MAP).find((prefix) =>
    pathname.startsWith(prefix)
  );

  if (matchedPrefix) {
    const allowedRoles = ROUTE_ROLE_MAP[matchedPrefix];
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

    if (!token) {
      return NextResponse.redirect(new URL('/', req.url)); // not logged in
    }

    const role = token.user?.role || token.role;

    if (!allowedRoles.includes(role)) {
      return NextResponse.redirect(new URL('/unauthorized', req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/crm/admin/:path*', '/crm/teacher/:path*'],
};
