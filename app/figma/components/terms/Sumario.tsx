export function Sumario() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold text-white mb-4">
          Bienvenido a ConfessApps
        </h2>
        <p className="text-gray-300 leading-relaxed">
          Estos Términos y Condiciones rigen el uso de nuestra plataforma de conexión anónima para compartir experiencias y escuchar a otros. Al acceder y utilizar ConfessApps, aceptas cumplir con estos términos en su totalidad.
        </p>
      </div>

      <div>
        <h3 className="text-xl font-semibold text-white mb-3">
          Resumen Ejecutivo
        </h3>
        <p className="text-gray-300 leading-relaxed mb-4">
          ConfessApps es una plataforma diseñada para crear conexiones significativas entre personas que necesitan expresarse y aquellas que desean escuchar. Nuestro compromiso principal es:
        </p>
        <ul className="space-y-2 text-gray-300">
          <li className="flex items-start">
            <span className="text-orange-500 mr-2">•</span>
            <span>Mantener un espacio seguro y respetuoso para todos los usuarios</span>
          </li>
          <li className="flex items-start">
            <span className="text-orange-500 mr-2">•</span>
            <span>Proteger la privacidad y el anonimato de nuestros usuarios</span>
          </li>
          <li className="flex items-start">
            <span className="text-orange-500 mr-2">•</span>
            <span>Facilitar conexiones auténticas basadas en la empatía y el respeto mutuo</span>
          </li>
          <li className="flex items-start">
            <span className="text-orange-500 mr-2">•</span>
            <span>Proporcionar herramientas de seguridad y soporte cuando sea necesario</span>
          </li>
        </ul>
      </div>

      <div>
        <h3 className="text-xl font-semibold text-white mb-3">
          Puntos Clave
        </h3>
        <div className="bg-gray-800/50 rounded-lg p-4 space-y-3">
          <p className="text-gray-300">
            <span className="font-semibold text-white">Edad mínima:</span> Debes tener al menos 18 años para usar ConfessApps.
          </p>
          <p className="text-gray-300">
            <span className="font-semibold text-white">Contenido prohibido:</span> No se permite contenido ilegal, abusivo, o que viole los derechos de otros.
          </p>
          <p className="text-gray-300">
            <span className="font-semibold text-white">Responsabilidad:</span> ConfessApps es una plataforma de apoyo emocional, no un servicio de salud mental profesional.
          </p>
          <p className="text-gray-300">
            <span className="font-semibold text-white">Privacidad:</span> Tus conversaciones son privadas y anónimas, excepto en casos de emergencia o actividad ilegal.
          </p>
        </div>
      </div>

      <div className="bg-orange-500/10 border border-orange-500/30 rounded-lg p-4">
        <p className="text-orange-200 text-sm">
          <span className="font-semibold">Nota importante:</span> Si estás experimentando una crisis de salud mental, por favor contacta a servicios de emergencia locales o líneas de ayuda profesionales. ConfessApps no es un sustituto de servicios profesionales de salud mental.
        </p>
      </div>
    </div>
  );
}
