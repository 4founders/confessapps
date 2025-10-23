import { Button } from "./ui/button";
import { Users } from "lucide-react";

interface CallToActionProps {
  onNavigate?: (page: string) => void;
}

export function CallToAction({ onNavigate }: CallToActionProps) {
  return (
    <section className="min-h-screen bg-gradient-to-r from-rose-600 via-pink-600 to-orange-500 flex items-center justify-center">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="flex items-center justify-center mb-6">
          <Users className="w-12 h-12 text-white mr-4" />
          <h2 className="text-3xl sm:text-4xl font-bold text-white">
            ¿Listo para Conectar?
          </h2>
        </div>
        
        <p className="text-xl text-rose-100 mb-8">
          Miles de personas ya lo han hecho
        </p>
        
        <Button 
          size="lg"
          onClick={() => onNavigate?.("auth")}
          className="bg-white text-rose-600 hover:bg-rose-50 px-8 py-4 text-lg font-semibold rounded-full shadow-xl hover:shadow-2xl transition-all duration-300"
        >
          Únete a la comunidad
        </Button>
        
        {/* Estadísticas visuales */}
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-8 text-white">
          <div>
            <div className="text-3xl font-bold text-rose-100">+5,000</div>
            <div className="text-rose-200">Conversaciones diarias</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-rose-100">+15,000</div>
            <div className="text-rose-200">Usuarios activos</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-rose-100">98%</div>
            <div className="text-rose-200">Experiencias positivas</div>
          </div>
        </div>
      </div>
    </section>
  );
}