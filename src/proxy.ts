import { getToken } from 'next-auth/jwt';
import { NextResponse, NextRequest } from 'next/server';
import { Action, hasPermission, Subject } from './lib/helper/auth/permissions';

// 🔐 Mapeamento de papéis permitidos por rota
type RoutePermission = { action: Action; subject: Subject };

const ROUTE_PERMISSION_MAP: Record<string, RoutePermission> = {
  '/crm/admin': { action: 'manage', subject: 'User' },
  '/crm/management': { action: 'read', subject: 'AcademicDepartment' },
  '/crm': { action: 'read', subject: 'AcademicSemester' }, // fallback mais genérico
};

export async function proxy(req: NextRequest) {
  const pathname = req.nextUrl.pathname;

  if (!pathname.startsWith('/crm')) {
    return NextResponse.next();
  }

  const matchedPrefix = Object.keys(ROUTE_PERMISSION_MAP)
    .sort((a, b) => b.length - a.length)
    .find((prefix) => pathname.startsWith(prefix));

  if (!matchedPrefix) {
    return NextResponse.next();
  }

  const required = ROUTE_PERMISSION_MAP[matchedPrefix];

  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  if (!token) {
    return NextResponse.redirect(new URL('/auth/login', req.url));
  }

  const permissions = token.permissions ?? [];

  if (!hasPermission(permissions, required.action, required.subject)) {
    return NextResponse.redirect(new URL('/unauthorized', req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/crm/:path*'],
};

// export async function middleware(req: NextRequest) {
//   const pathname = req.nextUrl.pathname;

//   // Match based on prefix and role
//   const matchedPrefix = Object.keys(ROUTE_ROLE_MAP).find((prefix) =>
//     pathname.startsWith(prefix)
//   );
//   if (matchedPrefix) {
//     const allowedRoles = ROUTE_ROLE_MAP[matchedPrefix];
//     const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
//     if (!token) {
//       return NextResponse.redirect(new URL('/', req.url)); // not logged in
//     }
//     // console.log(token);

//     const role = token.user?.role || token.role;

//     if (!allowedRoles.includes(role)) {
//       return NextResponse.redirect(new URL('/unauthorized', req.url));
//     }
//   }

//   return NextResponse.next();
// }

// export const config = {
//   matcher: ['/crm/:path*'],
// };
