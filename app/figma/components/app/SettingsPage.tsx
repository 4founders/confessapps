import { useState } from "react";
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

type PlanType = "free" | "premium";

// Available avatar options with cat images
const avatarOptions = [
  {
    id: "1",
    src: "https://images.unsplash.com/photo-1710997740246-75b30937dd6d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjdXRlJTIwY2F0JTIwcG9ydHJhaXR8ZW58MXx8fHwxNzU2OTQwNTgxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    alt: "Gato actual",
  },
  {
    id: "2",
    src: "https://images.unsplash.com/photo-1712592000997-ea7ccaeb9725?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvcmFuZ2UlMjB0YWJieSUyMGNhdHxlbnwxfHx8fDE3NTY5NzUxMzZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    alt: "Gato naranja",
  },
  {
    id: "3",
    src: "https://images.unsplash.com/photo-1689871404673-cc43adec4ae8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxncmF5JTIwa2l0dGVufGVufDF8fHx8MTc1NjkyNTgxNXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    alt: "Gato gris",
  },
  {
    id: "4",
    src: "https://images.unsplash.com/photo-1657314310600-6a63e9ef1859?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxibGFjayUyMGNhdCUyMHBvcnRyYWl0fGVufDF8fHx8MTc1Njk4MDU5NXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    alt: "Gato negro",
  },
  {
    id: "5",
    src: "https://images.unsplash.com/photo-1704947807029-c75381b64869?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3aGl0ZSUyMGZsdWZmeSUyMGNhdHxlbnwxfHx8fDE3NTY5NzUxMzd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    alt: "Gato blanco",
  },
  {
    id: "6",
    src: "https://images.unsplash.com/photo-1568152950566-c1bf43f4ab28?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzaWFtZXNlJTIwY2F0fGVufDF8fHx8MTc1Njk4MTczM3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    alt: "Gato siamés",
  },
];

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
  // Estados para ajustes de perfil
  const [fullName] = useState("Juan Pérez");
  const [email, setEmail] = useState("juan.perez@example.com");
  const [address, setAddress] = useState(
    "Calle Principal 123, Santiago, Chile",
  );
  const [birthDate] = useState("1990-05-15");
  const [username, setUsername] = useState("felipe123");
  const [currentAvatar, setCurrentAvatar] = useState(
    avatarOptions[0],
  );
  const [selectedAvatar, setSelectedAvatar] = useState(
    avatarOptions[0],
  );
  const [isAvatarModalOpen, setIsAvatarModalOpen] =
    useState(false);

  // Estados para ajustes generales
  const [language, setLanguage] = useState("es");
  const [autoConnect, setAutoConnect] = useState(false);
  const [confirmBeforeCall, setConfirmBeforeCall] =
    useState(true);
  const [defaultPseudonym, setDefaultPseudonym] = useState("");
  const [muteOnStart, setMuteOnStart] = useState(false);

  const handleAvatarClick = () => {
    setSelectedAvatar(currentAvatar);
    setIsAvatarModalOpen(true);
  };

  const handleSaveAvatar = () => {
    setCurrentAvatar(selectedAvatar);
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
              {/* Nombre Completo */}
              <div className="space-y-2">
                <Label
                  htmlFor="fullName"
                  className="text-white"
                >
                  Nombre Completo
                </Label>
                <Input
                  id="fullName"
                  value={fullName}
                  disabled
                  className="bg-gray-800 border-gray-700 text-gray-400"
                />
                <p className="text-xs text-gray-500">
                  No se puede modificar
                </p>
              </div>

              {/* Email */}
              <div className="space-y-2">
                <Label htmlFor="email" className="text-white">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-gray-800 border-gray-700 text-white focus:border-orange-500"
                />
              </div>

              {/* Dirección */}
              <div className="space-y-2">
                <Label htmlFor="address" className="text-white">
                  Dirección
                </Label>
                <Input
                  id="address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="bg-gray-800 border-gray-700 text-white focus:border-orange-500"
                />
              </div>

              {/* Fecha de Nacimiento */}
              <div className="space-y-2">
                <Label
                  htmlFor="birthDate"
                  className="text-white"
                >
                  Fecha de Nacimiento
                </Label>
                <Input
                  id="birthDate"
                  type="date"
                  value={birthDate}
                  disabled
                  className="bg-gray-800 border-gray-700 text-gray-400"
                />
                <p className="text-xs text-gray-500">
                  No se puede modificar
                </p>
              </div>

              {/* Nombre de Usuario */}
              <div className="space-y-2 md:col-span-2">
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
            </div>

            <Button className="bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white">
              Guardar Cambios
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
                value={language}
                onValueChange={setLanguage}
              >
                <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 border-gray-700">
                  <SelectItem
                    value="es"
                    className="text-white hover:bg-gray-700"
                  >
                    Español
                  </SelectItem>
                  <SelectItem
                    value="en"
                    className="text-white hover:bg-gray-700"
                  >
                    English
                  </SelectItem>
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

            <Button className="bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white">
              Guardar Preferencias
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
                      selectedAvatar.id === avatar.id
                        ? "border-orange-500 ring-2 ring-orange-500 ring-opacity-50"
                        : "border-gray-600 hover:border-gray-500"
                    }`}
                    onClick={() => setSelectedAvatar(avatar)}
                  >
                    <ImageWithFallback
                      src={avatar.src}
                      alt={avatar.alt}
                      className="w-full h-full object-cover"
                    />
                    {selectedAvatar.id === avatar.id && (
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
                onClick={handleSaveAvatar}
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