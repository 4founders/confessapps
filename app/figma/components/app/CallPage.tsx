import { useState, useRef, useEffect, MutableRefObject } from "react";
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
import { avatarOptions } from "@/app/figma/data/avatarOptions";
import { useUser } from "@/context/UserContext";
import { Socket } from "socket.io-client";

interface CallPageProps {
  onEndCall: () => void;
  localStream: MediaStream | null;
  remoteStream: MediaStream | null;
  opponentUsername: string;
  opponentAvatar: number;
  userNickname: string;
  socketRef: MutableRefObject<Socket | null>;
  callIdRef: MutableRefObject<string | null>;
}

export function CallPage({ onEndCall, localStream, remoteStream, opponentUsername, opponentAvatar, userNickname, socketRef, callIdRef }: CallPageProps) {
  const { user } = useUser();

  if (!user) {
    return null; // O un componente de carga si el usuario aún no está disponible
  }

  const [is_over, setIsOver] = useState(false);
  const [isAudioEnabled, setIsAudioEnabled] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [showSOSMenu, setShowSOSMenu] = useState(false);

  const localAudioRef = useRef<HTMLAudioElement>(null);
  const remoteAudioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    // Asigna los streams a los elementos de audio cuando las props cambien.
    // Esto asegura que se usen los nuevos streams en una nueva llamada.
    if (localAudioRef.current) localAudioRef.current.srcObject = localStream;
    if (remoteAudioRef.current) remoteAudioRef.current.srcObject = remoteStream;

  }, [localStream, remoteStream]);

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
    console.log("Speak button clicked");
  };

  const handleContinueCall = () => {
    setIsOver(false);
  };

  const handleFinalizeCall = () => {
    if (socketRef.current && callIdRef.current) {
      socketRef.current.emit('hangup', { callId: callIdRef.current });
    }
    onEndCall(); // Llama a la función resetCall pasada desde ConnectPage
  };

  return (
    <div className="fixed inset-0 z-50 h-screen w-screen bg-black text-white flex flex-col">
      {/* Audio elements for WebRTC streams */}
      <audio ref={localAudioRef} autoPlay muted playsInline />
      <audio ref={remoteAudioRef} autoPlay playsInline />

      {/* User Rows */}
      <div className="flex-1 flex flex-col">
        {/* Other User Row */}
        <div className="flex-1 flex items-center justify-center border-b border-gray-800">
          <div className="text-center">
            {/* Avatar oponent*/}
            <div className="w-32 h-32 rounded-full overflow-hidden mx-auto mb-4 border-4 border-gray-700">
              <ImageWithFallback
                src={avatarOptions.find(opt => opt.id === String(opponentAvatar))?.src || avatarOptions[0].src}
                alt="Other User Profile"
                className="w-full h-full object-cover"
              />
            </div>
            <h2 className="text-xl font-semibold text-white mb-2">
              @{opponentUsername || "daniel123"}
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
              {/* Avatar usuario*/}
              <ImageWithFallback
                src={avatarOptions.find(opt => opt.id === String(user.avatar))?.src || avatarOptions[0].src}
                alt="Your Profile"
                className="w-full h-full object-cover"
              />
            </div>
            <h2 className="text-xl font-semibold text-white mb-2">
              @{userNickname}
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
                  @{opponentUsername}
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