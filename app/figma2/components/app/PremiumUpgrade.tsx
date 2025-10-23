import { useState } from "react";
import { Check, X } from "lucide-react";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";

interface PremiumUpgradeProps {
  onClose: () => void;
  onUpgrade: () => void;
  onNavigateToSummary: (billingCycle: 'monthly' | 'annual') => void;
}

export function PremiumUpgrade({ onClose, onUpgrade, onNavigateToSummary }: PremiumUpgradeProps) {
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

  const handleUpgrade = () => {
    onUpgrade();
    onNavigateToSummary(billingCycle);
  };

  return (
    <div className="min-h-screen bg-black text-white py-8 px-4 relative">
      {/* Close Button */}
      <button
        onClick={onClose}
        className="absolute top-6 right-6 w-10 h-10 bg-gray-800 hover:bg-gray-700 rounded-full flex items-center justify-center transition-colors"
      >
        <X className="w-5 h-5" />
      </button>

      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Desbloquea nuevas oportunidades
          </h1>
          <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
            Desbloquea todo el potencial de ConfessApps con nuestra versión Premium. 
            Disfruta de conversaciones sin límites y funciones exclusivas diseñadas para una experiencia completa de apoyo emocional.
          </p>

          {/* Billing Toggle */}
          <div className="inline-flex items-center bg-gray-800 rounded-full p-1 border border-gray-700">
            <button
              onClick={() => setBillingCycle('monthly')}
              className={`px-6 py-2 rounded-full transition-all duration-200 ${
                billingCycle === 'monthly'
                  ? 'bg-white text-black'
                  : 'text-gray-300 hover:text-white'
              }`}
            >
              Mensual
            </button>
            <button
              onClick={() => setBillingCycle('annual')}
              className={`px-6 py-2 rounded-full transition-all duration-200 flex items-center gap-2 ${
                billingCycle === 'annual'
                  ? 'bg-white text-black'
                  : 'text-gray-300 hover:text-white'
              }`}
            >
              Anual
              <Badge variant="secondary" className="bg-gradient-to-r from-red-500 to-orange-500 text-white text-xs border-0">
                Ahorra 35%
              </Badge>
            </button>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Free Plan */}
          <div className="bg-gray-900 rounded-2xl border border-gray-700 p-8 shadow-lg">
            <div className="mb-6">
              <h3 className="text-2xl font-bold text-white mb-2">Gratuito</h3>
              <div className="mb-3">
                <span className="text-4xl font-bold text-white">$0</span>
              </div>
              <p className="text-gray-300">Para tus proyectos de hobby</p>
            </div>

            <div className="space-y-4 mb-8">
              {freeFeatures.map((feature, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className={`flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center mt-0.5 ${
                    feature.included 
                      ? 'bg-green-900 text-green-400' 
                      : 'bg-gray-800 text-gray-500'
                  }`}>
                    <Check className="w-3 h-3" />
                  </div>
                  <span className={`text-sm ${
                    feature.included ? 'text-gray-200' : 'text-gray-500 line-through'
                  }`}>
                    {feature.text}
                  </span>
                </div>
              ))}
            </div>

            <Button 
              disabled
              className="w-full bg-gray-700 text-gray-400 cursor-not-allowed"
            >
              Plan Actual
            </Button>
          </div>

          {/* Premium Plan */}
          <div className="bg-gray-900 rounded-2xl border-2 border-red-500 p-8 shadow-lg relative">
            <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
              <Badge className="bg-gradient-to-r from-red-500 to-orange-500 text-white px-4 py-1 border-0">
                Más Popular
              </Badge>
            </div>
            
            <div className="mb-6">
              <h3 className="text-2xl font-bold text-white mb-2">Premium</h3>
              <div className="mb-3">
                <span className="text-4xl font-bold text-white">
                  {billingCycle === 'monthly' 
                    ? formatPrice(premiumPriceMonthly)
                    : formatPrice(premiumPriceAnnual)
                  }
                </span>
                {billingCycle === 'annual' && (
                  <span className="text-lg text-gray-400 line-through ml-2">
                    {formatPrice(premiumPriceMonthly)}
                  </span>
                )}
              </div>
              <p className="text-gray-300">
                Por usuario/mes, facturado {billingCycle === 'monthly' ? 'mensualmente' : 'anualmente'}
              </p>
              <p className="text-gray-300 mt-1">Para usuarios avanzados</p>
            </div>

            <div className="space-y-4 mb-8">
              {premiumFeatures.map((feature, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-5 h-5 rounded-full bg-green-900 text-green-400 flex items-center justify-center mt-0.5">
                    <Check className="w-3 h-3" />
                  </div>
                  <span className="text-sm text-gray-200">
                    {feature.text}
                  </span>
                </div>
              ))}
            </div>

            <Button 
              onClick={handleUpgrade}
              className="w-full bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white"
            >
              Comienza con Premium
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}