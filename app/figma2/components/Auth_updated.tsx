import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Heart, Shield, Lock, Users, Mail, Eye, EyeOff, ArrowLeft, Sparkles, MessageCircle } from 'lucide-react';
import { countries, languages, genderOptions } from '../data/countries-languages';
import { ConfessAppsLogo } from './ConfessAppsLogo';

type AuthState = 'login' | 'register' | 'forgotPassword';

interface AuthProps {
  onNavigate?: (page: string) => void;
}

export function Auth({ onNavigate }: AuthProps) {
  const [authState, setAuthState] = useState<AuthState>('login');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [resetEmailSent, setResetEmailSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (authState === 'forgotPassword') {
      // Simular envío de email de recuperación
      setResetEmailSent(true);
      return;
    }
    
    // Aquí iría la lógica de autenticación para login y register
    console.log('Form submitted for:', authState);
  };

  const handleStateChange = (newState: AuthState) => {
    if (newState === authState) return;
    
    setIsTransitioning(true);
    // Resetear el estado de email enviado cuando cambiamos de vista
    setResetEmailSent(false);
    setTimeout(() => {
      setAuthState(newState);
      setTimeout(() => {
        setIsTransitioning(false);
      }, 50);
    }, 300);
  };

  const renderIllustrations = () => (
    <div className="relative flex items-center justify-center h-full overflow-hidden">
      {/* Background patterns */}
      <div className="absolute inset-0">
        <svg className="w-full h-full" viewBox="0 0 400 600" fill="none">
          {/* Animated geometric patterns */}
          <defs>
            <pattern id="authGrid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="1"/>
            </pattern>
            <radialGradient id="glowGradient" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="rgba(255,255,255,0.3)"/>
              <stop offset="100%" stopColor="rgba(255,255,255,0)"/>
            </radialGradient>
          </defs>
          <rect width="100%" height="100%" fill="url(#authGrid)"/>
          
          {/* Glowing orbs */}
          <circle cx="80" cy="120" r="40" fill="url(#glowGradient)" className="animate-pulse" style={{animationDelay: '0s', animationDuration: '4s'}}/>
          <circle cx="320" cy="280" r="30" fill="url(#glowGradient)" className="animate-pulse" style={{animationDelay: '2s', animationDuration: '5s'}}/>
          <circle cx="120" cy="480" r="35" fill="url(#glowGradient)" className="animate-pulse" style={{animationDelay: '1s', animationDuration: '4.5s'}}/>
          
          {/* Floating geometric shapes */}
          <polygon points="200,80 220,100 200,120 180,100" fill="rgba(255,255,255,0.1)" className="animate-pulse" style={{animationDelay: '1.5s'}}/>
          <polygon points="300,180 325,200 300,220 275,200" fill="rgba(255,255,255,0.15)" className="animate-pulse" style={{animationDelay: '3s'}}/>
          
          {/* Connection lines with animation */}
          <g className="animate-pulse" style={{animationDelay: '0.5s', animationDuration: '6s'}}>
            <path d="M80,120 Q200,80 320,280" stroke="rgba(255,255,255,0.2)" strokeWidth="2" fill="none"/>
            <path d="M320,280 Q200,400 120,480" stroke="rgba(255,255,255,0.2)" strokeWidth="2" fill="none"/>
          </g>
          
          {/* Sparkle effects */}
          <g className="animate-pulse" style={{animationDelay: '2.5s', animationDuration: '3s'}}>
            <circle cx="150" cy="200" r="2" fill="rgba(255,255,255,0.6)"/>
            <circle cx="250" cy="350" r="1.5" fill="rgba(255,255,255,0.5)"/>
            <circle cx="180" cy="400" r="2.5" fill="rgba(255,255,255,0.7)"/>
          </g>
        </svg>
      </div>

      {/* Main illustration content */}
      <div className={`relative z-10 text-center space-y-8 transition-opacity duration-500 ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}>
        <div className="space-y-6">
          {authState === 'login' && (
            <div className="space-y-6 animate-fade-in">
              <div className="flex justify-center">
                <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm border border-white/30 shadow-2xl">
                  <Shield className="w-10 h-10 text-white drop-shadow-lg" />
                </div>
              </div>
              <h2 className="text-3xl font-bold text-white drop-shadow-lg">Bienvenido de vuelta</h2>
              <p className="text-white/90 max-w-sm leading-relaxed drop-shadow-sm">
                Accede a tu cuenta para conectar con personas que realmente comprenden
              </p>
              <div className="flex justify-center space-x-4 mt-6">
                <div className="text-center">
                  <div className="w-12 h-12 bg-white/15 rounded-lg flex items-center justify-center mb-2 backdrop-blur-sm">
                    <Users className="w-6 h-6 text-white" />
                  </div>
                  <span className="text-xs text-white/80">Comunidad</span>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-white/15 rounded-lg flex items-center justify-center mb-2 backdrop-blur-sm">
                    <MessageCircle className="w-6 h-6 text-white" />
                  </div>
                  <span className="text-xs text-white/80">Conexión</span>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-white/15 rounded-lg flex items-center justify-center mb-2 backdrop-blur-sm">
                    <Heart className="w-6 h-6 text-white" />
                  </div>
                  <span className="text-xs text-white/80">Apoyo</span>
                </div>
              </div>
            </div>
          )}

          {authState === 'register' && (
            <div className="space-y-6 animate-fade-in">
              <div className="flex justify-center">
                <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm border border-white/30 shadow-2xl">
                  <Sparkles className="w-10 h-10 text-white drop-shadow-lg" />
                </div>
              </div>
              <h2 className="text-3xl font-bold text-white drop-shadow-lg">Únete a nuestra comunidad</h2>
              <p className="text-white/90 max-w-sm leading-relaxed drop-shadow-sm">
                Crea tu cuenta y comienza a formar parte de una red de apoyo genuino
              </p>
              <div className="space-y-3 mt-6">
                <div className="flex items-center justify-center space-x-2 text-white/80">
                  <div className="w-2 h-2 bg-white/60 rounded-full"></div>
                  <span className="text-sm">Conversaciones anónimas y seguras</span>
                </div>
                <div className="flex items-center justify-center space-x-2 text-white/80">
                  <div className="w-2 h-2 bg-white/60 rounded-full"></div>
                  <span className="text-sm">Conexiones significativas 24/7</span>
                </div>
                <div className="flex items-center justify-center space-x-2 text-white/80">
                  <div className="w-2 h-2 bg-white/60 rounded-full"></div>
                  <span className="text-sm">Comunidad de apoyo global</span>
                </div>
              </div>
            </div>
          )}

          {authState === 'forgotPassword' && (
            <div className="space-y-6 animate-fade-in">
              <div className="flex justify-center">
                <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm border border-white/30 shadow-2xl">
                  <Mail className="w-10 h-10 text-white drop-shadow-lg" />
                </div>
              </div>
              <h2 className="text-3xl font-bold text-white drop-shadow-lg">Recupera tu cuenta</h2>
              <p className="text-white/90 max-w-sm leading-relaxed drop-shadow-sm">
                Te enviaremos un enlace seguro para restablecer tu contraseña en minutos
              </p>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                <p className="text-white/80 text-sm">
                  Revisa tu bandeja de entrada y carpeta de spam después de enviar la solicitud
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Floating icons with improved positioning */}
        <div className="absolute inset-0 pointer-events-none">
          <Heart className="absolute top-16 left-12 w-5 h-5 text-white/40 animate-pulse" style={{animationDelay: '2s'}} />
          <Lock className="absolute bottom-28 right-12 w-4 h-4 text-white/40 animate-pulse" style={{animationDelay: '3s'}} />
          <Users className="absolute top-32 right-16 w-4 h-4 text-white/40 animate-pulse" style={{animationDelay: '1s'}} />
          <MessageCircle className="absolute bottom-40 left-8 w-5 h-5 text-white/40 animate-pulse" style={{animationDelay: '4s'}} />
          <Sparkles className="absolute top-1/2 left-6 w-3 h-3 text-white/40 animate-pulse" style={{animationDelay: '2.5s'}} />
        </div>
      </div>
    </div>
  );

  const renderForm = () => (
    <div className="flex items-center justify-center h-full p-8">
      <div className="w-full max-w-md">
        <div className={`space-y-6 transition-opacity duration-500 ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}>
          {/* Logo y título */}
          <div className="text-center space-y-2">
            <div 
              className="flex items-center justify-center space-x-2 mb-6 cursor-pointer hover:opacity-80 transition-opacity"
              onClick={() => onNavigate?.('landing')}
            >
              <div className="w-10 h-10 border-2 border-rose-500 rounded-full flex items-center justify-center shadow-lg bg-transparent">
                <ConfessAppsLogo className="w-6 h-6 object-contain" />
              </div>
              <span className="text-2xl font-bold">
                <span className="text-slate-900">Confess</span>
                <span className="text-rose-600">Apps</span>
              </span>
            </div>
            
            {authState === 'login' && (
              <div className="space-y-2">
                <h1 className="text-2xl font-bold text-slate-900">Iniciar Sesión</h1>
                <p className="text-slate-600">Accede a tu espacio seguro</p>
              </div>
            )}
            {authState === 'register' && (
              <div className="space-y-2">
                <h1 className="text-2xl font-bold text-slate-900">Crear Cuenta</h1>
                <p className="text-slate-600">Únete a nuestra comunidad de apoyo</p>
              </div>
            )}
            {authState === 'forgotPassword' && (
              <div className="space-y-3">
                <button
                  onClick={() => handleStateChange('login')}
                  className="flex items-center text-slate-600 hover:text-slate-900 transition-colors mx-auto"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Volver al inicio de sesión
                </button>
                <h1 className="text-2xl font-bold text-slate-900">Recuperar Contraseña</h1>
                <p className="text-slate-600">Ingresa tu email para continuar</p>
              </div>
            )}
          </div>

          {/* Formulario */}
          <div className="pr-2">
            <form onSubmit={handleSubmit} className="space-y-3">
              {authState === 'register' && (
                <>
                  <div className="space-y-1">
                    <Label htmlFor="name">Nombre completo</Label>
                    <Input
                      id="name"
                      type="text"
                      placeholder="Ingresa tu nombre"
                      required
                      className="h-10 bg-white border-slate-300 focus:border-rose-500 focus:ring-rose-500 transition-colors"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <Label htmlFor="birthdate">Fecha de nacimiento</Label>
                      <Input
                        id="birthdate"
                        type="date"
                        required
                        className="h-10 bg-white border-slate-300 focus:border-rose-500 focus:ring-rose-500 transition-colors"
                      />
                    </div>

                    <div className="space-y-1">
                      <Label htmlFor="gender">Género</Label>
                      <Select required>
                        <SelectTrigger className="h-10 bg-white border-slate-300 focus:border-rose-500 focus:ring-rose-500 transition-colors">
                          <SelectValue placeholder="Seleccionar" />
                        </SelectTrigger>
                        <SelectContent>
                          {genderOptions.map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <Label htmlFor="country">País</Label>
                      <Select required>
                        <SelectTrigger className="h-10 bg-white border-slate-300 focus:border-rose-500 focus:ring-rose-500 transition-colors">
                          <SelectValue placeholder="Seleccionar país" />
                        </SelectTrigger>
                        <SelectContent className="max-h-60">
                          {countries.map((country) => (
                            <SelectItem key={country.value} value={country.value}>
                              {country.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-1">
                      <Label htmlFor="language">Idioma</Label>
                      <Select required>
                        <SelectTrigger className="h-10 bg-white border-slate-300 focus:border-rose-500 focus:ring-rose-500 transition-colors">
                          <SelectValue placeholder="Seleccionar idioma" />
                        </SelectTrigger>
                        <SelectContent>
                          {languages.map((language) => (
                            <SelectItem key={language.value} value={language.value}>
                              {language.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </>
              )}

              {/* Mostrar mensaje de confirmación para forgotPassword */}
              {authState === 'forgotPassword' && resetEmailSent ? (
                <div className="text-center space-y-4 py-8">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Mail className="w-8 h-8 text-green-600" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-lg font-semibold text-slate-900">¡Correo enviado!</h3>
                    <p className="text-slate-600 leading-relaxed">
                      Se ha enviado un email de restablecimiento de contraseña a su correo electrónico.
                    </p>
                    <p className="text-sm text-slate-500">
                      Por favor, revise su bandeja de entrada y carpeta de spam.
                    </p>
                  </div>
                </div>
              ) : (
                <>
                  <div className="space-y-1">
                    <Label htmlFor="email">Correo electrónico</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="correo@ejemplo.com"
                      required
                      className="h-10 bg-white border-slate-300 focus:border-rose-500 focus:ring-rose-500 transition-colors"
                    />
                  </div>

                  {authState !== 'forgotPassword' && (
                    <div className="space-y-1">
                      <Label htmlFor="password">Contraseña</Label>
                      <div className="relative">
                        <Input
                          id="password"
                          type={showPassword ? 'text' : 'password'}
                          placeholder="••••••••"
                          required
                          className="h-10 bg-white border-slate-300 focus:border-rose-500 focus:ring-rose-500 pr-10 transition-colors"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                        >
                          {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>
                  )}

                  {authState === 'register' && (
                    <div className="space-y-1">
                      <Label htmlFor="confirmPassword">Confirmar contraseña</Label>
                      <div className="relative">
                        <Input
                          id="confirmPassword"
                          type={showConfirmPassword ? 'text' : 'password'}
                          placeholder="••••••••"
                          required
                          className="h-10 bg-white border-slate-300 focus:border-rose-500 focus:ring-rose-500 pr-10 transition-colors"
                        />
                        <button
                          type="button"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                        >
                          {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>
                  )}
                </>
              )}

              {!(authState === 'forgotPassword' && resetEmailSent) && (
                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-700 hover:to-pink-700 text-white py-2 h-10 rounded-lg font-semibold transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-[1.02] mt-4"
                >
                  {authState === 'login' && 'Iniciar Sesión'}
                  {authState === 'register' && 'Crear Cuenta'}
                  {authState === 'forgotPassword' && 'Enviar Enlace de Recuperación'}
                </Button>
              )}
            </form>
          </div>

          {/* Enlaces adicionales */}
          <div className="text-center space-y-4 pt-4">
            {authState === 'login' && (
              <>
                <button
                  onClick={() => handleStateChange('forgotPassword')}
                  className="text-rose-600 hover:text-rose-700 transition-colors hover:underline"
                >
                  ¿Olvidaste tu contraseña?
                </button>
                <div className="text-slate-600">
                  ¿No tienes cuenta?{' '}
                  <button
                    onClick={() => handleStateChange('register')}
                    className="text-rose-600 hover:text-rose-700 font-semibold transition-colors hover:underline"
                  >
                    Crear cuenta gratis
                  </button>
                </div>
              </>
            )}

            {authState === 'register' && (
              <>
                <div className="text-xs text-slate-500 leading-relaxed">
                  Al crear una cuenta, aceptas nuestros términos de servicio y política de privacidad
                </div>
                <div className="text-slate-600">
                  ¿Ya tienes cuenta?{' '}
                  <button
                    onClick={() => handleStateChange('login')}
                    className="text-rose-600 hover:text-rose-700 font-semibold transition-colors hover:underline"
                  >
                    Iniciar sesión
                  </button>
                </div>
              </>
            )}

            {authState === 'forgotPassword' && !resetEmailSent && (
              <div className="text-slate-600">
                ¿Recordaste tu contraseña?{' '}
                <button
                  onClick={() => handleStateChange('login')}
                  className="text-rose-600 hover:text-rose-700 font-semibold transition-colors hover:underline"
                >
                  Iniciar sesión
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen flex">
      {/* CSS para animaciones mejoradas */}
      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.6s ease-out;
        }
        /* Custom scrollbar */
        ::-webkit-scrollbar {
          width: 0px;
          background: transparent;
        }
        ::-webkit-scrollbar-track {
          background: transparent;
        }
        ::-webkit-scrollbar-thumb {
          background: transparent;
        }
        ::-webkit-scrollbar-thumb:hover {
          background: transparent;
        }
      `}</style>

      {/* Split screen layout con animaciones mejoradas y simultáneas */}
      <div className={`w-full lg:w-1/2 transition-all duration-700 ease-in-out ${
        authState === 'register' ? 'lg:order-2' : 'lg:order-1'
      }`}>
        <div className="h-full bg-white shadow-2xl relative z-10">
          {renderForm()}
        </div>
      </div>

      <div className={`hidden lg:block lg:w-1/2 transition-all duration-700 ease-in-out ${
        authState === 'register' ? 'lg:order-1' : 'lg:order-2'
      }`}>
        <div className="h-full bg-gradient-to-br from-rose-600 via-pink-600 to-orange-500 relative">
          {renderIllustrations()}
        </div>
      </div>

      {/* Mobile background para pantallas pequeñas */}
      <div className="lg:hidden absolute inset-0 bg-gradient-to-br from-rose-50 via-pink-50 to-orange-50 pointer-events-none"></div>
    </div>
  );
}