import { NextResponse } from 'next/server';
import { z } from 'zod';
import bcrypt from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import connectDB from '@/lib/mongodb';
import User from '@/models/user.model';

// Es crucial tener una clave secreta para firmar los tokens
const JWT_SECRET = process.env.JWT_SECRET as string;

if (!JWT_SECRET) {
  throw new Error('La variable de entorno JWT_SECRET no está definida.');
}

// Esquema de validación específico para el inicio de sesión
const loginSchema = z.object({
  email: z.string().email({ message: "El correo electrónico no es válido." }),
  password: z.string().min(1, { message: "La contraseña no puede estar vacía." }),
});

export async function POST(request: Request) {
  let errors: { message: string }[] = [];
  try {
    // 1. Conectar a la base de datos
    await connectDB();

    // 2. Obtener los datos del cuerpo de la petición y validar
    const body = await request.json();
    const validation = loginSchema.safeParse(body);

    // Si la validación falla, devolver un error 400
    if (!validation.success) {
      errors = validation.error.issues.map((issue) => ({
        message: issue.message,
      }));

      return NextResponse.json(
        {
          message: "Datos de entrada inválidos.",
          errors: errors,
        },
        { status: 400 }
      );
    }

    const { email, password } = validation.data;

    // 3. Buscar al usuario por su correo electrónico
    const user = await User.findOne({ email });

    // 4. Si el usuario no existe o la contraseña no coincide, devolver error
    // Se usa un mensaje genérico para no revelar si un email está registrado o no
    if (!user || !(await bcrypt.compare(password, user.password))) {
      errors.push({ message: "El correo electrónico o la contraseña son incorrectos." });
      return NextResponse.json(
        {
          message: "Credenciales inválidas.",
          errors: errors,
        },
        { status: 401 } // 401 Unauthorized
      );
    }

    // 5. Crear el JWT con los datos del usuario
    const tokenPayload = {
      id: user._id,
      username: user.username,
      email: user.email,
    };

    const token = sign(tokenPayload, JWT_SECRET, {
      expiresIn: '3d', // El token expirará en 3 días
    });

    // 6. Crear la respuesta de redirección y establecer la cookie
    const redirectUrl = new URL('/app', request.url);
    const response = NextResponse.redirect(redirectUrl);

    response.cookies.set({
      name: 'confessapps_token',
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60 * 24 * 3, // 3 días en segundos
      path: '/',
    });

    return response;
  } catch (error: any) {
    console.error(error);
    return NextResponse.json({ message: "Ha ocurrido un error interno en el servidor." }, { status: 500 });
  }
}