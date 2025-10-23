import mongoose, { Mongoose } from 'mongoose';

// Obtenemos la URI de conexión de las variables de entorno
const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error(
    'Por favor, define la variable de entorno MONGODB_URI dentro de .env.local'
  );
}

/**
 * La variable global se usa aquí para preservar la conexión a través de recargas en caliente en desarrollo.
 * De lo contrario, se crearían nuevas conexiones en cada cambio.
 */
declare global {
  var mongoose: {
    conn: Mongoose | null;
    promise: Promise<Mongoose> | null;
  };
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function connectDB() {
  // Si ya tenemos una conexión cacheada, la devolvemos
  if (cached.conn) {
    return cached.conn;
  }

  // Si no hay una promesa de conexión, la creamos
  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };

    cached.promise = mongoose.connect(MONGODB_URI!, opts).then((mongoose) => {
      return mongoose;
    });
  }

  try {
    // Esperamos a que la promesa se resuelva y guardamos la conexión
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    throw e;
  }

  return cached.conn;
}

export default connectDB;