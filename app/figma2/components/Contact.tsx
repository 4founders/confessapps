import { useState } from "react";
import { MessageCircle, Mail, Send, Globe } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Label } from "./ui/label";
import { Checkbox } from "./ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";

export function Contact() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    countryCode: '+56',
    message: '',
    services: {
      support: false,
      technical: false,
      billing: false,
      partnership: false,
      media: false,
      other: false
    }
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleServiceChange = (service: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      services: {
        ...prev.services,
        [service]: checked
      }
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Here you would handle the form submission
  };

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

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            Contacta a nuestro equipo
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Estamos aquí para ayudarte. Ponte en contacto con nosotros y resolveremos tus dudas sobre ConfessApps lo antes posible.
          </p>
        </div>

        {/* Main Content - Centered Layout */}
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Left Column - Contact Form */}
            <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name Fields */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">Nombre</Label>
                    <Input
                      id="firstName"
                      value={formData.firstName}
                      onChange={(e) => handleInputChange('firstName', e.target.value)}
                      placeholder="Tu nombre"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Apellido</Label>
                    <Input
                      id="lastName"
                      value={formData.lastName}
                      onChange={(e) => handleInputChange('lastName', e.target.value)}
                      placeholder="Tu apellido"
                      required
                    />
                  </div>
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <Label htmlFor="email">Correo electrónico</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    placeholder="tu@email.com"
                    required
                  />
                </div>

                {/* Phone */}
                <div className="space-y-2">
                  <Label htmlFor="phone">Número de teléfono</Label>
                  <div className="flex gap-2">
                    <Select value={formData.countryCode} onValueChange={(value) => handleInputChange('countryCode', value)}>
                      <SelectTrigger className="w-24">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="+56">+56</SelectItem>
                        <SelectItem value="+1">+1</SelectItem>
                        <SelectItem value="+34">+34</SelectItem>
                        <SelectItem value="+52">+52</SelectItem>
                        <SelectItem value="+54">+54</SelectItem>
                      </SelectContent>
                    </Select>
                    <Input
                      id="phone"
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      placeholder="123456789"
                      className="flex-1"
                    />
                  </div>
                </div>

                {/* Message */}
                <div className="space-y-2">
                  <Label htmlFor="message">Mensaje</Label>
                  <Textarea
                    id="message"
                    value={formData.message}
                    onChange={(e) => handleInputChange('message', e.target.value)}
                    placeholder="Cuéntanos cómo podemos ayudarte..."
                    rows={5}
                    required
                  />
                </div>

                {/* Services */}
                <div className="space-y-4">
                  <Label>Servicios de interés</Label>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-3">
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="support"
                          checked={formData.services.support}
                          onCheckedChange={(checked) => handleServiceChange('support', checked as boolean)}
                        />
                        <Label htmlFor="support" className="text-sm">Soporte técnico</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="billing"
                          checked={formData.services.billing}
                          onCheckedChange={(checked) => handleServiceChange('billing', checked as boolean)}
                        />
                        <Label htmlFor="billing" className="text-sm">Facturación</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="media"
                          checked={formData.services.media}
                          onCheckedChange={(checked) => handleServiceChange('media', checked as boolean)}
                        />
                        <Label htmlFor="media" className="text-sm">Prensa y medios</Label>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="technical"
                          checked={formData.services.technical}
                          onCheckedChange={(checked) => handleServiceChange('technical', checked as boolean)}
                        />
                        <Label htmlFor="technical" className="text-sm">Consulta técnica</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="partnership"
                          checked={formData.services.partnership}
                          onCheckedChange={(checked) => handleServiceChange('partnership', checked as boolean)}
                        />
                        <Label htmlFor="partnership" className="text-sm">Alianzas</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="other"
                          checked={formData.services.other}
                          onCheckedChange={(checked) => handleServiceChange('other', checked as boolean)}
                        />
                        <Label htmlFor="other" className="text-sm">Otros</Label>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Submit Button */}
                <Button type="submit" className="w-full bg-rose-600 hover:bg-rose-700 text-white">
                  <Send className="w-4 h-4 mr-2" />
                  Enviar mensaje
                </Button>
              </form>
            </div>

            {/* Right Column - Contact Options */}
            <div className="flex flex-col justify-center">
              {/* Chat Section */}
              <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center">
                    <MessageCircle className="w-6 h-6 text-emerald-600" />
                  </div>
                  <h3 className="text-2xl font-semibold text-slate-900">Chatea con nosotros</h3>
                </div>
                <p className="text-slate-600 mb-6 text-lg">
                  Obtén respuestas rápidas a través de nuestros canales de comunicación directa.
                </p>
                <div className="space-y-4">
                  <a 
                    href="mailto:contacto@confessapps.com" 
                    className="flex items-center gap-4 p-4 bg-slate-50 rounded-lg text-rose-600 hover:text-rose-700 hover:bg-slate-100 transition-all duration-200"
                  >
                    <Mail className="w-5 h-5" />
                    <span className="font-medium">Enviar un correo electrónico</span>
                  </a>
                  <a 
                    href="https://x.com" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 p-4 bg-slate-50 rounded-lg text-rose-600 hover:text-rose-700 hover:bg-slate-100 transition-all duration-200"
                  >
                    <Globe className="w-5 h-5" />
                    <span className="font-medium">Mensaje en X</span>
                  </a>
                  <a 
                    href="https://wa.me" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 p-4 bg-slate-50 rounded-lg text-rose-600 hover:text-rose-700 hover:bg-slate-100 transition-all duration-200"
                  >
                    <MessageCircle className="w-5 h-5" />
                    <span className="font-medium">Iniciar un chat en WhatsApp</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}