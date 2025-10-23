import { ConfessAppsLogo } from "./ConfessAppsLogo";
import { ScrollArea } from "./ui/scroll-area";

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
        return (
          <div className="space-y-6">
            <h1 className="text-3xl text-white mb-8">
              Sumario
            </h1>

            <div className="space-y-4 text-gray-300 leading-relaxed">
              <p>
                Bienvenido a ConfessApps, una plataforma
                diseñada para conectar a personas que necesitan
                desahogarse con aquellas que disfrutan escuchar
                y brindar apoyo emocional. Nuestro servicio
                facilita conexiones aleatorias por llamada de
                voz en un ambiente seguro y confidencial.
              </p>

              {/* <p>
                Al utilizar ConfessApps, usted acepta cumplir con estos Términos y Condiciones, así como con todas 
                las políticas aquí contenidas. Es importante que lea detenidamente todos los términos antes de 
                utilizar nuestros servicios.
              </p>

              <h3 className="text-xl text-white mt-8 mb-4">Aspectos Clave de Nuestro Servicio:</h3>
              
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>
                  <strong className="text-orange-400">Conexiones Anónimas:</strong> Las conversaciones se realizan 
                  de forma anónima para proteger la privacidad de nuestros usuarios.
                </li>
                <li>
                  <strong className="text-orange-400">Dos Roles:</strong> Los usuarios pueden elegir entre ser 
                  "oyentes" (quienes escuchan) o "hablantes" (quienes necesitan desahogarse).
                </li>
                <li>
                  <strong className="text-orange-400">Moderación Activa:</strong> Mantenemos un sistema de 
                  moderación para garantizar un ambiente seguro y respetuoso.
                </li>
                <li>
                  <strong className="text-orange-400">Confidencialidad:</strong> Todo lo compartido en las 
                  conversaciones debe mantenerse confidencial entre los participantes.
                </li>
              </ul>

              <h3 className="text-xl text-white mt-8 mb-4">Responsabilidades del Usuario:</h3>
              
              <p>
                Al usar ConfessApps, usted se compromete a:
              </p>
              
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Tratar a otros usuarios con respeto y empatía</li>
                <li>No compartir información personal propia o de otros</li>
                <li>Reportar cualquier comportamiento inapropiado</li>
                <li>No usar el servicio para fines comerciales o promocionales</li>
                <li>Cumplir con todas las leyes aplicables en su jurisdicción</li>
              </ul>

              <h3 className="text-xl text-white mt-8 mb-4">Limitaciones y Advertencias:</h3>
              
              <p>
                ConfessApps es un servicio de apoyo emocional entre pares y no sustituye la atención médica 
                profesional. En casos de crisis de salud mental, emergencias médicas o pensamientos suicidas, 
                recomendamos contactar inmediatamente a los servicios de emergencia locales o profesionales 
                de la salud mental.
              </p>

              <p>
                El servicio se proporciona "tal como está" y no garantizamos la disponibilidad continua, 
                la compatibilidad con todos los dispositivos, o resultados específicos del uso de la plataforma.
              </p>

              <h3 className="text-xl text-white mt-8 mb-4">Modificaciones:</h3>
              
              <p>
                Nos reservamos el derecho de modificar estos términos en cualquier momento. Los usuarios serán 
                notificados de cambios significativos y el uso continuado del servicio constituye la aceptación 
                de los nuevos términos.
              </p> */}

              <p className="mt-8 text-sm text-gray-400">
                <strong>Fecha de última actualización:</strong>{" "}
                1 de octubre de 2025
              </p>
            </div>
          </div>
        );
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
            className="flex items-center gap-3 hover:opacity-80 transition-opacity"
          >
            <ConfessAppsLogo className="w-10 h-10" />
            <div className="text-left">
              <span className="text-white text-xl">
                Confess
              </span>
              <span className="text-orange-500 text-xl">
                Apps
              </span>
            </div>
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