import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

const SECRET_KEY = new TextEncoder().encode(process.env.SECRET_KEY || 'your-secret-key');

export async function verifyToken(token: string) {
  try {
    const { payload } = await jwtVerify(token, SECRET_KEY); 
    return payload; 
  } catch (error) {
    return null;
  }
}


async function handlePageMiddleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = cookies().get('auth_token');
  const isAuthPath = pathname.startsWith('/auth');
  const isAdminPath = pathname.startsWith('/admin');
  const isRenterPath = pathname.startsWith('/renter')
  const decodedUserVerify = token ? await verifyToken(token.value) : null;

  if ((isRenterPath || isAdminPath) && !decodedUserVerify) {
    const url = request.nextUrl.clone();
    url.pathname = '/auth';
    url.searchParams.set('redirected', 'true');
    return NextResponse.redirect(url);
  }

  if(isRenterPath && decodedUserVerify && decodedUserVerify.role != 'renter'){ // kalau ada yang route ke /renter tidak authorize dan rolenya bukan renter
    const url = request.nextUrl.clone();
    url.pathname = '/auth';
    url.searchParams.set('redirected', 'true');
    return NextResponse.redirect(url);
  }

  if(isAdminPath && decodedUserVerify && decodedUserVerify.role != 'admin'){ // kalau ada yang route ke /admin tidak authorize dan rolenya bukan admin
    const url = request.nextUrl.clone();
    url.pathname = '/auth';
    url.searchParams.set('redirected', 'true');
    return NextResponse.redirect(url);
  }

  if (isAuthPath && decodedUserVerify && decodedUserVerify.role == 'admin') {
    const url = request.nextUrl.clone();
    url.pathname = '/admin';
    url.searchParams.set('redirected', 'true');
    return NextResponse.redirect(url);
  }

  if (isAuthPath && decodedUserVerify && decodedUserVerify.role == 'renter') {
    const url = request.nextUrl.clone();
    url.pathname = '/renter';
    url.searchParams.set('redirected', 'true');
    return NextResponse.redirect(url);
  }

  const response = NextResponse.next();
  response.headers.set('X-User-Info', JSON.stringify(decodedUserVerify));

  return NextResponse.next();
}


async function handleApiMiddleware(request: NextRequest) {
  const tokenHeaders = request.headers.get('Secret-Key');
  const secretkey = process.env.SECRET_KEY
  if (tokenHeaders !== secretkey) {
    const url = request.nextUrl.clone();
    url.pathname = '/auth';
    url.searchParams.set('redirected', 'true');
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}


export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith('/api/')) {
    return handleApiMiddleware(request);
  }

  if (pathname.startsWith('/admin') || pathname.startsWith('/auth') || pathname.startsWith('/renter')) {
    return handlePageMiddleware(request);
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*', '/auth/:path*', '/api/data/:path*', '/renter/:path*'],
};
