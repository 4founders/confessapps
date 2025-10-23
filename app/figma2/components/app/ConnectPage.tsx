import { useState } from "react";
import { Mic, Headphones, Phone } from "lucide-react";
import { Button } from "../ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { countries, languages } from "../../data/countries-languages";

type RoleType = 'speak' | 'listen' | null;

interface ConnectPageProps {
  onStartCall?: () => void;
}

export function ConnectPage({ onStartCall }: ConnectPageProps) {
  const [selectedRole, setSelectedRole] = useState<RoleType>(null);
  const [selectedCountry, setSelectedCountry] = useState<string>('');
  const [selectedLanguage, setSelectedLanguage] = useState<string>('');
  const [nickname, setNickname] = useState<string>('');

  const handleConnect = () => {
    if (!selectedRole) {
      alert('Por favor, elige tu rol antes de conectar');
      return;
    }
    
    console.log('Connecting with:', {
      role: selectedRole,
      country: selectedCountry,
      language: selectedLanguage,
      nickname: nickname
    });
    
    // Call the onStartCall function if provided
    if (onStartCall) {
      onStartCall();
    } else {
      // Fallback for development
      alert('Conectando... (funcionalidad próximamente)');
    }
  };

  return (
    <div className="p-6 min-h-full">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-2">Conectar</h1>
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