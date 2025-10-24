import { NextResponse } from 'next/server';
import { z } from 'zod';
import bcrypt from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import connectDB from '@/lib/mongodb';
import User from '@/models/user.model';
import { genderOptions } from '@/app/figma/data/countries-languages';
import { languages } from '@/app/figma/data/countries-languages';
import { countries } from '@/app/figma/data/countries-languages';

// Es crucial tener una clave secreta para firmar los tokens
const JWT_SECRET = process.env.JWT_SECRET as string;

if (!JWT_SECRET) {
  throw new Error('La variable de entorno JWT_SECRET no está definida.');
}

// Extraemos los valores permitidos de los datos importados para la validación
const validGenders = genderOptions.map(option => option.value) as [string, ...string[]];
const validCountries = countries.map(country => country.value) as [string, ...string[]];
const validLanguages = languages.map(language => language.value) as [string, ...string[]];

//Esquema de Validación con Zod
const userSchema = z.object({
  username: z.string().min(5, { message: "El nombre de usuario debe tener al menos 5 caracteres." }),
  birthdate: z.coerce.date({ error: "La fecha de nacimiento no es válida." }).refine((date) => {
    const eighteenYearsAgo = new Date();
    // Restamos 18 años a la fecha actual para obtener la fecha límite
    eighteenYearsAgo.setFullYear(eighteenYearsAgo.getFullYear() - 18);
    return date <= eighteenYearsAgo;
  }, { message: "Debes tener al menos 18 años para registrarte." }),
  gender: z.string({error: "El género seleccionado no es válido."}).refine((val) => validGenders.includes(val), { message: "El género seleccionado no es válido." }),
  country: z.string({error: "El país seleccionado no es válido."}).refine((val) => validCountries.includes(val), { message: "El país seleccionado no es válido." }),
  language: z.string({error: "El lenguaje seleccionado no es válido."}).refine((val) => validLanguages.includes(val), { message: "El idioma seleccionado no es válido." }),
  email: z.string().email({ message: "El correo electrónico no es válido." }),
  password: z.string().min(8, { message: "La contraseña debe tener al menos 8 caracteres." }),
  confirmPassword: z.string(),
})
.refine((data) => data.password === data.confirmPassword, {
  message: "Las contraseñas no coinciden.",
  path: ["confirmPassword"], // Asigna el error al campo 'confirmPassword'
});


export async function POST(request: Request) {
  let errors: { message: string; }[] = [];  
  try {
    // 1. Conectar a la base de datos
    await connectDB();

    // 2. Obtener los datos del cuerpo de la petición y validar
    const body = await request.json();
    const validation = userSchema.safeParse(body);

    //Si la validación falla, devolver un error 400
    if (!validation.success) {
        
        errors = validation.error.issues.map((issue) => ({
          message: issue.message
        }));

      return NextResponse.json({
        message: "Datos de entrada inválidos.",
        // `issues` contiene un array detallado de todos los errores de validación
        errors: errors,
      }, { status: 400 }); // 400 Bad Request
    }

    const { email, password, username, birthdate, gender, country, language } = validation.data;

    // 3. Verificar si el correo electrónico o el nombre de usuario ya existen
    const existingUser = await User.findOne({
      $or: [{ email: email.toLowerCase() }, { username: username.toLowerCase() }],
    });

    if (existingUser) {
      if (existingUser.email === email.toLowerCase()) {
        errors.push({ message: "El correo electrónico ya está en uso." });
        return NextResponse.json({
          message: "Este correo electrónico ya está en uso.",
          errors: errors,
        }, { status: 409 }); // 409 Conflict
      }
      if (existingUser.username === username.toLowerCase()) {
        errors.push({ message: "El nombre de usuario ya está en uso." });
        return NextResponse.json({
          message: "Este nombre de usuario ya está en uso.",
          errors: errors,
        }, { status: 409 }); // 409 Conflict
      }
    }

    // 4. Hashear la contraseña
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // 5. Crear la nueva instancia de usuario con la contraseña hasheada
    const newUser = new User({
      username,
      birthdate,
      gender,
      country,
      language,
      email,
      password: hashedPassword, // Guardamos la contraseña hasheada, no la original
    });

    // 6. Guardar el nuevo usuario en la base de datos
    const savedUser = await newUser.save();

    // 7. Crear el JWT con los datos del usuario
    const tokenPayload = {
      id: savedUser._id,
      username: savedUser.username,
      email: savedUser.email,
    };

    const token = sign(tokenPayload, JWT_SECRET, {
      expiresIn: '3d', // El token expirará en 3 días
    });

    // 8. Crear la respuesta de redirección y establecer la cookie
    const redirectUrl = new URL('/app', request.url);
    const response = NextResponse.redirect(redirectUrl);

    response.cookies.set({
      name: 'confessapps_token',
      value: token,
      httpOnly: false, // Permitir acceso desde JS en el cliente para WebSockets
      secure: process.env.NODE_ENV === 'production', // Solo enviar por HTTPS en producción
      sameSite: 'strict', // Protección CSRF
      maxAge: 60 * 60 * 24 * 3, // 3 días en segundos
      path: '/', // La cookie es válida para todo el sitio
    });

    return response;
  } catch (error: any) {
    console.error(error);

    // Manejar errores de MongoDB (ej. duplicado, aunque ya lo comprobamos)
    if (error.code === 11000) {
      if (error.keyPattern.username) {
        errors.push({ message: "El nombre de usuario ya está en uso." });
        return NextResponse.json({ message: "Este nombre de usuario ya está en uso.", errors: errors }, { status: 409 });
      }
      if (error.keyPattern.email) {
        errors.push({ message: "El correo electrónico ya está en uso." });
        return NextResponse.json({ message: "Este correo electrónico ya está en uso.", errors: errors }, { status: 409 });
      }
    }

    return NextResponse.json({ message: "Ha ocurrido un error interno en el servidor." }, { status: 500 });
  }
}