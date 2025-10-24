import { NextResponse } from 'next/server';

export async function POST() {
  const res = NextResponse.json({ success: true });
  // Eliminar cookie en el servidor
  res.cookies.set('confessapps_token', '', { path: '/', expires: new Date(0) });
  return res;
}
