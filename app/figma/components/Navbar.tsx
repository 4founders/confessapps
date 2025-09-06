import { Button } from "./ui/button";
import { ConfessAppsLogo } from "./ConfessAppsLogo";

interface NavbarProps {
  currentPage?: string;
  onNavigate?: (page: string) => void;
}

export function Navbar({ currentPage = 'landing', onNavigate }: NavbarProps) {
  const handleNavigation = (page: string) => {
    if (onNavigate) {
      onNavigate(page);
    }
  };

  return (
    <nav className="w-full bg-white border-b border-slate-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div 
            className="flex items-center space-x-2 cursor-pointer" 
            onClick={() => handleNavigation('landing')}
          >
            <ConfessAppsLogo />
            <span className="text-xl font-semibold">
              <span className="text-slate-900">Confess</span>
              <span className="text-rose-600">Apps</span>
            </span>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            <button 
              onClick={() => handleNavigation('landing')}
              className={`transition-colors ${
                currentPage === 'landing' 
                  ? 'text-rose-600 font-medium' 
                  : 'text-slate-700 hover:text-rose-600'
              }`}
            >
              Inicio
            </button>
            <button 
              onClick={() => handleNavigation('pricing')}
              className={`transition-colors ${
                currentPage === 'pricing' 
                  ? 'text-rose-600 font-medium' 
                  : 'text-slate-700 hover:text-rose-600'
              }`}
            >
              Precios
            </button>
            <button 
              onClick={() => handleNavigation('contact')}
              className={`transition-colors ${
                currentPage === 'contact' 
                  ? 'text-rose-600 font-medium' 
                  : 'text-slate-700 hover:text-rose-600'
              }`}
            >
              Contacto
            </button>
            <button 
              onClick={() => handleNavigation('health-announcements')}
              className={`transition-colors ${
                currentPage === 'health-announcements' 
                  ? 'text-rose-600 font-medium' 
                  : 'text-slate-700 hover:text-rose-600'
              }`}
            >
              Anuncios de salud
            </button>
            <Button 
              variant="outline" 
              className="text-slate-700 border-slate-300 hover:bg-slate-50"
              onClick={() => handleNavigation('auth')}
            >
              Iniciar Sesión
            </Button>
            <Button 
              className="bg-rose-600 hover:bg-rose-700 text-white"
              onClick={() => handleNavigation('auth')}
            >
              Registrarse
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}