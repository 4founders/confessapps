import { Heart, Stethoscope, ShieldCheck } from "lucide-react";

export function HealthAnnouncements() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-emerald-50 py-16 px-4 relative overflow-hidden">
      {/* Abstract Background Elements - Same as Contact/Pricing */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Large circle - top left */}
        <div className="absolute -top-20 -left-20 w-40 h-40 bg-gradient-to-br from-rose-200/30 to-rose-300/20 rounded-full blur-sm"></div>
        
        {/* Medium circle - top right */}
        <div className="absolute top-32 -right-16 w-32 h-32 bg-gradient-to-br from-emerald-200/25 to-emerald-300/15 rounded-full blur-sm"></div>
        
        {/* Small floating heart shape - top center */}
        <div className="absolute top-24 left-1/3 w-6 h-6 bg-rose-300/40 rounded-full"></div>
        <div className="absolute top-20 left-1/3 translate-x-2 w-6 h-6 bg-rose-300/40 rounded-full"></div>
        
        {/* Diagonal lines - left side */}
        <div className="absolute top-1/4 left-8 w-24 h-0.5 bg-gradient-to-r from-rose-300/30 to-transparent rotate-45"></div>
        <div className="absolute top-1/4 left-8 translate-y-4 w-20 h-0.5 bg-gradient-to-r from-rose-300/20 to-transparent rotate-45"></div>
        
        {/* Geometric shapes - center */}
        <div className="absolute top-1/2 left-1/4 w-8 h-8 bg-emerald-200/30 rotate-45 rounded-sm"></div>
        <div className="absolute top-1/2 right-1/4 w-6 h-6 bg-rose-200/40 rotate-12 rounded-sm"></div>
        
        {/* Large circle - bottom right */}
        <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-gradient-to-tl from-emerald-200/25 to-emerald-300/15 rounded-full blur-sm"></div>
        
        {/* Medium circle - bottom left */}
        <div className="absolute bottom-20 -left-12 w-28 h-28 bg-gradient-to-tr from-rose-200/30 to-rose-300/20 rounded-full blur-sm"></div>
        
        {/* Small decorative dots */}
        <div className="absolute bottom-1/3 right-16 w-3 h-3 bg-emerald-400/50 rounded-full"></div>
        <div className="absolute bottom-1/3 right-16 translate-x-6 translate-y-2 w-2 h-2 bg-emerald-400/40 rounded-full"></div>
        <div className="absolute bottom-1/3 right-16 translate-x-12 translate-y-1 w-2 h-2 bg-emerald-400/30 rounded-full"></div>
        
        {/* Curved line decoration */}
        <div className="absolute bottom-1/4 left-16 w-16 h-16 border-2 border-rose-300/20 rounded-full"></div>
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            Anuncios de Salud
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Recursos y recomendaciones para tu bienestar emocional y mental, creados especialmente para nuestra comunidad.
          </p>
        </div>

        {/* Main Announcement Card */}
        <div className="relative">
          {/* Soft wavy shapes in the announcement component */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-3xl">
            {/* Flowing wave shapes for calmness */}
            <svg className="absolute top-0 left-0 w-full h-full opacity-30" viewBox="0 0 400 200" preserveAspectRatio="none">
              <path d="M0,50 Q100,20 200,50 T400,50 L400,0 L0,0 Z" fill="url(#wave1)" />
              <path d="M0,120 Q150,90 300,120 T600,120 L600,200 L0,200 Z" fill="url(#wave2)" />
              <defs>
                <linearGradient id="wave1" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" style={{ stopColor: '#fecaca', stopOpacity: 0.4 }} />
                  <stop offset="100%" style={{ stopColor: '#fed7d7', stopOpacity: 0.2 }} />
                </linearGradient>
                <linearGradient id="wave2" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" style={{ stopColor: '#a7f3d0', stopOpacity: 0.4 }} />
                  <stop offset="100%" style={{ stopColor: '#d1fae5', stopOpacity: 0.2 }} />
                </linearGradient>
              </defs>
            </svg>

            {/* Floating organic shapes for fluidity */}
            <div className="absolute top-8 right-8 w-16 h-12 bg-gradient-to-br from-rose-200/40 to-rose-300/30 rounded-full transform rotate-12 blur-[1px]"></div>
            <div className="absolute bottom-12 left-12 w-20 h-16 bg-gradient-to-tr from-emerald-200/40 to-emerald-300/30 rounded-full transform -rotate-6 blur-[1px]"></div>
            <div className="absolute top-1/2 left-1/3 w-12 h-8 bg-gradient-to-r from-teal-200/40 to-teal-300/30 rounded-full transform rotate-45 blur-[1px]"></div>

            {/* Soft flowing curves */}
            <div className="absolute top-1/4 right-1/4 w-24 h-6 bg-gradient-to-r from-transparent via-rose-200/30 to-transparent rounded-full transform rotate-12"></div>
            <div className="absolute bottom-1/3 left-1/4 w-32 h-4 bg-gradient-to-r from-transparent via-emerald-200/30 to-transparent rounded-full transform -rotate-6"></div>
          </div>

          {/* Main announcement content */}
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl border border-slate-200/50 p-12 md:p-16 shadow-lg relative z-10">
            {/* Central icon */}
            <div className="flex justify-center mb-8">
              <div className="w-20 h-20 bg-gradient-to-br from-rose-100 to-emerald-100 rounded-full flex items-center justify-center shadow-lg">
                <Heart className="w-10 h-10 text-rose-600" />
              </div>
            </div>

            {/* Main message */}
            <div className="text-center space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 leading-tight">
                Estamos construyendo este espacio para ti
              </h2>
              
              <p className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
                Muy pronto tendrás acceso a recursos de salud mental, consejos de bienestar emocional y recomendaciones profesionales, todo diseñado para complementar tu experiencia en ConfessApps.
              </p>

              {/* Feature preview icons */}
              <div className="flex justify-center items-center space-x-8 pt-8">
                <div className="flex flex-col items-center space-y-2">
                  <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center">
                    <Stethoscope className="w-6 h-6 text-emerald-600" />
                  </div>
                  <span className="text-sm text-slate-600">Recursos</span>
                </div>
                
                <div className="flex flex-col items-center space-y-2">
                  <div className="w-12 h-12 bg-rose-100 rounded-full flex items-center justify-center">
                    <Heart className="w-6 h-6 text-rose-600" />
                  </div>
                  <span className="text-sm text-slate-600">Bienestar</span>
                </div>
                
                <div className="flex flex-col items-center space-y-2">
                  <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center">
                    <ShieldCheck className="w-6 h-6 text-teal-600" />
                  </div>
                  <span className="text-sm text-slate-600">Prevención</span>
                </div>
              </div>

              {/* Soft divider */}
              <div className="pt-8">
                <div className="w-24 h-1 bg-gradient-to-r from-transparent via-slate-300 to-transparent rounded-full mx-auto"></div>
              </div>

              <p className="text-sm text-slate-500 pt-4">
                Mientras tanto, recuerda que siempre puedes conectarte con alguien que te escuche en nuestra plataforma principal.
              </p>
            </div>
          </div>
        </div>

        {/* Additional subtle elements */}
        <div className="text-center mt-12">
          <p className="text-slate-500 text-sm">
            ¿Tienes sugerencias para este espacio? {" "}
            <a href="#contacto" className="text-rose-600 hover:text-rose-700 font-medium transition-colors">
              Compártelas con nosotros
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}