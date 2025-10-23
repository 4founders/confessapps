import { Button } from "./ui/button";

interface HeroProps {
  onNavigate?: (page: string) => void;
}

export function Hero({ onNavigate }: HeroProps) {
  return (
    <section className="relative bg-gradient-to-br from-rose-50 via-pink-50 to-orange-50 pt-16 pb-20 sm:pt-24 sm:pb-28 overflow-hidden">
      {/* Brand Patterns */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Geometric brand pattern */}
        <svg className="absolute top-0 left-0 w-full h-full" viewBox="0 0 1200 800" fill="none">
          {/* Hexagonal pattern - top left */}
          <g opacity="0.1">
            <polygon points="100,50 130,70 130,110 100,130 70,110 70,70" fill="#f43f5e"/>
            <polygon points="170,90 200,110 200,150 170,170 140,150 140,110" fill="#ec4899"/>
            <polygon points="240,50 270,70 270,110 240,130 210,110 210,70" fill="#f97316"/>
          </g>
          
          {/* Grid pattern - center */}
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="url(#gridGradient)" strokeWidth="1" opacity="0.3"/>
            </pattern>
            <linearGradient id="gridGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#f43f5e"/>
              <stop offset="50%" stopColor="#ec4899"/>
              <stop offset="100%" stopColor="#f97316"/>
            </linearGradient>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" opacity="0.1"/>
          
          {/* Circular brand elements */}
          <g opacity="0.15">
            <circle cx="900" cy="150" r="60" fill="none" stroke="#f43f5e" strokeWidth="2"/>
            <circle cx="900" cy="150" r="40" fill="none" stroke="#ec4899" strokeWidth="1"/>
            <circle cx="900" cy="150" r="20" fill="#f97316"/>
          </g>
          
          {/* Diamond pattern - bottom right */}
          <g opacity="0.2" transform="translate(800, 500)">
            <polygon points="0,-20 20,0 0,20 -20,0" fill="#f43f5e"/>
            <polygon points="40,-20 60,0 40,20 20,0" fill="#ec4899"/>
            <polygon points="80,-20 100,0 80,20 60,0" fill="#f97316"/>
            <polygon points="20,-40 40,-20 20,0 0,-20" fill="#f43f5e"/>
            <polygon points="60,-40 80,-20 60,0 40,-20" fill="#ec4899"/>
          </g>
          
          {/* Triangular pattern - left side */}
          <g opacity="0.1" transform="translate(50, 300)">
            <polygon points="0,0 30,20 0,40" fill="#f43f5e"/>
            <polygon points="30,0 60,20 30,40" fill="#ec4899"/>
            <polygon points="60,0 90,20 60,40" fill="#f97316"/>
            <polygon points="15,40 45,60 15,80" fill="#f43f5e"/>
            <polygon points="45,40 75,60 45,80" fill="#ec4899"/>
          </g>
          
          {/* Connecting lines pattern */}
          <g opacity="0.08">
            <path d="M0,200 Q200,150 400,200 Q600,250 800,200 Q1000,150 1200,200" stroke="#f43f5e" strokeWidth="2" fill="none"/>
            <path d="M0,300 Q200,250 400,300 Q600,350 800,300 Q1000,250 1200,300" stroke="#ec4899" strokeWidth="2" fill="none"/>
            <path d="M0,400 Q200,350 400,400 Q600,450 800,400 Q1000,350 1200,400" stroke="#f97316" strokeWidth="2" fill="none"/>
          </g>
          
          {/* Dot pattern overlay */}
          <g opacity="0.3">
            <circle cx="200" cy="100" r="3" fill="#f43f5e"/>
            <circle cx="400" cy="120" r="2" fill="#ec4899"/>
            <circle cx="600" cy="180" r="4" fill="#f97316"/>
            <circle cx="800" cy="80" r="3" fill="#f43f5e"/>
            <circle cx="150" cy="400" r="2" fill="#ec4899"/>
            <circle cx="350" cy="450" r="3" fill="#f97316"/>
            <circle cx="750" cy="400" r="2" fill="#f43f5e"/>
            <circle cx="950" cy="350" r="4" fill="#ec4899"/>
          </g>
        </svg>
        
        {/* Floating brand elements with subtle animation */}
        <div className="absolute top-20 right-20 w-32 h-32 bg-gradient-to-br from-rose-100 to-pink-200 rounded-lg opacity-20 transform rotate-12 animate-pulse"></div>
        <div className="absolute bottom-20 left-20 w-24 h-24 bg-gradient-to-br from-orange-100 to-rose-200 opacity-15 transform rotate-45 animate-pulse" style={{animationDelay: '1s', borderRadius: '20% 80% 40% 60%'}}></div>
        <div className="absolute top-1/2 left-10 w-16 h-16 bg-gradient-to-br from-pink-100 to-rose-200 rounded-full opacity-25 animate-pulse" style={{animationDelay: '2s'}}></div>
        
        {/* Brand accent shapes */}
        <div className="absolute top-32 right-1/4 w-20 h-20 border-4 border-rose-200 transform rotate-45 opacity-20" style={{clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)'}}></div>
        <div className="absolute bottom-32 right-20 w-16 h-16 bg-gradient-to-br from-pink-200 to-orange-200 opacity-15 transform rotate-12" style={{borderRadius: '30% 70% 70% 30%'}}></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          {/* Frase principal grande */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 leading-tight mb-6">
            Un espacio seguro para{" "}
            <span className="text-rose-600">conectar corazones</span>{" "}
            que necesitan ser escuchados
          </h1>
          
          {/* Frase más pequeña */}
          <p className="text-lg sm:text-xl text-slate-600 max-w-3xl mx-auto mb-10 leading-relaxed">
            Conectamos personas que necesitan hablar con aquellas que desean escuchar. 
            Un lugar de apoyo genuino, comprensión y sanación emocional.
          </p>
          
          {/* Botón principal */}
          <Button 
            size="lg" 
            onClick={() => onNavigate?.("auth")}
            className="bg-rose-600 hover:bg-rose-700 text-white px-8 py-4 text-lg font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
          >
            Comienza gratis hoy
          </Button>
        </div>
      </div>
    </section>
  );
}