import { Shield, Heart, Phone, Lock, Globe, Gift } from "lucide-react";
import { Card, CardContent } from "./ui/card";

const features = [
  {
    icon: Lock,
    title: "Total Anonimato",
    subtitle: "Tu identidad permanece completamente privada y segura en cada conversación."
  },
  {
    icon: Heart,
    title: "Apoyo Genuino",
    subtitle: "Conecta con personas que realmente entienden y quieren ayudar sin juzgar."
  },
  {
    icon: Phone,
    title: "Llamadas de Voz 1 a 1",
    subtitle: "Conversaciones privadas de voz que crean conexiones humanas reales y auténticas."
  },
  {
    icon: Shield,
    title: "Entorno Seguro",
    subtitle: "Espacios protegidos y moderados para garantizar experiencias positivas."
  },
  {
    icon: Globe,
    title: "Conexión Global",
    subtitle: "Encuentra apoyo las 24 horas del día con personas de todo el mundo."
  },
  {
    icon: Gift,
    title: "Gratis para Empezar",
    subtitle: "Comienza tu viaje de sanación sin costo alguno, cuando lo necesites."
  }
];

export function WhyChooseUs() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
            Por qué elegir nuestra app
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Creamos un espacio único donde la empatía y el apoyo mutuo transforman vidas
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <Card key={index} className="border-slate-200 hover:shadow-lg transition-shadow duration-300">
                <CardContent className="p-6 text-center">
                  <div className="mx-auto w-16 h-16 bg-rose-100 rounded-full flex items-center justify-center mb-4">
                    <IconComponent className="w-8 h-8 text-rose-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-slate-900 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-slate-600 leading-relaxed">
                    {feature.subtitle}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}