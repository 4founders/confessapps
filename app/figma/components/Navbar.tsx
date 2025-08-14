import { Heart } from "lucide-react";
import { Button } from "./ui/button";

export function Navbar() {
  return (
    <nav className="w-full bg-white border-b border-slate-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <Heart className="w-8 h-8 text-rose-500 fill-rose-500" />
            <span className="text-xl font-semibold text-slate-900">ConfessApps</span>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="#inicio" className="text-slate-700 hover:text-rose-600 transition-colors">
              Inicio
            </a>
            <a href="#anuncios" className="text-slate-700 hover:text-rose-600 transition-colors">
              Anuncios de salud
            </a>
            <a href="#contacto" className="text-slate-700 hover:text-rose-600 transition-colors">
              Contacto
            </a>
            <Button variant="outline" className="text-slate-700 border-slate-300 hover:bg-slate-50">
              Iniciar Sesión
            </Button>
            <Button className="bg-rose-600 hover:bg-rose-700 text-white">
              Registrarse
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}