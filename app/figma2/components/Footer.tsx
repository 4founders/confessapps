import { Instagram, Facebook, MessageCircle } from "lucide-react";

interface FooterProps {
  onNavigate?: (page: string) => void;
}

export function Footer({ onNavigate }: FooterProps = {}) {
  return (
    <footer className="bg-slate-900 text-slate-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Enlaces principales */}
        <div className="flex flex-wrap justify-center gap-6 mb-6">
          <a href="#acerca" className="hover:text-rose-400 transition-colors">
            Acerca de
          </a>
          <button 
            onClick={() => onNavigate?.("terms")}
            className="hover:text-rose-400 transition-colors"
          >
            Términos y condiciones
          </button>
          <button 
            onClick={() => onNavigate?.("contact")}
            className="hover:text-rose-400 transition-colors"
          >
            Contacto
          </button>
          <button 
            onClick={() => onNavigate?.("health-announcements")}
            className="hover:text-rose-400 transition-colors"
          >
            Anuncios de ayuda
          </button>
        </div>
        
        {/* Logos de redes sociales */}
        <div className="flex justify-center gap-6 mb-6">
          <a 
            href="https://www.instagram.com" 
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-rose-400 transition-colors" 
            aria-label="Instagram"
          >
            <Instagram className="w-6 h-6" />
          </a>
          <a 
            href="https://www.facebook.com" 
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-rose-400 transition-colors" 
            aria-label="Facebook"
          >
            <Facebook className="w-6 h-6" />
          </a>
          <a 
            href="https://x.com" 
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-rose-400 transition-colors" 
            aria-label="X (Twitter)"
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
            </svg>
          </a>
          <a 
            href="https://www.whatsapp.com" 
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-rose-400 transition-colors" 
            aria-label="WhatsApp"
          >
            <MessageCircle className="w-6 h-6" />
          </a>
        </div>
        
        {/* Copyright */}
        <div className="text-center text-sm text-slate-400 border-t border-slate-700 pt-6">
          Todos los derechos reservados ConfessApps 2025
        </div>
      </div>
    </footer>
  );
}