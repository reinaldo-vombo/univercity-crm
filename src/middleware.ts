import { getToken } from 'next-auth/jwt';
import { NextResponse, NextRequest } from 'next/server';

// 🔐 Mapeamento de papéis permitidos por rota
const ROUTE_ROLE_MAP: Record<string, string[]> = {
  '/crm': ['manager', 'accounte', 'admin', 'super_admin'],
  '/crm/admin': ['admin', 'super_admin', 'editor'],
  '/crm/management': ['manager', 'editor'],
};

export async function middleware(req: NextRequest) {
  const pathname = req.nextUrl.pathname;

  // 1️⃣ Só entra no middleware se for rota do CRM
  if (!pathname.startsWith('/crm')) {
    return NextResponse.next(); // público
  }

  // 2️⃣ Descobre qual prefixo aplica à rota
  const matchedPrefix = Object.keys(ROUTE_ROLE_MAP)
    .sort((a, b) => b.length - a.length) // mais específico primeiro
    .find((prefix) => pathname.startsWith(prefix));

  // segurança: se rota do CRM mas não definida → tratar como pública
  if (!matchedPrefix) {
    return NextResponse.next();
  }

  const allowedRoles = ROUTE_ROLE_MAP[matchedPrefix];

  // 3️⃣ Verifica autenticação
  const token = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
  });

  if (!token) {
    return NextResponse.redirect(new URL('/auth/login', req.url));
  }

  const role = token.role || token.role;

  if (!role) {
    return NextResponse.redirect(new URL('/unauthorized', req.url));
  }

  // 4️⃣ Verifica permissão da role
  if (!allowedRoles.includes(role)) {
    return NextResponse.redirect(
      new URL(
        `${role === 'editor' ? '/crm/management' : '/unauthorized'}`,
        req.url,
      ),
    );
  }

  // 5️⃣ Autorizado
  return NextResponse.next();
}

// ⚙️ Aplica middleware apenas nas rotas /crm/*
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
