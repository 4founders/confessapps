"use client";

import { useState, useEffect } from 'react';
import { ConfessAppsLogo } from '@/app/figma/components/ConfessAppsLogo';


// Pool de frases que se mostrarán aleatoriamente
const loadingPhrases = [
  "Conectando almas...",
  "Cargando confesiones...",
  "Preparando un espacio seguro...",
  "Sincronizando corazones...",
  "Un momento, por favor...",
  "Tejiendo conversaciones...",
  "Abriendo un nuevo capítulo...",
];

const Loading = () => {
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);

  useEffect(() => {
    // Cambia la frase cada 3 segundos
    const intervalId = setInterval(() => {
      setCurrentPhraseIndex((prevIndex) => (prevIndex + 1) % loadingPhrases.length);
    }, 3000);

    // Limpia el intervalo cuando el componente se desmonta para evitar fugas de memoria
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-gray-950">
      {/* Contenedor del logo */}
      <div className="relative">
        {/* Logo con animación de pulso */}
        <ConfessAppsLogo className="w-24  animate-pulse" />
      </div>

      {/* Texto que cambia */}
      <p className="mt-6 text-lg text-gray-300 font-light tracking-wider">
        {loadingPhrases[currentPhraseIndex]}
      </p>
    </div>
  );
};

export default Loading;