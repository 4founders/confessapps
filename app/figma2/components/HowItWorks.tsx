import { UserPlus, MessageCircle, Heart } from "lucide-react";

const steps = [
  {
    icon: UserPlus,
    title: "Regístrate",
    subtitle: "Crea tu cuenta de forma gratuita y anónima en menos de 2 minutos."
  },
  {
    icon: MessageCircle,
    title: "Elige tu rol",
    subtitle: "Decide si necesitas hablar para desahogarte o si quieres escuchar y ayudar."
  },
  {
    icon: Heart,
    title: "Conecta",
    subtitle: "Te emparejamos al instante con alguien que complementa perfectamente tus necesidades."
  }
];

export function HowItWorks() {
  return (
    <section className="py-16 bg-gradient-to-br from-slate-50 to-rose-50 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
            Cómo funciona
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            En solo 3 simples pasos estarás conectado con alguien que realmente comprende
          </p>
        </div>
        
        <div className="relative">
          {/* Additional Background Visual Elements */}
          <div className="absolute inset-0 pointer-events-none" style={{zIndex: 0}}>
            {/* Geometric background patterns */}
            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1000 600" fill="none">
              {/* Grid pattern background */}
              <defs>
                <pattern id="backgroundGrid" width="60" height="60" patternUnits="userSpaceOnUse">
                  <path d="M 60 0 L 0 0 0 60" fill="none" stroke="#f43f5e" strokeWidth="0.5" opacity="0.1"/>
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#backgroundGrid)"/>
              
              {/* Large decorative circles */}
              <circle cx="100" cy="100" r="80" fill="none" stroke="#ec4899" strokeWidth="2" opacity="0.1"/>
              <circle cx="900" cy="500" r="100" fill="none" stroke="#f97316" strokeWidth="2" opacity="0.1"/>
              <circle cx="800" cy="150" r="60" fill="none" stroke="#f43f5e" strokeWidth="1" opacity="0.15"/>
              
              {/* Floating geometric shapes */}
              <polygon points="150,50 180,80 150,110 120,80" fill="#f43f5e" opacity="0.1"/>
              <polygon points="850,400 880,430 850,460 820,430" fill="#ec4899" opacity="0.1"/>
              <polygon points="200,450 230,480 200,510 170,480" fill="#f97316" opacity="0.1"/>
              
              {/* Wave patterns */}
              <path d="M0,100 Q250,50 500,100 T1000,100" stroke="#f43f5e" strokeWidth="1" opacity="0.1" fill="none"/>
              <path d="M0,300 Q250,250 500,300 T1000,300" stroke="#ec4899" strokeWidth="1" opacity="0.1" fill="none"/>
              <path d="M0,500 Q250,450 500,500 T1000,500" stroke="#f97316" strokeWidth="1" opacity="0.1" fill="none"/>
              
              {/* Scattered dots */}
              <circle cx="300" cy="80" r="4" fill="#f43f5e" opacity="0.2"/>
              <circle cx="700" cy="120" r="3" fill="#ec4899" opacity="0.2"/>
              <circle cx="150" cy="300" r="5" fill="#f97316" opacity="0.2"/>
              <circle cx="850" cy="350" r="4" fill="#f43f5e" opacity="0.2"/>
              <circle cx="400" cy="450" r="3" fill="#ec4899" opacity="0.2"/>
              <circle cx="600" cy="480" r="4" fill="#f97316" opacity="0.2"/>
            </svg>
            
            {/* Radial gradients for depth */}
            <div className="absolute top-10 left-10 w-40 h-40 bg-gradient-radial from-rose-200 to-transparent opacity-20 rounded-full"></div>
            <div className="absolute top-20 right-20 w-32 h-32 bg-gradient-radial from-pink-200 to-transparent opacity-25 rounded-full"></div>
            <div className="absolute bottom-20 left-20 w-36 h-36 bg-gradient-radial from-orange-200 to-transparent opacity-20 rounded-full"></div>
            <div className="absolute bottom-10 right-10 w-28 h-28 bg-gradient-radial from-rose-200 to-transparent opacity-30 rounded-full"></div>
          </div>

          {/* Thick branch connectors SVG */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none hidden lg:block" viewBox="0 0 1000 600" style={{zIndex: 1}}>
            {/* Main thick branch from step 1 to step 2 - reaching center of blocks */}
            <path
              d="M 350 200 Q 450 150 500 180 Q 550 210 650 250"
              stroke="url(#branchGradient1)"
              strokeWidth="12"
              fill="none"
              opacity="0.7"
              strokeLinecap="round"
            />
            
            {/* Thick branch from step 2 to step 3 - reaching center of blocks */}
            <path
              d="M 650 320 Q 550 380 500 420 Q 450 460 350 480"
              stroke="url(#branchGradient2)"
              strokeWidth="12"
              fill="none"
              opacity="0.7"
              strokeLinecap="round"
            />
            
            {/* Secondary thinner branches */}
            <path d="M 370 180 Q 410 160 450 170" stroke="#f43f5e" strokeWidth="6" opacity="0.5" strokeLinecap="round"/>
            <path d="M 630 270 Q 670 250 710 260" stroke="#ec4899" strokeWidth="6" opacity="0.5" strokeLinecap="round"/>
            <path d="M 370 500 Q 410 520 450 510" stroke="#f97316" strokeWidth="6" opacity="0.5" strokeLinecap="round"/>
            
            {/* Organic nodes along branches */}
            <circle cx="420" cy="175" r="8" fill="#f43f5e" opacity="0.6"/>
            <circle cx="525" cy="200" r="10" fill="#ec4899" opacity="0.6"/>
            <circle cx="575" cy="350" r="8" fill="#f97316" opacity="0.6"/>
            <circle cx="420" cy="450" r="10" fill="#f43f5e" opacity="0.6"/>
            
            <defs>
              <linearGradient id="branchGradient1" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#f43f5e"/>
                <stop offset="50%" stopColor="#ec4899"/>
                <stop offset="100%" stopColor="#ec4899"/>
              </linearGradient>
              <linearGradient id="branchGradient2" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#ec4899"/>
                <stop offset="50%" stopColor="#f97316"/>
                <stop offset="100%" stopColor="#f97316"/>
              </linearGradient>
            </defs>
          </svg>

          {/* Dynamic abstract shapes with animations */}
          <div className="absolute inset-0 pointer-events-none" style={{zIndex: 1}}>
            {/* Floating abstract shape 1 */}
            <div 
              className="absolute w-20 h-20 bg-gradient-to-br from-rose-200 to-pink-300 opacity-30 animate-pulse"
              style={{
                top: '10%',
                left: '15%',
                borderRadius: '60% 40% 30% 70%',
                animationDuration: '3s',
                animationDelay: '0s'
              }}
            ></div>
            
            {/* Floating abstract shape 2 */}
            <div 
              className="absolute w-16 h-24 bg-gradient-to-br from-pink-200 to-orange-300 opacity-25 animate-pulse"
              style={{
                top: '20%',
                right: '20%',
                borderRadius: '40% 60% 70% 30%',
                animationDuration: '4s',
                animationDelay: '1s'
              }}
            ></div>
            
            {/* Floating abstract shape 3 */}
            <div 
              className="absolute w-12 h-16 bg-gradient-to-br from-orange-200 to-rose-300 opacity-35 animate-pulse"
              style={{
                bottom: '25%',
                left: '25%',
                borderRadius: '30% 70% 40% 60%',
                animationDuration: '5s',
                animationDelay: '2s'
              }}
            ></div>
            
            {/* Floating abstract shape 4 */}
            <div 
              className="absolute w-18 h-18 bg-gradient-to-br from-rose-300 to-pink-200 opacity-20 animate-pulse"
              style={{
                top: '60%',
                right: '15%',
                borderRadius: '70% 30% 60% 40%',
                animationDuration: '3.5s',
                animationDelay: '0.5s'
              }}
            ></div>
            
            {/* Additional floating shapes */}
            <div 
              className="absolute w-10 h-14 bg-gradient-to-br from-pink-300 to-rose-200 opacity-30 animate-pulse"
              style={{
                top: '35%',
                left: '80%',
                borderRadius: '40% 60% 30% 70%',
                animationDuration: '4.5s',
                animationDelay: '1.5s'
              }}
            ></div>
            
            <div 
              className="absolute w-8 h-10 bg-gradient-to-br from-orange-300 to-pink-200 opacity-25 animate-pulse"
              style={{
                bottom: '40%',
                right: '25%',
                borderRadius: '50% 30% 60% 40%',
                animationDuration: '3.8s',
                animationDelay: '2.2s'
              }}
            ></div>
            
            {/* Morphing shapes with CSS animations */}
            <div 
              className="absolute w-14 h-14 bg-gradient-to-br from-pink-300 to-orange-200 opacity-25"
              style={{
                top: '40%',
                left: '70%',
                borderRadius: '50% 50% 50% 50%',
                animation: 'morphShape 6s ease-in-out infinite'
              }}
            ></div>
            
            <div 
              className="absolute w-12 h-12 bg-gradient-to-br from-rose-300 to-pink-300 opacity-20"
              style={{
                top: '15%',
                left: '45%',
                borderRadius: '50% 50% 50% 50%',
                animation: 'morphShape 8s ease-in-out infinite reverse'
              }}
            ></div>
          </div>

          {/* CSS for morphing animation */}
          <style jsx>{`
            @keyframes morphShape {
              0%, 100% { 
                border-radius: 50% 50% 50% 50%;
                transform: rotate(0deg) scale(1);
              }
              25% { 
                border-radius: 60% 40% 30% 70%;
                transform: rotate(90deg) scale(1.1);
              }
              50% { 
                border-radius: 30% 70% 60% 40%;
                transform: rotate(180deg) scale(0.9);
              }
              75% { 
                border-radius: 70% 30% 40% 60%;
                transform: rotate(270deg) scale(1.05);
              }
            }
          `}</style>

          {/* Paso 1 - Más centrado horizontalmente */}
          <div className="flex flex-col lg:flex-row lg:justify-center mb-8 lg:mb-16 relative z-10">
            <div className="lg:w-1/3 lg:max-w-sm text-center lg:text-left lg:ml-[-100px]">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-rose-600 rounded-full mb-6 shadow-lg transform hover:scale-110 transition-transform duration-300">
                <UserPlus className="w-10 h-10 text-white" />
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md border border-slate-200 hover:shadow-lg transition-shadow duration-300 relative z-20">
                <div className="flex items-center justify-center lg:justify-start mb-3">
                  <span className="bg-rose-600 text-white px-3 py-1 rounded-full text-sm font-semibold mr-3">
                    Paso 1
                  </span>
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mb-3">
                  {steps[0].title}
                </h3>
                <p className="text-slate-600">
                  {steps[0].subtitle}
                </p>
              </div>
            </div>
          </div>

          {/* Paso 2 - Más centrado horizontalmente */}
          <div className="flex flex-col lg:flex-row lg:justify-center mb-8 lg:mb-16 relative z-10">
            <div className="lg:w-1/3 lg:max-w-sm text-center lg:text-right lg:mr-[-100px]">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-pink-600 rounded-full mb-6 shadow-lg transform hover:scale-110 transition-transform duration-300">
                <MessageCircle className="w-10 h-10 text-white" />
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md border border-slate-200 hover:shadow-lg transition-shadow duration-300 relative z-20">
                <div className="flex items-center justify-center lg:justify-end mb-3">
                  <span className="bg-pink-600 text-white px-3 py-1 rounded-full text-sm font-semibold mr-3">
                    Paso 2
                  </span>
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mb-3">
                  {steps[1].title}
                </h3>
                <p className="text-slate-600">
                  {steps[1].subtitle}
                </p>
              </div>
            </div>
          </div>

          {/* Paso 3 - Más centrado horizontalmente */}
          <div className="flex flex-col lg:flex-row lg:justify-center relative z-10">
            <div className="lg:w-1/3 lg:max-w-sm text-center lg:text-left lg:ml-[-100px]">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-orange-500 rounded-full mb-6 shadow-lg transform hover:scale-110 transition-transform duration-300">
                <Heart className="w-10 h-10 text-white" />
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md border border-slate-200 hover:shadow-lg transition-shadow duration-300 relative z-20">
                <div className="flex items-center justify-center lg:justify-start mb-3">
                  <span className="bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-semibold mr-3">
                    Paso 3
                  </span>
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mb-3">
                  {steps[2].title}
                </h3>
                <p className="text-slate-600">
                  {steps[2].subtitle}
                </p>
              </div>
            </div>
          </div>

          {/* Mobile connectors - simple arrows for smaller screens */}
          <div className="lg:hidden flex flex-col items-center">
            <div className="absolute top-1/4 left-1/2 transform -translate-x-1/2">
              <div className="w-8 h-8 rounded-full bg-rose-200 flex items-center justify-center">
                <div className="w-0 h-0 border-l-4 border-l-transparent border-r-4 border-r-transparent border-t-4 border-t-rose-500"></div>
              </div>
            </div>
            <div className="absolute top-3/4 left-1/2 transform -translate-x-1/2">
              <div className="w-8 h-8 rounded-full bg-pink-200 flex items-center justify-center">
                <div className="w-0 h-0 border-l-4 border-l-transparent border-r-4 border-r-transparent border-t-4 border-t-pink-500"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}