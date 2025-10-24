"use client";

import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import axios from 'axios';

// 1. Definir los tipos para los datos del usuario

/**
 * Interfaz para las configuraciones del usuario, basada en el esquema de Mongoose.
 */
export interface UserSettings {
  app_language: string;
  autoconnect_call: boolean;
  confirm_call: boolean;
  seudonym_pred: string;
  mic_off: boolean;
}

/**
 * Interfaz para el objeto de usuario completo.
 */
export interface User {
  _id: string;
  username: string;
  birthdate: string;
  gender: string;
  country: string;
  language: string;
  email: string;
  avatar: number;
  premium_date: string; // Se puede usar string o Date, dependiendo de cómo lo devuelva la API
  settings: UserSettings;
}

/**
 * Interfaz para el valor que proveerá el Context.
 */
interface UserContextType {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  isLoading: boolean;
}

// 2. Crear el Context con un valor por defecto
const UserContext = createContext<UserContextType | undefined>(undefined);

// 3. Crear el componente Provider
interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider = ({ children }: UserProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        // Intenta obtener los datos del usuario que tiene la sesión activa
        const response = await axios.get('/api/users/me');
        setUser(response.data);
        console.log("Usuario obtenido:", user);
      } catch (error) {
        // Si hay un error (ej. no hay token, token inválido), el usuario no se establece
        console.error("No se pudo obtener el usuario:", error);
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUser();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser, isLoading }}>
        {children}
    </UserContext.Provider>
  );
};

// 4. Crear un hook personalizado para usar el context fácilmente
export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser debe ser usado dentro de un UserProvider');
  }
  return context;
};