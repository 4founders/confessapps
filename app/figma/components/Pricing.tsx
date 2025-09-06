import { useState } from "react";
import { Check } from "lucide-react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";

export function Pricing() {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('monthly');

  const premiumPriceMonthly = 7990;
  const premiumPriceAnnual = Math.round(premiumPriceMonthly * 0.65); // 35% discount

  const formatPrice = (price: number) => {
    return `$${price.toLocaleString('es-CL')}`;
  };

  const freeFeatures = [
    { text: "Duración máxima por confesión como hablante: Hasta 3 minutos", included: true },
    { text: "Cambio de seudónimo: Sí", included: true },
    { text: "Reportar confesiones preocupantes: Sí", included: true },
    { text: "Elección de género del oyente: No disponible", included: false },
    { text: "Elección de idioma del oyente: Solo idioma nativo", included: true },
    { text: "Acceso a idiomas adicionales: No", included: false },
    { text: "Ver estadísticas de uso: No", included: false },
    { text: "Acceso prioritario a confesarse: No", included: false },
    { text: "Atención al cliente preferente: No", included: false }
  ];

  const premiumFeatures = [
    { text: "Duración máxima por confesión como hablante: Sin límite de tiempo", included: true },
    { text: "Cambio de seudónimo: Sí (más opciones)", included: true },
    { text: "Elección de género del oyente: Sí", included: true },
    { text: "Elección de idioma del oyente: Multilenguaje", included: true },
    { text: "Acceso a idiomas adicionales: Sí", included: true },
    { text: "Reportar confesiones preocupantes: Sí", included: true },
    { text: "Ver estadísticas de uso: Sí", included: true },
    { text: "Acceso prioritario a confesarse: Sí", included: true },
    { text: "Atención al cliente preferente: Sí", included: true }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-emerald-50 py-16 px-4 relative overflow-hidden">
      {/* Abstract Background Elements */}
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

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            Planes y Precios
          </h1>
          <p className="text-lg text-slate-600 mb-8 max-w-2xl mx-auto">
            Desbloquea todo el potencial de ConfessApps con nuestra versión Premium. 
            Disfruta de conversaciones sin límites y funciones exclusivas diseñadas para una experiencia completa de apoyo emocional.
          </p>

          {/* Billing Toggle */}
          <div className="inline-flex items-center bg-white rounded-full p-1 border border-slate-200 shadow-sm">
            <button
              onClick={() => setBillingCycle('monthly')}
              className={`px-6 py-2 rounded-full transition-all duration-200 ${
                billingCycle === 'monthly'
                  ? 'bg-slate-900 text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Mensual
            </button>
            <button
              onClick={() => setBillingCycle('annual')}
              className={`px-6 py-2 rounded-full transition-all duration-200 flex items-center gap-2 ${
                billingCycle === 'annual'
                  ? 'bg-slate-900 text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Anual
              <Badge variant="secondary" className="bg-emerald-100 text-emerald-700 text-xs">
                Ahorra 35%
              </Badge>
            </button>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Free Plan */}
          <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm hover:shadow-md transition-shadow duration-200">
            <div className="mb-6">
              <h3 className="text-2xl font-bold text-slate-900 mb-2">Gratuito</h3>
              <div className="mb-3">
                <span className="text-4xl font-bold text-slate-900">$0</span>
              </div>
              <p className="text-slate-600">Para tus proyectos de hobby</p>
            </div>

            <div className="space-y-4 mb-8">
              {freeFeatures.map((feature, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className={`flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center mt-0.5 ${
                    feature.included 
                      ? 'bg-emerald-100 text-emerald-600' 
                      : 'bg-slate-100 text-slate-400'
                  }`}>
                    <Check className="w-3 h-3" />
                  </div>
                  <span className={`text-sm ${
                    feature.included ? 'text-slate-700' : 'text-slate-500 line-through'
                  }`}>
                    {feature.text}
                  </span>
                </div>
              ))}
            </div>

            <Button className="w-full bg-slate-900 hover:bg-slate-800 text-white">
              Comienza gratis
            </Button>
          </div>

          {/* Premium Plan */}
          <div className="bg-white rounded-2xl border-2 border-rose-200 p-8 shadow-sm hover:shadow-md transition-shadow duration-200 relative">
            <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
              <Badge className="bg-rose-600 text-white px-4 py-1">
                Más Popular
              </Badge>
            </div>
            
            <div className="mb-6">
              <h3 className="text-2xl font-bold text-slate-900 mb-2">Premium</h3>
              <div className="mb-3">
                <span className="text-4xl font-bold text-slate-900">
                  {billingCycle === 'monthly' 
                    ? formatPrice(premiumPriceMonthly)
                    : formatPrice(premiumPriceAnnual)
                  }
                </span>
                {billingCycle === 'annual' && (
                  <span className="text-lg text-slate-500 line-through ml-2">
                    {formatPrice(premiumPriceMonthly)}
                  </span>
                )}
              </div>
              <p className="text-slate-600">
                Por usuario/mes, facturado {billingCycle === 'monthly' ? 'mensualmente' : 'anualmente'}
              </p>
              <p className="text-slate-600 mt-1">Para usuarios avanzados</p>
            </div>

            <div className="space-y-4 mb-8">
              {premiumFeatures.map((feature, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-5 h-5 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mt-0.5">
                    <Check className="w-3 h-3" />
                  </div>
                  <span className="text-sm text-slate-700">
                    {feature.text}
                  </span>
                </div>
              ))}
            </div>

            <Button className="w-full bg-rose-600 hover:bg-rose-700 text-white">
              Comienza con Premium
            </Button>
          </div>
        </div>

        {/* Additional Info */}
        <div className="text-center mt-12">
          <p className="text-slate-600">
            ¿Tienes preguntas? {" "}
            <a href="#contacto" className="text-rose-600 hover:text-rose-700 font-medium">
              Contáctanos
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}