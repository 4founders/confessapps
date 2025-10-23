import { useState } from "react";
import { ArrowLeft, Tag, Check } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Badge } from "../ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Separator } from "../ui/separator";

interface SummaryProps {
  billingCycle: 'monthly' | 'annual';
  onBack: () => void;
  onProceedToPayment: () => void;
  onCancel: () => void;
}

export function Summary({ billingCycle, onBack, onProceedToPayment, onCancel }: SummaryProps) {
  const [selectedBillingCycle, setSelectedBillingCycle] = useState<'monthly' | 'annual'>(billingCycle);
  const [discountCode, setDiscountCode] = useState("");
  const [appliedDiscount, setAppliedDiscount] = useState<{ code: string; percentage: number } | null>(null);

  const premiumPriceMonthly = 7990;
  const premiumPriceAnnual = Math.round(premiumPriceMonthly * 0.65); // 35% discount
  const annualSavingsPerMonth = premiumPriceMonthly - premiumPriceAnnual;

  const currentPrice = selectedBillingCycle === 'monthly' ? premiumPriceMonthly : premiumPriceAnnual;
  const basePrice = selectedBillingCycle === 'monthly' ? premiumPriceMonthly : premiumPriceMonthly * 12;
  const annualSavings = selectedBillingCycle === 'annual' ? annualSavingsPerMonth * 12 : 0;
  const discountAmount = appliedDiscount ? Math.round(basePrice * (appliedDiscount.percentage / 100)) : 0;
  const subtotal = basePrice - annualSavings - discountAmount;
  const total = subtotal;

  const formatPrice = (price: number) => {
    return `$${price.toLocaleString('es-CL')}`;
  };

  const handleApplyDiscount = () => {
    // Mock discount codes
    const validCodes = {
      'WELCOME10': 10,
      'SAVE20': 20,
      'PREMIUM15': 15
    };

    const code = discountCode.toUpperCase();
    if (validCodes[code as keyof typeof validCodes]) {
      setAppliedDiscount({
        code: code,
        percentage: validCodes[code as keyof typeof validCodes]
      });
    } else {
      // In a real app, you'd show an error message
      console.log('Código de descuento inválido');
    }
  };

  const premiumFeatures = [
    "Duración ilimitada en confesiones",
    "Elección de género del oyente",
    "Acceso multilenguaje",
    "Estadísticas de uso detalladas",
    "Acceso prioritario",
    "Atención al cliente preferente"
  ];

  return (
    <div className="min-h-screen bg-black text-white py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header with back button */}
        <div className="mb-8">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-4"
          >
            <ArrowLeft className="w-5 h-5" />
            Volver
          </button>
          <h1 className="text-3xl md:text-4xl font-bold text-white">
            Resumen de tu suscripción
          </h1>
          <p className="text-gray-400 mt-2">
            Revisa los detalles de tu plan Premium antes de proceder al pago
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left Column - Plan Selection & Details */}
          <div className="space-y-6">
            {/* Billing Cycle Selector */}
            <Card className="bg-gray-900 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">Ciclo de facturación</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <label className="flex items-center justify-between p-4 border border-gray-700 rounded-lg cursor-pointer hover:border-gray-600 transition-colors">
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="billing"
                        value="monthly"
                        checked={selectedBillingCycle === 'monthly'}
                        onChange={(e) => setSelectedBillingCycle(e.target.value as 'monthly')}
                        className="w-4 h-4 text-red-500"
                      />
                      <div>
                        <div className="text-white font-medium">Mensual</div>
                        <div className="text-gray-400 text-sm">Facturado cada mes</div>
                      </div>
                    </div>
                    <div className="text-white font-bold">
                      {formatPrice(premiumPriceMonthly)}
                    </div>
                  </label>

                  <label className="flex items-center justify-between p-4 border border-gray-700 rounded-lg cursor-pointer hover:border-gray-600 transition-colors">
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="billing"
                        value="annual"
                        checked={selectedBillingCycle === 'annual'}
                        onChange={(e) => setSelectedBillingCycle(e.target.value as 'annual')}
                        className="w-4 h-4 text-red-500"
                      />
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-white font-medium">Anual</span>
                          <Badge className="bg-gradient-to-r from-red-500 to-orange-500 text-white text-xs border-0">
                            Ahorra 35%
                          </Badge>
                        </div>
                        <div className="text-gray-400 text-sm">Facturado anualmente</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-white font-bold">
                        {formatPrice(premiumPriceAnnual)}
                      </div>
                      <div className="text-gray-400 text-sm line-through">
                        {formatPrice(premiumPriceMonthly)}
                      </div>
                    </div>
                  </label>
                </div>
              </CardContent>
            </Card>

            {/* Plan Details */}
            <Card className="bg-gray-900 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">Plan Premium</CardTitle>
                <p className="text-gray-400">
                  Acceso completo a todas las funciones de ConfessApps
                </p>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {premiumFeatures.map((feature, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <div className="flex-shrink-0 w-5 h-5 rounded-full bg-green-900 text-green-400 flex items-center justify-center">
                        <Check className="w-3 h-3" />
                      </div>
                      <span className="text-gray-200 text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Summary */}
          <div className="space-y-6">
            <Card className="bg-gray-900 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">Resumen del pedido</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Price Breakdown */}
                <div className="space-y-3">
                  <div className="flex justify-between text-gray-300">
                    <span>Plan Premium{selectedBillingCycle === 'monthly' ? ' (mensual)' : ''}</span>
                    <span>{formatPrice(basePrice)}</span>
                  </div>
                  
                  {selectedBillingCycle === 'annual' && (
                    <div className="flex justify-between text-green-400">
                      <span>Descuento anual (35%)</span>
                      <span>-{formatPrice(annualSavings)}</span>
                    </div>
                  )}

                  {appliedDiscount && (
                    <div className="flex justify-between text-green-400">
                      <span>Código: {appliedDiscount.code} ({appliedDiscount.percentage}%)</span>
                      <span>-{formatPrice(discountAmount)}</span>
                    </div>
                  )}

                  <Separator className="bg-gray-700" />
                  
                  <div className="flex justify-between text-gray-300">
                    <span>Subtotal</span>
                    <span>{formatPrice(subtotal)}</span>
                  </div>
                  
                  <Separator className="bg-gray-700" />
                  
                  <div className="flex justify-between text-white font-bold text-lg">
                    <span>Total</span>
                    <span>{formatPrice(total)}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Discount Code */}
            <Card className="bg-gray-900 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Tag className="w-5 h-5" />
                  Código de descuento
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex gap-2">
                  <Input
                    placeholder="Ingresa tu código"
                    value={discountCode}
                    onChange={(e) => setDiscountCode(e.target.value)}
                    className="bg-gray-800 border-gray-600 text-white placeholder-gray-400"
                  />
                  <Button
                    onClick={handleApplyDiscount}
                    variant="ghost"
                    className="text-white hover:bg-gray-800"
                    disabled={!discountCode.trim()}
                  >
                    Aplicar
                  </Button>
                </div>
                {appliedDiscount && (
                  <div className="mt-3 flex items-center gap-2 text-green-400 text-sm">
                    <Check className="w-4 h-4" />
                    Código aplicado correctamente
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className="space-y-3">
              <Button
                onClick={onProceedToPayment}
                className="w-full bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white py-3"
                size="lg"
              >
                Proceder al pago - {formatPrice(total)}
              </Button>
              
              <Button
                onClick={onCancel}
                variant="ghost"
                className="w-full text-white hover:bg-gray-800"
                size="lg"
              >
                Cancelar suscripción
              </Button>
            </div>

            {/* Payment Info */}
            <div className="text-center text-gray-400 text-sm">
              <p>Pago seguro con encriptación SSL</p>
              <p className="mt-1">Puedes cancelar en cualquier momento</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}