import mongoose, { Schema } from 'mongoose';
import { avatarOptions } from '@/app/figma/data/avatarOptions';

// Definimos el sub-esquema para las configuraciones del usuario
const settingsSchema = new Schema({
  app_language: { type: String, default: 'es' },
  autoconnect_call: { type: Boolean, default: true },
  confirm_call: { type: Boolean, default: false },
  seudonym_pred: { type: String },
  mic_off: { type: Boolean, default: false },
}, { _id: false }); // _id: false para evitar que Mongoose cree un _id para el subdocumento






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
  settings: {
    type: settingsSchema,
    default: () => ({})
  },
}, {
  // Añade automáticamente los campos createdAt y updatedAt
  timestamps: true,
});

// Hook para establecer el seudónimo predeterminado antes de guardar
userSchema.pre('save', function(next) {
  if (this.isNew && this.settings && !this.settings.seudonym_pred) {
    this.settings.seudonym_pred = this.username;
  }
  next();
});

// Para evitar que el modelo se compile varias veces en desarrollo,
// verificamos si ya existe antes de crearlo.
const User = mongoose.models.User || mongoose.model('User', userSchema);

export default User;
