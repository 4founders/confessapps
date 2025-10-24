import { useState, useEffect } from "react";
import { Camera } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Switch } from "../ui/switch";
import { Separator } from "../ui/separator";
import { Badge } from "../ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import {
  Crown,
  User,
  Settings as SettingsIcon,
  Globe,
  Phone,
  Mic,
  MicOff,
  Check,
} from "lucide-react";
import { ImageWithFallback } from "../figma/ImageWithFallback";
import { avatarOptions } from "@/app/figma/data/avatarOptions";
import { useUser } from "@/context/UserContext";
import { languages, countries, genderOptions } from "../../data/countries-languages";
import { format } from 'date-fns';
import axios from "axios";
import { toast } from "sonner";

type PlanType = "free" | "premium";

// Available avatar options with cat images

interface SettingsPageProps {
  currentPlan: PlanType;
  setCurrentPlan: (plan: PlanType) => void;
  onNavigateToPremium: () => void;
}

export function SettingsPage({
  currentPlan,
  setCurrentPlan,
  onNavigateToPremium,
}: SettingsPageProps) {
  const { user, setUser } = useUser();

  // Si el usuario no se ha cargado, no renderizar nada (o un loader)
  if (!user) {
    return null;
  }

  // Estados para ajustes de perfil
  const [email, setEmail] = useState(user.email); //El Email, aunque se envie, no se puede modificar por ahora
  const [username, setUsername] = useState(user.username);
  const [currentAvatar, setCurrentAvatar] = useState(() => 
    avatarOptions.find(opt => opt.id === String(user.avatar)) || avatarOptions[0]
  );
  const [gender, setGender] = useState(user.gender);
  const [isAvatarModalOpen, setIsAvatarModalOpen] =
    useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Estados para ajustes generales
  const [appLanguage, setAppLanguage] = useState(user.settings.app_language);
  const [autoConnect, setAutoConnect] = useState(user.settings.autoconnect_call);
  const [confirmBeforeCall, setConfirmBeforeCall] = useState(user.settings.confirm_call);
  const [defaultPseudonym, setDefaultPseudonym] = useState(user.settings.seudonym_pred);
  const [muteOnStart, setMuteOnStart] = useState(user.settings.mic_off);

  const handleAvatarClick = () => {
    setIsAvatarModalOpen(true);
  };

  const handleAvatarChange = (newAvatar: typeof avatarOptions[0]) => {
    console.log("Avatar cambiado a:", newAvatar);
    setCurrentAvatar(newAvatar);
    // Opcional: Si quieres guardar inmediatamente sin presionar un botón de "Guardar"
    // podrías llamar a una función que haga la petición a la API aquí.
  };

  const handleSaveChanges = async () => {
    setIsSaving(true);
    setError(null);

    const dataToUpdate = {
      username,
      gender,
      avatar: Number(currentAvatar.id),
      settings: {
        app_language: appLanguage,
        autoconnect_call: autoConnect,
        confirm_call: confirmBeforeCall,
        seudonym_pred: defaultPseudonym, // Corregido: seudonym_pred -> seudonym_pred
        mic_off: muteOnStart,
      }
    };

    try {
      const response = await axios.put('/api/users/me', dataToUpdate);
      setUser(response.data); // Actualiza el contexto con el usuario devuelto por la API
      toast.success("Cambios guardados exitosamente", {
        position: "top-center",
        duration: 3000,
        classNames: {
          icon: 'text-green-500'
        }
      });
    } catch (err: any) {
      setError(err.response?.data?.message || "Ocurrió un error al guardar.");
      toast.error(err.response?.data?.message || "Ocurrió un error al guardar.", {
        position: "top-center",
        duration: 3000,
        classNames: {
          icon: 'text-red-500'
        }
      });

    } finally {
      setIsSaving(false);
    }


    setIsAvatarModalOpen(false);
  };

  const freeBenefits = [
    "Conexiones ilimitadas",
    "Llamadas básicas de voz",
    "Perfil básico",
  ];

  const premiumBenefits = [
    "Conexiones prioritarias",
    "Llamadas de alta calidad",
    "Funciones avanzadas de privacidad",
    "Soporte premium 24/7",
    "Sin anuncios",
    "Historial de conversaciones",
  ];

  return (
    <div className="min-h-screen bg-black text-white p-4 md:p-6">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold mb-2">Ajustes</h1>
          <p className="text-gray-400">
            Configura tu experiencia en ConfessApps
          </p>
        </div>

        {/* Ajustes de Perfil */}
        <Card className="bg-gray-900 border-gray-800">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-white">
              <User className="w-5 h-5" />
              Ajustes de Perfil
            </CardTitle>
            <CardDescription className="text-gray-400">
              Administra tu información personal y apariencia
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Avatar */}
            <div className="flex items-center gap-4">
              <div
                className="w-16 h-16 rounded-full overflow-hidden border-2 border-orange-500/50 hover:border-orange-500 transition-colors relative group cursor-pointer"
                onClick={handleAvatarClick}
              >
                <ImageWithFallback
                  src={currentAvatar.src}
                  alt="Profile Picture"
                  className="w-full h-full object-cover transition-all duration-200 group-hover:brightness-50"
                />
                {/* Camera overlay on hover */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  <div className="bg-white bg-opacity-20 rounded-full p-2">
                    <Camera className="w-4 h-4 text-white" />
                  </div>
                </div>
              </div>
              <div>
                <Label className="text-white">
                  Foto de perfil
                </Label>
                <p className="text-sm text-gray-400">
                  Haz clic en tu avatar para cambiarlo
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Email */}
              <div className="space-y-2">
                <Label htmlFor="email" className="text-white">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  disabled
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-gray-800 border-gray-700 text-white focus:border-orange-500"
                />
              </div>

              {/* Nombre de Usuario */}
              <div className="space-y-2">
                <Label
                  htmlFor="username"
                  className="text-white"
                >
                  Nombre de Usuario
                </Label>
                <Input
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="bg-gray-800 border-gray-700 text-white focus:border-orange-500"
                  placeholder="Ej: usuario_confess"
                />
              </div>

              {/* Fecha de Nacimiento */}
              <div className="space-y-2">
                <Label
                  htmlFor="birthDate"
                  className="text-white"
                >
                  Fecha de Nacimiento (YYYY-MM-DD)
                </Label>
                <Input
                  id="birthDate"
                  type="date"
                  value={format(new Date(user.birthdate), 'yyyy-MM-dd')}
                  disabled
                  className="bg-gray-800 border-gray-700 text-gray-400"
                />
                {/* <p className="text-xs text-gray-500">
                  No se puede modificar
                </p> */}
              </div>

              {/* País */}
              <div className="space-y-2">
                <Label htmlFor="country" className="text-white">
                  País
                </Label>
                <Input
                  id="country"
                  value={countries.find(c => c.value === user.country)?.label || user.country}
                  disabled
                  className="bg-gray-800 border-gray-700 text-gray-400"
                />
              </div>

              {/* Idioma */}
              <div className="space-y-2">
                <Label htmlFor="language" className="text-white">
                  Idioma
                </Label>
                <Input
                  id="language"
                  value={languages.find(l => l.value === user.language)?.label || user.language}
                  disabled
                  className="bg-gray-800 border-gray-700 text-gray-400"
                />
              </div>

              {/* Género */}
              <div className="space-y-2">
                <Label htmlFor="gender" className="text-white">
                  Género
                </Label>
                <Select value={gender} onValueChange={setGender}>
                  <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-800 border-gray-700">
                    {genderOptions.map((option) => (
                      <SelectItem
                        key={option.value}
                        value={option.value}
                        className="text-white hover:bg-gray-700"
                      >
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <Button 
              onClick={handleSaveChanges}
              disabled={isSaving}
              className="bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white disabled:opacity-50"
            >
              {isSaving ? 'Guardando...' : 'Guardar Cambios'}
            </Button>
          </CardContent>
        </Card>

        {/* Ajustes de Suscripción */}
        <Card className="bg-gray-900 border-gray-800">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-white">
              <Crown className="w-5 h-5" />
              Suscripción
            </CardTitle>
            <CardDescription className="text-gray-400">
              Administra tu plan de suscripción
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Estado actual del plan */}
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-white">
                  Plan{" "}
                  {currentPlan === "free"
                    ? "Gratuito"
                    : "Premium"}
                </h3>
                {currentPlan === "premium" && (
                  <p className="text-sm text-gray-400">
                    Activo hasta el 15 de septiembre 2025
                  </p>
                )}
              </div>
              <Badge
                variant={
                  currentPlan === "premium"
                    ? "default"
                    : "secondary"
                }
                className={
                  currentPlan === "premium"
                    ? "bg-gradient-to-r from-red-500 to-orange-500 text-white"
                    : "bg-gray-700 text-gray-300"
                }
              >
                {currentPlan === "free" ? "GRATIS" : "PREMIUM"}
              </Badge>
            </div>

            {/* Beneficios del plan actual */}
            <div>
              <h4 className="font-semibold text-white mb-3">
                Beneficios incluidos:
              </h4>
              <ul className="space-y-2">
                {(currentPlan === "free"
                  ? freeBenefits
                  : premiumBenefits
                ).map((benefit, index) => (
                  <li
                    key={index}
                    className="flex items-center gap-2 text-gray-300"
                  >
                    <Check className="w-4 h-4 text-green-500" />
                    {benefit}
                  </li>
                ))}
              </ul>
            </div>

            {/* Botones de acción */}
            <div className="flex gap-3">
              {currentPlan === "free" ? (
                <Button
                  className="bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white"
                  onClick={() => {
                    setCurrentPlan("premium");
                    onNavigateToPremium();
                  }}
                >
                  Mejorar a Premium
                </Button>
              ) : (
                <>
                  <Button
                    variant="ghost"
                    className="text-white hover:bg-gray-800"
                    onClick={() => setCurrentPlan("free")}
                  >
                    Administrar Suscripción
                  </Button>
                  <Button
                    variant="ghost"
                    className="text-gray-400 hover:text-white hover:bg-gray-800"
                    onClick={() => setCurrentPlan("free")}
                  >
                    Cancelar Plan
                  </Button>
                </>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Ajustes Generales */}
        <Card className="bg-gray-900 border-gray-800">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-white">
              <SettingsIcon className="w-5 h-5" />
              Ajustes Generales
            </CardTitle>
            <CardDescription className="text-gray-400">
              Configura las preferencias de la aplicación
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Idioma */}
            <div className="space-y-2">
              <Label className="text-white flex items-center gap-2">
                <Globe className="w-4 h-4" />
                Idioma de la aplicación
              </Label>
              <Select
                value={appLanguage}
                onValueChange={setAppLanguage}
              >
                <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 border-gray-700">
                  {languages.map((lang) => (
                    <SelectItem
                      key={lang.value}
                      value={lang.value}
                      className="text-white hover:bg-gray-700"
                    >
                      {lang.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <Separator className="bg-gray-700" />

            {/* Preferencias de llamada */}
            <div className="space-y-4">
              <h4 className="font-semibold text-white flex items-center gap-2">
                <Phone className="w-4 h-4" />
                Preferencias de llamada
              </h4>

              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-white">
                    Autoconexión
                  </Label>
                  <p className="text-sm text-gray-400">
                    Conectarme automáticamente al encontrar un
                    match
                  </p>
                </div>
                <Switch
                  checked={autoConnect}
                  onCheckedChange={setAutoConnect}
                  className="data-[state=checked]:bg-orange-500"
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-white">
                    Confirmar antes de iniciar llamada
                  </Label>
                  <p className="text-sm text-gray-400">
                    Mostrar un aviso antes de conectar
                  </p>
                </div>
                <Switch
                  checked={confirmBeforeCall}
                  onCheckedChange={setConfirmBeforeCall}
                  className="data-[state=checked]:bg-orange-500"
                />
              </div>
            </div>

            <Separator className="bg-gray-700" />

            {/* Seudónimo predeterminado */}
            <div className="space-y-2">
              <Label htmlFor="pseudonym" className="text-white">
                Seudónimo predeterminado (opcional)
              </Label>
              <Input
                id="pseudonym"
                value={defaultPseudonym}
                onChange={(e) =>
                  setDefaultPseudonym(e.target.value)
                }
                className="bg-gray-800 border-gray-700 text-white focus:border-orange-500"
                placeholder="Ej: Oyente empático"
              />
              <p className="text-xs text-gray-400">
                Se usará automáticamente si no escribes uno
                nuevo cada vez
              </p>
            </div>

            <Separator className="bg-gray-700" />

            {/* Privacidad en llamadas */}
            <div className="space-y-4">
              <h4 className="font-semibold text-white">
                Privacidad en llamadas
              </h4>

              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-white flex items-center gap-2">
                    {muteOnStart ? (
                      <MicOff className="w-4 h-4" />
                    ) : (
                      <Mic className="w-4 h-4" />
                    )}
                    Silenciar micrófono al iniciar
                  </Label>
                  <p className="text-sm text-gray-400">
                    Tu micrófono estará silenciado cuando
                    comience la llamada
                  </p>
                </div>
                <Switch
                  checked={muteOnStart}
                  onCheckedChange={setMuteOnStart}
                  className="data-[state=checked]:bg-orange-500"
                />
              </div>
            </div>

            <Button 
              onClick={handleSaveChanges}
              disabled={isSaving}
              className="bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white disabled:opacity-50"
            >
              {isSaving ? 'Guardando...' : 'Guardar Preferencias'}
            </Button>
          </CardContent>
        </Card>

        {/* Avatar Selection Modal */}
        <Dialog
          open={isAvatarModalOpen}
          onOpenChange={setIsAvatarModalOpen}
        >
          <DialogContent className="bg-gray-900 border-gray-800 text-white max-w-md">
            <DialogHeader>
              <DialogTitle className="text-center text-white">
                Cambiar Avatar
              </DialogTitle>
            </DialogHeader>

            <div className="py-4">
              <div className="grid grid-cols-3 gap-4 mb-6">
                {avatarOptions.map((avatar) => (
                  <div
                    key={avatar.id}
                    className={`relative w-20 h-20 rounded-full overflow-hidden cursor-pointer border-2 transition-all duration-200 ${
                      currentAvatar.id === avatar.id
                        ? "border-orange-500 ring-2 ring-orange-500 ring-opacity-50"
                        : "border-gray-600 hover:border-gray-500"
                    }`}
                    onClick={() => handleAvatarChange(avatar)}
                  >
                    <ImageWithFallback
                      src={avatar.src}
                      alt={avatar.alt}
                      className="w-full h-full object-cover"
                    />
                    {currentAvatar.id === avatar.id && (
                      <div className="absolute inset-0 bg-orange-500 bg-opacity-20 flex items-center justify-center">
                        <div className="w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center">
                          <div className="w-2 h-2 bg-white rounded-full"></div>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              <Button
                onClick={() => setIsAvatarModalOpen(false)}
                className="w-full bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white border-none"
              >
                Guardar Cambios
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}