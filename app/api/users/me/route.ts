import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { verify } from 'jsonwebtoken';
import { z } from 'zod';
import connectDB from '@/lib/mongodb';
import User from '@/models/user.model';
import { genderOptions, languages, countries } from '@/app/figma/data/countries-languages';

// Tipado para el payload del JWT
interface TokenPayload {
  id: string;
  username: string;
  email: string;
  iat: number;
  exp: number;
}

const JWT_SECRET = process.env.JWT_SECRET as string;

// Extraemos los valores permitidos de los datos importados para la validación
const validGenders = genderOptions.map(option => option.value) as [string, ...string[]];
const validCountries = countries.map(country => country.value) as [string, ...string[]];

//Esquema de Validación con Zod
const userSchema = z.object({
  username: z.string().min(5, { message: "El nombre de usuario debe tener al menos 5 caracteres." }),
  gender: z.string({error: "El género seleccionado no es válido."}).refine((val) => validGenders.includes(val), { message: "El género seleccionado no es válido." }),
  country: z.string({error: "El país seleccionado no es válido."}).refine((val) => validCountries.includes(val), { message: "El país seleccionado no es válido." }),
  email: z.string().email({ message: "El correo electrónico no es válido." }),
  password: z.string().min(8, { message: "La contraseña debe tener al menos 8 caracteres." }),
  confirmPassword: z.string(),
})
.refine((data) => data.password === data.confirmPassword, {
  message: "Las contraseñas no coinciden.",
  path: ["confirmPassword"], // Asigna el error al campo 'confirmPassword'
});


//Obtener datos de usuario autenticado
export async function GET(request: Request) {
  try {
    // 1. Obtener y verificar el token JWT de la cookie
    const cookieStore = await cookies();
    const token = cookieStore.get('confessapps_token');

    if (!token) {
      return NextResponse.json({ message: "No autorizado: Token no proporcionado." }, { status: 401 });
    }

    const decoded = verify(token.value, JWT_SECRET) as TokenPayload;

    // 2. Conectar a la BD y buscar al usuario
    await connectDB();
    const user = await User.findById(decoded.id).select('-password'); // Excluir la contraseña

    if (!user) {
      return NextResponse.json({ message: "Usuario no encontrado." }, { status: 404 });
    }

    // 3. Devolver los datos del usuario
    return NextResponse.json(user, { status: 200 });

  } catch (error) {
    console.error("Error en GET /api/user/profile:", error);
    if (error instanceof z.ZodError) {
      return NextResponse.json({ message: "Datos de entrada inválidos", errors: error.issues }, { status: 400 });
    }
    return NextResponse.json({ message: "No autorizado o error interno." }, { status: 401 });
  }
}

  
//Actualiza los datos del usuario autenticado.
/* export async function PUT(request: Request) {
  try {
    // 1. Obtener y verificar el token JWT
    const cookieStore = cookies();
    const token = cookieStore.get('confessapps_token');

    if (!token) {
      return NextResponse.json({ message: "No autorizado: Token no proporcionado." }, { status: 401 });
    }

    const decoded = verify(token.value, JWT_SECRET) as TokenPayload;
    const userId = decoded.id;

    // 2. Obtener y validar los datos del cuerpo de la petición
    const body = await request.json();
    const validation = updateUserSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json({ message: "Datos de entrada inválidos.", errors: validation.error.issues }, { status: 400 });
    }

    const dataToUpdate = validation.data;

    // 3. Conectar a la BD y actualizar el usuario
    await connectDB();

    // Si se actualiza el username, verificar que no esté en uso por otro usuario
    if (dataToUpdate.username) {
      const existingUser = await User.findOne({ username: dataToUpdate.username, _id: { $ne: userId } });
      if (existingUser) {
        return NextResponse.json({ message: "El nombre de usuario ya está en uso." }, { status: 409 });
      }
    }

    const updatedUser = await User.findByIdAndUpdate(userId, { $set: dataToUpdate }, { new: true, runValidators: true }).select('-password');

    if (!updatedUser) {
      return NextResponse.json({ message: "Usuario no encontrado para actualizar." }, { status: 404 });
    }

    // 4. Devolver el usuario actualizado
    return NextResponse.json(updatedUser, { status: 200 });

  } catch (error) {
    console.error("Error en PUT /api/user/profile:", error);
    return NextResponse.json({ message: "Error interno del servidor." }, { status: 500 });
  }
} */