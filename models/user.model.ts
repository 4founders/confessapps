import mongoose, { Schema } from 'mongoose';
import { avatarOptions } from '@/app/figma/data/avatarOptions';

// Definimos el esquema del usuario
const userSchema = new Schema({
  username: { 
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  birthdate: { type: String, required: true },
  gender: { type: String, required: true },
  country: { type: String, required: true },
  language: { type: String, required: true },
  email: {
    type: String,
    required: [true, "El correo es obligatorio."],
    unique: true, // El correo debe ser único
    trim: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: [true, "La contraseña es obligatoria."],
  },
  avatar: {
    type: Number,
    // Genera un número aleatorio entre 1 y la cantidad de avatares disponibles
    default: () => Math.floor(Math.random() * avatarOptions.length) + 1,
  },
  premium_date: {
    type: Date,
    // Establece la fecha 7 días en el futuro desde el momento de la creación
    default: () => new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
  },
}, {
  // Añade automáticamente los campos createdAt y updatedAt
  timestamps: true,
});

// Para evitar que el modelo se compile varias veces en desarrollo,
// verificamos si ya existe antes de crearlo.
const User = mongoose.models.User || mongoose.model('User', userSchema);

export default User;
