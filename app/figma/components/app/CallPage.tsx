import { useState } from "react";
import {
  PhoneOff,
  MessageSquare,
  AlertTriangle,
  Headphones,
  MicOff,
} from "lucide-react";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { ImageWithFallback } from "../figma/ImageWithFallback";
import { toast } from "sonner";

interface CallPageProps {
  onEndCall: () => void;
}

export function CallPage({ onEndCall }: CallPageProps) {
  const [is_over, setIsOver] = useState(true);
  const [isAudioEnabled, setIsAudioEnabled] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [showSOSMenu, setShowSOSMenu] = useState(false);

  const handleEndCall = () => {
    setIsOver(true);
  };

  const handleSOS = () => {
    setShowSOSMenu(!showSOSMenu);
  };

  const handleSOSOption = (option: string) => {
    setShowSOSMenu(false);
    toast.success("Su advertencia ha sido recibida con éxito", {
      position: "top-center",
      duration: 3000,
    });
  };

  const handleToggleMute = () => {
    setIsMuted(!isMuted);
  };

  const handleToggleAudio = () => {
    setIsAudioEnabled(!isAudioEnabled);
  };

  const handleSpeak = () => {
    // TODO: Implement speak functionality
    console.log("Speak button clicked");
  };

  const handleContinueCall = () => {
    setIsOver(false);
  };

  const handleFinalizeCall = () => {
    onEndCall();
  };

  return (
    <div className="h-screen bg-black text-white flex flex-col">
      {/* User Rows */}
      <div className="flex-1 flex flex-col">
        {/* Other User Row */}
        <div className="flex-1 flex items-center justify-center border-b border-gray-800">
          <div className="text-center">
            <div className="w-32 h-32 rounded-full overflow-hidden mx-auto mb-4 border-4 border-gray-700">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1670166953612-6bedb26d8c81?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvcmFuZ2UlMjB0YWJieSUyMGNhdCUyMGZhY2V8ZW58MXx8fHwxNzU1ODkwNzMzfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Other User Profile"
                className="w-full h-full object-cover"
              />
            </div>
            <h2 className="text-xl font-semibold text-white mb-2">
              @daniel123
            </h2>
            <div className="flex items-center justify-center space-x-2">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-green-400 text-sm">
                En línea
              </span>
            </div>
          </div>
        </div>

        {/* Current User Row */}
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="w-32 h-32 rounded-full overflow-hidden mx-auto mb-4 border-4 border-gray-700">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1710997740246-75b30937dd6d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjdXRlJTIwY2F0JTIwcG9ydHJhaXR8ZW58MXx8fHwxNzU1ODQ0MDcxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Your Profile"
                className="w-full h-full object-cover"
              />
            </div>
            <h2 className="text-xl font-semibold text-white mb-2">
              @felipe123
            </h2>
            <div className="flex items-center justify-center space-x-2">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-green-400 text-sm">
                En línea
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Control Buttons */}
      <div className="p-6 bg-gray-900 border-t border-gray-800">
        <div className="flex justify-center space-x-4 relative">
          {/* Hang Up Button */}
          <Button
            onClick={handleEndCall}
            className="w-14 h-14 rounded-full bg-red-600 hover:bg-red-700 text-white flex items-center justify-center p-0"
          >
            <PhoneOff className="w-6 h-6" />
          </Button>

          {/* Speak Button - Hidden */}
          <Button
            onClick={handleSpeak}
            className="w-14 h-14 rounded-full bg-gray-700 hover:bg-gray-600 text-white flex items-center justify-center p-0 hidden"
          >
            <MessageSquare className="w-6 h-6" />
          </Button>

          {/* SOS Button with Dropdown Menu */}
          <div className="relative">
            {showSOSMenu && (
              <div className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 bg-gray-800 rounded-lg shadow-lg border border-gray-700 py-2 min-w-[280px] z-50">
                <button
                  onClick={() => handleSOSOption("Compañero en peligro")}
                  className="w-full text-left px-4 py-3 text-white hover:bg-gray-700 transition-colors text-sm"
                >
                  Compañero en peligro
                </button>
                <button
                  onClick={() => handleSOSOption("Compañero no respeta su rol")}
                  className="w-full text-left px-4 py-3 text-white hover:bg-gray-700 transition-colors text-sm"
                >
                  Compañero no respeta su rol
                </button>
                <button
                  onClick={() => handleSOSOption("Compañero realiza actividad inadecuada")}
                  className="w-full text-left px-4 py-3 text-white hover:bg-gray-700 transition-colors text-sm"
                >
                  Compañero realiza actividad inadecuada
                </button>
              </div>
            )}
            <Button
              onClick={handleSOS}
              className="w-14 h-14 rounded-full bg-yellow-600 hover:bg-yellow-700 text-white flex items-center justify-center p-0"
            >
              <AlertTriangle className="w-6 h-6" />
            </Button>
          </div>

          {/* Audio Button */}
          <Button
            onClick={handleToggleAudio}
            className={`w-14 h-14 rounded-full ${
              isAudioEnabled 
                ? 'bg-gray-500 hover:bg-gray-600' 
                : 'bg-gray-700 hover:bg-gray-600'
            } text-white flex items-center justify-center p-0`}
          >
            <Headphones className="w-6 h-6" />
          </Button>

          {/* Mute Button */}
          <Button
            onClick={handleToggleMute}
            className={`w-14 h-14 rounded-full ${
              isMuted 
                ? 'bg-gray-500 hover:bg-gray-600' 
                : 'bg-gray-700 hover:bg-gray-600'
            } text-white flex items-center justify-center p-0`}
          >
            <MicOff className="w-6 h-6" />
          </Button>
        </div>

        {/* Button Labels */}
        <div className="flex justify-center space-x-4 mt-3">
          <span className="text-xs text-gray-400 w-14 text-center">
            Colgar
          </span>
          <span className="text-xs text-gray-400 w-14 text-center hidden">
            Hablar
          </span>
          <span className="text-xs text-gray-400 w-14 text-center">
            SOS
          </span>
          <span className="text-xs text-gray-400 w-14 text-center">
            Audio
          </span>
          <span className="text-xs text-gray-400 w-14 text-center">
            Mutear
          </span>
        </div>
      </div>

      {/* Modal de confirmación cuando is_over es true */}
      {is_over && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <Card className="w-full max-w-md bg-gray-900 border-gray-700 text-white">
            <CardHeader className="text-center">
              <CardTitle className="text-xl text-white">
                ¿Deseas continuar en llamada con
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-center">
                <span className="text-2xl font-semibold text-orange-400">
                  @daniel123
                </span>
              </div>
              <div className="flex space-x-3">
                <Button
                  onClick={handleContinueCall}
                  className="flex-1 bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white border-0"
                >
                  Continuar
                </Button>
                <Button
                  onClick={handleFinalizeCall}
                  variant="ghost"
                  className="flex-1 text-white hover:bg-gray-800"
                >
                  Finalizar
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}