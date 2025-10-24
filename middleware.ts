import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

const JWT_SECRET = process.env.JWT_SECRET as string;

export async function middleware(request: NextRequest) {

  const { pathname } = request.nextUrl;

  // Obtener el token de las cookies
  const token = request.cookies.get('confessapps_token')?.value;

  // Construir la URL de la página de autenticación
  const authUrl = new URL('/auth', request.url);

  const isAuthRoute = pathname.startsWith('/auth');

   // ✅ Si SÍ está logueado e intenta entrar a /auth → redirigir a /app
  if (isAuthRoute && token) {
    const appUrl = new URL('/app', request.url);
    return NextResponse.redirect(appUrl);
  }

  if (isAuthRoute && !token) {
    return NextResponse.next();
  }

  // Si no hay token, redirigir a la página de autenticación
  if (!token) {
    return NextResponse.redirect(authUrl);
  }

  try {
    // Verificar el token. Es necesario codificar el secreto para 'jose'.
    const secret = new TextEncoder().encode(JWT_SECRET);
    await jwtVerify(token, secret);

    // Si el token es válido, permitir que la solicitud continúe
    return NextResponse.next();
  } catch (error) {
    // Si el token es inválido (expirado, malformado, etc.), redirigir a la página de autenticación
    console.error('Error de verificación de JWT en middleware:', error);
    const response = NextResponse.redirect(authUrl);
    // Es una buena práctica eliminar la cookie inválida
    response.cookies.delete('confessapps_token');
    return response;
  }
}

// Configuración del matcher para proteger las rutas deseadas
export const config = {
  matcher: ['/app/:path*', '/api/users/:path*', `/auth/:path*`],
};