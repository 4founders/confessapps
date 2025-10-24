"use client"
import { useState, useEffect, useRef } from "react";
import { Mic, Headphones, Phone } from "lucide-react";
import { Button } from "../ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { countries, languages } from "../../data/countries-languages";
import { useUser } from "@/context/UserContext";
import { toast } from "sonner";
import { io, Socket } from 'socket.io-client';
import Cookies from 'js-cookie';
import { CallPage } from "@/app/figma/components/app/CallPage";
import Loading from "@/app/figma/components/Loading";


type RoleType = 'speak' | 'listen' | null;

interface ConnectPageProps {
  onStartCall: () => void;
}

export function ConnectPage({ onStartCall }: ConnectPageProps) {
  const { user } = useUser();
  const [selectedRole, setSelectedRole] = useState<RoleType>(null);
  const [selectedCountry, setSelectedCountry] = useState<string>(user?.country || '');
  const [selectedLanguage, setSelectedLanguage] = useState<string>(user?.language || '');
  const [nickname, setNickname] = useState<string>(user?.settings.seudonym_pred || '');
  const [isSearching, setIsSearching] = useState(false);
  const [callStarted, setCallStarted] = useState(false);
  const [opponentUsername, setOpponentUsername] = useState('');
  const [remoteStream, setRemoteStream] = useState<MediaStream | null>(null);
  const [opponentAvatar, setOpponentAvatar] = useState(2); // Avatar predeterminado

  // Referencias para WebRTC y Socket.IO
  const socketRef = useRef<Socket | null>(null);
  const pcRef = useRef<RTCPeerConnection | null>(null);
  const localStreamRef = useRef<MediaStream | null>(null);
  const remoteStreamRef = useRef<MediaStream | null>(null);
  const callIdRef = useRef<string | null>(null);
  const bufferedCandidatesRef = useRef<RTCIceCandidateInit[]>([]);

  useEffect(() => {
    // Limpiar al desmontar
    return () => {
      socketRef.current?.disconnect();
    };
  }, []);

  useEffect(() => {
    // Asegura que los estados se actualicen si el usuario cambia
    if (user) {
      setSelectedCountry(user.country);
      setSelectedLanguage(user.language);
      setNickname(user.settings.seudonym_pred);
    }
  }, [user]);

  const resetCall = () => {
    if (pcRef.current) {
      pcRef.current.close();
      pcRef.current = null;
    }
    if (localStreamRef.current) {
      localStreamRef.current.getTracks().forEach(track => track.stop());
      localStreamRef.current = null;
      remoteStreamRef.current = null;
      setRemoteStream(null);
    }
    if (socketRef.current) {
      socketRef.current.disconnect();
      socketRef.current = null;
    }
    callIdRef.current = null;
    setCallStarted(false);
    toast.info("Llamada finalizada.", { position: "top-center" });
  };

  const handleCancelSearch = () => {
    setIsSearching(false);
    if (socketRef.current) {
      socketRef.current.disconnect();
      socketRef.current = null;
    }
    if (localStreamRef.current) {
      localStreamRef.current.getTracks().forEach(track => track.stop());
      localStreamRef.current = null;
    }
    toast.info("Búsqueda de match cancelada.", { position: "top-center" });
  };

  const handleConnect = async () => {
    if (!selectedRole) {
      toast.error("Debes elegir tu rol antes de poder conectar", {
        position: "top-center",
        duration: 3000,
      });
      return;
    }
    
    try {
      // 1. Pedir permisos de micrófono
      const stream = await navigator.mediaDevices.getUserMedia({ video: false, audio: true });
      localStreamRef.current = stream;

      // 2. Iniciar búsqueda y conectar al servidor de señalización

      setIsSearching(true);

      const socket = io(process.env.NODE_ENV === 'production' ? (process.env.SOCKETS_URL_PRODUCTION || 'https://signal.confessapps.com') : (process.env.SOCKETS_URL_DEVELOPMENT || 'http://localhost:3002'));
      socketRef.current = socket;

      // --- Lógica de WebRTC y Socket.IO ---

      const servers = {
        iceServers: [
          { urls: ['stun:stun1.l.google.com:19302', 'stun:stun2.l.google.com:19302'] },
        ],
        iceCandidatePoolSize: 10,
      };

      const createPeerConnection = () => {
        const pc = new RTCPeerConnection(servers);
        pcRef.current = pc;
        bufferedCandidatesRef.current = [];

        localStreamRef.current?.getTracks().forEach(track => {
          pc.addTrack(track, localStreamRef.current!);
        });

        pc.ontrack = (event) => {
          remoteStreamRef.current = new MediaStream();
          event.streams[0].getTracks().forEach(track => {
            remoteStreamRef.current!.addTrack(track);
            setRemoteStream(remoteStreamRef.current);
          });
          // Aquí podrías pasar el remoteStream a la CallPage
        };

        pc.onicecandidate = (event) => {
          if (event.candidate) {
            if (callIdRef.current) {
              socket.emit('iceCandidate', { callId: callIdRef.current, candidate: event.candidate.toJSON() });
            } else {
              bufferedCandidatesRef.current.push(event.candidate.toJSON());
            }
          }
        };
        return pc;
      };

      const startCall = async (pc: RTCPeerConnection) => {
        try {
          const offer = await pc.createOffer();
          await pc.setLocalDescription(offer);
          socket.emit('webrtcOffer', { callId: callIdRef.current, offer });
        } catch (err) {
          console.error('Error al crear la oferta:', err);
        }
      };

      socket.on('connect', () => {
        console.log('Conectado al servidor de señalización con ID:', socket.id);
        // 3. Enviar solicitud de matchmaking
        const token = Cookies.get('confessapps_token');

        socket.emit('findMatch', {
          auth: token,
          role: selectedRole,
          nickname: nickname,
          country: selectedCountry,
          language: selectedLanguage,
          avatar: user?.avatar || 1,
        });
      });

      socket.on('matchFound', async (data) => {
        console.log('Match encontrado:', data);
        const { callId: newCallId, opponent, role } = data;
        callIdRef.current = newCallId;
        setIsSearching(false); // Ocultar pantalla de carga
        setOpponentUsername(opponent.nickname);

        const pc = createPeerConnection();

        if (bufferedCandidatesRef.current.length > 0) {
          bufferedCandidatesRef.current.forEach(candidate => {
            socket.emit('iceCandidate', { callId: callIdRef.current, candidate });
          });
          bufferedCandidatesRef.current = [];
        }

        if (role === 'caller') {
          await startCall(pc);
        }

        setCallStarted(true);
      });

      socket.on('webrtcOffer', async (data) => {
        const pc = pcRef.current;
        if (!pc || !data.offer) return;
        await pc.setRemoteDescription(new RTCSessionDescription(data.offer));
        const answer = await pc.createAnswer();
        await pc.setLocalDescription(answer);
        socket.emit('webrtcAnswer', { callId: callIdRef.current, answer });
      });

      socket.on('webrtcAnswer', async (data) => {
        const pc = pcRef.current;
        if (!pc || !data.answer || pc.currentRemoteDescription) return;
        await pc.setRemoteDescription(new RTCSessionDescription(data.answer));
      });

      socket.on('iceCandidate', (data) => {
        const pc = pcRef.current;
        if (pc && data.candidate) {
          pc.addIceCandidate(new RTCIceCandidate(data.candidate));
        }
      });

      socket.on('hangup', () => {
        console.log('El otro usuario ha colgado');
        resetCall();
      });

    } catch (err) {
      console.error('Error al obtener permisos de micrófono:', err);
      toast.error("No fue posible conectarse. Se requieren permisos de micrófono.", {
        position: "top-center",
        duration: 4000,
      });
      setIsSearching(false);
    }
  };

  if (callStarted) {
    return (
      <CallPage
        localStream={localStreamRef.current}
        remoteStream={remoteStream}
        opponentUsername={opponentUsername}
        opponentAvatar={opponentAvatar}
        socketRef={socketRef}
        callIdRef={callIdRef}
        userNickname={nickname}
        onEndCall={resetCall}
      />
    );
  }

  return (
    <div className="p-6 min-h-full">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-2">Conectar</h1>
        {isSearching && (
          <div className="fixed inset-0 bg-black bg-opacity-80 flex flex-col items-center justify-center z-50 h-screen w-screen">
            <Button onClick={handleCancelSearch} variant="outline" className="mt-8 bg-transparent border-gray-600 text-gray-300 hover:bg-gray-800 hover:text-white">
              Cancelar Búsqueda
            </Button>
          </div>
        )}
        <p className="text-gray-400 mb-12">Encuentra a alguien con quien hablar o alguien que te escuche</p>
        
        {/* Role Selection */}
        <div className="mb-12">
          <Label className="text-white text-lg mb-6 block">Elige tu rol</Label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Speak Option */}
            <button
              onClick={() => setSelectedRole('speak')}
              className={`p-8 rounded-xl border-2 transition-all duration-200 ${
                selectedRole === 'speak'
                  ? 'border-orange-500 bg-gradient-to-r from-red-500/20 to-orange-500/20'
                  : 'border-gray-700 bg-gray-800 hover:border-gray-600'
              }`}
            >
              <div className="flex flex-col items-center text-center space-y-4">
                <div className={`w-16 h-16 rounded-full flex items-center justify-center ${
                  selectedRole === 'speak'
                    ? 'bg-gradient-to-r from-red-500 to-orange-500'
                    : 'bg-gray-700'
                }`}>
                  <Mic className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">Hablar</h3>
                  <p className="text-gray-400 text-sm">Necesito desahogarme y compartir mis pensamientos</p>
                </div>
              </div>
            </button>

            {/* Listen Option */}
            <button
              onClick={() => setSelectedRole('listen')}
              className={`p-8 rounded-xl border-2 transition-all duration-200 ${
                selectedRole === 'listen'
                  ? 'border-orange-500 bg-gradient-to-r from-red-500/20 to-orange-500/20'
                  : 'border-gray-700 bg-gray-800 hover:border-gray-600'
              }`}
            >
              <div className="flex flex-col items-center text-center space-y-4">
                <div className={`w-16 h-16 rounded-full flex items-center justify-center ${
                  selectedRole === 'listen'
                    ? 'bg-gradient-to-r from-red-500 to-orange-500'
                    : 'bg-gray-700'
                }`}>
                  <Headphones className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">Escuchar</h3>
                  <p className="text-gray-400 text-sm">Quiero ayudar a otros y ser un oído comprensivo</p>
                </div>
              </div>
            </button>
          </div>
        </div>

        {/* Country Selection */}
        <div className="mb-8">
          <Label htmlFor="country-select" className="text-white text-lg mb-4 block">
            Conectar con alguien de...
          </Label>
          <Select value={selectedCountry} onValueChange={setSelectedCountry}>
            <SelectTrigger id="country-select" className="w-full bg-gray-800 border-gray-700 text-white">
              <SelectValue placeholder="Selecciona un país" />
            </SelectTrigger>
            <SelectContent className="bg-gray-800 border-gray-700">
              <SelectItem value="any" className="text-white hover:bg-gray-700">
                🌍 Cualquier país
              </SelectItem>
              {countries.map((country) => (
                <SelectItem 
                  key={country.value} 
                  value={country.value}
                  className="text-white hover:bg-gray-700"
                >
                  {getCountryFlag(country.value)} {country.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Language Selection */}
        <div className="mb-8">
          <Label htmlFor="language-select" className="text-white text-lg mb-4 block">
            Idioma de la conversación
          </Label>
          <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
            <SelectTrigger id="language-select" className="w-full bg-gray-800 border-gray-700 text-white">
              <SelectValue placeholder="Selecciona un idioma" />
            </SelectTrigger>
            <SelectContent className="bg-gray-800 border-gray-700">
              {languages.map((language) => (
                <SelectItem 
                  key={language.value} 
                  value={language.value}
                  className="text-white hover:bg-gray-700"
                >
                  {language.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Nickname Selection */}
        <div className="mb-12">
          <Label htmlFor="nickname-input" className="text-white text-lg mb-4 block">
            Elige tu seudónimo
          </Label>
          <Input
            id="nickname-input"
            type="text"
            placeholder="LunaAzul"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            className="w-full bg-gray-800 border-gray-700 text-white placeholder-gray-500 focus:border-orange-500 focus:ring-orange-500"
          />
        </div>

        {/* Connect Button */}
        <Button
          onClick={handleConnect}
          disabled={!selectedRole}
          className="w-full bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white py-4 text-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Phone className="w-5 h-5 mr-2" />
          Conectar ahora
        </Button>

        {!selectedRole && (
          <p className="text-gray-500 text-center mt-4 text-sm">
            Debes elegir tu rol antes de poder conectar
          </p>
        )}
      </div>
    </div>
  );
}

// Helper function to get country flag emoji
function getCountryFlag(countryCode: string): string {
  const flagMap: { [key: string]: string } = {
    'AF': '🇦🇫', 'AL': '🇦🇱', 'DE': '🇩🇪', 'AD': '🇦🇩', 'AO': '🇦🇴',
    'AI': '🇦🇮', 'AQ': '🇦🇶', 'AG': '🇦🇬', 'SA': '🇸🇦', 'DZ': '🇩🇿',
    'AR': '🇦🇷', 'AM': '🇦🇲', 'AW': '🇦🇼', 'AU': '🇦🇺', 'AT': '🇦🇹',
    'AZ': '🇦🇿', 'BS': '🇧🇸', 'BH': '🇧🇭', 'BD': '🇧🇩', 'BB': '🇧🇧',
    'BE': '🇧🇪', 'BZ': '🇧🇿', 'BJ': '🇧🇯', 'BM': '🇧🇲', 'BY': '🇧🇾',
    'BO': '🇧🇴', 'BA': '🇧🇦', 'BW': '🇧🇼', 'BR': '🇧🇷', 'BN': '🇧🇳',
    'BG': '🇧🇬', 'BF': '🇧🇫', 'BI': '🇧🇮', 'BT': '🇧🇹', 'CV': '🇨🇻',
    'KH': '🇰🇭', 'CM': '🇨🇲', 'CA': '🇨🇦', 'QA': '🇶🇦', 'TD': '🇹🇩',
    'CL': '🇨🇱', 'CN': '🇨🇳', 'CY': '🇨🇾', 'CO': '🇨🇴', 'KM': '🇰🇲',
    'CG': '🇨🇬', 'KR': '🇰🇷', 'KP': '🇰🇵', 'CR': '🇨🇷', 'CI': '🇨🇮',
    'HR': '🇭🇷', 'CU': '🇨🇺', 'DK': '🇩🇰', 'DM': '🇩🇲', 'EC': '🇪🇨',
    'EG': '🇪🇬', 'SV': '🇸🇻', 'AE': '🇦🇪', 'ER': '🇪🇷', 'SK': '🇸🇰',
    'SI': '🇸🇮', 'ES': '🇪🇸', 'US': '🇺🇸', 'EE': '🇪🇪', 'ET': '🇪🇹',
    'PH': '🇵🇭', 'FI': '🇫🇮', 'FJ': '🇫🇯', 'FR': '🇫🇷', 'GA': '🇬🇦',
    'GM': '🇬🇲', 'GE': '🇬🇪', 'GH': '🇬🇭', 'GI': '🇬🇮', 'GD': '🇬🇩',
    'GR': '🇬🇷', 'GL': '🇬🇱', 'GT': '🇬🇹', 'GN': '🇬🇳', 'GW': '🇬🇼',
    'GQ': '🇬🇶', 'GY': '🇬🇾', 'HT': '🇭🇹', 'HN': '🇭🇳', 'HK': '🇭🇰',
    'HU': '🇭🇺', 'IN': '🇮🇳', 'ID': '🇮🇩', 'IQ': '🇮🇶', 'IR': '🇮🇷',
    'IE': '🇮🇪', 'IS': '🇮🇸', 'IL': '🇮🇱', 'IT': '🇮🇹', 'JM': '🇯🇲',
    'JP': '🇯🇵', 'JO': '🇯🇴', 'KZ': '🇰🇿', 'KE': '🇰🇪', 'KG': '🇰🇬',
    'KI': '🇰🇮', 'KW': '🇰🇼', 'LA': '🇱🇦', 'LS': '🇱🇸', 'LV': '🇱🇻',
    'LB': '🇱🇧', 'LR': '🇱🇷', 'LY': '🇱🇾', 'LI': '🇱🇮', 'LT': '🇱🇹',
    'LU': '🇱🇺', 'MO': '🇲🇴', 'MK': '🇲🇰', 'MG': '🇲🇬', 'MY': '🇲🇾',
    'MW': '🇲🇼', 'ML': '🇲🇱', 'MT': '🇲🇹', 'MA': '🇲🇦', 'MU': '🇲🇺',
    'MR': '🇲🇷', 'MX': '🇲🇽', 'FM': '🇫🇲', 'MD': '🇲🇩', 'MC': '🇲🇨',
    'MN': '🇲🇳', 'ME': '🇲🇪', 'MZ': '🇲🇿', 'MM': '🇲🇲', 'NA': '🇳🇦',
    'NR': '🇳🇷', 'NP': '🇳🇵', 'NI': '🇳🇮', 'NE': '🇳🇪', 'NG': '🇳🇬',
    'NO': '🇳🇴', 'NZ': '🇳🇿', 'OM': '🇴🇲', 'NL': '🇳🇱', 'PK': '🇵🇰',
    'PW': '🇵🇼', 'PA': '🇵🇦', 'PG': '🇵🇬', 'PY': '🇵🇾', 'PE': '🇵🇪',
    'PL': '🇵🇱', 'PT': '🇵🇹', 'PR': '🇵🇷', 'GB': '🇬🇧', 'CF': '🇨🇫',
    'CZ': '🇨🇿', 'CD': '🇨🇩', 'DO': '🇩🇴', 'RW': '🇷🇼', 'RO': '🇷🇴',
    'RU': '🇷🇺', 'WS': '🇼🇸', 'AS': '🇦🇸', 'KN': '🇰🇳', 'SM': '🇸🇲',
    'VC': '🇻🇨', 'LC': '🇱🇨', 'ST': '🇸🇹', 'SN': '🇸🇳', 'RS': '🇷🇸',
    'SC': '🇸🇨', 'SL': '🇸🇱', 'SG': '🇸🇬', 'SY': '🇸🇾', 'SO': '🇸🇴',
    'LK': '🇱🇰', 'SZ': '🇸🇿', 'ZA': '🇿🇦', 'SD': '🇸🇩', 'SS': '🇸🇸',
    'SE': '🇸🇪', 'CH': '🇨🇭', 'SR': '🇸🇷', 'TH': '🇹🇭', 'TW': '🇹🇼',
    'TZ': '🇹🇿', 'TJ': '🇹🇯', 'TL': '🇹🇱', 'TG': '🇹🇬', 'TO': '🇹🇴',
    'TT': '🇹🇹', 'TN': '🇹🇳', 'TM': '🇹🇲', 'TR': '🇹🇷', 'TV': '🇹🇻',
    'UA': '🇺🇦', 'UG': '🇺🇬', 'UY': '🇺🇾', 'UZ': '🇺🇿', 'VU': '🇻🇺',
    'VA': '🇻🇦', 'VE': '🇻🇪', 'VN': '🇻🇳', 'YE': '🇾🇪', 'DJ': '🇩🇯',
    'ZM': '🇿🇲', 'ZW': '🇿🇼'
  };
  
  return flagMap[countryCode] || '🏳️';
}