import { ConfessAppsLogo } from "./ConfessAppsLogo";
import { ScrollArea } from "./ui/scroll-area";
import { Sumario } from "./terms/Sumario";
import { Valores } from "./terms/Valores";
import { Privacidad } from "./terms/Privacidad";
import { TerminosDeUso } from "./terms/TerminosDeUso";
import { PropiedadIntelectual } from "./terms/PropiedadIntelectual";
import { Responsabilidades } from "./terms/Responsabilidades";
import { Modificaciones } from "./terms/Modificaciones";
import { Contacto } from "./terms/Contacto";

const topics = [
  "Sumario",
  "Valores",
  "Política de Privacidad y Seguridad de Datos",
  "Política de Moderación y Conducta Comunitaria",
  "Política de Diversidad, Equidad, Inclusión y Accesibilidad",
  "Declaración Accesibilidad",
  "Política de Eliminación de Cuenta",
  "Política de Cookies",
  "Política de Seguridad",
  "Política de Recolección y Uso de Datos de Audio",
  "Disposiciones Legales",
  "Uso del Sitio y de la App y su Propiedad",
  "Propiedad del Contenido",
  "Servicios de Pago",
  "Acceso Pagina y Aplicacion",
  "Terminación del Servicio por Parte del Usuario",
  "Abusos y Quejas",
  "Política de privacidad",
  "Enlaces",
  "Exclusión de Garantías y de Responsabilidad",
  "Indemnización",
  "Programa Beta",
  "Legislación y Jurisdicción Internacional",
  "Modificaciones de Términos",
  "Aviso Legal",
];

interface TermsAndConditionsProps {
  onNavigate: (page: string) => void;
}

export function TermsAndConditions({
  onNavigate,
}: TermsAndConditionsProps) {
  const currentTopic = "Sumario"; // Por ahora solo implementamos Sumario

  const renderTopicContent = (topic: string) => {
    switch (topic) {
      case "Sumario":
        return <Sumario />;
      case "Valores":
        return <Valores />;
      case "Política de Privacidad y Seguridad de Datos":
        return <Privacidad />;
      case "Uso del Sitio y de la App y su Propiedad":
        return <TerminosDeUso />;
      case "Propiedad del Contenido":
        return <PropiedadIntelectual />;
      case "Exclusión de Garantías y de Responsabilidad":
        return <Responsabilidades />;
      case "Modificaciones de Términos":
        return <Modificaciones />;
      case "Aviso Legal":
        return <Contacto />;
      default:
        return (
          <div className="space-y-6">
            <h1 className="text-3xl text-white mb-8">
              {topic}
            </h1>
            <p className="text-gray-300">
              Contenido para {topic} estará disponible
              próximamente.
            </p>
          </div>
        );
    }
  };

  return (
    <div className="h-screen bg-black text-white flex overflow-hidden">
      {/* Sidebar */}
      <div className="w-80 bg-gray-900 border-r border-gray-800 flex flex-col h-full">
        {/* Header con logo */}
        <div className="p-6 border-b border-gray-800 flex-shrink-0">
          <button
            onClick={() => onNavigate("landing")}
            className="flex items-center space-x-3 hover:opacity-80 transition-opacity"
          >
            <ConfessAppsLogo className="w-8 h-8 object-contain" />
            <span className="text-xl font-semibold">
              <span className="text-white">Confess</span>
              <span className="bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">
                Apps
              </span>
            </span>
          </button>
        </div>

        {/* Lista de tópicos */}
        <div className="flex-1 overflow-hidden">
          <ScrollArea className="h-full">
            <div className="p-4">
              <nav className="space-y-1">
                {topics.map((topic) => (
                  <button
                    key={topic}
                    className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${
                      currentTopic === topic
                        ? "bg-orange-600 text-white"
                        : "text-gray-300 hover:bg-gray-800 hover:text-white"
                    }`}
                  >
                    {topic}
                  </button>
                ))}
              </nav>
            </div>
          </ScrollArea>
        </div>
      </div>

      {/* Contenido principal */}
      <div className="flex-1 h-full overflow-hidden">
        <ScrollArea className="h-full">
          <div className="max-w-4xl mx-auto p-8">
            {renderTopicContent(currentTopic)}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
}