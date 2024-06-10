import { NextRequest, NextResponse } from 'next/server';
import { UserType } from '@/features/auth/types/common.types';
import { cookies } from 'next/headers';
import { protectedRoutes, publicRoutes } from './features/auth/lib/utils';

export default async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;

  const isProtectedRoute = protectedRoutes.includes(path);
  const isPublicRoute = publicRoutes.includes(path);
  const parsedCookie = cookies().get("userData")?.value;;
  
  const session = parsedCookie ? JSON.parse(parsedCookie) as UserType : undefined;

  if (isProtectedRoute && !session) {
    return NextResponse.redirect(new URL('/auth/login', req.nextUrl));
  }

  if (session?.email && isPublicRoute) {
    return NextResponse.redirect(new URL("/dashboard", req.nextUrl));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
};
